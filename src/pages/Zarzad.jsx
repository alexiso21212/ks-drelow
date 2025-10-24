import "./Zarzad.css";

function Zarzad() {
  const members = [
    {
      role: "Prezes zarządu",
      name: "Joanna Wójcik",
    },
    {
      role: "Wiceprezes zarządu",
      name: "Łukasz Wójcik",
    },
    {
      role: "Skarbnik",
      name: "Małgorzata Krupska",
    },
    {
      role: "Członek zarządu",
      name: "Marcin Nowosz",
    },
    {
      role: "Członek zarządu",
      name: "Igor Skraburski",
    },
  ];

  return (
    <div className="zarzad-container">
      <h1>Zarząd Klubu ⚽</h1>
      {members.map((m, index) => (
        <div key={index} className="zarzad-member">
          <h3>
            <i>{m.role}:</i>
          </h3>
          <ul>
            <li>{m.name}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Zarzad;
