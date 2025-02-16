// services/electionService.js
import { ethers } from "ethers";
import * as Sentry from "@sentry/react";

import { ERROR_MESSAGES } from "../utils/messages/errorMessages";
import { ERC20_ABI, ERC20_ADDRESS } from "../utils/wallet/walletConstants";

export const ElectionService = {
  async createElection(
    electionName,
    electionStart,
    electionEnd,
    connectedWallets
  ) {
    if (!electionName || !electionStart || !electionEnd) {
      throw new Error(ERROR_MESSAGES.MISSING_FIELDS.message);
    }

    const injectedProvider = connectedWallets[0]?.provider;
    if (!injectedProvider) {
      throw new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED.message);
    }

    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

    const startTime = Math.floor(new Date(electionStart).getTime() / 1000);
    const endTime = Math.floor(new Date(electionEnd).getTime() / 1000);

    try {
      const tx = await contract.createElection(
        electionName,
        startTime,
        endTime
      );
      await tx.wait();
      return { electionName, startTime, endTime };
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          errorCode: ERROR_MESSAGES.ADDING_ELECTION_FAILED.code,
          errorMessage: ERROR_MESSAGES.ADDING_ELECTION_FAILED.message,
        },
      });
      throw err;
    }
  },
};
