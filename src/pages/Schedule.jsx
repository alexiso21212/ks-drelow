import "./Schedule.css";

function Schedule() {
  const matches = [
    { id: 1, date: "20.09.2025", opponent: "AP Podlasie", place: "Drelów" },
    { id: 2, date: "27.09.2025", opponent: "Victoria Parczew", place: "Wyjazd" }
  ];

  return (
    <div className="schedule">
      <h2>Terminarz</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Przeciwnik</th>
            <th>Miejsce</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(match => (
            <tr key={match.id}>
              <td>{match.date}</td>
              <td>{match.opponent}</td>
              <td>{match.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
