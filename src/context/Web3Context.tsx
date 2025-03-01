import React, { createContext, useContext, useEffect, useState } from "react";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import injectedWallets from "@web3-onboard/injected-wallets";

const API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`;

/**
 * @interface Web3ContextType
 * @description Represents the structure of the Web3 context.
 */
interface Web3ContextType {
  web3Onboard: any; // TODO: Replace `any` with a more specific type if available.
  walletsAvailable: boolean;
}

/**
 * @constant Web3Context
 * @description React context for Web3 Onboard integration.
 */
const Web3Context = createContext<Web3ContextType | undefined>(undefined);

/**
 * @component Web3Provider
 * @description Initializes and provides the Web3 Onboard instance along with wallet availability
 * status to its children components.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components that require Web3 context.
 * @returns {JSX.Element} The provider component wrapping its children with Web3 context.
 */
export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [web3Onboard, setWeb3Onboard] = useState<any>(null);
  const [walletsAvailable, setWalletsAvailable] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

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

      // Initialize Web3 Onboard instance
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

/**
 * @function useWeb3
 * @description Custom hook to access the Web3 context. Throws an error if used outside of a Web3Provider.
 *
 * @returns {Web3ContextType} The current Web3 context.
 * @throws {Error} If the hook is used outside of the Web3Provider.
 */
export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
