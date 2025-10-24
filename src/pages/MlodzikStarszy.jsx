import { useEffect, useState } from "react";
import "./Academy.css";

function MlodzikStarszy() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/academy.php")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.team === "Młodzik Starszy");
        setPlayers(filtered);
      })
      .catch((err) => console.error("Błąd ładowania zawodników:", err));
  }, []);

  return (
    <div className="academy-page">
      {/* 🏆 Nagłówek + zdjęcie drużyny */}
      <div className="team-header">
        <h1 className="team-title">
          MŁODZIK STARSZY ⚽
        </h1>

        <img
          src="/images/mlodzik.jpg" // 🔗 Twoje zdjęcie drużyny
          alt="Młodzik Starszy KS Drelów"
          className="team-photo"
        />
      </div>

      {/* 👨‍🏫 Trener */}
      <section className="coach-section">
        <img
          src="/images/zawodnik1.jpg" // 🔗 zdjęcie trenera
          alt="Trener Młodzika Starszego"
          className="coach-photo"
        />
        <div className="coach-info">
          <h2>
            Trener: <span>Alex Wróbel</span>
          </h2>
          <p>
            <strong>Licencja:</strong> UEFA C
          </p>
          <p>
            <strong>Telefon:</strong> 123 456 789
          </p>
        </div>
      </section>

      {/* 🧒 Kadra */}
      <section className="players-section">
        <h2>🧒 Kadra Młodzika Starszego</h2>
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

export default MlodzikStarszy;
