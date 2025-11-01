import { useState, useEffect } from "react";
import "./Galeria.css";

function Galeria() {
  const [zdjecia, setZdjecia] = useState([]);
  const [powiekszone, setPowiekszone] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/galeria.php")
      .then((res) => res.json())
      .then((data) => setZdjecia(data))
      .catch((err) => console.error("Błąd pobierania galerii:", err));
  }, []);

  return (
    <div className="galeria-page">
      <h1 className="galeria-title">📸 Galeria Klubu KS Drelów</h1>

      <div className="galeria-grid">
        {zdjecia.length > 0 ? (
          zdjecia.map((z) => (
            <div key={z.id} className="photo-card" onClick={() => setPowiekszone(z)}>
              <img src={z.image_url} alt="galeria" />
              <p>{z.opis_zdjecia}</p>
            </div>
          ))
        ) : (
          <p className="brak-zdjec">Brak zdjęć w galerii</p>
        )}
      </div>

      {/* Powiększone zdjęcie (Lightbox) */}
      {powiekszone && (
        <div className="galeria-modal" onClick={() => setPowiekszone(null)}>
          <div className="galeria-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={powiekszone.image_url} alt="powiększone" className="galeria-modal-img" />
            <p className="galeria-modal-opis">{powiekszone.opis_zdjecia}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Galeria;
