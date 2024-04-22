"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  injectedWallet,
  metaMaskWallet,
  bitgetWallet,
  rainbowWallet,
  walletConnectWallet,
  bifrostWallet,
  bitskiWallet,
  braveWallet,
  coinbaseWallet,
  coin98Wallet,
  coreWallet,
  dawnWallet,
  enkryptWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, sepolia, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { darkTheme } from "@rainbow-me/rainbowkit";

import { EthereumProvider } from "../context/cipMainContext.js";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ sepolia,arbitrum ],
  [
    alchemyProvider({ apiKey: "rPP4tqmuLqPcd0I0qh32c1H8wCSDsiB9" }),
    publicProvider(),
  ]
);

const projectId = "8a95b01a64c8725c00ff6dcea1290685";

const demoAppInfo = {
  appName: "CIP Pro Dapp",
};

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      bitgetWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
    ],
  },
  {
    groupName: "Other Wallets",
    wallets: [
      //==================================
      argentWallet({ projectId, chains }),
      bifrostWallet({ projectId, chains }),
      bitskiWallet({ projectId, chains }),
      braveWallet({ projectId, chains }),
      coinbaseWallet({ appName: "CIP Pro", chains }),
      coin98Wallet({ projectId, chains }),
      coreWallet({ projectId, chains }),
      dawnWallet({ chains }),
      enkryptWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        theme={darkTheme({
          accentColor: "#3C54F5",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <EthereumProvider>{mounted && children}</EthereumProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
