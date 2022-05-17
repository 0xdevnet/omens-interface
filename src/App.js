import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './modules/shared/components/navbar/navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Digsites from './modules/home/components/home/digsites';
import Marketplace from './modules/home/components/marketplace/marketplace';
import Customization from './modules/home/components/customization/customization';
function App() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);

  const handleMobileNavbar = (value) => {
    setIsMobileNavbarOpen(value)
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar handleMobileNavbar={handleMobileNavbar} />
        {
          !isMobileNavbarOpen &&
          <>
            <Routes>
              <Route path='/' element={<Digsites />} />
              <Route path='/marketplace' element={<Marketplace />} />
              <Route path='/customization' element={<Customization    />} />
            </Routes>
          </>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
