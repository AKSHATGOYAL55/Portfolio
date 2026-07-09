import { motion } from "framer-motion";
import ParticleBackground from "../components/PipelineBackground";
import { profile } from "../data/resume";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden"
    >
      <ParticleBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 tag mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          Open to full-time & internship roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-semibold text-5xl md:text-7xl leading-[1.05] tracking-tight text-paper"
        >
          I build systems that
          <br />
          <span className="text-gradient">hold up under load.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-fog text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Hi, I'm{" "}
          <span className="font-display font-semibold text-paper border-b-2 border-signal/60">
            {profile.name}
          </span>{" "}
          — a{" "}
          <span className="font-semibold text-signal">
            {profile.role}
          </span>{" "}
          shipping full-stack products with{" "}
          <span className="text-paper">secure auth</span>,{" "}
          <span className="text-paper">optimized databases</span>, and{" "}
          <span className="text-paper">
            interfaces people enjoy using
          </span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* View My Work Button */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative px-6 py-3 rounded-lg bg-signal text-ink font-medium overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(245,166,35,0.4)]"
          >
            View my work
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-lg border border-white/15 text-paper font-medium hover:border-signal hover:text-signal transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fog"
      >
        <span className="font-mono text-xs tracking-widest">
          SCROLL
        </span>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-signal to-transparent"
        />
      </motion.div>
    </section>
  );
}