import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { DEFAULT_TIMEOUT } from "./connection";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./modules/shared/components/navbar/navbar";
import Marketplace from "./modules/home/components/marketplace/marketplace";
import Customization from "./modules/home/components/customization/customization";
import Digsites from "./modules/home/components/digsites/digsites";
import Tickets from "./modules/home/components/tickets/tickets";

import backgroundVideo from "./assets/videos/omensbg_1.mp4";

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!
    );

    return candyMachineId;
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
);

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    []
  );
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [sPathName, setPathName] = useState("/");

  const handleMobileNavbar = (value: boolean, pathname: string) => {
    setIsMobileNavbarOpen(value);
    setPathName(pathname);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <BrowserRouter>
            <Navbar handleMobileNavbar={handleMobileNavbar} />
            <video autoPlay loop muted id="video" className={"video"}>
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            {!isMobileNavbarOpen && (
              <>
                <Routes>
                  <Route path="/" element={<Digsites />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/customization" element={<Customization />} />
                  <Route
                    path="/underworld"
                    element={
                      <Tickets
                        candyMachineId={candyMachineId}
                        connection={connection}
                        txTimeout={DEFAULT_TIMEOUT}
                        rpcHost={rpcHost}
                        network={network}
                      />
                    }
                  />
                </Routes>
              </>
            )}
          </BrowserRouter>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
