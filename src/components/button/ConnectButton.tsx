import React, { useCallback } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import * as Sentry from "@sentry/react";

import { ChainModal } from "./ChainModal";

// Define types for Web3Onboard return values
interface WalletState {
  label: string;
  accounts: Array<{ address: string }>;
}

export const ConnectButton: React.FC = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // Memoized handler for disconnecting the wallet
  const handleDisconnect = useCallback(async () => {
    if (!wallet) return;

    try {
      await disconnect(wallet);
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [wallet, disconnect]);

  // Memoized handler for connecting the wallet
  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [connect]);

  return (
    <div className="w-full">
      {wallet ? (
        <>
          <ChainModal onDisconnect={handleDisconnect} />
          <button
            disabled={connecting}
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            {connecting ? "Connecting..." : "Disconnect"}
          </button>
        </>
      ) : (
        <button
          disabled={connecting}
          onClick={handleConnect}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {connecting ? "Connecting..." : "Connect"}
        </button>
      )}
    </div>
  );
};
