import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createFresnelMaterial } from "./fresnelMat";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";

const EARTH_RADIUS = 2.2;
const EARTH_TILT = -23.4 * (Math.PI / 180); // authentic axial tilt

const EarthScene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    const container = canvasDiv.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // --- Renderer ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setLoading(100);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5.5);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x222233, 0.3);
    scene.add(ambientLight);

    // Sunlight from upper-right
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Subtle fill from opposite side
    const fillLight = new THREE.DirectionalLight(0x334466, 0.4);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    // --- Earth group (tilted) ---
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = EARTH_TILT;
    scene.add(earthGroup);

    // --- Texture loader ---
    const loader = new THREE.TextureLoader();
    const progress = setProgress((value: number) => setLoading(value));
    let texturesLoaded = 0;
    const totalTextures = 3;

    const onTextureLoad = () => {
      texturesLoaded++;
      const pct = Math.round((texturesLoaded / totalTextures) * 90);
      setLoading(pct);
      if (texturesLoaded === totalTextures) {
        progress.loaded().then(() => {
          setTimeout(() => setLoading(100), 500);
        });
      }
    };

    // --- Earth surface ---
    const earthGeom = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
    const earthMap = loader.load("/textures/earthmap.jpg", onTextureLoad);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthMap,
      bumpScale: 0.02,
      specular: new THREE.Color(0x333333),
      shininess: 15,
    });
    const earthMesh = new THREE.Mesh(earthGeom, earthMat);
    earthGroup.add(earthMesh);

    // --- City lights (dark side) ---
    const lightsMap = loader.load("/textures/earth_lights.jpg", onTextureLoad);
    const lightsMat = new THREE.MeshBasicMaterial({
      map: lightsMap,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
    });
    const lightsMesh = new THREE.Mesh(earthGeom, lightsMat);
    earthGroup.add(lightsMesh);

    // --- Cloud layer ---
    const cloudGeom = new THREE.SphereGeometry(EARTH_RADIUS * 1.01, 64, 64);
    const cloudMap = loader.load("/textures/earth_clouds.jpg", onTextureLoad);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
    earthGroup.add(cloudMesh);

    // --- Fresnel atmosphere glow ---
    const glowGeom = new THREE.SphereGeometry(EARTH_RADIUS * 1.15, 64, 64);
    const glowMat = createFresnelMaterial({
      rimColor: new THREE.Color(0x00d4ff), // hsl(190, 100%, 50%)
      rimPower: 2.8,
      opacity: 0.7,
    });
    const glowMesh = new THREE.Mesh(glowGeom, glowMat);
    earthGroup.add(glowMesh);

    // --- Outer glow ring (larger, softer) ---
    const outerGlowGeom = new THREE.SphereGeometry(EARTH_RADIUS * 1.3, 32, 32);
    const outerGlowMat = createFresnelMaterial({
      rimColor: new THREE.Color(0x00d4ff),
      rimPower: 4.0,
      opacity: 0.3,
    });
    const outerGlowMesh = new THREE.Mesh(outerGlowGeom, outerGlowMat);
    earthGroup.add(outerGlowMesh);

    // --- Animation ---
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Earth rotation
      earthMesh.rotation.y += 0.08 * delta;
      lightsMesh.rotation.y += 0.08 * delta;

      // Clouds rotate slightly faster
      cloudMesh.rotation.y += 0.12 * delta;

      // Glow subtle pulse
      glowMesh.rotation.y += 0.02 * delta;

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize handler ---
    const handleResize = () => {
      if (!canvasDiv.current) return;
      const r = canvasDiv.current.getBoundingClientRect();
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
      renderer.setSize(r.width, r.height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
      </div>
    </div>
  );
};

export default EarthScene;
