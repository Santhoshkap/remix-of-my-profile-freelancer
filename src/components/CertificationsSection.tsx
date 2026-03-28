import { ShieldCheck, Lock, Eye, Server } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem, MagneticHover, Tilt3D } from "./AnimationUtils";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const certifications = [
  "CISA", "CISM", "CCISO", "CC", "HITRUST CCSFP",
  "GRCP", "GRCA", "CRCMP", "CSOE",
  "ISO 27001 LA", "ISO 42001 LA", "ISO 9001 LA",
  "IRCA Lead Auditor", "GDPR Expert", "DPDP Specialist",
  "PMP", "Scrum Master", "ITIL v4", "Six Sigma GB",
  "CSCP", "IPMP", "IBM AI Eng.", "CQI",
];

function getCertColor(cert: string): { bg: string; ring: string; text: string } {
  if (["CISA", "CISM", "CCISO", "CC", "HITRUST CCSFP"].includes(cert))
    return { bg: "rgba(0, 102, 255, 0.7)", ring: "#3399ff", text: "#ffffff" };
  if (["GRCP", "GRCA", "CRCMP", "CSOE"].includes(cert))
    return { bg: "rgba(139, 92, 246, 0.7)", ring: "#a78bfa", text: "#ffffff" };
  if (cert.startsWith("ISO") || cert.startsWith("IRCA"))
    return { bg: "rgba(6, 182, 212, 0.7)", ring: "#22d3ee", text: "#ffffff" };
  if (["GDPR Expert", "DPDP Specialist"].includes(cert))
    return { bg: "rgba(16, 185, 129, 0.7)", ring: "#34d399", text: "#ffffff" };
  if (["PMP", "Scrum Master", "ITIL v4", "Six Sigma GB"].includes(cert))
    return { bg: "rgba(245, 158, 11, 0.7)", ring: "#fbbf24", text: "#ffffff" };
  return { bg: "rgba(236, 72, 153, 0.7)", ring: "#f472b6", text: "#ffffff" };
}

const skillCategories = [
  {
    title: "GRC & Risk Management",
    icon: ShieldCheck,
    skills: ["Enterprise Risk Management", "SOX Compliance", "Third-Party Risk", "Regulatory Compliance", "Internal Audit", "Control Frameworks"],
  },
  {
    title: "Cybersecurity Strategy",
    icon: Lock,
    skills: ["NIST CSF", "ISO 27001/27002", "SOC 2 Type II", "Security Architecture", "Incident Response", "Threat Assessment"],
  },
  {
    title: "Privacy & Data Protection",
    icon: Eye,
    skills: ["GDPR", "CCPA", "ISO 27701", "Data Privacy Impact Assessment", "Privacy by Design", "Cross-border Data Transfers"],
  },
  {
    title: "Audit & Assurance",
    icon: Server,
    skills: ["IT General Controls", "Application Controls", "SSAE 18/ISAE 3402", "Process Optimization", "GRC Platforms", "Automated Monitoring"],
  },
];

// --- Texture generation ---
function createTextTexture(text: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const colors = getCertColor(text);

  // Colored gradient background
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, colors.bg);
  gradient.addColorStop(1, "rgba(5, 10, 20, 0.9)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Bright border ring
  ctx.strokeStyle = colors.ring;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
  ctx.stroke();

  // Text settings
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Auto-size font — much larger
  let fontSize = text.length > 12 ? 44 : text.length > 8 ? 56 : 80;
  ctx.font = `bold ${fontSize}px 'Orbitron', 'Inter', sans-serif`;

  // Word wrap for long texts
  const words = text.split(" ");
  const drawText = (lines: string[], baseFontSize: number) => {
    ctx.font = `bold ${baseFontSize}px 'Orbitron', 'Inter', sans-serif`;
    // Glow effect
    ctx.shadowColor = colors.ring;
    ctx.shadowBlur = 20;
    // Stroke
    ctx.strokeStyle = colors.ring;
    ctx.lineWidth = 3;
    ctx.fillStyle = colors.text;

    const lineHeight = baseFontSize * 1.15;
    const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
      const y = startY + i * lineHeight;
      ctx.strokeText(line, size / 2, y);
      ctx.fillText(line, size / 2, y);
    });
  };

  if (words.length > 1 && ctx.measureText(text).width > size * 0.7) {
    const mid = Math.ceil(words.length / 2);
    drawText([words.slice(0, mid).join(" "), words.slice(mid).join(" ")], Math.min(fontSize, 42));
  } else {
    drawText([text], fontSize);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// --- 3D Sphere ---
type CertSphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

function CertSphere({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: CertSphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -30 * delta * scale,
          -30 * delta * scale,
          -30 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.9}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

// --- Pointer ---
type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

// --- 3D Canvas wrapper ---
function CertificationsCanvas() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = document.getElementById("certifications");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const materials = useMemo(() => {
    return certifications.map((cert) => {
      const texture = createTextTexture(cert);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.8,
        metalness: 0.2,
        roughness: 0.3,
        clearcoat: 0.5,
      });
    });
  }, []);

  const spheres = useMemo(
    () =>
      certifications.map((_cert, i) => ({
        scale: [0.7, 0.85, 0.95, 0.8, 1.0][i % 5],
        material: materials[i],
      })),
    [materials]
  );

  return (
    <div className="w-full h-[450px] md:h-[500px] relative">
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <CertSphere key={i} {...props} isActive={isActive} />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

// --- Mobile fallback badges ---
function MobileCertBadges() {
  return (
    <StaggerContainer className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto" stagger={0.04}>
      {certifications.map((cert) => (
        <StaggerItem key={cert}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="group glass rounded-lg px-4 py-2.5 border-glow transition-all duration-300 flex items-center gap-2.5 cursor-default"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />
            <span className="text-xs md:text-sm font-body font-medium text-foreground/90 tracking-wide">{cert}</span>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

// --- Main Section ---
export default function CertificationsSection() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <section id="certifications" className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}>
      {/* Subtle radial background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(ellipse at 30% 50%, hsl(190 100% 50%), transparent 60%), radial-gradient(ellipse at 70% 50%, hsl(270 80% 60%), transparent 60%)",
      }} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow tracking-wide">
            Certifications & Skills
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-12 md:mb-16"
          />
        </SectionReveal>

        {/* 3D Certifications on desktop, badges on mobile */}
        {isDesktop ? (
          <Suspense fallback={<div className="w-full h-[500px] flex items-center justify-center text-muted-foreground">Loading certifications...</div>}>
            <CertificationsCanvas />
          </Suspense>
        ) : (
          <MobileCertBadges />
        )}

        {/* Skill categories */}
        <StaggerContainer className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto mt-16 md:mt-20" stagger={0.12}>
          {skillCategories.map((cat) => (
            <StaggerItem key={cat.title}>
              <Tilt3D intensity={12}>
                <MagneticHover>
                  <div className="glass rounded-2xl p-6 md:p-7 border-glow hover:box-glow transition-all duration-500 group h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <cat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-sm font-display font-semibold text-primary tracking-wider uppercase">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.05, borderColor: "hsl(190 100% 50% / 0.4)" }}
                          className="text-xs px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-foreground/80 transition-all duration-300 font-body cursor-default tracking-wide"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </MagneticHover>
              </Tilt3D>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
