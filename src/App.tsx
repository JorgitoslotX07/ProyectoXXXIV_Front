import "./App.css";

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroPage from "./pages/RegisterPage/RegisterPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavbarComponent } from "./components/NavbarComponent/NavbarComponent";
import { FooterComponent } from "./components/FooterComponent/FooterComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent"; // este será el pop-up modal
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import MapPage from "./pages/MapPage/MapPage";
import { CarDetailPage } from "./pages/CarDetailPage/CarDetailPage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showOptionsPerfil, setShowOptionsPerfil] = useState(false);

  const onClickOptionsPerfil = (): void => {
    if (showOptionsPerfil) {
      setShowOptionsPerfil(false);
    }
  };

  return (
    <>
      {/* Paso la función a la Navbar */}
      <NavbarComponent
        onLoginClick={() => setShowLogin(true)}
        setOptionsPerfil={setShowOptionsPerfil}
        optionsPerfil={showOptionsPerfil}
      />

      {/* Mostrando el modal si está activado */}
      {showLogin && <LoginComponent onClose={() => setShowLogin(false)} />}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onLoginClick={() => setShowLogin(false)}
              onClickOptionsPerfil={onClickOptionsPerfil}
            />
          }
        />
        <Route path="/register" element={<RegistroPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/carDetail" element={<CarDetailPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
