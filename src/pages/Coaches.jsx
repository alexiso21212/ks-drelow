import "./Coaches.css";

function Coaches() {
  const coaches = [
    { id: 1, name: "Trener Jan", role: "Trener główny" },
    { id: 2, name: "Trener Paweł", role: "Asystent" }
  ];

  return (
    <div className="coaches">
      <h2>Nasi trenerzy</h2>
      <div className="coaches-list">
        {coaches.map(coach => (
          <div key={coach.id} className="coach-card">
            <h3>{coach.name}</h3>
            <p>{coach.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coaches;
