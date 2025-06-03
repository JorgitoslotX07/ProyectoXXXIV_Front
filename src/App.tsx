import "./App.css";
import "./i18n";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavbarComponent } from "./components/__Navbar/NavbarComponent/NavbarComponent";
import { FooterComponent } from "./components/__Footer/FooterComponent/FooterComponent";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { CarDetailPage } from "./pages/CarDetailPage/CarDetailPage";
import { RegistroPage } from "./pages/RegisterPage/RegisterPage";
import { LoginComponent } from "./components/__Navbar/LoginComponent/LoginComponent";
import { MapPage } from "./pages/MapPage/MapPage";
import Cookies from "js-cookie";
import { useUserStore } from "./hooks/userStore";
import { NoticiaDetailPage } from "./pages/NoticiasDetailPage/NoticiasDetailPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";
import ScrollToTop from "./components/ScrollToTopComponent/ScrollToTopComponent";
import { HistorialPage } from "./pages/__ConfigUsersPages/HistorialPage/HistorialPage";
import { UserMenuPage } from "./pages/__ConfigUsersPages/UserMenuPage/UserMenuPage";
import { EditarPerfilPage } from "./pages/__ConfigUsersPages/EditarPerfilPage/EditarPerfilPage";
import { VeriUserPage } from "./pages/__ConfigUsersPages/VeriUserPage/VeriUserPage";
import { ReservasPage } from "./pages/__ConfigUsersPages/ReservasPage/ReservasPage";
import { PassPage } from "./pages/__ConfigUsersPages/PassPage/PassPage";
import { PanelAdminPage } from "./pages/__AdminPages/PanelAdminPage/PanelAdminPage";
import { UsuariosAdminPage } from "./pages/__AdminPages/UsuariosAdminPage/UsuariosAdminPage";
import { ValidacionCarnetAdminPage } from "./pages/__AdminPages/ValidacionCarnetAdminPage/ValidacionCarnetAdminPage";
import { VehiculosAdminPage } from "./pages/__AdminPages/VehiculosAdminPage/VehiculosAdminPage";
import { SeguimientoVehiculosAdminPage } from "./pages/__AdminPages/SeguimientoVehiculosAdminPage/SeguimientoVehiculosAdminPage";
import { ParkingsAdminPage } from "./pages/__AdminPages/ParkingsAdminPage/ParkingsAdminPage";
import { NoticiasAdminPage } from "./pages/__AdminPages/NoticiasAdminPage/NoticiasAdminPage";
import { PanelInicialAdminPage } from "./pages/__AdminPages/PanelInicialAdminPage/PanelInicialAdminPage";
import { CrearParkingPage } from "./pages/__AdminPages/CrearParkingPage/CrearParkingPage";
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
        <Route path="/catalog">
          <Route index element={<CatalogPage modoClaro={modoClaro} />} />
          <Route path="carDetail" element={<CarDetailPage />} />
        </Route>
        <Route path="/map" element={<MapPage modoClaro={modoClaro} />} />
        <Route path="/noticia" element={<NoticiaDetailPage />} />

        <Route path="/panel">
          <Route index element={<UserMenuPage />} />
          <Route path="editar-perfil" element={<EditarPerfilPage />} />
          <Route path="veri-user" element={<VeriUserPage />} />
          <Route path="reservas" element={<ReservasPage />} />
          <Route path="historial" element={<HistorialPage />} />
          <Route path="pass" element={<PassPage />} />
          <Route path="*" element={<Navigate to="/panel" replace />} />
        </Route>

        <Route path="/admin" element={<PanelAdminPage modoClaro={modoClaro} />}>

          <Route index element={<PanelInicialAdminPage modoClaro={modoClaro} />} />
          <Route path="usuarios" element={<UsuariosAdminPage />} />
          <Route path="usuarios/validacion-carnet" element={<ValidacionCarnetAdminPage />} />
          <Route path="vehiculos" element={<VehiculosAdminPage />} />
          <Route path="vehiculos/seguimiento" element={<SeguimientoVehiculosAdminPage />} />
          <Route path="parkings" element={<ParkingsAdminPage />} />
          <Route path="parkings/crear" element={<CrearParkingPage />} />
          <Route path="noticias" element={<NoticiasAdminPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>

      <FooterComponent modoClaro={modoClaro} />
    </>
  );
}

export default App;
