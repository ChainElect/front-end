import React from "react";

// Define Props Interface
interface ModalContentProps {
  settingChain: boolean;
  handleDisconnect: () => void;
  handleSwitch: () => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({
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
