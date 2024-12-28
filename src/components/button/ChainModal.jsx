import React, { useCallback, useEffect, useState } from "react";
import { useSetChain } from "@web3-onboard/react";
import * as Sentry from "@sentry/react";
import PropTypes from "prop-types";

import "../../assets/styles/ChainModal.css";
import { ModalContent } from "./ModalContent";

export const ChainModal = ({ onDisconnect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain, // boolean indicating if the chain is in the process of being set
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  useEffect(() => {
    if (chains && connectedChain && chains[0].id !== connectedChain.id) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [connectedChain, chains]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleDisconnect = useCallback(() => {
    handleClose();
    onDisconnect();
  }, [handleClose, onDisconnect]);

  const performChainSwitch = useCallback(() => {
    return setChain({ chainId: chains[0].id }).then((res) => {
      if (!res) {
        onDisconnect();
      }
      handleClose();
    });
  }, [setChain, chains, onDisconnect, handleClose]);

  const handleSwitch = useCallback(() => {
    performChainSwitch().catch((err) => {
      Sentry.captureException(err);
    });
  }, [performChainSwitch]);

  return (
    <>
      {isVisible && (
        <div className="modal-overlay">
          <ModalContent
            settingChain={settingChain}
            handleDisconnect={handleDisconnect}
            handleSwitch={handleSwitch}
          />
        </div>
      )}
    </>
  );
};

ChainModal.propTypes = {
  onDisconnect: PropTypes.func.isRequired,
};
