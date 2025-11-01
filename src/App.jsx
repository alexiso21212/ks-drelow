import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Coaches from "./pages/Coaches";
import Schedule from "./pages/Terminarz";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import Kadra from "./pages/Kadra";
import Zarzad from "./pages/Zarzad";
import Historia from "./pages/Historia";
import Galeria from "./pages/Galeria";
import Aktualnosci from "./pages/Aktualnosci";
import Terminarz from "./pages/Terminarz";
import Tabela from "./pages/Tabela";
import MlodzikStarszy from "./pages/MlodzikStarszy";
import OrlikMlody from "./pages/OrlikMlody";
import AkademiaPrzedszkolaka from "./pages/AkademiaPrzedszkolaka";
import Stadion from "./pages/Stadion";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      {/* 🔹 Automatyczne przewijanie na górę przy zmianie strony */}
      <ScrollToTop />

      {/* 🔹 Pasek nawigacji */}
      <Navbar />

      {/* 🔹 Główna zawartość strony */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zawodnicy" element={<Players />} />
          <Route path="/trenerzy" element={<Coaches />} />
          <Route path="/terminarz" element={<Schedule />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panel" element={<AdminPanel />} />
          <Route path="/kadra" element={<Kadra />} />
          <Route path="/zarzad" element={<Zarzad />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/aktualnosci" element={<Aktualnosci />} />
          <Route path="/tabela" element={<Tabela />} />
          <Route path="/mlodzik-starszy" element={<MlodzikStarszy />} />
          <Route path="/orlik-mlodszy" element={<OrlikMlody />} />
          <Route path="/akademia-przedszkolaka" element={<AkademiaPrzedszkolaka />} />
          <Route path="/stadion" element={<Stadion />} />
        </Routes>
      </main>

      {/* 🔹 Stopka */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
