import { motion } from "framer-motion";
import { skills } from "../data/resume";

export default function Skills() {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="relative py-28 px-6 bg-panel/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="tag">02 · Toolkit</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-paper mt-4">
            What I reach for.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, borderColor: "#f5a62366" }}
              className="rounded-2xl border border-white/10 bg-ink/60 p-6 transition-colors"
            >
              <h3 className="font-display text-lg text-paper mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="tag hover:!text-signal hover:!border-signal/50 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
