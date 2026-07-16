import { useEffect, useRef } from "react";

// A subtle blueprint / circuit-board background that echoes the site's
// "engineering" identity (same amber signal color, same idea as the Hero's
// request-pipeline diagram) — faint traces with data pulses traveling
// through them, like a PCB. Kept very low-opacity so it never competes
// with the project cards sitting on top of it.

const PULSE_COUNT = 5;

export default function ProjectsBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const pathsRef = useRef([]);
  const pulsesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildCircuit = (width, height) => {
      const rows = [height * 0.18, height * 0.42, height * 0.64, height * 0.86];
      const cols = [width * 0.08, width * 0.28, width * 0.52, width * 0.74, width * 0.94];

      const paths = [
        [
          { x: cols[0], y: rows[0] },
          { x: cols[2], y: rows[0] },
          { x: cols[2], y: rows[1] },
          { x: cols[4], y: rows[1] },
        ],
        [
          { x: cols[4], y: rows[0] },
          { x: cols[3], y: rows[0] },
          { x: cols[3], y: rows[2] },
          { x: cols[1], y: rows[2] },
        ],
        [
          { x: cols[0], y: rows[3] },
          { x: cols[0], y: rows[2] },
          { x: cols[1], y: rows[2] },
          { x: cols[1], y: rows[0] },
        ],
        [
          { x: cols[4], y: rows[3] },
          { x: cols[2], y: rows[3] },
          { x: cols[2], y: rows[1] },
        ],
        [
          { x: cols[0], y: rows[1] },
          { x: cols[0] + (cols[1] - cols[0]) * 0.5, y: rows[1] },
          { x: cols[0] + (cols[1] - cols[0]) * 0.5, y: rows[3] },
        ],
      ];

      return paths.map((pts) => {
        const segs = [];
        let total = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const dx = pts[i + 1].x - pts[i].x;
          const dy = pts[i + 1].y - pts[i].y;
          const len = Math.sqrt(dx * dx + dy * dy);
          segs.push({ from: pts[i], to: pts[i + 1], len });
          total += len;
        }
        return { pts, segs, total };
      });
    };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      pathsRef.current = buildCircuit(rect.width, rect.height);
      pulsesRef.current = Array.from({ length: PULSE_COUNT }, () => ({
        pathIndex: Math.floor(Math.random() * pathsRef.current.length),
        progress: Math.random(),
        speed: Math.random() * 0.0003 + 0.00018,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const pointOnPath = (path, progress) => {
      const dist = progress * path.total;
      let acc = 0;
      for (const seg of path.segs) {
        if (dist <= acc + seg.len || seg === path.segs[path.segs.length - 1]) {
          const segT = seg.len === 0 ? 0 : (dist - acc) / seg.len;
          return {
            x: seg.from.x + (seg.to.x - seg.from.x) * segT,
            y: seg.from.y + (seg.to.y - seg.from.y) * segT,
          };
        }
        acc += seg.len;
      }
      return path.pts[path.pts.length - 1];
    };

    const drawGrid = (width, height) => {
      const spacing = 42;
      ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawCircuit = () => {
      ctx.strokeStyle = "rgba(245, 166, 35, 0.09)";
      ctx.lineWidth = 1;
      for (const path of pathsRef.current) {
        ctx.beginPath();
        path.pts.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.stroke();

        for (const pt of path.pts) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(245, 166, 35, 0.18)";
          ctx.fill();
        }
      }
    };

    const drawPulses = (dt) => {
      for (const pulse of pulsesRef.current) {
        pulse.progress += pulse.speed * dt;
        if (pulse.progress > 1) {
          pulse.progress = 0;
          pulse.pathIndex = Math.floor(Math.random() * pathsRef.current.length);
        }
        const path = pathsRef.current[pulse.pathIndex];
        if (!path) continue;
        const pos = pointOnPath(path, pulse.progress);

        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 8);
        grad.addColorStop(0, "rgba(245, 166, 35, 0.9)");
        grad.addColorStop(1, "rgba(245, 166, 35, 0)");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 226, 170, 0.95)";
        ctx.fill();
      }
    };

    let lastT = performance.now();
    const loop = (t) => {
      const dt = t - lastT;
      lastT = t;
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      drawGrid(width, height);
      drawCircuit();
      drawPulses(dt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(70% 60% at 50% 0%, rgba(245,166,35,0.05) 0%, rgba(11,17,32,0) 65%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}