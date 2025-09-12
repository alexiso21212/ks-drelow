import "./Contact.css";

function Contact() {
  return (
    <div className="contact">
      <h2>Kontakt</h2>
      <p>Email: kontakt@ksdrelow.pl</p>
      <p>Telefon: +48 123 456 789</p>

      <form>
        <input type="text" placeholder="Twoje imię" required />
        <input type="email" placeholder="Twój email" required />
        <textarea placeholder="Twoja wiadomość" required></textarea>
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
}

export default Contact;
