import { useState, useEffect } from "react";
import "./Stadion.css";
import { FaFacebookF } from "react-icons/fa";

function Stadion() {
  const [opis, setOpis] = useState("");
  const [zdjecia, setZdjecia] = useState([]);
  const [powiekszone, setPowiekszone] = useState(null);
  const [videoUrl, setVideoUrl] = useState(""); // 🎬 film z bazy lub stały link

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/stadion.php")
      .then((res) => res.json())
      .then((data) => {
        setOpis(data.opis);
        setZdjecia(data.zdjecia);
        // jeśli nie ma filmiku w bazie, ustaw ten domyślny
        setVideoUrl(data.video_url || "https://www.youtube.com/embed/YkggwCmuFec");
      })
      .catch((err) => console.error("Błąd wczytywania stadionu:", err));
  }, []);

  return (
    <div className="stadion-page">
      <h1 className="stadion-title">🏟️ Obiekty Klubu KS Drelów</h1>

      {/* 🔹 Karty obiektów */}
      <div className="stadion-info">
        <h2 className="stadion-subtitle">⚽ Obiekty treningowe i meczowe</h2>

        <div className="stadion-cards">
          <div className="stadion-card">
            <h3>🏟️ Boisko Główne</h3>
            <p>
              Wymiary: <strong>105 × 68 m</strong>
            </p>
            <p>
              Trybuna: <strong>400 miejsc siedzących</strong>
            </p>
            <p>
              Adres: <strong>Szachy 4a</strong>
            </p>

            <a
              href="https://www.facebook.com/BoiskoPesan"
              target="_blank"
              rel="noopener noreferrer"
              className="fb-link"
            >
              <FaFacebookF className="fb-icon" />
              Zobacz na Facebooku
            </a>
          </div>

          <div className="stadion-card">
            <h3>💡 Boisko treningowe</h3>
            <p>
              Wymiary: <strong>68 × 40 m</strong>
            </p>
            <p>Pełne oświetlenie, idealne do treningów wieczornych</p>
          </div>

          <div className="stadion-card">
            <h3>🚿 Zaplecze</h3>
            <p>
              Szatnie gospodarzy i gości, pokój sędziowski, WC, prysznice, biuro
              oraz magazyn ze sprzętem.
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Opis stadionu */}
      <div className="stadion-opis">
        <p>{opis}</p>
      </div>

      {/* 🔹 Sekcja z filmem */}
      {videoUrl && (
        <div className="stadion-video-section">
          <h2>🎬 Zobacz nasz obiekt z lotu ptaka</h2>
          <div className="stadion-video">
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube-nocookie.com/embed/YkggwCmuFec"
              title="Film stadionu KS Drelów"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 🔹 Galeria */}
      <h2>📸 Galeria obiektu</h2>
      <div className="stadion-galeria">
        {zdjecia.length > 0 ? (
          zdjecia.map((z) => (
            <div key={z.id} className="zdjecie-box">
              <img
                src={z.image_url}
                alt={z.opis || "Zdjęcie stadionu"}
                onClick={() => setPowiekszone(z.image_url)}
              />
              {z.opis && <p>{z.opis}</p>}
            </div>
          ))
        ) : (
          <p className="brak-zdjec">Brak zdjęć stadionu</p>
        )}
      </div>

      {/* 🔹 Powiększone zdjęcie (modal) */}
      {powiekszone && (
        <div className="modal" onClick={() => setPowiekszone(null)}>
          <img src={powiekszone} alt="powiększone" className="modal-img" />
        </div>
      )}
    </div>
  );
}

export default Stadion;
