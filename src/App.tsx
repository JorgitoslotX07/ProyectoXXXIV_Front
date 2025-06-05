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
import { FinishTripPage } from "./pages/FinishTripPage/FinishTripPage";

// Footer pages
import SobreNosotrosPage from "./pages/FooterPages/SobreNosotrosPage";
import DevolucionesPage from "./pages/FooterPages/DevolucionesPage";
import PagosPage from "./pages/FooterPages/PagosPage";
import CondicionesPage from "./pages/FooterPages/CondicionesPage";
import PrivacidadPage from "./pages/FooterPages/PrivacidadPage";
import MarcasPage from "./pages/FooterPages/MarcasPage";
import AfiliadosPage from "./pages/FooterPages/AfiliadosPage";
import InversoresPage from "./pages/FooterPages/InversoresPage";
import BlogPage from "./pages/FooterPages/BlogPage";
import FaqPage from "./pages/FooterPages/FaqPage";
import SoportePage from "./pages/FooterPages/SoportePage";
import ForoPage from "./pages/FooterPages/ForoPage";
import UserMenuPage from "./pages/__ConfigUsersPages/UserMenuPage/UserMenuPage";
import { PrivateRoute } from "./components/___Route/PrivateRoute/PrivateRoute";
import { AdminRoute } from "./components/___Route/AdminRoute/AdminRoute";
import { ViajesPage } from "./pages/__ConfigUsersPages/ViajesPage/ViajesPage";

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
      <NavbarComponent
        onLoginClick={() => setShowLogin(true)}
        modoClaro={modoClaro}
      />
      {showLogin && (
        <LoginComponent
          onClose={() => setShowLogin(false)}
          modoClaro={modoClaro}
        />
      )}
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

        <Route
          path="/register"
          element={<RegistroPage modoClaro={modoClaro} />}
        />
        <Route path="/catalog">
          <Route index element={<CatalogPage modoClaro={modoClaro} />} />
          <Route
            path="carDetail"
            element={<CarDetailPage modoClaro={modoClaro} />}
          />
        </Route>

        <Route path="/map" element={<MapPage modoClaro={modoClaro} />} />
        <Route path="/noticia" element={<NoticiaDetailPage />} />

        <Route path="/panel">
          <Route
            index
            element={
              <PrivateRoute>
                <UserMenuPage modoClaro={modoClaro} />
              </PrivateRoute>
            }
          />

          <Route
            path="editar-perfil"
            element={
              <PrivateRoute>
                <EditarPerfilPage modoClaro={modoClaro} />
              </PrivateRoute>
            }
          />
          <Route
            path="veri-user"
            element={
              <PrivateRoute>
                <VeriUserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="reservas"
            element={
              <PrivateRoute>
                <ReservasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="viajes"
            element={
              <PrivateRoute>
                <ViajesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="viajes/detalle"
            element={
              <PrivateRoute>
                <FinishTripPage />
              </PrivateRoute>
            }
          />

          <Route
            path="pass"
            element={
              // <PrivateRoute>
              <PassPage />
              // </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/panel" replace />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <PanelAdminPage modoClaro={modoClaro} />
            </AdminRoute>
          }
        >
          <Route
            index
            element={<PanelInicialAdminPage modoClaro={modoClaro} />}
          />
          <Route
            path="usuarios"
            element={<UsuariosAdminPage modoClaro={modoClaro} />}
          />
          <Route
            path="usuarios/validacion-carnet"
            element={<ValidacionCarnetAdminPage modoClaro={modoClaro} />}
          />
          <Route
            path="vehiculos"
            element={<VehiculosAdminPage modoClaro={modoClaro} />}
          />
          <Route
            path="vehiculos/seguimiento"
            element={<SeguimientoVehiculosAdminPage modoClaro={modoClaro} />}
          />
          <Route path="parkings" element={<ParkingsAdminPage />} />
          <Route
            path="parkings/crear"
            element={<CrearParkingPage modoClaro={modoClaro} />}
          />
          <Route path="noticias" element={<NoticiasAdminPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Páginas públicas */}
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
        <Route path="/devoluciones" element={<DevolucionesPage />} />
        <Route path="/pagos" element={<PagosPage />} />
        <Route path="/condiciones" element={<CondicionesPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/marcas" element={<MarcasPage />} />
        <Route path="/afiliados" element={<AfiliadosPage />} />
        <Route path="/inversores" element={<InversoresPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/soporte" element={<SoportePage />} />
        <Route path="/foro" element={<ForoPage />} />
      </Routes>

      {/* <FooterComponent modoClaro={modoClaro} /> */}
      <FooterComponent />
    </>
  );
}

export default App;
