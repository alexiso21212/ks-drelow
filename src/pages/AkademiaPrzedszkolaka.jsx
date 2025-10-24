import { useEffect, useState } from "react";
import "./Academy.css";

function AkademiaPrzedszkolaka() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/academy.php")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.team === "Akademia Przedszkolaka");
        setPlayers(filtered);
      })
      .catch((err) => console.error("Błąd ładowania zawodników:", err));
  }, []);

  return (
    <div className="academy-page">
      {/* 🏆 Nagłówek + zdjęcie drużyny */}
      <div className="team-header">
        <h1 className="team-title">
          <img
            
          />
          AKADEMIA PRZEDSZKOLAKA ⚽
        </h1>

        <img
          src="/images/przedszkole.jpg" // 🔗 zdjęcie drużyny
          alt="Akademia Przedszkolaka"
          className="team-photo"
        />
      </div>

      {/* 👨‍🏫 Trener */}
      <section className="coach-section">
        <img
          src="/images/kundelek.jpg" // 🔗 zdjęcie trenera
          alt="Trener Akademii Przedszkolaka"
          className="coach-photo"
        />
        <div className="coach-info">
          <h2>
            Trener: <span>Bartłomiej Przybyłowski</span>
          </h2>
          <p>
            <strong>Licencja:</strong> UEFA B
          </p>
          <p>
            <strong>Telefon:</strong> 600 987 654
          </p>
        </div>
      </section>

      {/* 🧒 Kadra */}
      <section className="players-section">
        <h2>🧒 Kadra Akademii Przedszkolaka</h2>
        {players.length === 0 ? (
          <p>Brak zawodników w tej kategorii.</p>
        ) : (
          <table className="academy-table">
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AkademiaPrzedszkolaka;
