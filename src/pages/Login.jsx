import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Trwa logowanie...");

    try {
      const res = await fetch("http://localhost:8888/ks-drelow-api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage(`Witaj ${data.user.username}! 👋`);
        localStorage.setItem("user", JSON.stringify(data.user));

        // przekierowanie po zalogowaniu
        setTimeout(() => (window.location.href = "/"), 1500);
      } else {
        setMessage(data.message || "Błąd logowania");
      }
    } catch (error) {
      console.error(error);
      setMessage("Nie udało się połączyć z serwerem.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Zaloguj się</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Zaloguj</button>
        </form>
        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
