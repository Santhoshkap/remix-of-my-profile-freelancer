import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/LoadingProvider";
import {
  createTexturedEarth,
  createOrbitalRings,
  createNodes,
  createArcs,
  createNetworkLines,
  createTravelingDots,
  createParticles,
  generateNodePositions,
} from "./utils/globeGeometry";
import { GlobeAnimator } from "./utils/globeAnimation";
import { setGlobeTimeline, setAllTimeline } from "../../components/utils/GsapScroll";

const GLOBE_RADIUS = 5;
const NODE_COUNT = 50;
const ARC_COUNT = 30;
const DOT_COUNT = 20;
const PARTICLE_COUNT = 300;

const Globe = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const { setIsLoading, setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    const rect = canvasDiv.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Renderer with tone mapping
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setLoading(100);
      setIsLoading(false);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    canvasDiv.current.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    // Scene
    const scene = new THREE.Scene();

    // Lighting — sunlight style
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambient);
    const sunLight = new THREE.DirectionalLight(0x0cd1eb, 0.6);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    const fillLight = new THREE.DirectionalLight(0x4390d1, 0.3);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    // Load textures then build
    const loader = new THREE.TextureLoader();
    const earthTexPromise = new Promise<THREE.Texture>((resolve) => {
      loader.load("/textures/earthmap.jpg", resolve, undefined, () => resolve(new THREE.Texture()));
    });
    const glowTexPromise = new Promise<THREE.Texture>((resolve) => {
      loader.load("/textures/glow.png", resolve, undefined, () => resolve(new THREE.Texture()));
    });

    let frameId: number;
    let animator: GlobeAnimator;
    let globe: THREE.Group;

    Promise.all([earthTexPromise, glowTexPromise]).then(([earthTex, glowTex]) => {
      if (!canvasDiv.current) return;

      globe = new THREE.Group();

      // Textured earth with shader
      const { group: earthGroup, uniforms: earthUniforms } = createTexturedEarth(GLOBE_RADIUS, earthTex, glowTex);
      globe.add(earthGroup);

      // Nodes & network
      const nodePositions = generateNodePositions(NODE_COUNT, GLOBE_RADIUS);
      const nodes = createNodes(nodePositions);
      const networkLines = createNetworkLines(nodePositions, 4);
      const { group: arcsGroup, curves } = createArcs(nodePositions, ARC_COUNT, GLOBE_RADIUS);
      const dots = createTravelingDots(DOT_COUNT);

      globe.add(nodes);
      globe.add(networkLines);
      globe.add(arcsGroup);
      globe.add(dots);

      // Orbital rings
      const orbitalRings = createOrbitalRings(GLOBE_RADIUS);
      globe.add(orbitalRings);

      scene.add(globe);

      // Particles
      const particles = createParticles(PARTICLE_COUNT, 22);
      scene.add(particles);

      // Earth tilt
      globe.rotation.x = -0.41; // ~23.4°

      // Animator
      animator = new GlobeAnimator(globe, nodes, dots, orbitalRings, curves, earthUniforms);

      // Scroll timelines
      setGlobeTimeline(globe, camera);
      setAllTimeline();

      // Mark loaded
      setLoading(100);
      setTimeout(() => setIsLoading(false), 800);

      // Animate
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animator.update();
        particles.rotation.y += 0.0002;
        renderer.render(scene, camera);
      };
      animate();
    });

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = -(e.clientY / window.innerHeight) * 2 + 1;
      if (animator) animator.setMouse(mx, my);
    };
    document.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      if (!canvasDiv.current) return;
      const r = canvasDiv.current.getBoundingClientRect();
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      scene.clear();
      renderer.dispose();
      if (canvasDiv.current) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="globe-model h-full w-full" ref={canvasDiv} />;
};

export default Globe;
