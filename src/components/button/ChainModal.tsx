import React, { useCallback, useEffect, useState } from "react";
import { useSetChain } from "@web3-onboard/react";
import * as Sentry from "@sentry/react";

import "../../assets/styles/ChainModal.css";
import { ModalContent } from "./ModalContent";

// Define Props Interface
interface ChainModalProps {
  onDisconnect: () => void;
}

export const ChainModal: React.FC<ChainModalProps> = ({ onDisconnect }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [
    {
      chains = [], // Ensure chains is an array to prevent undefined errors
      connectedChain = null, // Prevents accessing `id` of undefined
      settingChain,
    },
    setChain,
  ] = useSetChain();

  // Ensure Web3 is loaded before using chains
  useEffect(() => {
    if (chains.length === 0 || !connectedChain) {
      setIsVisible(false); // Prevent showing modal if no chains are available
      return;
    }

    if (connectedChain && chains[0]?.id !== connectedChain.id) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [connectedChain, chains]);

  // Close modal safely
  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Disconnect safely
  const handleDisconnect = useCallback(() => {
    handleClose();
    onDisconnect();
  }, [handleClose, onDisconnect]);

  // Perform chain switch with error handling
  const performChainSwitch = useCallback(async () => {
    try {
      if (chains.length === 0) {
        console.warn("No chains available for switching.");
        return;
      }

      const res = await setChain({ chainId: chains[0].id });
      if (!res) {
        console.warn("Chain switch failed.");
        onDisconnect();
      }

      handleClose();
    } catch (error) {
      console.error("Error switching chain:", error);
      Sentry.captureException(error);
    }
  }, [setChain, chains, onDisconnect, handleClose]);

  return (
    <>
      {isVisible && (
        <div className="modal-overlay">
          <ModalContent
            settingChain={settingChain}
            handleDisconnect={handleDisconnect}
            handleSwitch={performChainSwitch}
          />
        </div>
      )}
    </>
  );
};
