import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Trwa rejestracja...");

    try {
      const res = await fetch("http://localhost:8888/ks-drelow-api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage("✅ Konto utworzone pomyślnie!");
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        setMessage(data.message || "Błąd rejestracji");
      }
    } catch (error) {
      console.error(error);
      setMessage("Nie udało się połączyć z serwerem.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Zarejestruj się</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
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
          <button type="submit">Zarejestruj</button>
        </form>
        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
