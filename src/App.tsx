import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavbarComponent } from "./components/NavbarComponent/NavbarComponent";
import { FooterComponent } from "./components/FooterComponent/FooterComponent";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { UserDashboard } from "./components/UserMenuComponent/UserPanelComponent";
import { CarDetailPage } from "./pages/CarDetailPage/CarDetailPage";
import { RegistroPage } from "./pages/RegisterPage/RegisterPage";
import { LoginComponent } from "./components/LoginComponent/LoginComponent";
import { MapPage } from "./pages/MapPage/MapPage";
import Cookies from "js-cookie";
import { useUserStore } from "./utils/userStore";
import { EditarPerfilPage } from "./pages/EditarPerfilPage/EditarPerfilPage";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showOptionsPerfil, setShowOptionsPerfil] = useState(false);

  const onClickOptionsPerfil = (): void => {
    if (showOptionsPerfil) {
      setShowOptionsPerfil(false);
    }
  };

  useEffect(() => {
    const token: string | undefined = Cookies.get("sessionToken");

    if (token) {
      useUserStore.getState().setToken(token);
    }
  }, []);

  return (
    <>
      {/* Paso la función a la Navbar */}
      <NavbarComponent onLoginClick={() => setShowLogin(true)} />

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
        <Route path="/panel" element={<UserDashboard />} />
        <Route path="/editar-perfil" element={<EditarPerfilPage />} />
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
