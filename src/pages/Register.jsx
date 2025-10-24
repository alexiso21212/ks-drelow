import { useState } from "react";
import "./Login.css"; // możesz użyć tych samych stylów

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8888/ks-drelow-api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage("✅ Konto zostało utworzone! Możesz się zalogować.");
        setMessageType("success");
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        setMessage(data.message || "❌ Błąd podczas rejestracji.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Błąd:", err);
      setMessage("Nie udało się połączyć z serwerem.");
      setMessageType("error");
    }
  };

  return (
    <div className="login-container">
      <h1>📝 Rejestracja</h1>
      <form onSubmit={handleRegister} className="login-form">
        <input
          type="text"
          placeholder="Imię / Nazwa użytkownika"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p
            className={`login-message ${
              messageType === "success"
                ? "success"
                : messageType === "error"
                ? "error"
                : "info"
            }`}
          >
            {message}
          </p>
        )}

        <button type="submit">Zarejestruj</button>

        <p className="register-link">
          Masz już konto? <a href="/login">Zaloguj się</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
