import { type AppType } from "next/app";

import { api } from "~/utils/api";

// Font (supports weights 400-700)
import "@fontsource-variable/instrument-sans/wdth.css";

// Styles
import "~/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// Misc
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { xdcTestnet } from "viem/chains";
import BaseLayout from "~/layouts/BaseLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { chains, publicClient } = configureChains(
    [xdcTestnet],
    [publicProvider()],
  );

  const customRainbowTheme = darkTheme({
    accentColor: "#0D0A09",
    accentColorForeground: "#FAFAF9",
  });

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
      <RainbowKitProvider chains={chains} theme={customRainbowTheme}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
