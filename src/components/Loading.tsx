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
    const count = 20;
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
    const interval = setInterval(() => setHexStream(randomHex()), 200);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (percent >= 100 && !hasTriggered.current) {
      hasTriggered.current = true;
      setTimeout(() => setPhase("ready"), 150);
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
            }, 300);
          });
        }, 150);
      }, 400);
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
            {/* Premium layered rings */}
            <div className="loader-ring loader-ring-1" />
            <div className="loader-ring loader-ring-2" />
            <div className="loader-ring loader-ring-3" />

            {/* Premium Cyber Shield SVG */}
            <div className="loader-shield">
              <svg viewBox="0 0 100 120" className="shield-svg">
                <defs>
                  {/* Multi-stop gradient for shield fill */}
                  <linearGradient id="shieldGradPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.2" />
                    <stop offset="40%" stopColor="hsl(200, 90%, 45%)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="hsl(230, 80%, 30%)" stopOpacity="0.15" />
                  </linearGradient>
                  {/* Inner gradient */}
                  <linearGradient id="shieldGradInner" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.02" />
                  </linearGradient>
                  {/* Glow filter */}
                  <filter id="shieldGlowPremium" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Energy pulse filter */}
                  <filter id="energyPulse" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="6" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Radial glow for keyhole */}
                  <radialGradient id="keyholeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="1" />
                    <stop offset="60%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Energy field behind shield */}
                <ellipse cx="50" cy="60" rx="45" ry="55" fill="none" stroke="hsl(190, 100%, 50%)" strokeWidth="0.3" strokeOpacity="0.1" className="shield-energy-field" />
                <ellipse cx="50" cy="60" rx="40" ry="50" fill="none" stroke="hsl(190, 100%, 50%)" strokeWidth="0.2" strokeOpacity="0.08" className="shield-energy-field-2" />

                {/* Outer shield — draw-in animation */}
                <path
                  d="M50 5 L90 25 L90 60 Q90 95 50 115 Q10 95 10 60 L10 25 Z"
                  fill="url(#shieldGradPremium)"
                  stroke="hsl(190, 100%, 50%)"
                  strokeWidth="1.8"
                  strokeOpacity="0.7"
                  filter="url(#shieldGlowPremium)"
                  className="shield-path-outer"
                />

                {/* Mid shield layer */}
                <path
                  d="M50 12 L84 29 L84 59 Q84 90 50 109 Q16 90 16 59 L16 29 Z"
                  fill="url(#shieldGradInner)"
                  stroke="hsl(190, 100%, 50%)"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                  className="shield-path-mid"
                />

                {/* Inner shield — dashed with rotation */}
                <path
                  d="M50 20 L78 34 L78 57 Q78 84 50 102 Q22 84 22 57 L22 34 Z"
                  fill="none"
                  stroke="hsl(190, 100%, 50%)"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                  strokeDasharray="6 4"
                  className="shield-path-inner"
                />

                {/* Circuit pattern lines inside shield */}
                <g className="shield-circuits" strokeWidth="0.4" stroke="hsl(190, 100%, 50%)" fill="none">
                  <path d="M50 25 L50 38" className="circuit-line c1" />
                  <path d="M50 38 L38 45" className="circuit-line c2" />
                  <path d="M50 38 L62 45" className="circuit-line c3" />
                  <path d="M30 55 L38 55 L38 65" className="circuit-line c4" />
                  <path d="M70 55 L62 55 L62 65" className="circuit-line c5" />
                  <path d="M38 75 L50 82 L62 75" className="circuit-line c6" />
                  {/* Circuit nodes */}
                  <circle cx="50" cy="38" r="1.5" fill="hsl(190, 100%, 50%)" className="circuit-node cn1" />
                  <circle cx="38" cy="45" r="1" fill="hsl(190, 100%, 50%)" className="circuit-node cn2" />
                  <circle cx="62" cy="45" r="1" fill="hsl(190, 100%, 50%)" className="circuit-node cn3" />
                  <circle cx="38" cy="65" r="1" fill="hsl(190, 100%, 50%)" className="circuit-node cn4" />
                  <circle cx="62" cy="65" r="1" fill="hsl(190, 100%, 50%)" className="circuit-node cn5" />
                </g>

                {/* Lock body — refined */}
                <rect x="40" y="48" width="20" height="18" rx="3.5" fill="none" stroke="hsl(190, 100%, 50%)" strokeWidth="1.2" strokeOpacity="0.7" className="lock-body" />
                {/* Lock shackle */}
                <path d="M43 48 L43 41 Q43 33 50 33 Q57 33 57 41 L57 48" fill="none" stroke="hsl(190, 100%, 50%)" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" className="lock-shackle" />
                {/* Keyhole with radial glow */}
                <circle cx="50" cy="55" r="5" fill="url(#keyholeGlow)" className="lock-keyhole-glow" />
                <circle cx="50" cy="55" r="2.5" fill="hsl(190, 100%, 50%)" fillOpacity="0.9" className="lock-keyhole" />
                {/* Keyhole slot */}
                <rect x="49" y="56" width="2" height="4" rx="1" fill="hsl(190, 100%, 50%)" fillOpacity="0.7" className="lock-keyhole-slot" />

                {/* Checkmark that appears on ready */}
                <path d="M38 57 L47 66 L64 46" fill="none" stroke="hsl(120, 80%, 50%)" strokeWidth="3" strokeOpacity="0" strokeLinecap="round" strokeLinejoin="round" className="shield-check" />

                {/* Sparkle particles around shield */}
                <circle cx="15" cy="40" r="1" fill="hsl(190, 100%, 50%)" className="shield-sparkle s1" />
                <circle cx="85" cy="40" r="1" fill="hsl(190, 100%, 50%)" className="shield-sparkle s2" />
                <circle cx="50" cy="8" r="0.8" fill="hsl(190, 100%, 50%)" className="shield-sparkle s3" />
                <circle cx="20" cy="80" r="0.8" fill="hsl(190, 100%, 50%)" className="shield-sparkle s4" />
                <circle cx="80" cy="80" r="0.8" fill="hsl(190, 100%, 50%)" className="shield-sparkle s5" />
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
