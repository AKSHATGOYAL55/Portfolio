import { motion } from "framer-motion";

// The signature visual: a request travelling through the layers
// Akshat actually builds — Client -> Gateway -> Auth (JWT/RBAC) -> API -> DB.
// Rendered as ambient background art rather than a literal diagram.

const nodes = [
  { id: "client", label: "CLIENT", x: 80 },
  { id: "gateway", label: "GATEWAY", x: 320 },
  { id: "auth", label: "JWT · RBAC", x: 560 },
  { id: "api", label: "REST API", x: 800 },
  { id: "db", label: "DATABASE", x: 1040 },
];

const NODE_Y = 300;

export default function PipelineBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* soft radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(245,166,35,0.10) 0%, rgba(11,17,32,0) 70%)",
        }}
      />
      <svg
        viewBox="0 0 1120 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-70"
      >
        <defs>
          <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5a623" stopOpacity="0" />
            <stop offset="50%" stopColor="#f5a623" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint grid, subtle */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 100}
            y1="0"
            x2={i * 100}
            y2="600"
            stroke="#ffffff"
            strokeOpacity="0.02"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 100}
            x2="1120"
            y2={i * 100}
            stroke="#ffffff"
            strokeOpacity="0.02"
          />
        ))}

        {/* connecting line */}
        <line
          x1={nodes[0].x}
          y1={NODE_Y}
          x2={nodes[nodes.length - 1].x}
          y2={NODE_Y}
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="2"
        />

        {/* traveling packets */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="5"
            fill="#f5a623"
            filter="url(#glow)"
            initial={{ cx: nodes[0].x, cy: NODE_Y, opacity: 0 }}
            animate={{
              cx: [nodes[0].x, nodes[nodes.length - 1].x],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={NODE_Y}
              r="22"
              fill="#131b2e"
              stroke="#f5a62355"
              strokeWidth="1.5"
              animate={{ r: [22, 25, 22] }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <circle cx={n.x} cy={NODE_Y} r="6" fill="#f5a623" opacity="0.8" />
            <text
              x={n.x}
              y={NODE_Y + 55}
              textAnchor="middle"
              fill="#8b96ac"
              fontSize="13"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
