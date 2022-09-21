<template>
  <div
    class="py-2 flex gap-4 w-full justify-center items-center"
    :class="classes"
  >
    <button
      @click="
        () => {
          backward = true;

          type == 'lottieFiles' && controlsLottie();
          type == 'videoPlayer' && controlsVideoPlayer();
          type == 'audioPlayer' && controlsAudioPlayer();
        }
      "
      class="bg-blue-400 h-fit text-white border border-blue-400 hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-1 rounded"
    >
      backward
    </button>
    <button
      @click="
        () => {
          forward = true;
          type == 'lottieFiles' && controlsLottie();
          type == 'videoPlayer' && controlsVideoPlayer();
          type == 'audioPlayer' && controlsAudioPlayer();
        }
      "
      class="bg-blue-400 h-fit text-white border border-blue-400 hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-1 rounded"
    >
      forward
    </button>

    <button
      @click="
        () => {
          pause = true;
          type == 'lottieFiles' && controlsLottie();
          type == 'videoPlayer' && controlsVideoPlayer();
          type == 'audioPlayer' && controlsAudioPlayer();
        }
      "
      class="bg-blue-400 h-fit text-white border border-blue-400 hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-1 rounded"
    >
      Pause
    </button>
    <button
      @click="
        () => {
          play = true;
          type == 'lottieFiles' && controlsLottie();
          type == 'videoPlayer' && controlsVideoPlayer();
          type == 'audioPlayer' && controlsAudioPlayer();
        }
      "
      class="bg-blue-400 h-fit text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-1 rounded"
    >
      Play
    </button>
    <input
      class="p-3 border border-blue-400 h-8"
      type="number"
      v-model="valuePercentaje"
      @keyup.enter="percentateInput"
    />
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import lottie from "lottie-web";

