import React, { useCallback } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import * as Sentry from "@sentry/react";

import ChainModal from "./ChainModal.jsx";

export const ConnectButton = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // Memoized handler for disconnecting the wallet
  const handleDisconnect = useCallback(() => {
    if (!wallet) {
      return;
    }

    disconnect(wallet).catch((error) => {
      Sentry.captureException(error);
    });
  }, [wallet, disconnect]);

  // Memoized handler for connecting the wallet
  const handleConnect = useCallback(() => {
    connect().catch((error) => {
      Sentry.captureException(error);
    });
  }, [connect]);

  if (wallet) {
    return (
      <div>
        <ChainModal onDisconnect={handleDisconnect} />
        <button disabled={connecting} onClick={handleDisconnect}>
          {connecting ? "connecting" : "disconnect"}
        </button>
      </div>
    );
  }
  return (
    <button disabled={connecting} onClick={handleConnect}>
      {connecting ? "connecting" : "connect"}
    </button>
  );
};
