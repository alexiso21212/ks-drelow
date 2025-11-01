import { useState, useEffect } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  // ============================
  // 🔹 Zawodnicy i sztab
  // ============================
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    number: "",
    age: "",
    image: "",
    role: "player",
  });
  const [editPlayer, setEditPlayer] = useState(null);

  // ============================
  // 🔹 Aktualności
  // ============================
  const [newsList, setNewsList] = useState([]);
  const [newsForm, setNewsForm] = useState({ title: "", content: "", image: "" });
  const [editNews, setEditNews] = useState(null);

  // ============================
  // 🔹 Terminarz
  // ============================
  const [matches, setMatches] = useState([]);
  const [matchForm, setMatchForm] = useState({
    round: "",
    date: "",
    time: "",
    home_team: "",
    away_team: "",
    location: "",
    score: "",
  });
  const [editMatch, setEditMatch] = useState(null);

  // ============================
  // 🔹 Tabela ligowa
  // ============================
  const [table, setTable] = useState([]);
  const [tableForm, setTableForm] = useState({
    position: "",
    logo: "",
    team_name: "",
    matches_played: "",
    wins: "",
    draws: "",
    losses: "",
    goals_for: "",
    goals_against: "",
    points: "",
  });
  const [editTable, setEditTable] = useState(null);
  const tableApi = "http://localhost:8888/ks-drelow-api/table.php";

  // ⚽ Aktualizacja wyników meczu
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [score, setScore] = useState("");

  // 🧒 Akademia
const [academyForm, setAcademyForm] = useState({
  name: "",
  team: "",
  position: "",
  age: "",
  number: "",
  image: "",
});

const [academyList, setAcademyList] = useState([]);
const [editAcademy, setEditAcademy] = useState(null);

