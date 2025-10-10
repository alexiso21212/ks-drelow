import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Połączenie z bazą danych MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // Twój użytkownik MySQL
  password: "",      // Hasło (jeśli masz, wpisz)
  database: "ks_drelow",
});

// 🔹 Endpoint: pobranie wszystkich zawodników
app.get("/api/players", (req, res) => {
  db.query("SELECT * FROM zawodnicy", (err, result) => {
    if (err) {
      console.error("Błąd przy pobieraniu danych:", err);
      return res.status(500).json({ error: "Błąd serwera" });
    }
    res.json(result);
  });
});

// 🔹 Uruchomienie serwera
app.listen(8081, () => {
  console.log("✅ Backend działa na porcie 8081");
});
