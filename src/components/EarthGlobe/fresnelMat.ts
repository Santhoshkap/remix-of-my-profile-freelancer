import * as THREE from "three";

/**
 * Creates a Fresnel-based atmosphere glow shader material.
 * The glow is strongest at the edges (rim) of the sphere.
 */
export function createFresnelMaterial(options?: {
  rimColor?: THREE.Color;
  facingColor?: THREE.Color;
  rimPower?: number;
  opacity?: number;
}): THREE.ShaderMaterial {
  const {
    rimColor = new THREE.Color(0x00d4ff), // hsl(190, 100%, 50%)
    facingColor = new THREE.Color(0x000000),
    rimPower = 2.5,
    opacity = 0.8,
  } = options || {};

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 rimColor;
    uniform vec3 facingColor;
    uniform float rimPower;
    uniform float glowOpacity;
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() {
      float rim = 1.0 - max(0.0, dot(vNormal, vPositionNormal));
      float intensity = pow(rim, rimPower);
      vec3 color = mix(facingColor, rimColor, intensity);
      gl_FragColor = vec4(color, intensity * glowOpacity);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      rimColor: { value: rimColor },
      facingColor: { value: facingColor },
      rimPower: { value: rimPower },
      glowOpacity: { value: opacity },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  });
}
