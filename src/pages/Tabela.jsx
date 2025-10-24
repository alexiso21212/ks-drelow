import { useState, useEffect } from "react";
import "./Tabela.css";

function Tabela() {
  const [table, setTable] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/table.php")
      .then((res) => res.json())
      .then((data) => setTable(data))
      .catch((err) => console.error("Błąd przy pobieraniu tabeli:", err));
  }, []);

  return (
    <div className="tabela-container">
      <div className="tabela-inner">
        <h2>📊 Tabela ligowa</h2>
        <table className="league-table">
          <thead>
            <tr>
              <th>lp</th>
              <th>Herb</th>
              <th>Drużyna</th>
              <th>M</th>
              <th>W</th>
              <th>R</th>
              <th>P</th>
              <th>Bramki</th>
              <th>Pkt</th>
            </tr>
          </thead>
          <tbody>
            {table.map((team) => (
              <tr key={team.id}>
                <td>{team.position}</td>
                <td>
                  <img
                    src={team.logo}
                    alt={team.team_name}
                    className="team-logo"
                  />
                </td>
                <td className="team-name">{team.team_name}</td>
                <td>{team.matches_played}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td>{team.goals_for}:{team.goals_against}</td>
                <td className="points">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tabela;
