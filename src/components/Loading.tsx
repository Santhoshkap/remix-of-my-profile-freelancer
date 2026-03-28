import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const STATUS_LINES = [
  "INITIALIZING COMPLIANCE ENGINE...",
  "LOADING RISK FRAMEWORKS...",
  "VERIFYING ISO 27001 CONTROLS...",
  "SCANNING THREAT LANDSCAPE...",
  "VALIDATING GOVERNANCE POLICIES...",
  "ESTABLISHING SECURE CHANNEL...",
  "MAPPING REGULATORY REQUIREMENTS...",
  "ACTIVATING GRC DASHBOARD...",
];

const CERTS = "CISA · CISM · CCISO · ISO 27001 LA · HITRUST · PMP · GDPR";

const HEX_CHARS = "0123456789ABCDEF";
const randomHex = () =>
  Array.from({ length: 8 }, () =>
    HEX_CHARS[Math.floor(Math.random() * 16)] + HEX_CHARS[Math.floor(Math.random() * 16)]
  ).join(" ");

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [phase, setPhase] = useState<"loading" | "ready" | "flash" | "exit">("loading");
  const hasTriggered = useRef(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [hexStream, setHexStream] = useState(randomHex);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);

  // Network topology canvas animation
  const initNodes = useCallback((w: number, h: number) => {
    const count = 35;
    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) initNodes(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const maxDist = 150;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;
      }

      // Draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = `hsla(190, 100%, 50%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(190, 100%, 50%, ${node.opacity})`;
        ctx.shadowColor = "hsla(190, 100%, 50%, 0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initNodes]);

  // Rotating status text
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => setStatusIndex((i) => (i + 1) % STATUS_LINES.length), 1500);
    return () => clearInterval(interval);
  }, [phase]);

  // Hex data stream
  useEffect(() => {
    if (phase === "exit") return;
    const interval = setInterval(() => setHexStream(randomHex()), 120);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (percent >= 100 && !hasTriggered.current) {
      hasTriggered.current = true;
      setTimeout(() => setPhase("ready"), 300);
    }
  }, [percent]);

  useEffect(() => {
    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("flash");
        setTimeout(() => {
          setPhase("exit");
          import("./utils/initialFX").then((module) => {
            setTimeout(() => {
              module.initialFX?.();
              setIsLoading(false);
            }, 600);
          });
        }, 200);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, setIsLoading]);

  // Memoize radar circles
  const radarCircles = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => (
        <div key={i} className={`loader-radar loader-radar-${i + 1}`} />
      )),
    []
  );

  const tickerContent = `${CERTS}  ·  ${CERTS}  ·  ${CERTS}  ·  ${CERTS}`;

  return (
    <div className={`loader ${phase === "exit" ? "loader-exit" : ""}`}>
      {/* Network topology canvas */}
      <canvas ref={canvasRef} className="loader-canvas" />

      {/* Perspective grid overlay */}
      <div className="loader-grid" />

      {/* Radial pulse glow */}
      <div className="loader-radial-pulse" />

      {/* Scan line */}
      <div className="loader-scanline" />

      {/* Flash overlay */}
      {phase === "flash" && <div className="loader-flash" />}

      {/* Corner brackets */}
      <div className="loader-corner loader-corner-tl" />
      <div className="loader-corner loader-corner-tr" />
      <div className="loader-corner loader-corner-bl" />
      <div className="loader-corner loader-corner-br" />

      {/* Center content */}
      <div className="loader-center">
        {/* Logo with dual rotating rings + radar */}
        <div className="loader-logo-wrap">
          {radarCircles}
          <div className="loader-ring" />
          <div className="loader-ring-outer" />
          <div className="loader-logo">SK</div>
        </div>
        <div className="loader-subtitle">GRC & CYBERSECURITY OPERATIONS</div>

        {/* Hex data stream */}
        <div className="loader-hex">
          <span className="loader-hex-prefix">0x</span>
          {hexStream}
        </div>

        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
        <div className="loader-percent">
          <span className="loader-percent-num">{Math.min(percent, 100)}</span>
          <span className="loader-percent-sign">%</span>
        </div>
        <div className={`loader-status ${phase === "ready" || phase === "flash" ? "loader-status-ready" : ""}`}>
          {phase === "ready" || phase === "flash"
            ? "ACCESS GRANTED"
            : STATUS_LINES[statusIndex]}
        </div>
      </div>

      {/* Certification ticker */}
      <div className="loader-ticker-wrap">
        <div className="loader-ticker">
          {tickerContent}
        </div>
      </div>

      {/* Bottom info */}
      <div className="loader-bottom">
        <span>GOVERNANCE · RISK · COMPLIANCE</span>
        <span>SANTHOSH KAPALAVAI</span>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  let interval = setInterval(() => {
    if (percent <= 60) {
      percent += Math.round(Math.random() * 8) + 2;
      setLoading(Math.min(percent, 100));
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent += Math.round(Math.random() * 3) + 1;
        setLoading(Math.min(percent, 100));
        if (percent > 91) clearInterval(interval);
      }, 400);
    }
  }, 80);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent += 3;
          setLoading(Math.min(percent, 100));
        } else {
          resolve(100);
          clearInterval(interval);
        }
      }, 10);
    });
  }

  return { loaded, percent, clear };
};
