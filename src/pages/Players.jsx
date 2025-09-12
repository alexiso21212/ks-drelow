import "./Players.css";

function Players() {
  const players = [
    { id: 1, name: "Jan Kowalski", position: "Napastnik" },
    { id: 2, name: "Adam Nowak", position: "Obrońca" },
    { id: 3, name: "Michał Wiśniewski", position: "Bramkarz" }
  ];

  return (
    <div className="players">
      <h2>Nasi zawodnicy</h2>
      <div className="players-list">
        {players.map(player => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <p>{player.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Players;
