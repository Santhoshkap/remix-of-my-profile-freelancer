import * as THREE from "three";

export class GlobeAnimator {
  private globe: THREE.Group;
  private nodes: THREE.Group;
  private dots: THREE.Group;
  private rings: THREE.Group;
  private curves: THREE.CubicBezierCurve3[];
  private uniforms: { uTime: { value: number } };
  private mouseX = 0;
  private mouseY = 0;
  private clock = new THREE.Clock();

  constructor(
    globe: THREE.Group,
    nodes: THREE.Group,
    dots: THREE.Group,
    rings: THREE.Group,
    curves: THREE.CubicBezierCurve3[],
    uniforms: { uTime: { value: number } }
  ) {
    this.globe = globe;
    this.nodes = nodes;
    this.dots = dots;
    this.rings = rings;
    this.curves = curves;
    this.uniforms = uniforms;
  }

  setMouse(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  update() {
    const elapsed = this.clock.getElapsedTime();
    this.uniforms.uTime.value = elapsed;

    // Slow auto-rotation
    this.globe.rotation.y += 0.001;

    // Subtle mouse influence
    this.globe.rotation.y += this.mouseX * 0.0005;
    this.globe.rotation.x += this.mouseY * 0.0003;

    // Animate traveling dots along curves
    this.dots.children.forEach((dot, i) => {
      if (this.curves.length === 0) return;
      const curve = this.curves[i % this.curves.length];
      const prog = (dot as any)._progress as number;
      const newProg = (prog + 0.002) % 1;
      (dot as any)._progress = newProg;
      const pt = curve.getPoint(newProg);
      dot.position.copy(pt);
      dot.visible = true;
    });

    // Rotate orbital rings
    this.rings.children.forEach((ring, i) => {
      ring.rotation.y = elapsed * 0.05 * (i % 2 === 0 ? 1 : -1);
    });

    // Pulse nodes
    const pulse = Math.sin(elapsed * 2) * 0.3 + 0.7;
    this.nodes.children.forEach((node) => {
      node.scale.setScalar(pulse);
    });
  }
}
