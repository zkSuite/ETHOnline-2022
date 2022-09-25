import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  connectorsForWallets,
  wallet,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { sequenceWallet } from 'sequence-rainbowkit-wallet';
import { ToastContainer } from 'react-toastify';

const { chains, provider, webSocketProvider } = configureChains(
  [
    // chain.mainnet,
    chain.polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli]
      : []),
  ],
  [
    alchemyProvider({
      alchemyId: process.env.NEXT_PUBLIC_ALCEHMY_ID,
    }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      sequenceWallet({ chains }),
      wallet.metaMask({ chains }),
      wallet.rainbow({ chains }),
      wallet.walletConnect({ chains }),
      wallet.coinbase({ chains, appName: 'zkForms' }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
