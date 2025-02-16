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
      chains, // List of available chains
      connectedChain, // Current connected chain
      settingChain, // Boolean indicating chain switch in progress
    },
    setChain, // Function to switch chains
  ] = useSetChain();

  // Handle modal visibility based on chain mismatch
  useEffect(() => {
    if (chains && connectedChain && chains[0]?.id !== connectedChain.id) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [connectedChain, chains]);

  // Close modal
  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Handle wallet disconnect
  const handleDisconnect = useCallback(() => {
    handleClose();
    onDisconnect();
  }, [handleClose, onDisconnect]);

  // Perform chain switch with error handling
  const performChainSwitch = useCallback(async () => {
    try {
      const res = await setChain({ chainId: chains[0]?.id });
      if (!res) {
        onDisconnect();
      }
      handleClose();
    } catch (error) {
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
