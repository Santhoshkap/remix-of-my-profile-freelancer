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
  "CISA", "CISM", "CCISO", "CC", "GRCP",
  "GRCA", "CRCMP", "CSOE", "ISO 27001", "ISO 42001",
  "ISO 9001", "GDPR", "DPDP", "PMP", "Scrum",
  "ITIL", "CSCP", "IBM AI", "HITRUST", "HIPAA",
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

// Bake text onto a 512x512 canvas with dark vignette background
function createSphereTexture(text: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Dark vignette background
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(20, 25, 60, 0.95)");
  gradient.addColorStop(0.7, "rgba(15, 18, 45, 0.98)");
  gradient.addColorStop(1, "rgba(8, 10, 30, 1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Subtle ring accent
  ctx.strokeStyle = "rgba(0, 229, 255, 0.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
  ctx.stroke();

  // Text
  ctx.fillStyle = "#00e5ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let fontSize: number;
  if (text.length > 8) fontSize = 24;
  else if (text.length > 5) fontSize = 30;
  else fontSize = 38;

  ctx.font = `bold ${fontSize}px 'Orbitron', 'Inter', sans-serif`;
  ctx.shadowColor = "rgba(0, 229, 255, 0.8)";
  ctx.shadowBlur = 16;
  ctx.fillText(text, size / 2, size / 2);
  // Second pass for stronger glow
  ctx.shadowBlur = 6;
  ctx.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// --- 3D Sphere with baked text ---
type CertSphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  texture: THREE.CanvasTexture;
  isActive: boolean;
  isHovered: boolean;
  gridTarget: [number, number, number];
  index: number;
};

function CertSphere({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  texture,
  isActive,
  isHovered,
  gridTarget,
  index,
}: CertSphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const targetVec = useMemo(() => new THREE.Vector3(...gridTarget), [gridTarget]);
  const frontQuat = useMemo(() => new THREE.Quaternion(), []);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: texture,
    emissive: new THREE.Color("#00e5ff"),
    emissiveMap: texture,
    emissiveIntensity: 0.15,
    color: new THREE.Color("hsl(230, 50%, 15%)"),
    metalness: 0.7,
    roughness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), [texture]);

  useFrame(({ clock }, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    const t = clock.elapsedTime;

    // Emissive pulse on hover
    const targetEmissive = isHovered ? 0.5 : 0.15;
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      targetEmissive,
      delta * 3
    );

    if (isHovered) {
      // Staggered spring force — higher index = slightly weaker initially
      const staggerFactor = Math.min(1, (t * 3 - index * 0.08));
      if (staggerFactor <= 0) return;

      const current = api.current.translation();
      const diff = new THREE.Vector3(
        targetVec.x - current.x,
        targetVec.y - current.y,
        targetVec.z - current.z
      );

      const springForce = diff.multiplyScalar(80 * delta * scale * Math.max(0.3, staggerFactor));
      api.current.applyImpulse(springForce, true);

      // Damping
      const vel = api.current.linvel();
      api.current.applyImpulse(
        new THREE.Vector3(-vel.x * 8 * delta, -vel.y * 8 * delta, -vel.z * 8 * delta),
        true
      );

      // Angular damping
      const angVel = api.current.angvel();
      api.current.applyTorqueImpulse(
        new THREE.Vector3(-angVel.x * 4 * delta, -angVel.y * 4 * delta, -angVel.z * 4 * delta),
        true
      );

      // Slerp rotation to face front
      const currentRot = api.current.rotation();
      const currentQuat = new THREE.Quaternion(currentRot.x, currentRot.y, currentRot.z, currentRot.w);
      currentQuat.slerp(frontQuat, Math.min(1, 8 * delta));
      api.current.setRotation({ x: currentQuat.x, y: currentQuat.y, z: currentQuat.z, w: currentQuat.w }, true);

      // Scale bounce effect when near target
      if (meshRef.current) {
        const dist = new THREE.Vector3(targetVec.x - current.x, targetVec.y - current.y, targetVec.z - current.z).length();
        const bounceScale = dist < 0.5 ? scale * (1 + 0.08 * Math.sin(t * 6 + index)) : scale;
        meshRef.current.scale.setScalar(bounceScale);
      }
    } else {
      // Idle: attract to center + subtle bob + slow rotation
      const impulse = vec
        .copy(api.current.translation())
        .normalize()
        .multiply(
          new THREE.Vector3(
            -50 * delta * scale,
            -150 * delta * scale,
            -50 * delta * scale
          )
        );
      api.current.applyImpulse(impulse, true);

      // Subtle vertical bob
      const bobForce = Math.sin(t * 1.5 + index * 0.7) * 0.3 * delta * scale;
      api.current.applyImpulse(new THREE.Vector3(0, bobForce, 0), true);

      // Slow Y-axis rotation
      api.current.applyTorqueImpulse(
        new THREE.Vector3(0, 0.002 * delta * scale, 0),
        true
      );

      // Reset scale
      if (meshRef.current) {
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
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
        ref={meshRef}
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
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

  const sphereTextures = useMemo(() => certifications.map(createSphereTexture), []);

  const spheres = useMemo(
    () =>
      certifications.map((_cert, i) => ({
        scale: [0.75, 0.85, 0.9, 0.8, 0.95][i % 5],
        texture: sphereTextures[i],
        gridTarget: getGridPosition(i) as [number, number, number],
        index: i,
      })),
    [sphereTextures]
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
    <section id="certifications" className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: "var(--backgroundColor)", zIndex: 12 }}>
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(ellipse at 30% 50%, hsl(190 100% 50%), transparent 60%), radial-gradient(ellipse at 70% 50%, hsl(270 80% 60%), transparent 60%)",
      }} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-center mb-3 text-glow tracking-wide">
            My Certifications
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-primary/50 mx-auto mb-12 md:mb-16"
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
