
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroPage from "./pages/RegisterPage/RegisterPage";

<Route path="/registro" element={<RegistroPage />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistroPage />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;

