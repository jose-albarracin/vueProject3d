<template>
  <div
    class="custom-video custom-video-player"
    :class="classes"
    :id="domElement"
    v-on:pointerleave="ePointerleave"
    v-on:pointermove="ePointermove"
  >
    <div
      v-if="type == 'AnimationMixer'"
      id="parentThreeJS"
      class="w-full"
      :class="
        config.aspectRatio == 'panoramic' ? 'aspect-video' : 'aspect-[4/3]'
      "
    >
      <canvas class="" :id="domElement"></canvas>
    </div>

    <div v-if="type == 'lottieFiles'" class="w-full h-fit" :id="domElement" />
    <video
      v-if="type == 'videoPlayer'"
      :id="domElement"
      class="w-full custom-video-player-video"
      :src="source"
      v-on:click="toggleVideo"
    ></video>
    <audio
      v-if="type == 'audioPlayer'"
      :id="domElement"
      class="w-full custom-video-player-video"
      :src="source"
      controls
    ></audio>

    <div class="custom-video-player-controls">
      <div
        v-if="config.controls.progressBar"
        class="custom-video-progress"
        v-on:click="updateCurrentPos"
        v-on:pointerover="ePointerover"
        v-on:pointerdown="ePointerdown"
        v-on:pointerup="ePointerup"
        v-on:pointermove="ePointermove"
      >
        <div class="custom-video-progress-filled bg-blue-600"></div>
      </div>
      <div class="flex justify-start flex-wrap">
        <div
          v-if="config.controls.play"
          class="flex custom-video-player-button toggle self-center justify-center flex-1"
          v-on:click="toggleVideo"
        >
          <inline-svg
            v-if="playActive"
            src="icons/pause-solid.svg"
            height="15"
            fill="white"
            aria-label="Pause"
          >
          </inline-svg>
          <inline-svg
            v-if="!playActive"
            src="icons/play-solid.svg"
            height="15"
            fill="white"
            aria-label="Play"
          >
          </inline-svg>
        </div>
        <div
          v-if="config.controls.time"
          class="flex items-center justify-center mt-1 min-w-[70px]"
        >
          <span class="text-[0.7rem] font-semibold mb-0 text-white select-none">
            {{ currentTime }}
          </span>
          <span
            class="text-[0.7rem] font-semibold mb-0 text-white select-none"
            v-html="durationPlayer"
          >
          </span>
        </div>
        <div
          v-if="config.controls.volumen"
          class="custom-video-player-button toggle self-center justify-center pl-3"
          v-on:click="controlMute"
        >
          <inline-svg
            v-if="volumenValue == 0"
            src="icons/volume-xmark-solid.svg"
            height="15"
            fill="white"
            aria-label="Muted"
          ></inline-svg>
          <inline-svg
            v-if="volumenValue > 0.01 && volumenValue < 0.4"
            src="icons/volume-low-solid.svg"
            height="15"
            fill="white"
            aria-label="low"
          ></inline-svg>
          <inline-svg
            v-if="volumenValue >= 0.4 && volumenValue < 0.75"
            src="icons/volume-medium-solid.svg"
            height="15"
            fill="white"
            aria-label="medium"
          ></inline-svg>
          <inline-svg
            v-if="volumenValue >= 0.75"
            src="icons/volume-high-solid.svg"
            height="15"
            fill="white"
            aria-label="High"
          ></inline-svg>
        </div>
        <input
          v-if="config.controls.volumen"
          class="custom-video-player-slider flex-1 max-w-[100px]"
          type="range"
          name="volume"
          min="0"
          step="0.05"
          max="1"
          value="1"
          v-on:change="updateVol"
        />
      </div>
      <div
        v-if="config.controls.playbackRate"
        class="relative flex custom-video-player-button toggle self-center justify-center"
        v-on:click="activarRate"
      >
        <inline-svg
          src="icons/gauge-solid.svg"
          height="15"
          fill="white"
          aria-label="My image"
        ></inline-svg>
        <div
          v-if="playBackRateButtom"
          class="absolute bottom-[30px] px-79 px-md-50 bg-white flex flex-row md:flex-col items-center justify-center text-[0.9rem] font-medium text-gray-500 shadow-lg mb-3 playbackrate"
          style="min-width: max; letter-spacing: 0px !important"
        >
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 0.25 ? 'bg-[#4d49ef]' : ''"
            v-on:click="controlRate(0.25)"
          >
            <span class="mb-0 text-white">0.25</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 0.5 ? '!bg-[#4d49ef]' : ''"
            v-on:click="controlRate(0.5)"
          >
            <span class="mb-0 text-white">0.5</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 0.75 ? '!bg-[#4d49ef]' : ''"
            v-on:click="controlRate(0.75)"
          >
            <span class="mb-0 text-white">0.75</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 1 ? '!bg-[#4d49ef]' : ''"
            v-on:click="controlRate(1)"
          >
            <span class="mb-0 text-white">1</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 1.25 ? '!bg-[#4d49ef]' : ''"
            v-on:click="controlRate(1.25)"
          >
            <span class="mb-0 text-white">1.25</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 1.5 ? '!bg-[#4d49ef]' : ''"
            v-on:click="controlRate(1.5)"
          >
            <span class="mb-0 text-white">1.5</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 1.75 ? '!bg-[#4d49ef]' : ''"
            v-on:click="controlRate(1.75)"
          >
            <span class="mb-0 text-white">1.75</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="playBackRateValue == 2 ? '!bg-[#4d49ef]' : ''"
            v-on:click="controlRate(2)"
          >
            <span class="mb-0 text-white">2</span>
          </div>
        </div>
      </div>
      <div
        v-if="config.controls.backward"
        class="custom-video-player-button toggle self-center justify-center hidden md:flex"
        v-on:click="forwardAndBackward(-10)"
      >
        <inline-svg
          src="icons/backward-solid.svg"
          height="15"
          fill="white"
          aria-label="backward"
        ></inline-svg>
      </div>
      <div
        v-if="config.controls.forward"
        class="custom-video-player-button toggle self-center justify-center hidden md:flex"
        v-on:click="forwardAndBackward(10)"
      >
        <inline-svg
          src="icons/forward-solid.svg"
          height="15"
          fill="white"
          aria-label="forward"
        ></inline-svg>
      </div>
      <div
        class="custom-video-player-button toggle self-center justify-center hidden md:flex"
        v-on:click="goFullScreen"
      >
        <inline-svg
          src="icons/expand-solid.svg"
          height="15"
          fill="white"
          aria-label="fullscreen"
        ></inline-svg>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import InlineSvg from "vue-inline-svg";

