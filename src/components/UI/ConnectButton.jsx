import React from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";

import ChainModal from "./ChainModal.jsx";

const ConnectButton = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  function handleDisconnect() {
    if (!wallet) {
      return;
    }

    disconnect(wallet).catch((error) => {
      console.log(error);
    });
  }
  if (wallet) {
    return (
      <div>
        <ChainModal onDisconnect={handleDisconnect} />
        <button disabled={connecting} onClick={() => disconnect(wallet)}>
          {connecting ? "connecting" : "disconnect"}
        </button>
      </div>
    );
  }
  return (
    <button disabled={connecting} onClick={() => connect()}>
      {connecting ? "connecting" : "connect"}
    </button>
  );
};

export default ConnectButton;
