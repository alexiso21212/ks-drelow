import { useState, useEffect } from "react";
import "./Aktualnosci.css";

function Aktualnosci() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/ks-drelow-api/news.php")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div className="aktualnosci-container">
      <h1>Aktualności KS Drelów 📰</h1>
      <div className="news-grid">
        {news.map((item) => (
          <article key={item.id} className="news-card">
            <img src={item.image} alt={item.title} />
            <div className="news-content">
              <h2>{item.title}</h2>
              <p className="news-date">
                {new Date(item.date).toLocaleDateString("pl-PL")}
              </p>
              <p>{item.content}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Aktualnosci;
