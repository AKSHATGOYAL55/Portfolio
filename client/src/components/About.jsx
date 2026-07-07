import { motion } from "framer-motion";
import { profile, education } from "../data/resume";

const stats = [
  { label: "Follow-up effort cut", value: "40%", key: "automation" },
  { label: "Faster page renders", value: "25%", key: "perf" },
  { label: "User engagement lift", value: "15%", key: "impact" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">01 · About</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-paper mt-4 mb-6">
            Full-stack, with a bias for the backend.
          </h2>
          <p className="text-fog leading-relaxed text-base md:text-lg">
            {profile.summary}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <motion.div
                key={s.key}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-white/10 bg-panel/60 p-4 text-center"
              >
                <div className="font-display text-2xl md:text-3xl text-signal font-semibold">
                  {s.value}
                </div>
                <div className="text-xs text-fog mt-1 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-panel/60 p-6"
        >
          <h3 className="font-mono text-sm text-fog tracking-wide mb-4">EDUCATION</h3>
          <div className="space-y-6">
            {education.map((e) => (
              <div key={e.school} className="border-l-2 border-signal/40 pl-4">
                <p className="text-paper font-medium">{e.degree}</p>
                <p className="text-fog text-sm mt-0.5">{e.school}</p>
                <p className="font-mono text-xs text-signal mt-1">{e.period}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="font-mono text-sm text-fog tracking-wide mb-3">LOCATION</h3>
            <p className="text-paper text-sm">{profile.location}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
