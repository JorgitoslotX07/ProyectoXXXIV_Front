import './App.css';

import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import RegistroPage from "./pages/RegisterPage/RegisterPage";
import { HomePage } from './pages/HomePage/HomePage';
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent';
import {FooterComponent} from './components/FooterComponent/FooterComponent';
import LoginComponent from './components/LoginComponent/LoginComponent'; // este será el pop-up modal
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import MapPage from './pages/MapPage/MapPage';
import { UserDashboard } from './components/UserMenuComponent/UserPanelComponent';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Paso la función a la Navbar */}
      <NavbarComponent onLoginClick={() => setShowLogin(true)} />

      {/* Mostrando el modal si está activado */}
      {showLogin && (
        <LoginComponent onClose={() => setShowLogin(false)} />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistroPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/panel" element={<UserDashboard />} />
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
