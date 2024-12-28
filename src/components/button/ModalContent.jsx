import React from "react";
import PropTypes from "prop-types";

export const ModalContent = ({
  settingChain,
  handleDisconnect,
  handleSwitch,
}) => (
  <div className="modal-content">
    <h2>Wrong Chain ID</h2>
    <p>Please select the correct chain ID.</p>
    <div className="modal-buttons">
      {settingChain ? (
        <p>Switching...</p>
      ) : (
        <>
          <button onClick={handleDisconnect}>Disconnect</button>
          <button onClick={handleSwitch}>Switch</button>
        </>
      )}
    </div>
  </div>
);

ModalContent.propTypes = {
  settingChain: PropTypes.bool.isRequired,
  handleDisconnect: PropTypes.func.isRequired,
  handleSwitch: PropTypes.func.isRequired,
};
