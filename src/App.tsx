
import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroPage from "./pages/RegisterPage/RegisterPage";
import { HomePage } from './pages/HomePage/HomePage';
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent';
import {FooterComponent} from './components/FooterComponent/FooterComponent';

{/* <Route path="/registro" element={<RegistroPage />} /> */}

function App() {
  return (
    <>
      <NavbarComponent /> 

      <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistroPage />} />
            {/* otras rutas */}
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;

