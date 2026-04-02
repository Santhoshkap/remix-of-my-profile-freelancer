import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WireframeGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.5;
      pts.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }
    return pts;
  }, []);

  const dotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  return (
    <group ref={groupRef}>
      {/* Main wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="hsl(190, 100%, 50%)"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      {/* Inner sphere for depth */}
      <mesh>
        <sphereGeometry args={[1.48, 16, 16]} />
        <meshBasicMaterial
          color="hsl(190, 100%, 40%)"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
      {/* Data points on surface */}
      <points geometry={dotGeometry}>
        <pointsMaterial
          color="hsl(190, 100%, 60%)"
          size={0.03}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.005, 8, 64]} />
        <meshBasicMaterial color="hsl(190, 100%, 50%)" transparent opacity={0.2} />
      </mesh>
      {/* Tilted ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.6, 0.004, 8, 64]} />
        <meshBasicMaterial color="hsl(190, 100%, 50%)" transparent opacity={0.1} />
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
        <WireframeGlobe />
      </Canvas>
    </div>
  );
};

export default GlobeBackground;
