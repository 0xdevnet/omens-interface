import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './modules/shared/components/navbar/navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Marketplace from './modules/home/components/marketplace/marketplace';
import Customization from './modules/home/components/customization/customization';
import Digsites from './modules/home/components/digsites/digsites';
import Tickets from './modules/home/components/tickets/tickets';
import backgroundVideo from './assets/videos/omensbg_1.mp4';
function App() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [sPathName, setPathName] = useState('/');

  const handleMobileNavbar = (value, pathname) => {
    setIsMobileNavbarOpen(value);
    setPathName(pathname);
  }
  return (
    <div className={"App"}>
      <BrowserRouter>
        <Navbar handleMobileNavbar={handleMobileNavbar} />
        <video autoPlay loop muted id='video' className={"video"}>
            <source src={backgroundVideo} type='video/mp4'/>
        </video>
        {
          !isMobileNavbarOpen &&
          <>
            <Routes>
              <Route path='/' element={<Marketplace />} />
              <Route path='/marketplace' element={<Marketplace />} />
              <Route path='/customization' element={<Customization    />} />
              <Route path='/tickets' element={<Tickets/>} />
            </Routes>
          </>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
