import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import './Navbar.css';  

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <span className="logo-text">SAFESIGHT AI</span>
      </div>
      <ul className="navbar-list">
        <li><Link to="/Frontend" className="navbar-link">Home</Link></li>
        <li><Link to="/live-monitoring" className="navbar-link">Live Monitoring</Link></li>
        <li><Link to="/alert-history" className="navbar-link">Alert History</Link></li>
        <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