const fetchAcademyPlayers = async () => {
  const res = await fetch("http://localhost:8888/ks-drelow-api/players.php");
  const data = await res.json();
  setAcademyList(data.filter((p) => p.team)); // tylko ci, którzy mają drużynę
};


  // ============================
  // 📦 POBIERANIE DANYCH
  // ============================
  const fetchPlayers = async () => {
    const res = await fetch("http://localhost:8888/ks-drelow-api/players.php");
    const data = await res.json();
    setPlayers(data);
  };

  const fetchNews = async () => {
    const res = await fetch("http://localhost:8888/ks-drelow-api/news.php");
    const data = await res.json();
    setNewsList(data);
  };

  const fetchMatches = async () => {
    const res = await fetch("http://localhost:8888/ks-drelow-api/matches.php");
    const data = await res.json();
    setMatches(data);
  };

  const fetchTable = async () => {
    const res = await fetch(tableApi);
    const data = await res.json();
    setTable(data);
  };

  useEffect(() => {
    fetchPlayers();
    fetchNews();
    fetchMatches();
    fetchTable();
    fetchAcademy();
  }, []);

  // ============================
  // ⚙️ ZAWODNICY
  // ============================
  const handleSubmitPlayer = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8888/ks-drelow-api/players.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", position: "", number: "", age: "", image: "", role: "player", team: form.team });
    fetchPlayers();
  };

  const handleDeletePlayer = async (id) => {
    if (!window.confirm("Na pewno chcesz usunąć zawodnika?")) return;
  
    try {
      const res = await fetch(`http://localhost:8888/ks-drelow-api/players.php?id=${id}`, {
        method: "DELETE",
        credentials: "include", // 🔹 WYSYŁA SESJĘ DO PHP
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      console.log("🗑️ Odpowiedź z API:", data);
  
      if (res.ok && data.status === "success") {
        alert("✅ Zawodnik został usunięty!");
        fetchPlayers(); // odśwież listę
      } else {
        alert("❌ Błąd: " + (data.message || "Nie udało się usunąć zawodnika"));
      }
    } catch (err) {
      console.error("Błąd połączenia:", err);
      alert("❌ Brak połączenia z serwerem PHP (sprawdź MAMP i port 8888)");
    }
  };
  

  const handleUpdatePlayer = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8888/ks-drelow-api/players.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editPlayer, action: "update" }),
    });
    setEditPlayer(null);
    fetchPlayers();
  };

  // ============================
  // ⚙️ AKTUALNOŚCI
  // ============================
  const handleAddNews = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8888/ks-drelow-api/news.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newsForm),
    });
    setNewsForm({ title: "", content: "", image: "" });
    fetchNews();
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm("Usunąć aktualność?")) return;
    await fetch(`http://localhost:8888/ks-drelow-api/news.php?id=${id}`, { method: "DELETE" });
    fetchNews();
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8888/ks-drelow-api/news.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editNews, action: "update" }),
    });
    setEditNews(null);
    fetchNews();
  };

  // ============================
  // ⚙️ TERMINARZ
  // ============================
  const handleAddMatch = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8888/ks-drelow-api/matches.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(matchForm),
    });
    setMatchForm({ round: "", date: "", time: "", home_team: "", away_team: "", location: "", score: "" });
    fetchMatches();
  };

  const handleDeleteMatch = async (id) => {
    if (!window.confirm("Usunąć mecz?")) return;
    await fetch(`http://localhost:8888/ks-drelow-api/matches.php?id=${id}`, { method: "DELETE" });
    fetchMatches();
  };

  const handleUpdateMatch = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8888/ks-drelow-api/matches.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editMatch, action: "update" }),
    });
    setEditMatch(null);
    fetchMatches();
  };

  // ============================
  // ⚙️ TABELA LIGOWA
  // ============================
  const handleTableChange = (e) => setTableForm({ ...tableForm, [e.target.name]: e.target.value });

  const handleSubmitTable = async (e) => {
    e.preventDefault();
    const method = editTable ? "PUT" : "POST";
    const url = editTable ? `${tableApi}?id=${editTable.id}` : tableApi;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tableForm),
    });
    setTableForm({
      position: "",
      logo: "",
      team_name: "",
      matches_played: "",
      wins: "",
      draws: "",
      losses: "",
      goals_for: "",
      goals_against: "",
      points: "",
    });
    setEditTable(null);
    fetchTable();
  };

  const handleEditTable = (team) => {
    setEditTable(team);
    setTableForm(team);
  };

  const handleDeleteTable = async (id) => {
    if (!window.confirm("Usunąć drużynę z tabeli?")) return;
    await fetch(`${tableApi}?id=${id}`, { method: "DELETE" });
    fetchTable();
  };
  // ============================
// ⚙️ AKADEMIA
// ============================
const academyApi = "http://localhost:8888/ks-drelow-api/academy.php";

const fetchAcademy = async () => {
  const res = await fetch(academyApi);
  const data = await res.json();
  setAcademyList(data);
};

const handleAddAcademyPlayer = async (e) => {
  e.preventDefault();
  await fetch(academyApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(academyForm),
  });
  setAcademyForm({ name: "", team: "", position: "", age: "", number: "", image: "" });
  fetchAcademy();
};

const handleDeleteAcademyPlayer = async (id) => {
  if (!window.confirm("Usunąć zawodnika akademii?")) return;
  await fetch(`${academyApi}?id=${id}`, { method: "DELETE" });
  fetchAcademy();
};

const handleUpdateAcademyPlayer = async (e) => {
  e.preventDefault();
  await fetch(academyApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...editAcademy, action: "update" }),
  });
  setEditAcademy(null);
  fetchAcademy();
};

// STADION
const [opis, setOpis] = useState("");
const [zdjecia, setZdjecia] = useState([]);
const [videoUrl, setVideoUrl] = useState("");
const [noweZdjecie, setNoweZdjecie] = useState({
  url: "",
  opis: ""
});

