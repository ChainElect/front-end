// services/partyService.js
import { ethers } from "ethers";
import * as Sentry from "@sentry/react";

import { ERROR_MESSAGES } from "../utils/messages/errorMessages";
import { BACKEND_DATA_API_ENDPOINTS } from "../utils/endpoints";
import { ERC20_ABI, ERC20_ADDRESS } from "../utils/wallet/walletConstants";

export const PartyService = {
  async fetchParties() {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(BACKEND_DATA_API_ENDPOINTS.PARTIES, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        const err = await response.json();
        Sentry.captureException(err, {
          extra: {
            errorCode: ERROR_MESSAGES.FETCH_PARTIES_FAILED.code,
            errorMessage: ERROR_MESSAGES.FETCH_PARTIES_FAILED.message,
          },
        });
        throw new Error(ERROR_MESSAGES.FETCH_PARTIES_FAILED.message);
      }
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          errorCode: ERROR_MESSAGES.FETCH_PARTIES_FAILED.code,
          errorMessage: ERROR_MESSAGES.FETCH_PARTIES_FAILED.message,
        },
      });
      throw err;
    }
  },

  async addParty(partyName, partyDescription, connectedWallets) {
    if (!partyName || !partyDescription) {
      throw new Error(ERROR_MESSAGES.MISSING_FIELDS.message);
    }

    const injectedProvider = connectedWallets[0]?.provider;
    if (!injectedProvider) {
      throw new Error(ERROR_MESSAGES.WALLET_NOT_CONNECTED.message);
    }

    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

    try {
      const tx = await contract.addParty(partyName, partyDescription);
      await tx.wait();
      return { partyName, partyDescription };
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          errorCode: ERROR_MESSAGES.ADDING_PARTY_FAILED.code,
          errorMessage: ERROR_MESSAGES.ADDING_PARTY_FAILED.message,
        },
      });
      throw err;
    }
  },
};
