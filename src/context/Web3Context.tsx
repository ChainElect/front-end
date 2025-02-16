import React, { createContext, useContext, useEffect, useState } from "react";
import { init, Web3OnboardProvider } from "@web3-onboard/react"; // ✅ Ensure proper import
import injectedWallets from "@web3-onboard/injected-wallets";

const API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`;

const Web3Context = createContext<any>(null);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [web3Onboard, setWeb3Onboard] = useState<any>(null);
  const [walletsAvailable, setWalletsAvailable] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const injected = injectedWallets();
      const hasInjectedWallets = injected && injected.length > 0;

      if (!hasInjectedWallets) {
        console.warn(
          "⚠️ No Web3 wallet detected. Ensure you have MetaMask installed."
        );
        setWalletsAvailable(false);
        return;
      }

      setWalletsAvailable(true);

      // ✅ Initialize Web3 Onboard and pass it to `Web3OnboardProvider`
      const onboardInstance = init({
        connect: {
          autoConnectLastWallet: false,
        },
        wallets: hasInjectedWallets ? [injected] : [],
        chains: [
          {
            id: "0xaa36a7",
            token: "ETH",
            label: "Ethereum Sepolia",
            rpcUrl,
          },
        ],
      });

      setWeb3Onboard(onboardInstance);
      setIsInitialized(true);
    } catch (error) {
      console.error("❌ Web3 Onboard initialization failed:", error);
    }
  }, []);

  if (!isInitialized || !web3Onboard) {
    return <div>Loading Web3...</div>;
  }

  return (
    <Web3Context.Provider value={{ web3Onboard, walletsAvailable }}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        {children}
      </Web3OnboardProvider>
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
