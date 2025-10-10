import { useState, useEffect } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", number: "", age: "", image: "", role: "player" });
  const [message, setMessage] = useState("");

  // pobierz zawodników
  const fetchPlayers = async () => {
    const res = await fetch("http://localhost:8888/ks-drelow-api/players.php");
    const data = await res.json();
    setPlayers(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // dodaj zawodnika
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8888/ks-drelow-api/players.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
    fetchPlayers();
    setForm({ name: "", position: "", number: "", age: "", image: "" });
  };

  // usuń zawodnika
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8888/ks-drelow-api/players.php?id=${id}`, {
      method: "DELETE",
    });
    fetchPlayers();
  };

  return (
    <div className="admin-panel">
      <h1>Panel zarządzania ⚙️</h1>
      <form onSubmit={handleSubmit} className="player-form">
        <input
            type="text"
            placeholder="Imię i nazwisko"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
        />

        {/* Jeśli to zawodnik */}
        {form.role === "player" && (
            <>
            <input
                type="text"
                placeholder="Pozycja"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Numer"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
            </>
        )}

        {/* Jeśli to sztab szkoleniowy */}
        {form.role === "staff" && (
            <input
            type="text"
            placeholder="Rola (np. Trener bramkarzy)"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            required
            />
        )}

        <input
            type="number"
            placeholder="Wiek"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <input
            type="text"
            placeholder="Link do zdjęcia"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
            <option value="player">Zawodnik</option>
            <option value="staff">Sztab szkoleniowy</option>
        </select>

        <button type="submit">Dodaj</button>
        </form>



      {message && <p className="message">{message}</p>}

      <h2>Lista zawodników</h2>
            <div className="players-list">
        {players.map((p) => (
            <div key={p.id} className="player-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.position}</p>
            {p.role === "player" && <p>Nr: {p.number} | Wiek: {p.age}</p>}
            {p.role === "staff" && <p>Wiek: {p.age}</p>}
            <button onClick={() => handleDelete(p.id)}>Usuń</button>
            </div>
        ))}
        </div>

    </div>
  );
}

export default AdminPanel;