// 🔹 POBIERANIE danych stadionu
useEffect(() => {
  fetch("http://localhost:8888/ks-drelow-api/stadion.php")
    .then((res) => res.json())
    .then((dane) => {
      setOpis(dane.opis || "");
      setZdjecia(dane.zdjecia || []);
      setVideoUrl(dane.video_url || "");
    })
    .catch((err) => console.error("Błąd wczytywania danych stadionu:", err));
}, []);

// 💾 ZAPISANIE opisu i filmu stadionu
const zapiszOpis = () => {
  fetch("http://localhost:8888/ks-drelow-api/stadion.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "updateOpis",
      opis: opis,
      video_url: videoUrl
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        alert("✅ Opis stadionu został zaktualizowany!");
      } else {
        alert("❌ Wystąpił błąd podczas zapisu opisu stadionu.");
      }
    })
    .catch(() => alert("⚠️ Błąd połączenia z serwerem."));
};

// ➕ DODANIE nowego zdjęcia stadionu
const dodajZdjecie = () => {
  if (!noweZdjecie.url) {
    alert("Podaj link do zdjęcia!");
    return;
  }

  fetch("http://localhost:8888/ks-drelow-api/stadion.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_url: noweZdjecie.url,
      opis_zdjecia: noweZdjecie.opis
    }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("✅ Zdjęcie dodane");
      setNoweZdjecie({ url: "", opis: "" });
      return fetch("http://localhost:8888/ks-drelow-api/stadion.php");
    })
    .then((res) => res.json())
    .then((dane) => setZdjecia(dane.zdjecia))
    .catch((err) => console.error("Błąd dodawania zdjęcia:", err));
};

// 🏗️ Edycja i usuwanie zdjęć stadionu
const [edytowaneZdjecie, setEdytowaneZdjecie] = useState(null);

