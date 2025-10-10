import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Coaches from "./pages/Coaches";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import Kadra from "./pages/Kadra";



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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panel" element={<AdminPanel />} />
          <Route path="/kadra" element={<Kadra />} />


        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
