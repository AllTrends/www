import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { xdcTestnet } from "viem/chains";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { chains, publicClient } = configureChains(
    [xdcTestnet],
    [publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: "MIAO",
    chains,
    projectId: "7171244509c2a41cb8e9e1fbc38a90b3",
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
