import React, { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useConnectWallet } from "@web3-onboard/react";
import { useWeb3 } from "@context/Web3Context";
import * as Sentry from "@sentry/react";
import { FaEthereum, FaPowerOff, FaExclamationTriangle } from "react-icons/fa";

interface ConnectButtonProps {
  className?: string;
  label?: React.ReactNode;
  fullWidth?: boolean;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  className = "",
  label = "Connect Wallet",
  fullWidth = false,
}) => {
  const navigate = useNavigate();
  const { web3Onboard, walletsAvailable } = useWeb3();

  // ✅ Always call useConnectWallet() at the top level
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ If no wallets are available, redirect user to MetaMask download page
  const handleNoWallet = useCallback(() => {
    navigate("/get-wallet");
  }, [navigate]);

  // ✅ Prevent execution of wallet actions if no wallets exist
  const handleConnect = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      if (!walletsAvailable) {
        handleNoWallet();
        return;
      }

      const result = await connect();
      if (!result) throw new Error("❌ Wallet connection failed.");
    } catch (error: any) {
      console.error("Connect failed:", error);
      setError(error.message);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  }, [connect, walletsAvailable, handleNoWallet]);

  const handleDisconnect = useCallback(async () => {
    if (!wallet) return;
    try {
      setLoading(true);
      await disconnect(wallet);
    } catch (error) {
      console.error("Disconnect failed:", error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  }, [wallet, disconnect]);

  const isDisabled = useMemo(
    () => !walletsAvailable || connecting || loading,
    [walletsAvailable, connecting, loading]
  );

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {/* ✅ Redirect message if no wallet is installed */}
      {!walletsAvailable && (
        <div className="flex items-center p-3 text-red-500 bg-red-100 rounded-md">
          <FaExclamationTriangle className="mr-2" />
          No Web3 wallet detected. Install{" "}
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline font-bold"
          >
            MetaMask
          </a>
          .
        </div>
      )}

      {wallet ? (
        <button
          disabled={isDisabled}
          onClick={handleDisconnect}
          className={`${className} flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-all`}
        >
          {loading ? "Disconnecting..." : <FaPowerOff className="mr-2" />}
          {label}
        </button>
      ) : (
        <button
          disabled={isDisabled}
          onClick={handleConnect}
          className={`${className} flex items-center justify-center bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-2 px-4 rounded transition-all ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Connecting..." : <FaEthereum className="mr-2" />}
          {label}
        </button>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};
