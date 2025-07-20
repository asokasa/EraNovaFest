import { Link } from "react-router-dom";
import "./My_Navbar.css";

export default function My_Navbar() {
  return (
    <div className="header">
        <div className="logo_cont">
            <img className="sarga" src="/home_shapes/Logo_sarga.png" alt="" />
            <Link to="/"><img src="/home_shapes/EraNova_Logo.png" alt="Logo" className="logo" /></Link>
        </div>


        <div className="header_nav">
          <img src="/home_shapes/Navbar_sarga.png" alt="" />
          <nav>
            <Link to="/">Főoldal</Link>  <Link to="/programok">Programok</Link>  <Link to="/about">A fesztiválról</Link>  <Link to="/tamogatas">Támogatás</Link>
          </nav>
        </div>
        
    </div>
    
  );
}