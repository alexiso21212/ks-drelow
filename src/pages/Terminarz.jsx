import "./Terminarz.css";
import { useEffect, useState } from "react";

function Terminarz() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:8888/ks-drelow-api/matches.php");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Błąd podczas pobierania terminarza:", err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="terminarz-container">
      <h1>Terminarz ⚽</h1>
      {matches.length === 0 ? (
        <p>Brak zaplanowanych meczów.</p>
      ) : (
        <table className="terminarz-table">
          <thead>
            <tr>
              <th>Kolejka</th>
              <th>Data</th>
              <th>Godzina</th>
              <th>Gospodarz</th>
              <th>Gość</th>
              <th>Miejsce</th>
              <th>Wynik</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id}>
                <td>{m.round}</td>
                <td>{m.date}</td>
                <td>{m.time}</td>
                <td>{m.home_team}</td>
                <td>{m.away_team}</td>
                <td>{m.location}</td>
                <td>{m.score || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Terminarz;
