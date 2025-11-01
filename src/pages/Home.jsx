import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

// 📸 Importy obrazków
import stadion from "../assets/images/stadion.jpg";
import aboutImage from "../assets/images/logo1.png";
import klub1 from "../assets/images/klub1.jpg";

import sponsor1 from "../assets/images/sponsor1.jpg";
import sponsor2 from "../assets/images/sponsor2.jpg";
import sponsor3 from "../assets/images/sponsor3.jpg";
import sponsor4 from "../assets/images/sponsor4.jpg";
import sponsor5 from "../assets/images/sponsor5.jpg";
import sponsor6 from "../assets/images/sponsor6.jpg";
import sponsor7 from "../assets/images/sponsor7.jpg";
import sponsor8 from "../assets/images/sponsor8.jpg";
import sponsor9 from "../assets/images/sponsor9.jpg";
import sponsor10 from "../assets/images/sponsor10.jpg";
import sponsor11 from "../assets/images/sponsor11.jpg";
import sponsor12 from "../assets/images/sponsor12.jpg";
import sponsor13 from "../assets/images/sponsor13.jpg";
import sponsor14 from "../assets/images/sponsor14.jpg";
import sponsor15 from "../assets/images/sponsor15.jpg";

function Home() {
  const [news, setNews] = useState([]);

  // 🔹 Inicjalizacja AOS (animacje)
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // 🔹 Pobierz najnowsze aktualności
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:8888/ks-drelow-api/news.php");
        const data = await res.json();
        setNews(data.slice(0, 3)); // pokaz 3 najnowsze
      } catch (err) {
        console.error("Błąd przy pobieraniu aktualności:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="home">

      {/* ====================== */}
      {/* 🏟️ Baner główny */}
      {/* ====================== */}
      <section className="hero" style={{ backgroundImage: `url(${stadion})` }}>
        <div className="overlay">
          <div className="hero-content">
            <h1 data-aos="fade-up">KS Drelów ⚽</h1>
            <p data-aos="fade-up" data-aos-delay="100">
              Pasja. Praca. Rozwój. Oficjalna strona klubu sportowego.
            </p>
            <a
              href="/historia"
              className="btn"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Poznaj historię klubu
            </a>
          </div>
        </div>
      </section>

      {/* ====================== */}
      {/* 🧭 Sekcja o klubie */}
      {/* ====================== */}
      <section className="about">
        <div className="about-content" data-aos="fade-right">
          <h2>O klubie</h2>
          <p>
            KS Drelów to klub z pasją i tradycją. Naszym celem jest rozwój
            młodych zawodników oraz propagowanie zdrowego stylu życia.
            Stawiamy na współpracę, zaangażowanie i budowanie sportowej
            wspólnoty wśród dzieci i młodzieży.
          </p>
        </div>

        <div
          className="about-image"
          data-aos="fade-left"
          style={{ backgroundImage: `url(${aboutImage})` }}
        ></div>
      </section>

      {/* ====================== */}
      {/* 📰 Sekcja aktualności */}
      {/* ====================== */}
      <section className="news">
        <h2 data-aos="fade-up">Aktualności</h2>

        {news.length === 0 ? (
          <p>Brak aktualności do wyświetlenia.</p>
        ) : (
          <div className="news-grid">
            {news.map((n, index) => (
              <article key={index} className="news-card" data-aos="zoom-in">
                <img src={n.image} alt={n.title} />
                <div className="news-content">
                  <h3>{n.title}</h3>
                  <a href="/aktualnosci" className="btn">
                    Czytaj więcej
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ====================== */}
      {/* 🏆 Sekcja sponsorów */}
      {/* ====================== */}
      <section className="sponsors">
        <h2 data-aos="fade-up">Nasi sponsorzy i partnerzy</h2>

        <div className="sponsor-grid">
          {[
            sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6,
            sponsor7, sponsor8, sponsor9, sponsor10, sponsor11, sponsor12,
            sponsor13, sponsor14, sponsor15, klub1,
          ].map((s, i) => (
            <div
              key={i}
              className="sponsor-cell"
              data-aos="zoom-in"
              data-aos-delay={i * 50}
            >
              <img src={s} alt={`Sponsor ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
}

export default Home;
