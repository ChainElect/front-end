import React, { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useConnectWallet } from "@web3-onboard/react";
import { useWeb3 } from "@context/Web3Context";
import { useThemeColors } from "@hooks/useThemeColors";
import * as Sentry from "@sentry/react";
import { FaEthereum, FaPowerOff, FaExclamationTriangle } from "react-icons/fa";
import clsx from "clsx";

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
  const colors = useThemeColors();
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
    <div className={clsx(fullWidth && "w-full", className)}>
      {!walletsAvailable && (
        <div
          className="flex items-center p-3 rounded-lg backdrop-blur-sm border"
          style={{
            color: colors.text,
            borderColor: `color-mix(in srgb, ${colors.border} 30%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${colors.background} 95%, transparent)`,
          }}
        >
          <FaExclamationTriangle className="mr-2 text-red-400" />
          <span className="opacity-90">No Web3 wallet detected. Install </span>
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline font-medium hover:text-primary transition-colors"
            style={{ color: colors.primary }}
          >
            MetaMask
          </a>
        </div>
      )}

      {wallet ? (
        <button
          disabled={isDisabled}
          onClick={handleDisconnect}
          className={clsx(
            "group flex items-center justify-center gap-2",
            "font-medium rounded-xl border backdrop-blur-sm",
            "transition-all duration-300 hover:scale-[1.02]",
            "relative overflow-hidden",
            fullWidth && "w-full",
            isDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-primary",
            "px-6 py-3" // Base padding
          )}
          style={{
            color: colors.text,
            borderColor: `color-mix(in srgb, ${colors.border} 40%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${colors.background} 92%, transparent)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
            style={{
              background: `radial-gradient(800px circle at var(--x) var(--y), ${colors.primary} 0%, transparent 80%)`,
            }}
          />

          <FaPowerOff className="text-red-400 transition-transform group-hover:rotate-90" />
          <span>{loading ? "Disconnecting..." : label}</span>
        </button>
      ) : (
        <button
          disabled={isDisabled}
          onClick={handleConnect}
          className={clsx(
            "group flex items-center justify-center gap-2",
            "font-medium rounded-xl border backdrop-blur-sm",
            "bg-gradient-to-tr from-primary/30 to-secondary/30",
            "transition-all duration-300 hover:scale-[1.02]",
            "relative overflow-hidden",
            fullWidth && "w-full",
            isDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-primary",
            "px-6 py-3" // Base padding
          )}
          style={{
            color: colors.text,
            borderColor: `color-mix(in srgb, ${colors.border} 40%, transparent)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
            style={{
              background: `radial-gradient(800px circle at var(--x) var(--y), ${colors.primary} 0%, transparent 80%)`,
            }}
          />

          <div className="relative z-10 flex items-center gap-2">
            <FaEthereum className="text-primary animate-pulse" />
            <span>{loading ? "Connecting..." : label}</span>
          </div>
        </button>
      )}

      {error && (
        <p
          className="text-sm mt-2 text-center px-4 py-2 rounded-lg backdrop-blur-sm"
          style={{
            color: colors.text,
            backgroundColor: `color-mix(in srgb, ${colors.background} 95%, transparent)`,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
