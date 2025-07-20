import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tamogatas from "./pages/Tamogatas";
import Info from "./pages/Info";
import Admin from "./pages/Admin";
import Programok from "./pages/Programok";
import './App.css'
import My_Navbar from "./components/My_Navbar";


function App() {
  return (
    <Router>
      <My_Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/tamogatas" element={<Tamogatas />} />
        <Route path="/programok" element={<Programok />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App
