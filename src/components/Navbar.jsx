import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo1.png";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleMouseEnter = (menu) => setOpenMenu(menu);
  const handleMouseLeave = () => setOpenMenu(null);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="KS Drelów logo" className="logo" />
        <span>KS Drelów</span>
      </Link>

      {/* Linki */}
      <ul className="navbar-center">
      <li><Link to="/aktualnosci">Aktualności</Link></li>


        <li
          className={`dropdown ${openMenu === "klub" ? "open" : ""}`}
          onMouseEnter={() => handleMouseEnter("klub")}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="#">Klub</Link>
          <span className="arrow">⌄</span>
          <ul className={`dropdown-menu ${openMenu === "klub" ? "show" : ""}`}>
            <li><Link to="/historia">Historia</Link></li>
            <li><Link to="/zarzad">Zarząd</Link></li>
          </ul>
        </li>

        <li
          className={`dropdown ${openMenu === "seniorzy" ? "open" : ""}`}
          onMouseEnter={() => handleMouseEnter("seniorzy")}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="#">Seniorzy</Link>
          <span className="arrow">⌄</span>
          <ul className={`dropdown-menu ${openMenu === "seniorzy" ? "show" : ""}`}>
            <li><Link to="/terminarz">Terminarz</Link></li>
            <li><Link to="/tabela">Tabela</Link></li>
            <li><Link to="/kadra">Kadra</Link></li>
          </ul>
        </li>

        <li
          className={`dropdown ${openMenu === "akademia" ? "open" : ""}`}
          onMouseEnter={() => handleMouseEnter("akademia")}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="#">Akademia</Link>
          <span className="arrow">⌄</span>
          <ul className={`dropdown-menu ${openMenu === "akademia" ? "show" : ""}`}>
            <li><Link to="/mlodzik-starszy">Młodzik Starszy</Link></li>
            <li><Link to="/orlik-mlodszy">Orlik Młodszy</Link></li>
            <li><Link to="/akademia-przedszkolaka">Akademia Przedszkolaka</Link></li>
          </ul>
        </li>

        <li><Link to="/stadion">Stadion</Link></li>
        <li><Link to="/galeria">Galeria</Link></li>
        <li><Link to="/kontakt">Kontakt</Link></li>

        
        {/* Jeśli admin → pokaż Panel */}
{user && user.role === "admin" && (
  <li><Link to="/panel">Panel zarządzania</Link></li>
)}


        {/* Ikona użytkownika / wylogowanie */}
        <li className="login-icon">
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>Wyloguj</button>
          ) : (
            <Link to="/login" title="Zaloguj się">
              <FaUserCircle size={28} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
