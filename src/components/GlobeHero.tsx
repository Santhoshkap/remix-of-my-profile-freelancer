/**
 * GlobeHero.tsx
 *
 * Realistic 3D globe for the hero section, inspired by the reference globe.
 * Shows Santhosh's global GRC presence with animated fly-lines.
 *
 * Drop into: src/components/GlobeHero.tsx
 * Dependencies already in package.json:
 *   @react-three/fiber, three, framer-motion
 */

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// ─── Config ───────────────────────────────────────────────────────────────────

const R = 2.0; // Earth radius

/** Key GRC locations pulled directly from Santhosh's career & about sections */
const CITIES = [
  { name: "Bangalore",  lat: 12.97,  lon:  77.59 }, // 0 – Home base
  { name: "Dubai",      lat: 25.20,  lon:  55.27 }, // 1 – Middle East
  { name: "Singapore",  lat:  1.35,  lon: 103.82 }, // 2 – Southeast Asia
  { name: "New York",   lat: 40.71,  lon: -74.01 }, // 3 – USA
  { name: "Toronto",    lat: 43.65,  lon: -79.38 }, // 4 – Canada
  { name: "Riyadh",     lat: 24.69,  lon:  46.72 }, // 5 – Middle East
  { name: "Zurich",     lat: 47.38,  lon:   8.54 }, // 6 – Europe
  { name: "Manila",     lat: 14.60,  lon: 120.98 }, // 7 – Southeast Asia
] as const;

/** Fly-line connections (Bangalore outward + cross-hub routes) */
const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [0, 5], [0, 6], [0, 7],
  [1, 6], [3, 4],
];

const EARTH_TEXTURE =
  "https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/planets/earth_atmos_2048.jpg";

// ─── Geometry Helpers ─────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

function makeArc(a: THREE.Vector3, b: THREE.Vector3, segments = 80): THREE.Vector3[] {
  const dist = a.distanceTo(b);
  const h    = Math.max(0.45, dist * 0.48);
  const ctrl = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R + h);
  return new THREE.QuadraticBezierCurve3(a.clone(), ctrl, b.clone()).getPoints(segments);
}

// ─── GLSL ─────────────────────────────────────────────────────────────────────

const ATMO_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 wp = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-wp.xyz);
    gl_Position = projectionMatrix * wp;
  }
`;

const ATMO_FRAG = /* glsl */ `
  uniform float opacity;
  uniform vec3  color;
  uniform float power;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float f = 1.0 - abs(dot(vN, vV));
    float i = pow(f, power) * opacity;
    gl_FragColor = vec4(color, i);
  }
