import { useEffect, useState } from "react";
import "./Kadra.css";

function Kadra() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/players.php")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Błąd ładowania zawodników:", err));
  }, []);

  return (
    <div className="kadra-page">
  <h1>Kadra Klubu ⚽</h1>

  {players.length === 0 ? (
    <p>Ładowanie danych...</p>
  ) : (
    <>
      {/* --- SZTAB SZKOLENIOWY --- */}
      <section className="staff-section">
        <h2>Sztab szkoleniowy</h2>
        <div className="players-grid">
          {players
            .filter((p) => p.role === "staff")
            .map((p) => (
              <div key={p.id} className="player-card staff-card">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.position}</p>
                <p>Wiek: {p.age}</p>
              </div>
            ))}
        </div>
      </section>

      {/* --- LINIA ODDZIELAJĄCA --- */}
      <hr className="section-divider" />

      {/* --- ZAWODNICY --- */}
      <section className="players-section">
        <h2>Zawodnicy</h2>
        <div className="players-grid">
          {players
            .filter((p) => p.role === "player")
            .map((p) => (
              <div key={p.id} className="player-card">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.position}</p>
                <p>Nr: {p.number}</p>
                <p>Wiek: {p.age}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  )}
</div>

  );
}

export default Kadra;
