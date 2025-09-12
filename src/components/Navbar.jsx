import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">KS Drelów Akademia</div>
      <ul className="nav-links">
        <li><Link to="/">Strona główna</Link></li>
        <li><Link to="/zawodnicy">Zawodnicy</Link></li>
        <li><Link to="/trenerzy">Trenerzy</Link></li>
        <li><Link to="/terminarz">Terminarz</Link></li>
        <li><Link to="/kontakt">Kontakt</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
