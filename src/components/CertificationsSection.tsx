import { ShieldCheck } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "./AnimationUtils";
import { motion } from "framer-motion";
import { Suspense, useEffect, useRef, useState, useMemo } from "react";
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
  "CISA", "CISM", "CCISO", "CC",
  "GRCP", "GRCA", "CRCMP", "CSOE",
  "ISO 27001", "ISO 42001", "ISO 9001", "GDPR",
  "DPDP", "PMP", "Scrum", "ITIL",
  "CSCP", "IBM AI", "HITRUST", "HIPAA",
];

const COLS = 5;
const ROWS = 4;
const GRID_SPACING_X = 3.2;
const GRID_SPACING_Y = 3.0;

function getGridPosition(index: number): [number, number, number] {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const x = (col - (COLS - 1) / 2) * GRID_SPACING_X;
  const y = ((ROWS - 1) / 2 - row) * GRID_SPACING_Y;
  return [x, y, 0];
}

// --- Texture generation for billboard label ---
function createTextTexture(text: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Transparent background
  ctx.clearRect(0, 0, size, size);

  // Dark circle background
  ctx.fillStyle = "rgba(10, 15, 30, 0.92)";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Cyan border
  ctx.strokeStyle = "rgba(0, 220, 255, 0.35)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
  ctx.stroke();

  // Text
  ctx.fillStyle = "#00e5ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let fontSize = 72;
  ctx.font = `bold ${fontSize}px 'Orbitron', 'Inter', sans-serif`;
  const maxWidth = size * 0.7;

  while (ctx.measureText(text).width > maxWidth && fontSize > 20) {
    fontSize -= 2;
    ctx.font = `bold ${fontSize}px 'Orbitron', 'Inter', sans-serif`;
  }

  ctx.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// --- 3D Cert ball with billboard text ---
type CertSphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  texture: THREE.CanvasTexture;
  isActive: boolean;
  isHovered: boolean;
  gridTarget: [number, number, number];
};

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("hsl(230, 25%, 12%)"),
  metalness: 0.6,
  roughness: 0.4,
  clearcoat: 0.3,
});

function CertSphere({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  texture,
  isActive,
  isHovered,
  gridTarget,
}: CertSphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const spriteRef = useRef<THREE.Sprite>(null);
  const targetVec = useMemo(() => new THREE.Vector3(...gridTarget), [gridTarget]);

  const spriteMaterial = useMemo(() => {
    return new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
    });
  }, [texture]);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);

    if (isHovered) {
      // Spring toward grid position
      const current = api.current.translation();
      const diff = new THREE.Vector3(
        targetVec.x - current.x,
        targetVec.y - current.y,
        targetVec.z - current.z
      );
      api.current.applyImpulse(diff.multiplyScalar(80 * delta * scale), true);

      // Dampen velocity
      const vel = api.current.linvel();
      api.current.applyImpulse(
        new THREE.Vector3(-vel.x * 8 * delta, -vel.y * 8 * delta, -vel.z * 8 * delta),
        true
      );

      // Dampen angular velocity
      const angVel = api.current.angvel();
      api.current.applyTorqueImpulse(
        new THREE.Vector3(-angVel.x * 4 * delta, -angVel.y * 4 * delta, -angVel.z * 4 * delta),
        true
      );
    } else {
      const impulse = vec
        .copy(api.current.translation())
        .normalize()
        .multiply(
          new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale)
        );
      api.current.applyImpulse(impulse, true);
    }

    // Sprite always follows the rigid body position
    if (spriteRef.current && api.current) {
      const pos = api.current.translation();
      spriteRef.current.position.set(pos.x, pos.y, pos.z + 0.05);
    }
  });

  return (
    <>
      <RigidBody
        linearDamping={0.75}
        angularDamping={0.15}
        friction={0.2}
        position={[r(20), r(20) - 25, r(20) - 10]}
        ref={api}
        colliders={false}
      >
        <BallCollider args={[scale]} />
        <mesh
          castShadow
          receiveShadow
          scale={scale}
          geometry={sphereGeometry}
          material={sphereMaterial}
        />
      </RigidBody>
      {/* Billboard sprite - always faces camera */}
      <sprite ref={spriteRef} scale={[scale * 2.1, scale * 2.1, 1]} material={spriteMaterial} />
    </>
  );
}

// --- Pointer ---
type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
  isHovered: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive, isHovered }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    if (isHovered) {
      ref.current?.setNextKinematicTranslation(new THREE.Vector3(100, 100, 100));
      return;
    }
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
  const [isHovered, setIsHovered] = useState(false);

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

  const textures = useMemo(() => {
    return certifications.map((cert) => createTextTexture(cert));
  }, []);

  const spheres = useMemo(
    () =>
      certifications.map((_cert, i) => ({
        scale: 0.85,
        texture: textures[i],
        gridTarget: getGridPosition(i) as [number, number, number],
      })),
    [textures]
  );

  return (
    <div
      className="w-full h-[450px] md:h-[550px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          <Pointer isActive={isActive} isHovered={isHovered} />
          {spheres.map((props, i) => (
            <CertSphere key={i} {...props} isActive={isActive} isHovered={isHovered} />
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
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 font-body tracking-wider transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        Hover to reveal certifications
      </div>
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
    <section id="certifications" className="py-8 md:py-12 relative overflow-hidden" style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}>
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(ellipse at 30% 50%, hsl(190 100% 50%), transparent 60%), radial-gradient(ellipse at 70% 50%, hsl(270 80% 60%), transparent 60%)",
      }} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow tracking-wide">
            My <span style={{ color: "var(--accentColor)" }}>Certifications</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-6 md:mb-8"
          />
        </SectionReveal>

        {isDesktop ? (
          <Suspense fallback={<div className="w-full h-[550px] flex items-center justify-center text-muted-foreground">Loading certifications...</div>}>
            <CertificationsCanvas />
          </Suspense>
        ) : (
          <MobileCertBadges />
        )}
      </div>
    </section>
  );
}
