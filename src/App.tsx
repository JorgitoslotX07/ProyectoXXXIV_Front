
import './App.css'
import { Route, Routes } from 'react-router-dom'
import {HomePage} from './pages/HomePage/HomePage';
import { NavbarComponent } from './components/NavbarComponent/NavbarComponent';

function App() {


  return (
    <>
      <NavbarComponent />
      <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/register" element={< />} /> */}
          
      </Routes>
    </>
  )
}

export default App
