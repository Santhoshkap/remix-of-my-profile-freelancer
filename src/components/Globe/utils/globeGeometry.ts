import * as THREE from "three";

const ACCENT = new THREE.Color("hsl(190, 100%, 50%)");
const ACCENT_DIM = new THREE.Color("hsl(190, 80%, 30%)");

/* ── helpers ── */
function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/* ── node positions ── */
export function generateNodePositions(count: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const lat = Math.random() * 160 - 80;
    const lon = Math.random() * 360 - 180;
    positions.push(latLonToVec3(lat, lon, radius));
  }
  return positions;
}

/* ── textured earth ── */
export function createTexturedEarth(
  radius: number,
  _earthTex: THREE.Texture,
  _glowTex: THREE.Texture
) {
  const group = new THREE.Group();

  // Wireframe sphere as primary visual
  const wireGeo = new THREE.SphereGeometry(radius, 48, 48);
  const wireMat = new THREE.MeshBasicMaterial({
    color: ACCENT_DIM,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });
  group.add(new THREE.Mesh(wireGeo, wireMat));

  // Solid inner sphere for depth
  const solidGeo = new THREE.SphereGeometry(radius * 0.98, 48, 48);
  const solidMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color("hsl(230, 25%, 7%)"),
    transparent: true,
    opacity: 0.85,
    shininess: 10,
  });
  group.add(new THREE.Mesh(solidGeo, solidMat));

  // Glow sprite
  const spriteMat = new THREE.SpriteMaterial({
    color: ACCENT,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(radius * 3.5, radius * 3.5, 1);
  group.add(sprite);

  const uniforms = { uTime: { value: 0 } };
  return { group, uniforms };
}

/* ── orbital rings ── */
export function createOrbitalRings(radius: number): THREE.Group {
  const group = new THREE.Group();
  const ringRadii = [radius * 1.15, radius * 1.3, radius * 1.45];
  ringRadii.forEach((r, i) => {
    const curve = new THREE.EllipseCurve(0, 0, r, r, 0, Math.PI * 2, false, 0);
    const pts = curve.getPoints(128);
    const geo = new THREE.BufferGeometry().setFromPoints(
      pts.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const mat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.08 + i * 0.03,
    });
    const ring = new THREE.Line(geo, mat);
    ring.rotation.x = Math.PI / 2 + (i - 1) * 0.2;
    ring.rotation.z = i * 0.3;
    group.add(ring);
  });
  return group;
}

/* ── nodes ── */
export function createNodes(positions: THREE.Vector3[]): THREE.Group {
  const group = new THREE.Group();
  const geo = new THREE.SphereGeometry(0.04, 8, 8);
  const mat = new THREE.MeshBasicMaterial({ color: ACCENT });
  positions.forEach((pos) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    group.add(mesh);
  });
  return group;
}

/* ── arcs between random node pairs ── */
export function createArcs(
  positions: THREE.Vector3[],
  count: number,
  radius: number
): { group: THREE.Group; curves: THREE.CubicBezierCurve3[] } {
  const group = new THREE.Group();
  const curves: THREE.CubicBezierCurve3[] = [];
  for (let i = 0; i < count; i++) {
    const a = positions[Math.floor(Math.random() * positions.length)];
    const b = positions[Math.floor(Math.random() * positions.length)];
    if (a === b) continue;
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(radius * 1.3);
    const curve = new THREE.CubicBezierCurve3(a, mid.clone(), mid.clone(), b);
    curves.push(curve);
    const pts = curve.getPoints(32);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.15,
    });
    group.add(new THREE.Line(geo, mat));
  }
  return { group, curves };
}

/* ── network lines ── */
export function createNetworkLines(
  positions: THREE.Vector3[],
  maxDist: number
): THREE.Group {
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({
    color: ACCENT,
    transparent: true,
    opacity: 0.06,
  });
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (positions[i].distanceTo(positions[j]) < maxDist) {
        const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
        group.add(new THREE.Line(geo, mat));
      }
    }
  }
  return group;
}

/* ── traveling dots ── */
export function createTravelingDots(count: number): THREE.Group {
  const group = new THREE.Group();
  const geo = new THREE.SphereGeometry(0.035, 6, 6);
  const mat = new THREE.MeshBasicMaterial({
    color: ACCENT,
    transparent: true,
    opacity: 0.8,
  });
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.visible = false;
    (mesh as any)._progress = Math.random();
    group.add(mesh);
  }
  return group;
}

/* ── particles ── */
export function createParticles(count: number, spread: number): THREE.Points {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: ACCENT,
    size: 0.04,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.Points(geo, mat);
}
