import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import ResumeModal from "./ResumeModal";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "";
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = link.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("home")}
          className="font-display font-semibold text-lg tracking-tight text-paper"
        >
          Akshat<span className="text-signal">.</span>dev
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`relative font-mono text-sm tracking-wide transition-colors ${
                  active === link.id ? "text-signal" : "text-fog hover:text-paper"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-signal rounded-full"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center gap-2 tag !text-paper hover:!border-signal hover:!text-signal transition-colors cursor-pointer"
          >
            <FiFileText size={13} /> Resume
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 tag !text-paper hover:!border-signal hover:!text-signal transition-colors cursor-pointer"
          >
            Let's talk →
          </button>
        </div>

        <button
          className="md:hidden text-paper text-2xl leading-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-ink/95 backdrop-blur-md border-t border-white/5"
        >
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`font-mono text-sm ${
                    active === link.id ? "text-signal" : "text-fog"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setResumeOpen(true);
                }}
                className="font-mono text-sm text-fog"
              >
                Resume
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
    <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}