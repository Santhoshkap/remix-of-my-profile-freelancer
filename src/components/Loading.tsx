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

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;
      }

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

  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => setStatusIndex((i) => (i + 1) % STATUS_LINES.length), 1500);
    return () => clearInterval(interval);
  }, [phase]);

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
      <canvas ref={canvasRef} className="loader-canvas" />
      <div className="loader-grid" />
      <div className="loader-radial-pulse" />
      <div className="loader-scanline" />
      {phase === "flash" && <div className="loader-flash" />}

      {/* Corner brackets */}
      <div className="loader-corner loader-corner-tl" />
      <div className="loader-corner loader-corner-tr" />
      <div className="loader-corner loader-corner-bl" />
      <div className="loader-corner loader-corner-br" />

      {/* Floating data fragments */}
      <div className="loader-data-fragment frag-1">ENCRYPTED</div>
      <div className="loader-data-fragment frag-2">AES-256</div>
      <div className="loader-data-fragment frag-3">SHA-512</div>
      <div className="loader-data-fragment frag-4">TLS 1.3</div>
      <div className="loader-data-fragment frag-5">RSA-4096</div>

      {/* Center content */}
      <div className="loader-center">
        {/* Shield with rings & radar */}
        <div className="loader-shield-area">
          <div className="loader-logo-wrap">
            {radarCircles}
            <div className="loader-ring" />
            <div className="loader-ring-outer" />

            {/* Cyber shield SVG */}
            <div className="loader-shield">
              <svg viewBox="0 0 100 120" className="shield-svg">
                {/* Shield body */}
                <defs>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="hsl(220, 80%, 40%)" stopOpacity="0.12" />
                  </linearGradient>
                  <filter id="shieldGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M50 5 L90 25 L90 60 Q90 95 50 115 Q10 95 10 60 L10 25 Z"
                  fill="url(#shieldGrad)"
                  stroke="hsl(190, 100%, 50%)"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  filter="url(#shieldGlow)"
                  className="shield-path"
                />
                {/* Inner shield border */}
                <path
                  d="M50 15 L82 32 L82 58 Q82 88 50 105 Q18 88 18 58 L18 32 Z"
                  fill="none"
                  stroke="hsl(190, 100%, 50%)"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                  strokeDasharray="4 3"
                  className="shield-inner"
                />
                {/* Lock icon in center */}
                <rect x="41" y="48" width="18" height="16" rx="3" fill="none" stroke="hsl(190, 100%, 50%)" strokeWidth="1.5" strokeOpacity="0.6" className="lock-body" />
                <path d="M44 48 L44 42 Q44 35 50 35 Q56 35 56 42 L56 48" fill="none" stroke="hsl(190, 100%, 50%)" strokeWidth="1.5" strokeOpacity="0.6" className="lock-shackle" />
                <circle cx="50" cy="56" r="2" fill="hsl(190, 100%, 50%)" fillOpacity="0.8" className="lock-keyhole" />
                {/* Checkmark that appears */}
                <path d="M40 58 L48 66 L62 48" fill="none" stroke="hsl(120, 80%, 50%)" strokeWidth="2.5" strokeOpacity="0" strokeLinecap="round" strokeLinejoin="round" className="shield-check" />
              </svg>
            </div>
          </div>

          {/* Orbiting dots */}
          <div className="orbit-ring">
            <div className="orbit-dot orbit-dot-1" />
            <div className="orbit-dot orbit-dot-2" />
            <div className="orbit-dot orbit-dot-3" />
          </div>
        </div>

        <div className="loader-subtitle">GRC & CYBERSECURITY OPERATIONS</div>

        <div className="loader-hex">
          <span className="loader-hex-prefix">0x</span>
          {hexStream}
        </div>

        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${Math.min(percent, 100)}%` }} />
          <div className="loader-bar-glow" style={{ left: `${Math.min(percent, 100)}%` }} />
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

      <div className="loader-ticker-wrap">
        <div className="loader-ticker">
          {tickerContent}
        </div>
      </div>

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
