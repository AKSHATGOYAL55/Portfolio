import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/resume";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | slow | success | error
  const slowTimerRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // If the backend has been idle, the free-tier host can take a while to
    // wake up. Let the user know after 4s so it doesn't look broken.
    slowTimerRef.current = setTimeout(() => setStatus("slow"), 4000);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      clearTimeout(slowTimerRef.current);
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      clearTimeout(slowTimerRef.current);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">05 · Contact</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-paper mt-4 mb-4">
            Let's build something reliable.
          </h2>
          <p className="text-fog max-w-xl mx-auto mb-10">
            Open to full-time roles and internships. The fastest way to reach
            me is the form below — I read every message myself.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="text-left rounded-2xl border border-white/10 bg-panel/60 p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="font-mono text-xs text-fog block mb-2">NAME</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-ink border border-white/10 rounded-lg px-4 py-3 text-paper placeholder:text-fog/50 focus:border-signal outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-fog block mb-2">EMAIL</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-ink border border-white/10 rounded-lg px-4 py-3 text-paper placeholder:text-fog/50 focus:border-signal outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="font-mono text-xs text-fog block mb-2">MESSAGE</label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="What are you working on?"
              className="w-full bg-ink border border-white/10 rounded-lg px-4 py-3 text-paper placeholder:text-fog/50 focus:border-signal outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "slow"}
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-signal text-ink font-medium hover:-translate-y-0.5 transition-transform disabled:opacity-60"
          >
            {status === "sending" || status === "slow" ? "Sending…" : "Send message"}
          </button>

          {status === "slow" && (
            <p className="text-fog text-sm font-mono">
              Still sending — the server was asleep and is waking up, this can take up to 30s.
            </p>
          )}
          {status === "success" && (
            <p className="text-mint text-sm font-mono">✓ Message sent — I'll reply soon.</p>
          )}
          {status === "error" && (
            <p className="text-signal text-sm font-mono">
              Something went wrong. Email me directly at {profile.email}.
            </p>
          )}
        </motion.form>

        <div className="mt-10 flex items-center justify-center gap-6">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-fog hover:text-signal transition-colors">
            <FiMail size={20} />
          </a>
          <a href={profile.github} aria-label="GitHub" className="text-fog hover:text-signal transition-colors">
            <FiGithub size={20} />
          </a>
          <a href={profile.linkedin} aria-label="LinkedIn" className="text-fog hover:text-signal transition-colors">
            <FiLinkedin size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
