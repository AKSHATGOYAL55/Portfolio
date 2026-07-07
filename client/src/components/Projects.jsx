import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/resume";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 bg-panel/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="tag">04 · Projects</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-paper mt-4">
            Things I've built end to end.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-white/10 bg-ink/70 p-6 flex flex-col overflow-hidden transition-colors hover:border-signal/40"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: "radial-gradient(120px 80px at 20% 0%, rgba(245,166,35,0.12), transparent 70%)" }} />

              <div className="relative">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-display text-xl text-paper">{project.title}</h3>
                  <div className="flex gap-3 text-fog">
                    <a href={project.github} aria-label={`${project.title} GitHub repo`} className="hover:text-signal transition-colors">
                      <FiGithub size={18} />
                    </a>
                    <a href={project.live} aria-label={`${project.title} live demo`} className="hover:text-signal transition-colors">
                      <FiExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="font-mono text-xs text-signal mb-4">{project.subtitle}</p>
                <p className="text-fog text-sm leading-relaxed mb-6">{project.description}</p>
              </div>

              <div className="relative mt-auto flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
