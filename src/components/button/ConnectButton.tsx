import React, { useCallback } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import * as Sentry from "@sentry/react";
import { ChainModal } from "./ChainModal";

interface ConnectButtonProps {
  className?: string;
  label?: string;
  fullWidth?: boolean;
}

interface WalletState {
  label: string;
  accounts: Array<{ address: string }>;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  className = "",
  label = "Connect Wallet",
  fullWidth = false,
}) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const handleDisconnect = useCallback(async () => {
    if (!wallet) return;
    try {
      await disconnect(wallet);
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [wallet, disconnect]);

  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [connect]);

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {wallet ? (
        <>
          <ChainModal onDisconnect={handleDisconnect} />
          <button
            disabled={connecting}
            onClick={handleDisconnect}
            className={`${className} bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-all`}
          >
            {connecting ? "Connecting..." : label}
          </button>
        </>
      ) : (
        <button
          disabled={connecting}
          onClick={handleConnect}
          className={`${className} bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-2 px-4 rounded transition-all`}
        >
          {connecting ? "Connecting..." : label}
        </button>
      )}
    </div>
  );
};
