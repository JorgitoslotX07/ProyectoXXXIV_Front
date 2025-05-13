import './App.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroPage from "./pages/RegisterPage/RegisterPage";
import { HomePage } from './pages/HomePage/HomePage';
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent';
import {FooterComponent} from './components/FooterComponent/FooterComponent';
import LoginComponent from './components/LoginComponent/LoginComponent'; // este será el pop-up modal

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
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
