import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { router } from "../pages/routes";

const { chains, provider } = configureChains(
  [chain.localhost],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: () => {
        return {
          http: "http://localhost:8545",
        };
      },
    }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "AutoArtist",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});

export function Dapp() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
