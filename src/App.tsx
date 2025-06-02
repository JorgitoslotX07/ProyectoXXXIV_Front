import "./App.css";
import "./i18n";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavbarComponent } from "./components/NavbarComponent/NavbarComponent";
import { FooterComponent } from "./components/FooterComponent/FooterComponent";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { CarDetailPage } from "./pages/CarDetailPage/CarDetailPage";
import { RegistroPage } from "./pages/RegisterPage/RegisterPage";
import { LoginComponent } from "./components/LoginComponent/LoginComponent";
import { MapPage } from "./pages/MapPage/MapPage";
import Cookies from "js-cookie";
import { useUserStore } from "./hooks/userStore";
import { EditarPerfilPage } from "./pages/EditarPerfilPage/EditarPerfilPage";
import { UserMenuPage } from "./pages/UserMenuPage/UserMenuPage";
import { NoticiaDetailPage } from "./pages/NoticiasDetailPage/NoticiasDetailPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";
import ScrollToTop from "./components/ScrollToTopComponent/ScrollToTopComponent";
import { VeriUserPage } from "./pages/VeriUserPage/VeriUserPage";
import { ReservasPage } from "./pages/ReservasPage/ReservasPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { PassPage } from "./pages/PassPage/PassPage";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showOptionsPerfil, setShowOptionsPerfil] = useState(false);
  const { modoClaro } = useThemeContext();

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
      <NavbarComponent onLoginClick={() => setShowLogin(true)} modoClaro={modoClaro} />

      {showLogin && <LoginComponent onClose={() => setShowLogin(false)} />}
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onLoginClick={() => setShowLogin(false)}
              onClickOptionsPerfil={onClickOptionsPerfil}
              modoClaro={modoClaro}
            />
          }
        />
        <Route path="/register" element={<RegistroPage />} />
        <Route path="/catalog" element={<CatalogPage modoClaro={modoClaro} />} />
        <Route path="/catalog/carDetail" element={<CarDetailPage modoClaro={modoClaro} />} />
        <Route path="/map" element={<MapPage modoClaro={modoClaro} />} />
        <Route path="/panel" element={<UserMenuPage modoClaro={modoClaro} />} />
        <Route path="/noticia" element={<NoticiaDetailPage modoClaro={modoClaro} />} />
        <Route path="/panel/editar-perfil" element={<EditarPerfilPage modoClaro={modoClaro} />} />
        <Route path="/panel/veri-user" element={<VeriUserPage modoClaro={modoClaro} />} />
        <Route path="/panel/reservas" element={<ReservasPage modoClaro={modoClaro} />} />
        <Route path="/panel/historial" element={<HistorialPage modoClaro={modoClaro} />} />
        <Route path="/panel/pass" element={<PassPage modoClaro={modoClaro} />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>
      <FooterComponent modoClaro={modoClaro} />
    </>
  );
}

export default App;