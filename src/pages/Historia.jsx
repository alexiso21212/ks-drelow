import "./Historia.css";

function Historia() {
  const milestones = [
    { year: "2022", text: "Założenie klubu sportowego KS Drelów przez lokalnych pasjonatów piłki nożnej." },
    { year: "2023", text: "Powstanie Akademii Piłkarskiej KS Drelów dla dzieci i młodzieży." },
    { year: "2023-2024", text: "Rozwój struktur organizacyjnych i wzrost liczby młodych zawodników." },
    { year: "2023-2025", text: "Udział w rozgrywkach ligowych i turniejach młodzieżowych w regionie." },
  ];

  return (
    <div className="historia-container">
      <h1>Historia Klubu 🏆</h1>

      <p>
        Klub Sportowy <strong>KS Drelów</strong> powstał z pasji i zamiłowania do piłki nożnej. 
        Jego początki sięgają <strong>2022 roku</strong>, kiedy grupa lokalnych entuzjastów sportu 
        postanowiła stworzyć drużynę reprezentującą Drelów w rozgrywkach regionalnych.
      </p>

      <p>
        Na przestrzeni lat klub przeszedł wiele zmian – zarówno organizacyjnych, jak i sportowych. 
        W początkowych latach działalności zespół rywalizował w niższych ligach, zdobywając cenne doświadczenie 
        i zyskując coraz większe uznanie wśród lokalnych kibiców.
      </p>

      <p>
        Przełomowym momentem w historii KS Drelów było powołanie 
        <strong> Akademii Piłkarskiej</strong>, która umożliwiła szkolenie dzieci i młodzieży 
        z gminy oraz okolic. Dzięki temu klub stał się nie tylko miejscem rywalizacji sportowej, 
        ale również rozwoju młodych talentów ⚽.
      </p>

      <p>
        Dziś KS Drelów to wspólnota zawodników, trenerów, rodziców i sympatyków, 
        których łączy jedna pasja – <strong>piłka nożna</strong>. Klub nieustannie się rozwija, 
        stawia na wychowanie przez sport i promowanie aktywnego trybu życia wśród najmłodszych.
      </p>

      <p className="historia-quote">
        „Nasza historia to ludzie, którzy każdego dnia tworzą ten klub. 
        To ich zaangażowanie i pasja napędzają nas do dalszego działania.” 💚
      </p>

      <h2 className="timeline-title">Najważniejsze momenty w historii klubu</h2>
      <div className="timeline">
        {milestones.map((m, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">{m.year}</span>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Historia;