// 🗑️ USUWANIE zdjęcia stadionu
const usunZdjecie = (id) => {
  if (window.confirm("Na pewno usunąć to zdjęcie?")) {
    fetch(`http://localhost:8888/ks-drelow-api/stadion.php?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setZdjecia(zdjecia.filter((z) => z.id !== id));
      });
  }
};

// ✏️ ZAPIS EDYCJI zdjęcia stadionu
const zapiszEdycjeZdjecia = async () => {
  if (!edytowaneZdjecie || !edytowaneZdjecie.image_url) {
    alert("Podaj poprawny adres URL zdjęcia!");
    return;
  }

  await fetch("http://localhost:8888/ks-drelow-api/stadion.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: edytowaneZdjecie.id,
      image_url: edytowaneZdjecie.image_url,
      opis_zdjecia: edytowaneZdjecie.opis,
      action: "updateZdjecie",
    }),
  });

  // 🔄 Odświeżenie listy zdjęć po zapisaniu
  fetch("http://localhost:8888/ks-drelow-api/stadion.php")
    .then((res) => res.json())
    .then((dane) => {
      setZdjecia(dane.zdjecia);
      setEdytowaneZdjecie(null);
    });
};

  
  // ============================
// 📸 GALERIA
// ============================

// 👉 STANY GALERII (upewnij się, że masz je na górze razem z innymi useState)
const [zdjeciaGalerii, setZdjeciaGalerii] = useState([]);
const [noweZdjecieGalerii, setNoweZdjecieGalerii] = useState({ url: "", opis: "" });

// 👉 POBRANIE ZDJĘĆ GALERII PO URUCHOMIENIU
useEffect(() => {
  fetch("http://localhost:8888/ks-drelow-api/galeria.php")
    .then((res) => res.json())
    .then((dane) => setZdjeciaGalerii(dane))
    .catch((err) => console.error("Błąd galerii:", err));
}, []);

// 👉 DODAWANIE NOWEGO ZDJĘCIA
const dodajZdjecieGalerii = () => {
  if (!noweZdjecieGalerii.url) {
    alert("Podaj link do zdjęcia!");
    return;
  }

  fetch("http://localhost:8888/ks-drelow-api/galeria.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_url: noweZdjecieGalerii.url,
      opis_zdjecia: noweZdjecieGalerii.opis,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("✅ Zdjęcie dodane do galerii");
      setNoweZdjecieGalerii({ url: "", opis: "" });
      return fetch("http://localhost:8888/ks-drelow-api/galeria.php");
    })
    .then((res) => res.json())
    .then((dane) => setZdjeciaGalerii(dane));
};

// 👉 USUWANIE ZDJĘCIA
const usunZdjecieGalerii = (id) => {
  if (window.confirm("Na pewno usunąć to zdjęcie z galerii?")) {
    fetch(`http://localhost:8888/ks-drelow-api/galeria.php?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setZdjeciaGalerii(zdjeciaGalerii.filter((z) => z.id !== id)));
  }
};

// ✏️ Edycja zdjęcia w galerii
const [edytowaneZdjecieGalerii, setEdytowaneZdjecieGalerii] = useState(null);
const zapiszEdycjeGalerii = async () => {
  if (!edytowaneZdjecieGalerii || !edytowaneZdjecieGalerii.image_url) {
    alert("Podaj poprawny adres URL zdjęcia!");
    return;
  }

  await fetch("http://localhost:8888/ks-drelow-api/galeria.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: edytowaneZdjecieGalerii.id,
      image_url: edytowaneZdjecieGalerii.image_url,
      opis_zdjecia: edytowaneZdjecieGalerii.opis_zdjecia,
      action: "updateGaleria",
    }),
  });

  // 🔄 Odśwież listę zdjęć po zapisaniu
  fetch("http://localhost:8888/ks-drelow-api/galeria.php")
    .then((res) => res.json())
    .then((dane) => {
      setZdjeciaGalerii(dane);
      setEdytowaneZdjecieGalerii(null);
    });
};




  // ============================
  // 🧱 STRUKTURA STRONY
  // ============================
  return (
    <div className="admin-panel">
      <h1>Panel zarządzania ⚙️</h1>

      

      {/* ZAWODNICY */}
      <section>
        <h2>👥 Zawodnicy i sztab</h2>
        <form onSubmit={handleSubmitPlayer} className="player-form">
          <input placeholder="Imię i nazwisko" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Pozycja / Rola" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
          {form.role === "player" && (
            <input placeholder="Numer" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
          )}
          <input placeholder="Wiek" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
          <input placeholder="Link do zdjęcia" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="player">Zawodnik</option>
            <option value="staff">Sztab</option>
          </select>
          <button type="submit">Dodaj</button>
        </form>

        <div className="players-list">
          {players.map((p) => (
            <div key={p.id} className="player-card">
              {editPlayer && editPlayer.id === p.id ? (
                <form onSubmit={handleUpdatePlayer} className="edit-player-form">
                  <input value={editPlayer.name} onChange={(e) => setEditPlayer({ ...editPlayer, name: e.target.value })} />
                  <input value={editPlayer.position} onChange={(e) => setEditPlayer({ ...editPlayer, position: e.target.value })} />
                  {editPlayer.role === "player" && (
                    <input value={editPlayer.number} onChange={(e) => setEditPlayer({ ...editPlayer, number: e.target.value })} />
                  )}
                  <input value={editPlayer.age} onChange={(e) => setEditPlayer({ ...editPlayer, age: e.target.value })} />
                  <input value={editPlayer.image} onChange={(e) => setEditPlayer({ ...editPlayer, image: e.target.value })} />
                  <select value={editPlayer.role} onChange={(e) => setEditPlayer({ ...editPlayer, role: e.target.value })}>
                    <option value="player">Zawodnik</option>
                    <option value="staff">Sztab</option>
                  </select>
                  <button type="submit" className="save-btn">💾</button>
                  <button type="button" className="cancel-btn" onClick={() => setEditPlayer(null)}>❌</button>
                </form>
              ) : (
                <>
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>{p.position}</p>
                  {p.role === "player" ? <p>Nr: {p.number} | Wiek: {p.age}</p> : <p>Wiek: {p.age}</p>}
                  <button onClick={() => setEditPlayer(p)}>✏️</button>
                  <button onClick={() => handleDeletePlayer(p.id)}>🗑️</button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* AKTUALNOŚCI */}
<section>
  <h2>📰 Aktualności</h2>
  <form onSubmit={handleAddNews} className="news-form">
    <input
      placeholder="Tytuł"
      value={newsForm.title}
      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
      required
    />
    <textarea
      placeholder="Treść"
      value={newsForm.content}
      onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
      required
    />
    <input
      placeholder="URL zdjęcia"
      value={newsForm.image}
      onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
    />
    <button type="submit">➕ Dodaj</button>
  </form>

  <div className="news-list">
    {newsList.map((n) => (
      <div key={n.id} className="news-item">
        {editNews && editNews.id === n.id ? (
          <form onSubmit={handleUpdateNews} className="edit-news-form">
            <input
              type="text"
              placeholder="Tytuł"
              value={editNews.title}
              onChange={(e) => setEditNews({ ...editNews, title: e.target.value })}
            />
            <textarea
              placeholder="Treść"
              value={editNews.content}
              onChange={(e) => setEditNews({ ...editNews, content: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL zdjęcia"
              value={editNews.image}
              onChange={(e) => setEditNews({ ...editNews, image: e.target.value })}
            />
            <button type="submit" className="save-btn">💾 Zapisz</button>
            <button type="button" className="cancel-btn" onClick={() => setEditNews(null)}>❌ Anuluj</button>
          </form>
        ) : (
          <>
            {n.image && <img src={n.image} alt={n.title} className="news-image" />}
            <h3>{n.title}</h3>
            <p>{n.content.substring(0, 100)}...</p>
            <div className="news-actions">
              <button onClick={() => setEditNews(n)}>✏️</button>
              <button onClick={() => handleDeleteNews(n.id)}>🗑️</button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</section>


      {/* TERMINARZ */}
<section>
  <h2>📅 Terminarz</h2>

  {/* ➕ Dodawanie nowego meczu */}
  <form onSubmit={handleAddMatch}>
    <input
      placeholder="Kolejka"
      value={matchForm.round}
      onChange={(e) => setMatchForm({ ...matchForm, round: e.target.value })}
    />
    <input
      placeholder="Data"
      value={matchForm.date}
      onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })}
    />
    <input
      placeholder="Godzina"
      value={matchForm.time}
      onChange={(e) => setMatchForm({ ...matchForm, time: e.target.value })}
    />
    <input
      placeholder="Gospodarz"
      value={matchForm.home_team}
      onChange={(e) => setMatchForm({ ...matchForm, home_team: e.target.value })}
    />
    <input
      placeholder="Gość"
      value={matchForm.away_team}
      onChange={(e) => setMatchForm({ ...matchForm, away_team: e.target.value })}
    />
    <input
      placeholder="Miejsce"
      value={matchForm.location}
      onChange={(e) => setMatchForm({ ...matchForm, location: e.target.value })}
    />
    <input
      placeholder="Wynik"
      value={matchForm.score}
      onChange={(e) => setMatchForm({ ...matchForm, score: e.target.value })}
    />
    <button type="submit">➕ Dodaj</button>
  </form>

  {/* 📋 Lista meczów */}
  <div className="matches-list">
    {matches.map((m) => (
      <div key={m.id} className="match-item">
        {editMatch && editMatch.id === m.id ? (
          <form onSubmit={handleUpdateMatch} className="edit-match-form">
            <input
              type="text"
              placeholder="Kolejka"
              value={editMatch.round}
              onChange={(e) => setEditMatch({ ...editMatch, round: e.target.value })}
            />
            <input
              type="text"
              placeholder="Data"
              value={editMatch.date}
              onChange={(e) => setEditMatch({ ...editMatch, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Godzina"
              value={editMatch.time}
              onChange={(e) => setEditMatch({ ...editMatch, time: e.target.value })}
            />
            <input
              type="text"
              placeholder="Gospodarz"
              value={editMatch.home_team}
              onChange={(e) => setEditMatch({ ...editMatch, home_team: e.target.value })}
            />
            <input
              type="text"
              placeholder="Gość"
              value={editMatch.away_team}
              onChange={(e) => setEditMatch({ ...editMatch, away_team: e.target.value })}
            />
            <input
              type="text"
              placeholder="Miejsce"
              value={editMatch.location}
              onChange={(e) => setEditMatch({ ...editMatch, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Wynik"
              value={editMatch.score}
              onChange={(e) => setEditMatch({ ...editMatch, score: e.target.value })}
            />
            <div className="edit-actions">
              <button type="submit" className="save-btn">💾 Zapisz</button>
              <button type="button" className="cancel-btn" onClick={() => setEditMatch(null)}>
                ❌ Anuluj
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="match-round"><strong>Kolejka {m.round}</strong></p>
            <p><strong>{m.date}</strong> {m.home_team} vs {m.away_team}</p>
            <p>Miejsce: {m.location}</p>
            <p>Wynik: {m.score || "-"}</p>
            <div className="match-actions">
              <button onClick={() => setEditMatch(m)}>✏️</button>
              <button onClick={() => handleDeleteMatch(m.id)}>🗑️</button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</section>

      {/* TABELA LIGOWA */}
      <section>
        <h2>📊 Tabela ligowa</h2>
        <form onSubmit={handleSubmitTable} className="admin-form">
          <input name="position" placeholder="Miejsce" value={tableForm.position} onChange={handleTableChange} />
          <input name="logo" placeholder="URL logo" value={tableForm.logo} onChange={handleTableChange} />
          <input name="team_name" placeholder="Drużyna" value={tableForm.team_name} onChange={handleTableChange} />
          <input name="matches_played" placeholder="Mecze" value={tableForm.matches_played} onChange={handleTableChange} />
          <input name="wins" placeholder="W" value={tableForm.wins} onChange={handleTableChange} />
          <input name="draws" placeholder="R" value={tableForm.draws} onChange={handleTableChange} />
          <input name="losses" placeholder="P" value={tableForm.losses} onChange={handleTableChange} />
          <input name="goals_for" placeholder="G+" value={tableForm.goals_for} onChange={handleTableChange} />
          <input name="goals_against" placeholder="G-" value={tableForm.goals_against} onChange={handleTableChange} />
          <input name="points" placeholder="Pkt" value={tableForm.points} onChange={handleTableChange} />
          <button type="submit">{editTable ? "💾 Zapisz" : "➕ Dodaj"}</button>
        </form>

        <div className="table-list">
          {table.map((team) => (
            <div key={team.id} className="team-card">
              <img src={team.logo} alt={team.team_name} width="40" />
              <p><strong>{team.position}. {team.team_name}</strong> — {team.points} pkt</p>
              <p>M: {team.matches_played} | W: {team.wins} | R: {team.draws} | P: {team.losses} | {team.goals_for}:{team.goals_against}</p>
              <button onClick={() => handleEditTable(team)}>✏️</button>
              <button onClick={() => handleDeleteTable(team.id)}>🗑️</button>
            </div>
          ))}
        </div>
      </section>

      {/* ⚽ AKTUALIZUJ WYNIK MECZU */}
      <section>
        <h2>⚽ Aktualizuj wynik meczu</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch("http://localhost:8888/ks-drelow-api/table.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "updateScore",
                home_team: home,
                away_team: away,
                score: score,
              }),
            })
              .then((res) => res.json())
              .then((data) => alert(data.message));
          }}
        >
          <input type="text" placeholder="Gospodarz" value={home} onChange={(e) => setHome(e.target.value)} />
          <input type="text" placeholder="Gość" value={away} onChange={(e) => setAway(e.target.value)} />
          <input type="text" placeholder="Wynik (np. 2:1)" value={score} onChange={(e) => setScore(e.target.value)} />
          <button type="submit">Zapisz wynik</button>
        </form>
      </section>
      {/* 🧒 AKADEMIA */}
<section>
  <h2>🎓 Akademia – zawodnicy</h2>

  <form onSubmit={handleAddAcademyPlayer} className="academy-form">
  <input
    type="text"
    placeholder="Imię i nazwisko"
    value={academyForm.name}
    onChange={(e) => setAcademyForm({ ...academyForm, name: e.target.value })}
    required
  />
  <select
    value={academyForm.team}
    onChange={(e) => setAcademyForm({ ...academyForm, team: e.target.value })}
    required
  >
    <option value="">Wybierz drużynę</option>
    <option value="Młodzik Starszy">Młodzik Starszy</option>
    <option value="Orlik Młodszy">Orlik Młodszy</option>
    <option value="Akademia Przedszkolaka">Akademia Przedszkolaka</option>
  </select>
  <button type="submit">➕ Dodaj zawodnika</button>
</form>


<div className="academy-grid">
  {["Młodzik Starszy", "Orlik Młodszy", "Akademia Przedszkolaka"].map((category) => (
    <div key={category} className="academy-card">
      <h3>
        {category}{" "}
        <span className="count">
          ({academyList.filter((p) => p.team === category).length})
        </span>
      </h3>

      {academyList.filter((p) => p.team === category).length === 0 ? (
        <p className="empty">Brak zawodników</p>
      ) : (
        <table className="academy-table">
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {academyList
              .filter((p) => p.team === category)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((p) => (
                <tr key={p.id}>
                  <td>
                    {editAcademy && editAcademy.id === p.id ? (
                      <form onSubmit={handleUpdateAcademyPlayer} className="edit-academy-form">
                        <input
                          type="text"
                          value={editAcademy.name}
                          onChange={(e) =>
                            setEditAcademy({ ...editAcademy, name: e.target.value })
                          }
                          required
                        />
                      </form>
                    ) : (
                      <span>{p.name}</span>
                    )}
                  </td>
                  <td className="actions">
                    {editAcademy && editAcademy.id === p.id ? (
                      <>
                        <button
                          type="submit"
                          onClick={handleUpdateAcademyPlayer}
                          title="Zapisz"
                        >
                          💾
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditAcademy(null)}
                          title="Anuluj"
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditAcademy(p)} title="Edytuj">
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteAcademyPlayer(p.id)}
                          title="Usuń"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  ))}
</div>
</section>
{/* ===================== STADION ===================== */}
<section>
  <h2>🏟️ Zarządzanie stadionem</h2>

  <div className="stadion-admin">
    <label>Opis stadionu:</label>
    <textarea
      value={opis}
      onChange={(e) => setOpis(e.target.value)}
      rows="5"
      placeholder="Wpisz opis boiska, infrastruktury, zaplecza..."
    ></textarea>

    <label>🎥 Link do filmu (YouTube, Vimeo itp.):</label>
    <input
      type="text"
      value={videoUrl}
      onChange={(e) => setVideoUrl(e.target.value)}
      placeholder="https://www.youtube.com/embed/..."
      className="video-input"
    />

    <button onClick={zapiszOpis}>💾 Zapisz opis i film</button>
  </div>

  <div className="dodaj-zdjecie">
    <h3>Dodaj zdjęcie stadionu</h3>
    <input
      type="text"
      placeholder="Adres URL zdjęcia"
      value={noweZdjecie.url}
      onChange={(e) => setNoweZdjecie({ ...noweZdjecie, url: e.target.value })}
    />
    <input
      type="text"
      placeholder="Krótki opis zdjęcia (opcjonalnie)"
      value={noweZdjecie.opis}
      onChange={(e) => setNoweZdjecie({ ...noweZdjecie, opis: e.target.value })}
    />
    <button onClick={dodajZdjecie}>➕ Dodaj zdjęcie</button>
  </div>

  <div className="lista-zdjec">
    <h3>📸 Aktualne zdjęcia stadionu</h3>
    <div className="zdjecia-grid">
      {zdjecia.map((z) => (
        <div key={z.id} className="zdjecie-kafelek">
          {edytowaneZdjecie && edytowaneZdjecie.id === z.id ? (
            <>
              <input
                type="text"
                value={edytowaneZdjecie.image_url}
                onChange={(e) =>
                  setEdytowaneZdjecie({
                    ...edytowaneZdjecie,
                    image_url: e.target.value,
                  })
                }
                placeholder="Nowy link do zdjęcia"
              />
              <input
                type="text"
                value={edytowaneZdjecie.opis}
                onChange={(e) =>
                  setEdytowaneZdjecie({
                    ...edytowaneZdjecie,
                    opis: e.target.value,
                  })
                }
                placeholder="Nowy opis zdjęcia"
              />
              <button onClick={zapiszEdycjeZdjecia}>💾 Zapisz</button>
              <button onClick={() => setEdytowaneZdjecie(null)}>❌ Anuluj</button>
            </>
          ) : (
            <>
              <img src={z.image_url} alt="stadion" />
              <p>{z.opis}</p>
              <button onClick={() => setEdytowaneZdjecie(z)}>✏️ Edytuj</button>
              <button onClick={() => usunZdjecie(z.id)}>🗑️ Usuń</button>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
{/* ===================== GALERIA ===================== */}
<section>
  <h2>🖼️ Zarządzanie galerią</h2>

  <div className="dodaj-zdjecie">
    <h3>Dodaj zdjęcie do galerii</h3>
    <input
      type="text"
      placeholder="Adres URL zdjęcia"
      value={noweZdjecieGalerii.url}
      onChange={(e) =>
        setNoweZdjecieGalerii({ ...noweZdjecieGalerii, url: e.target.value })
      }
    />
    <input
      type="text"
      placeholder="Opis zdjęcia (opcjonalnie)"
      value={noweZdjecieGalerii.opis}
      onChange={(e) =>
        setNoweZdjecieGalerii({ ...noweZdjecieGalerii, opis: e.target.value })
      }
    />
    <button onClick={dodajZdjecieGalerii}>➕ Dodaj zdjęcie</button>
  </div>

  <div className="lista-zdjec">
    <h3>📷 Aktualne zdjęcia w galerii</h3>
    <div className="zdjecia-grid">
      {zdjeciaGalerii.map((z) => (
        <div key={z.id} className="zdjecie-kafelek">
          {edytowaneZdjecieGalerii && edytowaneZdjecieGalerii.id === z.id ? (
            <>
              <input
                type="text"
                value={edytowaneZdjecieGalerii.image_url}
                onChange={(e) =>
                  setEdytowaneZdjecieGalerii({
                    ...edytowaneZdjecieGalerii,
                    image_url: e.target.value,
                  })
                }
                placeholder="Nowy link do zdjęcia"
              />
              <input
                type="text"
                value={edytowaneZdjecieGalerii.opis_zdjecia}
                onChange={(e) =>
                  setEdytowaneZdjecieGalerii({
                    ...edytowaneZdjecieGalerii,
                    opis_zdjecia: e.target.value,
                  })
                }
                placeholder="Nowy opis zdjęcia"
              />
              <button onClick={zapiszEdycjeGalerii}>💾 Zapisz</button>
              <button onClick={() => setEdytowaneZdjecieGalerii(null)}>
                ❌ Anuluj
              </button>
            </>
          ) : (
            <>
              <img src={z.image_url} alt="galeria" />
              <p>{z.opis_zdjecia}</p>
              <button onClick={() => setEdytowaneZdjecieGalerii(z)}>
                ✏️ Edytuj
              </button>
              <button onClick={() => usunZdjecieGalerii(z.id)}>🗑️ Usuń</button>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
</div> 
);
}
export default AdminPanel;