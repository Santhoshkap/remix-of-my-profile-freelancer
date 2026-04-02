import * as THREE from "three";
import gsap from "gsap";

/** Extract character sub-objects needed by multiple timelines */
function getCharacterParts(character: THREE.Object3D) {
  let screenLight: any = null;
  let monitor: any = null;

  character.children.forEach((object: any) => {
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
      screenLight = object;
    }
  });

  const neckBone = character.getObjectByName("spine005") || null;

  return { screenLight, monitor, neckBone };
}

/**
 * Landing section → hero fade-out, character rotation, about slide-in
 */
export function setLandingTimeline(
  character: THREE.Object3D,
  camera: THREE.PerspectiveCamera
) {
  return;
}

/**
 * About section → character zoom-out, monitor reveal, transition to "What I Deliver"
 */
export function setAboutToWhatTimeline(
  character: THREE.Object3D,
  camera: THREE.PerspectiveCamera
) {
  const { screenLight, monitor, neckBone } = getCharacterParts(character);

  // Set up screenlight flicker (always needed)
  if (screenLight) {
    let intensity = 0;
    setInterval(() => {
      intensity = Math.random();
    }, 200);
    gsap.timeline({ repeat: -1, repeatRefresh: true }).to(screenLight.material, {
      emissiveIntensity: () => intensity * 8,
      duration: () => Math.random() * 0.6,
      delay: () => Math.random() * 0.1,
    });
  }

  if (window.innerWidth > 1024) {
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "center 55%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl2
      .to(".character-model", { opacity: 1, duration: 1, delay: 2 }, 0)
      .to(
        camera.position,
        { z: 100, y: 10.0, duration: 6, delay: 2, ease: "power3.inOut" },
        0
      )
      .to(".about-section", { y: "30%", duration: 6 }, 0)
      .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: "-40%", delay: 2, duration: 5 },
        0
      )
      .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
      .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
      .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
      .to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
      .fromTo(
        ".what-box-in",
        { display: "none" },
        { display: "flex", duration: 0.1, delay: 6 },
        0
      )
      .fromTo(
        monitor.position,
        { y: -10, z: 2 },
        { y: 0, z: 0, delay: 1.5, duration: 3 },
        0
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );
  } else {
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

/**
 * "What I Do" section → character slide-up, section parallax
 */
export function setWhatIDoTimeline(
  character: THREE.Object3D
) {
  if (window.innerWidth <= 1024) return;

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "200% bottom",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  tl3
    .fromTo(
      ".character-model",
      { y: "0%" },
      { y: "-140%", duration: 8, ease: "none", delay: 3 },
      0
    )
    .fromTo(".whatIDO", { y: 0 }, { y: "8%", duration: 4 }, 0)
    .to(character.rotation, { x: -0.04, duration: 3, delay: 2 }, 0);
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
