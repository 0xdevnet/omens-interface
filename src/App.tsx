import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, ReactNode, useMemo, useState } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./modules/shared/components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Marketplace from "./modules/home/components/marketplace/marketplace";
import Customization from "./modules/home/components/customization/customization";
import Digsites from "./modules/home/components/digsites/digsites";
import Tickets from "./modules/home/components/tickets/tickets";
import backgroundVideo from "./assets/videos/omensbg_1.mp4";

const App: FC = () => {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [sPathName, setPathName] = useState("/");

  const handleMobileNavbar = (value, pathname) => {
    setIsMobileNavbarOpen(value);
    setPathName(pathname);
  };

  return (
    <Context>
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
              <Route path="/underworld" element={<Tickets />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </Context>
  );
};

export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const { publicKey } = useWallet();

  return (
    <div className={publicKey ? "unlogged" : "logged"}>
      {publicKey ? "" : <h1>Please log in to access the platform</h1>}
      <WalletMultiButton />
      {publicKey ? "" : ""}
    </div>
  );
};
