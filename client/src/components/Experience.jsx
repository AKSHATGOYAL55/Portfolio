import { motion } from "framer-motion";
import { experience } from "../data/resume";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="tag">03 · Experience</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-paper mt-4">
            Where I've shipped code.
          </h2>
        </motion.div>

        <div className="relative border-l border-white/10 ml-3">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-10 pb-14 last:pb-0"
            >
              <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-signal ring-4 ring-ink" />

              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-display text-xl text-paper">{job.role}</h3>
                <span className="font-mono text-xs text-signal">{job.period}</span>
              </div>
              <p className="text-fog text-sm mb-4">
                {job.company} · {job.location}
              </p>
              <ul className="space-y-2">
                {job.points.map((point, idx) => (
                  <li key={idx} className="text-fog text-sm leading-relaxed flex gap-2">
                    <span className="text-signal mt-1.5 flex-shrink-0">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
