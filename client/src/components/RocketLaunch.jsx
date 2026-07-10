import { useEffect, useRef, useState } from "react";

// Triggers a rocket launch (with twinkling stars + a fading smoke trail)
// each time the section scrolls into view.

const STAR_COUNT = 175;
const LAUNCH_DURATION = 4200; // ms for the rocket to cross the screen

export default function RocketLaunch() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);
  const smokeRef = useRef([]);
  const planetsRef = useRef([]);
  const rocketRef = useRef({ active: false, startTime: 0, flameAlpha: 0 });
  const sizeRef = useRef({ width: 0, height: 0 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let wasVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !wasVisible) {
          launchRocket();
        }
        wasVisible = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const launchRocket = () => {
    smokeRef.current = [];
    rocketRef.current = {
      active: true,
      startTime: performance.now(),
      flameAlpha: 1,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: Math.random() * 1.4 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.5 + 0.5,
      }));

      // planets positioned with padding so nothing clips at the container edges
      // (margin accounts for the halo glow, which extends ~2.4x the body radius)
      const pad = (pct, r) => Math.max(r * 2.4, Math.min(rect.width - r * 2.4, rect.width * pct));
      const padY = (pct, r) => Math.max(r * 2.4, Math.min(rect.height - r * 2.4, rect.height * pct));

      planetsRef.current = [
        { name: "sun-glow", x: pad(0.9, 20), y: padY(0.1, 20), radius: 40, type: "glow" },
        { name: "mercury", x: pad(0.08, 5), y: padY(0.12, 5), radius: 5, color: "#9a9a95" },
        { name: "venus", x: pad(0.92, 8), y: padY(0.28, 8), radius: 8, color: "#d9b184" },
        { name: "earth", x: pad(0.15, 13), y: padY(0.4, 13), radius: 13, color: "#3b82c4", moon: true },
        { name: "mars", x: pad(0.85, 8), y: padY(0.52, 8), radius: 8, color: "#c1552c" },
        { name: "jupiter", x: pad(0.12, 22), y: padY(0.64, 22), radius: 22, color: "#c9a37a", bands: true },
        { name: "saturn", x: pad(0.8, 16), y: padY(0.78, 16), radius: 16, color: "#e8c98a", ring: true },
        { name: "uranus", x: pad(0.32, 10), y: padY(0.9, 10), radius: 10, color: "#8fd3d8", thinRing: true },
        { name: "neptune", x: pad(0.55, 9), y: padY(0.22, 9), radius: 9, color: "#4a5fc1" },
      ].map((p) => ({ ...p, driftPhase: Math.random() * Math.PI * 2 }));
    };

    resize();
    window.addEventListener("resize", resize);

    const drawStars = (t) => {
      for (const s of starsRef.current) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 243, 248, ${0.15 + twinkle * 0.5})`;
        ctx.fill();
      }
    };

    const drawPlanets = (t) => {
      for (const p of planetsRef.current) {
        const drift = Math.sin(t * 0.00025 + (p.driftPhase || 0)) * 6;
        const px = p.x;
        const py = p.y + drift;

        if (p.type === "glow") {
          const grad = ctx.createRadialGradient(px, py, 0, px, py, p.radius);
          grad.addColorStop(0, "rgba(255, 226, 160, 0.35)");
          grad.addColorStop(1, "rgba(255, 226, 160, 0)");
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          continue;
        }

        // ring (Saturn — wide, tilted) or thin ring (Uranus — near vertical)
        if (p.ring) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(-0.35);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.9, p.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(232, 201, 138, 0.55)";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
        if (p.thinRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(1.3);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.7, p.radius * 0.3, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(143, 211, 216, 0.45)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        // subtle glow behind planet body
        const haloGrad = ctx.createRadialGradient(px, py, p.radius * 0.6, px, py, p.radius * 2.2);
        haloGrad.addColorStop(0, `${p.color}22`);
        haloGrad.addColorStop(1, `${p.color}00`);
        ctx.beginPath();
        ctx.arc(px, py, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // planet body with simple shading (lit from top-left)
        const bodyGrad = ctx.createRadialGradient(
          px - p.radius * 0.35, py - p.radius * 0.35, p.radius * 0.1,
          px, py, p.radius
        );
        bodyGrad.addColorStop(0, p.color);
        bodyGrad.addColorStop(1, "#0b1120");
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        // horizontal bands (Jupiter)
        if (p.bands) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = "#8a6a45";
          for (let i = -3; i <= 3; i++) {
            const bandY = py + i * (p.radius / 3.2);
            ctx.fillRect(px - p.radius, bandY - 1.6, p.radius * 2, 3.2);
          }
          ctx.restore();
          ctx.globalAlpha = 1;
        }

        if (p.moon) {
          const orbitAngle = t * 0.0004 + (p.driftPhase || 0);
          const orbitR = p.radius * 2.1;
          const mx = px + Math.cos(orbitAngle) * orbitR;
          const my = py + Math.sin(orbitAngle) * orbitR * 0.5;
          ctx.beginPath();
          ctx.arc(mx, my, p.radius * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = "#c9cdd6";
          ctx.fill();
        }
      }
    };

    const drawSmoke = () => {
      const particles = smokeRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 0.35;
        p.vy *= 0.99;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = (p.life / p.maxLife) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 210, ${alpha})`;
        ctx.fill();
      }
    };

    const drawRocket = (t) => {
      const rocket = rocketRef.current;
      if (!rocket.active) return;

      const { width, height } = sizeRef.current;
      const elapsed = t - rocket.startTime;
      const progress = elapsed / LAUNCH_DURATION;

      if (progress >= 1) {
        rocket.active = false;
        rocket.flameAlpha = 0;
        return;
      }

      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const y = height + 80 - eased * (height + 220);
      const x = width * 0.5 + Math.sin(progress * 8) * 6;
      const angle = Math.sin(progress * 8) * 0.05;

      const tailX = x - Math.sin(angle) * 34;
      const tailY = y + Math.cos(angle) * 34;
      for (let i = 0; i < 2; i++) {
        smokeRef.current.push({
          x: tailX + (Math.random() - 0.5) * 6,
          y: tailY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: Math.random() * 0.8 + 0.4,
          radius: Math.random() * 2 + 2,
          life: 90,
          maxLife: 90,
        });
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const flicker = 0.7 + Math.random() * 0.3;
      const flameLen = 22 * flicker;
      const flameGrad = ctx.createLinearGradient(0, 14, 0, 14 + flameLen);
      flameGrad.addColorStop(0, `rgba(255, 220, 120, ${rocket.flameAlpha})`);
      flameGrad.addColorStop(0.5, `rgba(245, 166, 35, ${rocket.flameAlpha * 0.8})`);
      flameGrad.addColorStop(1, `rgba(245, 166, 35, 0)`);
      ctx.beginPath();
      ctx.moveTo(-6, 14);
      ctx.quadraticCurveTo(0, 14 + flameLen, 6, 14);
      ctx.closePath();
      ctx.fillStyle = flameGrad;
      ctx.fill();

      ctx.fillStyle = "#f5a623";
      ctx.beginPath();
      ctx.moveTo(-8, 8);
      ctx.lineTo(-19, 20);
      ctx.lineTo(-8, 20);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(8, 8);
      ctx.lineTo(19, 20);
      ctx.lineTo(8, 20);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#f1f3f8";
      ctx.beginPath();
      ctx.moveTo(-8, -12);
      ctx.lineTo(8, -12);
      ctx.lineTo(8, 14);
      ctx.quadraticCurveTo(0, 20, -8, 14);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#f5a623";
      ctx.beginPath();
      ctx.moveTo(-8, -12);
      ctx.quadraticCurveTo(0, -34, 8, -12);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -2, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#0b1120";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -2, 4.5, 0, Math.PI * 2);
      ctx.strokeStyle = "#8b96ac";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const loop = (t) => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      drawStars(t);
      drawPlanets(t);
      drawSmoke();
      drawRocket(t);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none transition-opacity duration-700"
      style={{ opacity: inView ? 1 : 0.4 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}