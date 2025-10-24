import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // success / error / info

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:8888/ks-drelow-api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      console.log("🧾 Surowa odpowiedź:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setMessage("Błąd serwera – nieprawidłowy format odpowiedzi.");
        setMessageType("error");
        setLoading(false);
        return;
      }

      if (data.status === "success") {
        const user = data.user;
        const userName = user?.name || "Użytkowniku";
        setMessage(`👋 Witaj ${userName}!`);
        setMessageType("success");

        // zapisz użytkownika w localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // przekierowanie zależne od roli
        setTimeout(() => {
          if (user.role === "admin") {
            window.location.href = "/panel";
          } else {
            window.location.href = "/";
          }
        }, 1500);
      } else {
        setMessage(data.message || "Nieprawidłowe dane logowania.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("❌ Błąd połączenia:", err);
      setMessage("Nie udało się połączyć z serwerem.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>🔑 Logowanie</h1>

      <form onSubmit={handleLogin} className="login-form">
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

        {/* 💬 Komunikaty logowania */}
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

        {/* 🔘 Przycisk logowania */}
        <button type="submit" disabled={loading}>
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>

        {/* 🔹 Link do rejestracji */}
        <p className="register-link">
          Nie masz konta? <a href="/register">Zarejestruj się</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