export default {
  name: "controlAnimations",
  props: {
    classes: String,
    type: String,
    source: String,
    scene: undefined,
    domElement: String,
  },
  data() {
    return {
      time: undefined,
      timeAction: false,
      forward: false,
      backward: false,
      play: false,
      duration: undefined,
      pause: false,
      valuePercentaje: undefined,
      isNewTime: false,
      lottieAnimation: undefined,
      myVideo: undefined,
      myAudio: undefined,
    };
  },
  methods: {
    initThreeJs() {
      //let action = this.timeAction;

      const scene = new THREE.Scene();
      let clock = new THREE.Clock();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const canvas = document.getElementById(`${this.domElement}`);
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      });
      const controls = new OrbitControls(camera, renderer.domElement);
      //controls.enableDamping = true;
      controls.screenSpacePanning = true;
      renderer.setSize(window.innerWidth, window.innerHeight);

      let mixer;
      let duration;
      //let modelReady = false;

      //console.log("source?: ", this.source);

      const loader = new GLTFLoader();
      loader.load(
        `${this.source}`,
        (gltf) => {
          mixer = new THREE.AnimationMixer(gltf.scene);
          // console.log("asdas: ", gltf.animations);

          let animation = mixer.clipAction(gltf.animations[0]);

          duration = animation._clip.duration;
          this.duration = duration;
          //animation.setLoop(THREE.LoopOnce);
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

      let light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 0, 10);
      light.castShadow = true;
      scene.add(light);

      let light2 = new THREE.DirectionalLight(0xffffff);
      light2.position.set(0, 0, -10);
      light.castShadow = true;
      scene.add(light2);

      //camera.position.z = 5;
      //camera.position.y = 1;
      camera.position.set(0, 0.5, 2.5);
      controls.target.set(0, 0, 0);

      //camera.rotation.set(100, 100, 100);
      controls.update();

      window.addEventListener("resize", onWindowResize, false);
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
      }

      let animate = () => {
        requestAnimationFrame(animate);
        //console.log("mixer: ", mixer);
        //Forward 10%
        // console.log("mixer._actions[0].time fuera: ", mixer._actions[0].time);
        //isNewTime;
        if (this.isNewTime) {
          let percentageValue = this.duration * (this.valuePercentaje / 100);
          mixer._actions[0].time = percentageValue;
          this.isNewTime = false;
        }

        if (this.forward) {
          let newTime = mixer._actions[0].time * 0.1;

          mixer._actions[0].time =
            newTime + mixer._actions[0].time > duration
              ? duration
              : newTime + mixer._actions[0].time;

          this.forward = false;
        }

        //Backward 10%
        if (this.backward) {
          let percentage = mixer._actions[0].time * 0.1;
          let newTime = mixer._actions[0].time - percentage;

          mixer._actions[0].time = newTime;

          /*  console.log(
            "Tiempo Suministrado hacia atras: ",
            mixer._actions[0].time
          );
          console.log("percentage: ", percentage); */

          this.backward = false;
        }

        //Pause animation
        if (this.pause) {
          mixer.timeScale = 0;
          this.pause = false;
        }

        //Play animation
        if (this.play) {
          mixer.timeScale = 1;
          this.play = false;
        }
        if (Math.round(mixer ? mixer._actions[0].time : 0) == duration) return;
        if (mixer) {
          //console.log("mixer: ", Math.round(mixer._actions[0].time));

          mixer.update(clock.getDelta());
          //mixer.setTime(0);
        }

        render();
      };
      animate();
      function render() {
        renderer.render(scene, camera);
      }
    },
    percentateInput() {
      // let percentageValue = this.duration * (this.valuePercentaje / 100);
      //console.log("value:", percentageValue);
      this.isNewTime = true;

      if (this.type == "lottieFiles") {
        let totalFrames = this.lottieAnimation.totalFrames;

        let newFrame = totalFrames * (this.valuePercentaje / 100);
        this.lottieAnimation.goToAndPlay(newFrame, true);
      }

      if (this.type == "videoPlayer") {
        let duration = this.myVideo.duration;

        let newTime = duration * (this.valuePercentaje / 100);
        this.myVideo.currentTime = newTime;
        this.myVideo.play();
      }
      if (this.type == "audioPlayer") {
        let duration = this.myAudio.duration;

        let newTime = duration * (this.valuePercentaje / 100);
        this.myAudio.currentTime = newTime;
        this.myAudio.play();
      }
    },
    initLottie() {
      this.lottieAnimation = lottie.loadAnimation({
        container: document.getElementById(`${this.domElement}`), // the dom element that will contain the animation
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: `${this.source}`, // the path to the animation json
      });

      // this.lottieAnimation.addEventListener("DOMLoaded", onDOMLoaded);
      console.log("this.lottieAnimation: ", this.lottieAnimation);
    },

    controlsLottie() {
      let currentFrame = this.lottieAnimation.currentFrame;
      let totalFrames = this.lottieAnimation.totalFrames;

      if (this.backward) {
        let percentageFrame = totalFrames * 0.1;
        let newFrame =
          currentFrame - percentageFrame < 0
            ? 0
            : currentFrame - percentageFrame;
        this.lottieAnimation.goToAndPlay(newFrame, true);
        this.backward = false;
        console.log("por aqui no");
      }

      if (this.forward) {
        let percentageFrame = totalFrames * 0.1;
        let newFrame =
          currentFrame + percentageFrame > totalFrames
            ? totalFrames
            : currentFrame + percentageFrame;
        this.lottieAnimation.goToAndPlay(newFrame, true);
        this.forward = false;
      }

      if (this.play) {
        this.lottieAnimation.play();
        this.play = false;
      }

      if (this.pause) {
        this.lottieAnimation.pause();
        this.pause = false;
      }
      // console.log("total Frames: ", this.lottieAnimation.totalFrames);
    },

    initVideoPlayer() {
      const myVideo = document.querySelector(`video.${this.domElement}`);
      this.myVideo = myVideo;
      //console.log("Elemen dom: ", myVideo);
    },

    controlsVideoPlayer() {
      //const myVideo = document.querySelector("video.videoExample");
      if (this.play) {
        this.myVideo.play();
        this.play = false;
      }

      if (this.pause) {
        this.myVideo.pause();
        this.pause = false;
      }

      if (this.forward) {
        let percentage = this.myVideo.duration * 0.1;
        let newTime = this.myVideo.currentTime + percentage;

        //console.log("duraion via data: ", (this.myVideo.currentTime = newTime));
        this.myVideo.currentTime = newTime;
        this.myVideo.play();
        this.forward = false;
      }

      if (this.backward) {
        let percentage = this.myVideo.duration * 0.1;
        let newTime =
          this.myVideo.currentTime - percentage < 0
            ? 0
            : this.myVideo.currentTime - percentage;

        this.myVideo.currentTime = newTime;
        this.myVideo.play();
        this.backward = false;
      }
    },

    initAudioPlayer() {
      const myAudio = document.querySelector(`audio.${this.domElement}`);
      this.myAudio = myAudio;
      //console.log("Elemen dom: ", myAudio);
    },

    controlsAudioPlayer() {
      //const myAudio = document.querySelector("video.videoExample");
      if (this.play) {
        this.myAudio.play();
        this.play = false;
      }

      if (this.pause) {
        this.myAudio.pause();
        this.pause = false;
      }

      if (this.forward) {
        let percentage = this.myAudio.duration * 0.1;
        let newTime = this.myAudio.currentTime + percentage;

        //console.log("duraion via data: ", (this.myAudio.currentTime = newTime));
        this.myAudio.currentTime = newTime;
        this.myAudio.play();
        this.forward = false;
      }

      if (this.backward) {
        let percentage = this.myAudio.duration * 0.1;
        let newTime =
          this.myAudio.currentTime - percentage < 0
            ? 0
            : this.myAudio.currentTime - percentage;

        this.myAudio.currentTime = newTime;
        this.myAudio.play();
        this.backward = false;
      }
    },
  },
  computed() {},

  mounted() {
    if (this.type == "AnimationMixer") this.initThreeJs();
    if (this.type == "lottieFiles") this.initLottie();
    if (this.type == "videoPlayer") this.initVideoPlayer();
    if (this.type == "audioPlayer") this.initAudioPlayer();
  },
};
</script>
