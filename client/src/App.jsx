import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  // Free-tier backends (Render) sleep after inactivity and take ~30-50s to
  // wake on the first request. Pinging /health as soon as the page loads
  // wakes it up early, so by the time the visitor reaches the contact form
  // it's usually already awake.
  useEffect(() => {
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  return (
    <div className="bg-ink min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;