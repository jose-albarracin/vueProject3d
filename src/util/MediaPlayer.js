import lottie from "lottie-web";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function initLottie(element, source) {
  console.log({ element, source });
  return lottie.loadAnimation({
    container: document.getElementById(`${element}`),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: `${source}`,
  });
}

function initVideoPlayer(element) {
  return document.querySelector(`video.${element}`);
}

function initAudioPlayer(element) {
  return document.querySelector(`audio.${element}`);
}

function initThreeJs(
  element,
  source,
  newTime,
  backward,
  forward,
  play,
  pause,
  destroy = true
) {
  let renderThreeJS = THREE.WebGLRenderer;
  let clock = new THREE.Clock();
  let camera;
  let mixer;
  let duration;
  let animation;

  const scene = new THREE.Scene();
  let init = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let canvas = document.getElementById(`${element}`);

    renderThreeJS = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    //renderer =renderThreeJS ;
    const controls = new OrbitControls(camera, renderThreeJS.domElement);
    //controls.enableDamping = true;
    controls.screenSpacePanning = true;
    renderThreeJS.setSize(window.innerWidth, window.innerHeight);

    let loader = new GLTFLoader();
    loader.load(
      `${source}`,
      (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene);
        animation = mixer.clipAction(gltf.animations[0]);

        duration = animation._clip.duration;

        animation.setLoop(THREE.LoopOnce);
        animation.clampWhenFinished = true;
        animation.timeScale = 1;
        animation.play();

        scene.add(gltf.scene);
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened: ", error);
      }
    );

    //loader = null;

    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 10);
    light.castShadow = true;
    scene.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0, 0, -10);
    light.castShadow = true;
    scene.add(light2);

    camera.position.set(0, 0.5, 2.5);
    controls.target.set(0, 0, 0);

    controls.update();

    let onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderThreeJS.setSize(window.innerWidth, window.innerHeight);
      render();
    };

    //Event resize
    window.addEventListener("resize", onWindowResize, false);
  };

  let render = () => {
    renderThreeJS.render(scene, camera);
  };

  //Animation
  let animate = () => {
    if (destroy) requestAnimationFrame(animate);

    //Al cumplir la duracion retorna

    if (mixer) {
      if (Math.round(mixer.time) >= duration) {
        // mixer.setTime(duration);
        mixer._actions[0].time = duration;
        mixer.timeScale = 0;
        //console.log("mixer from bucle: ", mixer.time);
      }
      mixer.update(clock.getDelta());
      //mixer.setTime(0);
      // console.log("mixer: ", mixer.time);
    }

    //console.log("render: ", renderThreeJS);
    render();
  };

  init();

  animate();
}
//CONTROLS

function controlsLottie(lottie, control, valuePercentaje) {
  let currentFrame = lottie.currentFrame;
  let totalFrames = lottie.totalFrames;

  if (control == "play") {
    lottie.play();
    return;
  }

  if (control == "pause") {
    lottie.pause();
    return;
  }

  if (control == "backward") {
    let percentageFrame = totalFrames * 0.1;
    let newFrame =
      currentFrame - percentageFrame < 0 ? 0 : currentFrame - percentageFrame;
    lottie.goToAndPlay(newFrame, true);
    return;
  }

  if (control == "forward") {
    let percentageFrame = totalFrames * 0.1;
    let newFrame =
      currentFrame + percentageFrame > totalFrames
        ? totalFrames
        : currentFrame + percentageFrame;
    lottie.goToAndPlay(newFrame, true);
    return;
  }

  if (control == "percentaje") {
    let totalFrames = lottie.totalFrames;

    let newFrame = totalFrames * (valuePercentaje / 100);
    lottie.goToAndPlay(newFrame, true);
    return;
  }
}

function controlsVideoPlayer(videoPlayer, control, valuePercentaje) {
  //const myVideo = document.querySelector("video.videoExample");
  if (control == "play") {
    videoPlayer.play();
    return;
  }

  if (control == "pause") {
    videoPlayer.pause();
    return;
  }

  if (control == "forward") {
    let percentage = videoPlayer.duration * 0.1;
    let newTime = videoPlayer.currentTime + percentage;

    videoPlayer.currentTime = newTime;
    videoPlayer.play();
    return;
  }

  if (control == "backward") {
    let percentage = videoPlayer.duration * 0.1;
    let newTime =
      videoPlayer.currentTime - percentage < 0
        ? 0
        : videoPlayer.currentTime - percentage;

    videoPlayer.currentTime = newTime;
    videoPlayer.play();
    return;
  }

  if (control == "percentaje") {
    let duration = videoPlayer.duration;

    let newTime = duration * (valuePercentaje / 100);
    videoPlayer.currentTime = newTime;
    videoPlayer.play();
    return;
  }
}

export default {
  initLottie,
  initVideoPlayer,
  initAudioPlayer,
  initThreeJs,

  controlsLottie,
  controlsVideoPlayer,
};
