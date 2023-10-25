import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";

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
import { walletConnectProjectId } from "~/utils/constants";

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
    projectId: walletConnectProjectId,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={customRainbowTheme}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: {
              style: {
                background: "#0D0A09",
                color: "#FAFAF9",
                border: "1px solid #FAFAF9",
              },
            },
          }}
        />

        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
