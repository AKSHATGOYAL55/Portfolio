import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiFileText } from "react-icons/fi";
import { profile } from "../data/resume";

const exploreLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-panel/20">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">
          <div>
            <button
              onClick={() => scrollTo("home")}
              className="font-display font-semibold text-lg tracking-tight text-paper"
            >
              Akshat<span className="text-signal">.Goyal</span>
            </button>
            <p className="text-fog text-sm leading-relaxed mt-4 max-w-xs">
              Full stack developer building secure, production-ready web
              applications — REST APIs, optimized databases, and interfaces
              people actually enjoy using.
            </p>
            {/* <div className="inline-flex items-center gap-2 tag mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              Open to full-time & internship roles
            </div> */}
          </div>

          <div>
            <h4 className="font-mono text-xs text-fog tracking-widest mb-4">EXPLORE</h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-fog hover:text-signal transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-fog tracking-widest mb-4">ELSEWHERE</h4>
            <ul className="space-y-2.5">
              <li>
<a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fog hover:text-signal transition-colors"
                >
                  <FiGithub size={14} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fog hover:text-signal transition-colors"
                >
                  <FiLinkedin size={14} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fog hover:text-signal transition-colors"
                >
                  <FiFileText size={14} /> Resume
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-fog tracking-widest mb-4">GET IN TOUCH</h4>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-paper hover:text-signal transition-colors mb-2"
            >
              <FiMail size={14} /> {profile.email}
            </a>
            <p className="text-fog text-sm">{profile.location}</p>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 tag !text-paper hover:!border-signal hover:!text-signal transition-colors mt-4 cursor-pointer"
            >
              Send a message →
            </button>
          </div>
        </div>

        <div className="h-px bg-white/10 my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-fog text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <p className="font-mono text-xs text-fog text-center">
            Built with React · Node.js · MongoDB
          </p>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-fog hover:text-signal transition-colors"
            >
              <FiMail size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-fog hover:text-signal transition-colors"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-fog hover:text-signal transition-colors"
            >
              <FiLinkedin size={16} />
            </a>
            <button
              onClick={() => scrollTo("home")}
              aria-label="Back to top"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-fog hover:border-signal hover:text-signal transition-colors ml-1"
            >
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}