import utils from "../util/MediaPlayer";

export default {
  name: "controlAnimations",
  components: { InlineSvg },
  props: {
    classes: String,
    type: String,
    source: String,
    domElement: String,
    width: Number,
    height: Number,
    config: Object,
  },
  data() {
    return {
      drag: undefined,
      grap: undefined,
      currentTime: "0:00",
      durationPlayer: "&nbsp;/&nbsp;0:00",
      playBackRateButtom: false,
      playActive: false,
      progression: undefined,
      StatusAudio: this.config.muted,
      valorOldVolume: 1,
      volumenValue: undefined,
      playBackRateValue: 1,
      //
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
      canvas: undefined,
      render: THREE.WebGLRenderer,
      animate: undefined,
      destroy: true,
      widthThreeJS: 1270,
      heightThreeJS: 720,
    };
  },
  methods: {
    controls(type, controlAction) {
      if (type == "lottieFiles") {
        return utils.controlsLottie(
          this.lottieAnimation,
          controlAction,
          this.valuePercentaje
        );
      }

      if (type == "videoPlayer") {
        return utils.controlsVideoPlayer(
          this.myVideo,
          controlAction,
          this.valuePercentaje
        );
      }
      if (type == "audioPlayer") {
        return utils.controlsAudioPlayer(
          this.myAudio,
          controlAction,
          this.valuePercentaje
        );
      }

      if (type == "AnimationMixer") {
        let controlsThreeJS = {
          play: () => {
            this.play = true;
          },
          pause: () => {
            this.pause = true;
          },
          backward: () => {
            this.backward = true;
          },
          forward: () => {
            this.forward = true;
          },
          percentaje: () => {
            this.isNewTime = true;
          },
        };

        return controlsThreeJS[`${controlAction}`]();
      }
    },

    initThreeJs() {
      const scene = new THREE.Scene();
      let clock = new THREE.Clock();
      let camera;
      let mixer;
      let duration;
      let animation;
      this.canvas = document.getElementById(`${this.domElement}`);
      let dataParent = document.getElementById(`parentThreeJS`);
      this.widthThreeJS = dataParent.clientWidth;
      this.heightThreeJS = dataParent.clientHeight;

      let resizeObserver = new ResizeObserver(() => {
        this.widthThreeJS = dataParent.clientWidth;
        this.heightThreeJS = this.widthThreeJS / this.aspectRatioToggle();
        this.render.setSize(this.widthThreeJS, this.heightThreeJS);
        render();
      });

      resizeObserver.observe(dataParent);

      let init = () => {
        camera = new THREE.PerspectiveCamera(
          75,
          this.aspectRatioToggle(),
          0.1,
          1000
        );

        this.render = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true,
          alpha: true,
        });

        const controls = new OrbitControls(camera, this.render.domElement);
        //controls.enableDamping = true;
        controls.screenSpacePanning = true;
        this.render.setSize(this.widthThreeJS, this.heightThreeJS);

        const { mode } = this.config;

        let loader = new GLTFLoader();
        loader.load(
          `${this.source}`,
          (gltf) => {
            if (mode == "static") {
              scene.add(gltf.scene);
              gltf.animations;
              gltf.scenes;
              gltf.cameras;
              gltf.asset;
            } else {
              mixer = new THREE.AnimationMixer(gltf.scene);
              animation = mixer.clipAction(gltf.animations[0]);
              duration = animation._clip.duration;
              this.duration = duration;
              animation.setLoop(THREE.LoopOnce);
              animation.clampWhenFinished = true;
              animation.timeScale = 1;
              animation.play();

              scene.add(gltf.scene);
            }
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
        light2.castShadow = true;
        scene.add(light2);

        camera.position.set(0, 0.5, 2.5);
        controls.target.set(0, 0, 0);

        controls.update();
      };

      let render = () => {
        this.render.render(scene, camera);
      };

      //Animation
      let animate = () => {
        const { mode } = this.config;
        if (this.destroy) requestAnimationFrame(animate);

        if (mode == "static") return render();

        if (this.isNewTime) {
          let percentageValue = this.duration * (this.valuePercentaje / 100);
          mixer.setTime(percentageValue);
          mixer._actions[0].time = percentageValue;

          animation.paused = false;
          mixer.timeScale = 1;

          this.isNewTime = false;
        }

        if (this.forward) {
          let percentage = duration * 0.1;

          let newtime =
            percentage + mixer._actions[0].time > duration
              ? duration
              : percentage + mixer._actions[0].time;

          mixer.setTime(newtime);
          mixer._actions[0].time = newtime;

          this.forward = false;
        }

        //Backward 10%
        if (this.backward) {
          let percentage = duration * 0.1;

          let newTime =
            mixer._actions[0].time - percentage < 0
              ? 0
              : mixer._actions[0].time - percentage;

          mixer.setTime(newTime);
          mixer._actions[0].time = newTime;
          animation.paused = false;
          mixer.timeScale = 1;

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

        //Mixer de animacion
        if (mixer) {
          if (Math.round(mixer.time) >= duration) {
            mixer._actions[0].time = duration;
            mixer.timeScale = 0;
          }
          mixer.update(clock.getDelta());
        }

        render();
      };

      init();

      animate();
    },

    aspectRatioToggle() {
      const { aspectRatio } = this.config;
      if (aspectRatio == "panoramic") {
        return 16 / 9;
      } else {
        return 4 / 3;
      }
    },
    controlRate(value) {
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      this.playBackRateValue = value;
      myVid.playbackRate = value;
    },

    updateVol() {
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      const controlVol = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-slider[name="volume"]`
      );

      this.playBackRateButtom = false;
      this.volumenValue = controlVol.value;
      this.StatusAudio = false;

      let volume = controlVol.value;
      myVid.volume = volume;
    },

    toggleVideo() {
      //console.log("me ejecuté")
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      //const controlPlay = this.$el.querySelector(".custom-video-player-button")
      this.playBackRateButtom = false;
      if (myVid.paused) {
        myVid.play();
        this.playActive = !this.playActive;
        //console.log(this.playActive)
        //controlPlay.innerHTML = "❚ ❚"
        this.updateProgress();
        this.progression = window.setInterval(this.updateProgress, 200);
      } else {
        myVid.pause();
        this.playActive = !this.playActive;
        //controlPlay.innerHTML = "►"
        clearInterval(this.progression);
      }
      //console.log(this.playActive)
    },

    updateCurrentPos(e) {
      // offset of the progress bar / video wrapper width
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      const vidWrapper = this.$el.parentElement.querySelector(
        `#${this.domElement}.custom-video`
      );

      const progressBar = this.$el.querySelector(
        `#${this.domElement} .custom-video-progress-filled`
      );

      this.playBackRateButtom = false;

      let newProgress =
        (e.clientX - vidWrapper.getBoundingClientRect().left) /
        vidWrapper.clientWidth;
      progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + "%";
      myVid.currentTime = newProgress * myVid.duration;

      this.currentTimeAndDuration();
    },
    updateProgress() {
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      const progressBar = this.$el.querySelector(
        `#${this.domElement} .custom-video-progress-filled`
      );

      let progress = myVid.currentTime / myVid.duration;
      progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + "%";

      this.currentTimeAndDuration();
    },

    currentTimeAndDuration() {
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      this.segundos = Math.floor(myVid.currentTime);

      this.minutos = Math.floor(this.segundos / 60);
      this.segundos = this.segundos - this.minutos * 60;

      let durationTotal = Math.floor(myVid.duration);

      this.durationPlayer =
        " &nbsp;/&nbsp;" +
        (durationTotal > 60 ? Math.floor(durationTotal / 60) : "0") +
        ":" +
        (durationTotal % 60);
      this.currentTime =
        this.minutos + ":" + this.segundos.toString().padStart(2, "0");

      //console.log("currentTime: ", this.currentTime)
      //console.log("Duration: ", this.duration)
    },

    activarRate() {
      this.playBackRateButtom = !this.playBackRateButtom;
    },

    forwardAndBackward(skip) {
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      this.playBackRateButtom = false;
      //console.log("VALOR skip", skip)
      let value = Number(skip);
      myVid.currentTime = myVid.currentTime + value;
    },

    controlMute() {
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      const controlVol = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-slider[name="volume"]`
      );
      this.StatusAudio = !this.StatusAudio;
      this.playBackRateButtom = false;

      if (this.StatusAudio) {
        //myVid.volume = volume

        this.valorOldVolume = myVid.volume;

        controlVol.value = 0;
        this.volumenValue = controlVol.value;
        myVid.volume = controlVol.value;
      } else {
        controlVol.value = this.valorOldVolume;
        this.volumenValue = controlVol.value;
        myVid.volume = this.valorOldVolume;
      }
    },
    goFullScreen() {
      const vidWrapper = this.$el.parentElement.querySelector(
        `#${this.domElement}.custom-video`
      );
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      this.playBackRateButtom = false;
      /*  if (myVid.webkitSupportsFullscreen) {myVid.webkitEnterFullScreen()} */
      //console.log("es fullscreen?", this.isFullScreen())
      if (this.isFullScreen()) {
        // ...exit fullscreen mode
        // (Note: this can only be called on myVid)
        //myVid.webkitCancelFullScreen()
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen)
          document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        this.setFullscreenData(false);
      } else {
        // ...otherwise enter fullscreen mode
        // (Note: can be called on myVid, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
        if (vidWrapper.requestFullscreen) vidWrapper.requestFullscreen();
        else if (vidWrapper.mozRequestFullScreen)
          vidWrapper.mozRequestFullScreen();
        else if (vidWrapper.webkitRequestFullScreen) {
          // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
          // ensures that our custom controls are visible:
          // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
          // figure[data-fullscreen=true] .controls { z-index:2147483647; }
          myVid.webkitRequestFullScreen();
        } else if (vidWrapper.msRequestFullscreen)
          vidWrapper.msRequestFullscreen();
        this.setFullscreenData(true);
      }
    },
    isFullScreen() {
      return !!(
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
      );
    },
    setFullscreenData(state) {
      const vidWrapper = this.$el.parentElement.querySelector(
        `#${this.domElement}.custom-video`
      );
      vidWrapper.setAttribute("data-fullscreen", !!state);
    },
    ePointerover() {
      this.drag = true;
      //console.log("entro", this.grap);
    },

    ePointerleave() {
      this.drag = true;
      this.grap = false;
      //  console.log("dejo", this.grap);
    },

    ePointerdown() {
      this.grap = this.drag;
      // console.log("valor grap", this.grap);
    },

    ePointerup() {
      this.grap = false;
      //console.log("solte", this.grap);
    },

    ePointermove(e) {
      if (this.drag && this.grap) {
        // console.log("actualicé", this.drag, this.grap);
        this.updateCurrentPos(e);
      }
    },
  },
  computed() {},

  mounted() {
    //ThreeJs
    if (this.type == "AnimationMixer") {
      this.initThreeJs();
    }
    //Lottie
    if (this.type == "lottieFiles") {
      this.lottieAnimation = utils.initLottie(this.domElement, this.source);
    }
    //Video
    if (this.type == "videoPlayer") {
      const myVid = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-video`
      );
      //Inicializacion de minutos

      this.minutos = 0;
      //Inicializacion de estado de audio inicial

      const controlVol = this.$el.querySelector(
        `#${this.domElement} .custom-video-player-slider[name="volume"]`
      );

      if (this.StatusAudio) {
        controlVol.value = 0;
        myVid.volume = controlVol.value;
      }

      //Inicializacion de estado de autoplay

      if (this.config.autoplay) {
        this.toggleVideo();
      }
      //Estado inicial del valor playBackRate
      this.playBackRateValue = 1;

      //Estado inicial del volumen
      if (this.config.controls.volumen) this.volumenValue = controlVol.value;
      this.myVideo = utils.initVideoPlayer(this.domElement);

      console.log("mi video: ", this.myVideo);
    }

    //Audio
    if (this.type == "audioPlayer") {
      this.myAudio = utils.initAudioPlayer(this.domElement);
    }
  },
  beforeUnmount() {
    if (this.type == "AnimationMixer") {
      this.canvas.parentElement.remove();
      this.render.forceContextLoss();
      this.render.dispose();
      this.destroy = false;
    }
  },
};
</script>
