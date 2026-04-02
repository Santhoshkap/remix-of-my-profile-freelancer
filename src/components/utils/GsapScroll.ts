import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  let screenLight: any, monitor: any;
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.018") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#B0F5EA");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });

  let neckBone = character?.getObjectByName("spine005");

  if (window.innerWidth > 1024) {
    if (character) {
      // Single timeline: character appears only in the "What I Deliver" section
      const tlServices = gsap.timeline({
        scrollTrigger: {
          trigger: ".whatIDO",
          start: "top 80%",
          end: "200% bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Set character to desk pose immediately
      character.rotation.y = 0.92;
      character.rotation.x = 0.12;
      if (neckBone) neckBone.rotation.x = 0.6;
      camera.zoom = 1.4;
      camera.updateProjectionMatrix();

      tlServices
        // Fade in the character at the start of the services section
        .fromTo(
          ".character-model",
          { opacity: 0, x: "-40%", scale: 1, pointerEvents: "none" },
          { opacity: 1, scale: 0.85, duration: 2 },
          0
        )
        // Show monitor and screen light
        .to(monitor.material, { opacity: 1, duration: 1, delay: 0.5 }, 0)
        .to(screenLight.material, { opacity: 1, duration: 1, delay: 1 }, 0)
        // Show the cards
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 1.5 },
          0
        )
        // Exit: move character up and out
        .to(
          ".character-model",
          { y: "-140%", duration: 8, ease: "none", delay: 3 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "8%", duration: 4 }, 0)
        .to(character.rotation, { x: -0.04, duration: 3, delay: 2 }, 0);
    }
  } else {
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
