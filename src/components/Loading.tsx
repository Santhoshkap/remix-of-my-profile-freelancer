import { useEffect, useState, useRef, useMemo } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const STATUS_LINES = [
  "SCANNING NETWORK...",
  "VERIFYING CREDENTIALS...",
  "LOADING THREAT INTEL...",
  "ESTABLISHING SECURE CONNECTION...",
  "ANALYZING ATTACK VECTORS...",
  "DECRYPTING PAYLOAD...",
];

const HEX_CHARS = "0123456789ABCDEF";
const randomHex = () =>
  Array.from({ length: 8 }, () =>
    HEX_CHARS[Math.floor(Math.random() * 16)] + HEX_CHARS[Math.floor(Math.random() * 16)]
  ).join(" ");

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [phase, setPhase] = useState<"loading" | "ready" | "flash" | "exit">("loading");
  const hasTriggered = useRef(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [hexStream, setHexStream] = useState(randomHex);

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

  // Memoize particles so they don't re-render
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={`loader-particle loader-particle-${i + 1}`} />
      )),
    []
  );

  return (
    <div className={`loader ${phase === "exit" ? "loader-exit" : ""}`}>
      {/* Grid overlay */}
      <div className="loader-grid" />

      {/* Radial pulse glow */}
      <div className="loader-radial-pulse" />

      {/* Floating particles */}
      {particles}

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
        {/* Logo with rotating ring */}
        <div className="loader-logo-wrap">
          <div className="loader-ring" />
          <div className="loader-logo">SK</div>
        </div>
        <div className="loader-subtitle">CYBERSECURITY OPERATIONS</div>

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

      {/* Bottom info */}
      <div className="loader-bottom">
        <span>GRC & CYBERSECURITY</span>
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
