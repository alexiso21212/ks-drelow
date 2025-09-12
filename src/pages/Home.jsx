import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>KS Drelów Akademia</h1>
        <p>Rozwijamy pasję do piłki nożnej u dzieci i młodzieży</p>
      </section>

      <section className="about">
        <h2>O nas</h2>
        <p>
          Nasza akademia to miejsce, gdzie młodzi zawodnicy uczą się piłki nożnej,
          współpracy w drużynie oraz sportowych wartości. 
        </p>
      </section>

      <section className="news">
        <h2>Aktualności</h2>
        <ul>
          <li>✅ Wygraliśmy turniej Lobos Cup!</li>
          <li>✅ Trwają zapisy do nowych grup szkoleniowych</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
