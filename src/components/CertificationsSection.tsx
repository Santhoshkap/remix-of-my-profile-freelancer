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

// --- Text billboard texture (transparent bg, just text) ---
function createLabelTexture(text: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = "#00e5ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let fontSize = text.length > 8 ? 40 : text.length > 5 ? 52 : 64;
  ctx.font = `bold ${fontSize}px 'Orbitron', 'Inter', sans-serif`;

  // Add subtle text shadow for readability
  ctx.shadowColor = "rgba(0, 229, 255, 0.6)";
  ctx.shadowBlur = 12;
  ctx.fillText(text, size / 2, size / 2);
  // Double pass for glow
  ctx.shadowBlur = 4;
  ctx.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Glass material for all spheres (shared)
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("hsl(210, 30%, 25%)"),
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.92,
  thickness: 1.5,
  ior: 1.5,
  envMapIntensity: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  transparent: true,
  opacity: 0.85,
});

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const labelGeometry = new THREE.PlaneGeometry(2, 2);

// --- 3D Sphere with billboard label ---
type CertSphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  labelTexture: THREE.CanvasTexture;
  isActive: boolean;
  isHovered: boolean;
  gridTarget: [number, number, number];
};

function CertSphere({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  labelTexture,
  isActive,
  isHovered,
  gridTarget,
}: CertSphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const labelRef = useRef<THREE.Mesh>(null);
  const targetVec = useMemo(() => new THREE.Vector3(...gridTarget), [gridTarget]);
  const frontQuat = useMemo(() => new THREE.Quaternion(), []);

  const labelMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    map: labelTexture,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), [labelTexture]);

  useFrame(({ camera }, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);

    // Billboard: label always faces camera
    if (labelRef.current) {
      labelRef.current.quaternion.copy(camera.quaternion);
    }

    if (isHovered) {
      const current = api.current.translation();
      const diff = new THREE.Vector3(
        targetVec.x - current.x,
        targetVec.y - current.y,
        targetVec.z - current.z
      );

      const springForce = diff.multiplyScalar(80 * delta * scale);
      api.current.applyImpulse(springForce, true);

      const vel = api.current.linvel();
      api.current.applyImpulse(
        new THREE.Vector3(-vel.x * 8 * delta, -vel.y * 8 * delta, -vel.z * 8 * delta),
        true
      );

      const angVel = api.current.angvel();
      api.current.applyTorqueImpulse(
        new THREE.Vector3(-angVel.x * 4 * delta, -angVel.y * 4 * delta, -angVel.z * 4 * delta),
        true
      );

      const currentRot = api.current.rotation();
      const currentQuat = new THREE.Quaternion(currentRot.x, currentRot.y, currentRot.z, currentRot.w);
      currentQuat.slerp(frontQuat, Math.min(1, 8 * delta));
      api.current.setRotation({ x: currentQuat.x, y: currentQuat.y, z: currentQuat.z, w: currentQuat.w }, true);
    } else {
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
      {/* Glass sphere */}
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={glassMaterial}
      />
      {/* Billboard text label floating in front */}
      <mesh
        ref={labelRef}
        geometry={labelGeometry}
        material={labelMaterial}
        position={[0, 0, scale * 1.05]}
        scale={scale}
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

  const labelTextures = useMemo(() => certifications.map(createLabelTexture), []);

  const spheres = useMemo(
    () =>
      certifications.map((_cert, i) => ({
        scale: [0.75, 0.85, 0.9, 0.8, 0.95][i % 5],
        labelTexture: labelTextures[i],
        gridTarget: getGridPosition(i) as [number, number, number],
      })),
    [labelTextures]
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
