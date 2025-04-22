import axios from "axios";
import { ethers } from "ethers";
import * as Sentry from "@sentry/react";
import { ERROR_MESSAGES } from "../utils/messages/errorMessages";
import { BACKEND_DATA_API_ENDPOINTS } from "../utils/endpoints";
import { ERC20_ABI, ERC20_ADDRESS } from "../utils/wallet/walletConstants";

export const VotingService = {
  /**
   * Prepare a vote with ZKP
   * @param {string} electionId - ID of the election
   * @param {string} partyId - ID of the party
   * @returns {Promise<Object>} - Returns ZKP data and vote parameters
   */
  async prepareVote(electionId, partyId) {
    try {
      // Get auth token
      const authToken = localStorage.getItem("token");
      
      // Get saved commitment data if available
      const userData = localStorage.getItem(`commitment_${electionId}`);
      
      // Call the API to prepare vote
      const response = await axios.post(
        BACKEND_DATA_API_ENDPOINTS.PREPARE_VOTE,
        { electionId, partyId, userData: userData ? JSON.parse(userData) : null },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      
      if (response.data.success) {
        // Save commitment data for future use
        if (response.data.data.commitmentData) {
          localStorage.setItem(
            `commitment_${electionId}`,
            JSON.stringify(response.data.data.commitmentData)
          );
        }
        
        return response.data.data;
      } else {
        throw new Error(response.data.message || ERROR_MESSAGES.VOTE_PREPARATION_FAILED.message);
      }
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          errorCode: ERROR_MESSAGES.VOTE_PREPARATION_FAILED.code,
          errorMessage: ERROR_MESSAGES.VOTE_PREPARATION_FAILED.message,
        },
      });
      throw error;
    }
  },
  
  /**
   * Cast a vote directly using blockchain
   * @param {Object} voteData - Vote data including ZKP
   * @returns {Promise<Object>} - Transaction details
   */
  async castVote(voteData) {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED.message);
      }
      
      // Connect to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create ethers provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);
      
      // Submit vote transaction
      const tx = await contract.vote(
        voteData.electionId,
        voteData.partyId,
        voteData.nullifierHash,
        voteData.root,
        voteData.proof_a,
        voteData.proof_b,
        voteData.proof_c
      );
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          errorCode: ERROR_MESSAGES.VOTE_SUBMISSION_FAILED.code,
          errorMessage: ERROR_MESSAGES.VOTE_SUBMISSION_FAILED.message,
        },
      });
      throw error;
    }
  },
  
  /**
   * Cast a vote via the backend API
   * @param {Object} voteData - Vote data including ZKP
   * @returns {Promise<Object>} - Response data
   */
  async castVoteViaAPI(voteData) {
    try {
      // Get auth token
      const authToken = localStorage.getItem("token");
      
      // Call the API to cast vote
      const response = await axios.post(
        BACKEND_DATA_API_ENDPOINTS.CAST_VOTE,
        voteData,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || ERROR_MESSAGES.VOTE_SUBMISSION_FAILED.message);
      }
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          errorCode: ERROR_MESSAGES.VOTE_SUBMISSION_FAILED.code,
          errorMessage: ERROR_MESSAGES.VOTE_SUBMISSION_FAILED.message,
        },
      });
      throw error;
    }
  },
  
  /**
   * Check if a user has already voted
   * @param {string} nullifierHash - Hash of the nullifier
   * @returns {Promise<boolean>} - True if user has voted
   */
  async hasVoted(nullifierHash) {
    try {
      const response = await axios.get(
        `${BACKEND_DATA_API_ENDPOINTS.VOTE_STATUS}/${nullifierHash}`
      );
      
      return response.data.success && response.data.hasVoted;
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          errorCode: ERROR_MESSAGES.VOTE_STATUS_CHECK_FAILED.code,
          errorMessage: ERROR_MESSAGES.VOTE_STATUS_CHECK_FAILED.message,
        },
      });
      throw error;
    }
  }
};