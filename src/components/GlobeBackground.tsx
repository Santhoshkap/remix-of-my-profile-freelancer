import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const EARTH_NIGHT_URL = "https://unpkg.com/three-globe/example/img/earth-night.jpg";
const EARTH_BUMP_URL = "https://unpkg.com/three-globe/example/img/earth-topology.png";

const AtmosphereGlow = () => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.0, 0.85, 1.0, intensity * 0.6);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const RealisticGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nightMap = useLoader(THREE.TextureLoader, EARTH_NIGHT_URL);
  const bumpMap = useLoader(THREE.TextureLoader, EARTH_BUMP_URL);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Tint the night texture with cyan on the GPU via onBeforeCompile
  const earthMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: nightMap,
      bumpMap: bumpMap,
      bumpScale: 0.03,
      emissiveMap: nightMap,
      emissive: new THREE.Color("hsl(190, 100%, 50%)"),
      emissiveIntensity: 1.2,
      roughness: 0.85,
      metalness: 0.1,
    });
    return mat;
  }, [nightMap, bumpMap]);

  return (
    <group ref={groupRef}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>

      {/* Atmosphere glow */}
      <AtmosphereGlow />

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.004, 8, 128]} />
        <meshBasicMaterial color="hsl(190, 100%, 50%)" transparent opacity={0.15} />
      </mesh>

      {/* Tilted orbital ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.72, 0.003, 8, 128]} />
        <meshBasicMaterial color="hsl(190, 100%, 50%)" transparent opacity={0.08} />
      </mesh>
    </group>
  );
};

const GlobeBackground = () => {
  return (
    <div className="landing-globe">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 3, 5]} intensity={0.8} color="hsl(190, 100%, 70%)" />
        <RealisticGlobe />
      </Canvas>
    </div>
  );
};

export default GlobeBackground;
