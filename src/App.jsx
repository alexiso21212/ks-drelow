import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Coaches from "./pages/Coaches";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zawodnicy" element={<Players />} />
          <Route path="/trenerzy" element={<Coaches />} />
          <Route path="/terminarz" element={<Schedule />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