`;

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars() {
  const geo = useMemo(() => {
    const n   = 2000;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r     = 70 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      col[i * 3]     = 0.72 + Math.random() * 0.28;
      col[i * 3 + 1] = 0.78 + Math.random() * 0.22;
      col[i * 3 + 2] = 1.0;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial size={0.22} sizeAttenuation vertexColors transparent opacity={0.9} />
    </points>
  );
}

// ─── City Marker ──────────────────────────────────────────────────────────────

function CityMarker({ position, phase }: { position: THREE.Vector3; phase: number }) {
  const ringRef = useRef<THREE.Mesh>(null!);
  const dotRef  = useRef<THREE.Mesh>(null!);

  const quaternion = useMemo(() => {
    const n = position.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      n,
    );
  }, [position]);

  useFrame(({ clock }) => {
    const t  = ((clock.elapsedTime * 0.65 + phase) % 2.2) / 2.2;
    ringRef.current.scale.setScalar(1 + t * 5.5);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - t) * 0.75);

    const dp = 0.82 + Math.sin(clock.elapsedTime * 1.8 + phase) * 0.18;
    dotRef.current.scale.setScalar(dp);
  });

  return (
    <group position={position}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={0x00e5ff} />
      </mesh>
      <mesh ref={ringRef} quaternion={quaternion}>
        <ringGeometry args={[0.055, 0.075, 32]} />
        <meshBasicMaterial
          color={0x00e5ff}
          transparent
          opacity={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── Fly-Arc ──────────────────────────────────────────────────────────────────

function FlyArc({
  start, end, delay,
}: {
  start: THREE.Vector3;
  end:   THREE.Vector3;
  delay: number;
}) {
  const headRef = useRef<THREE.Mesh>(null!);
  const tRef    = useRef((delay % 3.5) / 3.5);

  const points = useMemo(() => makeArc(start, end), [start, end]);

  const { linePrimitive } = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.22,
    });
    return { linePrimitive: new THREE.Line(geo, mat) };
  }, [points]);

  useFrame((_, dt) => {
    tRef.current = (tRef.current + dt * 0.20) % 1;
    const idx = Math.min(
      Math.floor(tRef.current * points.length),
      points.length - 1,
    );
    headRef.current.position.copy(points[idx]);
  });

  return (
    <group>
      <primitive object={linePrimitive} />
      <mesh ref={headRef}>
        <sphereGeometry args={[0.032, 6, 6]} />
        <meshBasicMaterial color={0x00ffff} />
      </mesh>
    </group>
  );
}

// ─── Orbital Rings ────────────────────────────────────────────────────────────

function OrbitalRings() {
  const r0 = useRef<THREE.Group>(null!);
  const r1 = useRef<THREE.Group>(null!);
  const r2 = useRef<THREE.Group>(null!);

  useFrame((_, dt) => {
    r0.current.rotation.z += dt * 0.38;
    r1.current.rotation.z += dt * 0.26;
    r2.current.rotation.z -= dt * 0.22;
  });

  const RINGS = [
    { ref: r0, radius: R + 0.55, rot: [Math.PI / 2, 0, 0]          as [number,number,number], dotColor: 0xe0b187, dotSize: 0.048 },
    { ref: r1, radius: R + 0.66, rot: [Math.PI / 3, Math.PI / 6, 0] as [number,number,number], dotColor: 0x628fbb, dotSize: 0.042 },
    { ref: r2, radius: R + 0.78, rot: [-Math.PI / 4, 0, Math.PI / 8] as [number,number,number], dotColor: 0x806bdf, dotSize: 0.040 },
  ];

  return (
    <>
      {RINGS.map(({ ref, radius, rot, dotColor, dotSize }, i) => (
        <group key={i} ref={ref} rotation={rot}>
          <mesh>
            <torusGeometry args={[radius, 0.008, 6, 120]} />
            <meshBasicMaterial color={0x0a2060} transparent opacity={0.45} />
          </mesh>
          <mesh position={[radius, 0, 0]}>
            <sphereGeometry args={[dotSize, 8, 8]} />
            <meshBasicMaterial color={dotColor} />
          </mesh>
          <mesh position={[-radius * 0.6, radius * 0.8, 0]}>
            <sphereGeometry args={[dotSize * 0.65, 8, 8]} />
            <meshBasicMaterial color={dotColor} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// ─── Earth Group (texture-dependent, inside Suspense) ─────────────────────────

function EarthGroup() {
  const groupRef = useRef<THREE.Group>(null!);

  const texture = useLoader(THREE.TextureLoader, EARTH_TEXTURE);

  const cityVecs = useMemo(
    () => CITIES.map(c => latLonToVec3(c.lat, c.lon, R)),
    [],
  );

  const atmo1 = useMemo(() => ({
    opacity: { value: 0.88 },
    color:   { value: new THREE.Color(0.04, 0.52, 1.0) },
    power:   { value: 1.55 },
  }), []);

  const atmo2 = useMemo(() => ({
    opacity: { value: 0.38 },
    color:   { value: new THREE.Color(0.0, 0.32, 0.88) },
    power:   { value: 2.9 },
  }), []);

  useFrame((_, dt) => {
    groupRef.current.rotation.y += dt * 0.055;
  });

  return (
    <group ref={groupRef}>
      {/* ── Earth sphere ── */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshPhongMaterial
          map={texture}
          shininess={7}
          specular={new THREE.Color(0x112244)}
          emissive={new THREE.Color(0x000d1f)}
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* ── Inner atmosphere glow ── */}
      <mesh>
        <sphereGeometry args={[R * 1.068, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          vertexShader={ATMO_VERT}
          fragmentShader={ATMO_FRAG}
          uniforms={atmo1}
        />
      </mesh>

      {/* ── Outer halo ── */}
      <mesh>
        <sphereGeometry args={[R * 1.22, 32, 32]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          vertexShader={ATMO_VERT}
          fragmentShader={ATMO_FRAG}
          uniforms={atmo2}
        />
      </mesh>

      {/* ── City markers (rotate with earth) ── */}
      {cityVecs.map((pos, i) => (
        <CityMarker key={i} position={pos} phase={i * 0.72} />
      ))}

      {/* ── Fly-lines (rotate with earth) ── */}
      {CONNECTIONS.map(([a, b], i) => (
        <FlyArc
          key={i}
          start={cityVecs[a]}
          end={cityVecs[b]}
          delay={i * 0.55}
        />
      ))}
    </group>
  );
}

/** Solid-color earth shown while texture loads */
function EarthFallback() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => { ref.current.rotation.y += dt * 0.055; });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[R, 48, 48]} />
        <meshPhongMaterial
          color={0x0a2a4a}
          emissive={0x001833}
          emissiveIntensity={0.4}
          shininess={5}
        />
      </mesh>
    </group>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function GlobeHero() {
  return (
    <Canvas
      camera={{ position: [-1.6, 0.4, 6.8], fov: 44, near: 0.1, far: 800 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]}    intensity={1.3} color={0xffffff} />
      <directionalLight position={[-4, -1, -4]} intensity={0.18} color={0x2244aa} />
      <pointLight       position={[0, 0, 8]}    intensity={0.2} color={0x00ccff} />

      <Stars />
      <OrbitalRings />

      <Suspense fallback={<EarthFallback />}>
        <EarthGroup />
      </Suspense>
    </Canvas>
  );
}
