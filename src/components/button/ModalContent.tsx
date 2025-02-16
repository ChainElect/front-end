import React from "react";

// Define Props Interface
interface ModalContentProps {
  settingChain: boolean;
  handleDisconnect: () => void;
  handleSwitch: () => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  settingChain = false,
  handleDisconnect,
  handleSwitch,
}) => (
  <div className="modal-content">
    <h2>⚠️ Wrong Chain Detected</h2>
    <p>Please switch to the correct blockchain network.</p>
    <div className="modal-buttons">
      {settingChain ? (
        <p className="text-yellow-500">Switching...</p>
      ) : (
        <>
          <button
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Disconnect
          </button>
          <button
            onClick={handleSwitch}
            disabled={settingChain}
            className={`px-4 py-2 rounded ${
              settingChain
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Switch Chain
          </button>
        </>
      )}
    </div>
  </div>
);
