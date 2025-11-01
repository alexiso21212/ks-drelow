import React from "react";
import { Link } from "react-router-dom"; // 🔹 Używamy Link z React Routera
import "./Footer.css";
import { FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import logo from "../assets/images/logo1.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* 🔹 Kolumna 1 – Logo i opis */}
        <div className="footer-column">
          <img src={logo} alt="KS Drelów logo" className="footer-logo" />
          <h2>KS DRELÓW</h2>
          <p className="footer-desc">
            Piłka nożna to nasza pasja! ⚽️ <br />
            KS Drelów to klub, w którym młodzi zawodnicy rozwijają swoje
            umiejętności pod okiem doświadczonych trenerów.
            Dołącz do naszej sportowej rodziny!
          </p>
        </div>

        {/* 🔹 Kolumna 2 – Nawigacja */}
        <div className="footer-column">
          <h3>STRONA GŁÓWNA</h3>
          <ul>
            <li><Link to="/aktualnosci">Aktualności</Link></li>
            <li><Link to="/historia">Klub</Link></li>
            <li><Link to="/kadra">Seniorzy</Link></li>
            <li><Link to="/mlodzik-starszy">Akademia</Link></li>
            <li><Link to="/stadion">Stadion</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
            <li><Link to="/kontakt">Kontakt</Link></li>
          </ul>
        </div>

        {/* 🔹 Kolumna 3 – Kontakt */}
        <div className="footer-column">
          <h3>KONTAKT</h3>
          <p><FaMapMarkerAlt /> Zahajki 40, 21-570 Zahajki</p>
          <p><FaPhone /> Prezes: 508 345 426</p>
          <p><FaPhone /> Koordynator Akademii: 733 221 521</p>
          <p><FaEnvelope /> ks@drelow.pl</p>
          <p>Biuro czynne: pn–pt 08:00–16:00</p>

          {/* 🔹 Facebooki z podpisami */}
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/KlubSportowyDrelow"
              target="_blank"
              rel="noreferrer"
              className="facebook-link"
            >
              <FaFacebook className="fb-icon" />
              <span>KS Drelów</span>
            </a>
            <a
              href="https://www.facebook.com/KlubSportowyDrelowAkademia"
              target="_blank"
              rel="noreferrer"
              className="facebook-link"
            >
              <FaFacebook className="fb-icon" />
              <span>KS Drelów Akademia</span>
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Dolna linia */}
      <div className="footer-bottom">
        <p>© 2025 KS Drelów. Wszystkie prawa zastrzeżone.</p>
        <p>
          Projekt i realizacja:{" "}
          <span className="author">Alex Wróbel 💻</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
