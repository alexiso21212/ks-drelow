import { useEffect, useState } from "react";
import "./Academy.css";

function OrlikMlody() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/academy.php")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.team === "Orlik Młodszy");
        setPlayers(filtered);
      })
      .catch((err) => console.error("Błąd ładowania zawodników:", err));
  }, []);

  return (
    <div className="academy-page">
      {/* 🏆 Nagłówek + zdjęcie drużyny */}
      <div className="team-header">
        <h1 className="team-title">
          ORLIK MŁODSZY ⚽
        </h1>

        <img
          src="/images/orlik.jpg" // 🔗 zdjęcie drużyny
          alt="Orlik Młodszy ⚽"
          className="team-photo"
        />
      </div>

      {/* 👨‍🏫 Trener */}
      <section className="coach-section">
        <img
          src="/images/rogul.jpg" // 🔗 zdjęcie trenera
          alt="Trener Orlika Młodszego"
          className="coach-photo"
        />
        <div className="coach-info">
          <h2>
            Trener: <span>Mateusz Rogulski</span>
          </h2>
          <p>
            <strong>Licencja:</strong> UEFA C
          </p>
          <p>
            <strong>Telefon:</strong> 789 456 123
          </p>
        </div>
      </section>

      {/* 🧒 Kadra */}
      <section className="players-section">
        <h2>🧒 Kadra Orlika Młodszego</h2>
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

export default OrlikMlody;
