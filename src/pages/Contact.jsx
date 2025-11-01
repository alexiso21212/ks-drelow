import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:8888/ks-drelow-api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.status === "success") {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-page">
      <h1>📩 Skontaktuj się z nami</h1>
      <p>Masz pytanie? Napisz do nas, a odpowiemy najszybciej jak to możliwe!</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Twoje imię"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Twój adres e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Treść wiadomości..."
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
        </button>
      </form>

      {status === "success" && (
        <p className="success-message">✅ Wiadomość wysłana pomyślnie!</p>
      )}
      {status === "error" && (
        <p className="error-message">❌ Wystąpił błąd. Spróbuj ponownie.</p>
      )}
    </div>
  );
}

export default Contact;
