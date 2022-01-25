import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
   getPhantomWallet,
   getSolflareWallet,
   getSolletExtensionWallet,
   getSolletWallet,
} from '@solana/wallet-adapter-wallets';
import {
   WalletModalProvider,
   WalletDisconnectButton,
   WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Box, Container, Grid } from "@material-ui/core";
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import anchor, { Provider } from "@project-serum/anchor";

import { network, endpoint, preflightCommitment } from "./utils/config";
import Main from "./components/Main";

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {

   // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
   // Only the wallets you configure here will be compiled into your application
   const wallets = useMemo(() => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
   ], [network]);

   // Wrap <Main /> within <WalletProvider /> so that we can access useWallet hook within Main
   return (
      <ConnectionProvider endpoint={endpoint}>
         <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
               <Grid container spacing={3}>
                  <Grid item xs={4} md={4} lg={5}>
                     <WalletMultiButton />
                  </Grid>
                  <Grid item xs={4} md={4} lg={5}>
                     <WalletDisconnectButton />
                  </Grid>
               </Grid>
               <Main network={network} />
            </WalletModalProvider>
         </WalletProvider>
      </ConnectionProvider>
   );
};

export default App;
