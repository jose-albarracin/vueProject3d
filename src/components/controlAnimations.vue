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
      v-on:click="controls(type, 'play')"
      :autoplay="config.autoplay"
      :muted="MediaPlayer[`${domElement}_klausPlayer`]?.StatusAudio"
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
          v-on:click="controls(type, 'play')"
        >
          <inline-svg
            v-if="MediaPlayer[`${domElement}_klausPlayer`]?.playActive"
            src="icons/pause-solid.svg"
            height="15"
            fill="white"
            aria-label="Pause"
          >
          </inline-svg>
          <inline-svg
            v-if="!MediaPlayer[`${domElement}_klausPlayer`]?.playActive"
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
            {{ MediaPlayer[`${domElement}_klausPlayer`]?.currentTime }}
          </span>
          <span
            class="text-[0.7rem] font-semibold mb-0 text-white select-none"
            v-html="MediaPlayer[`${domElement}_klausPlayer`]?.durationPlayer"
          >
          </span>
        </div>
        <div
          v-if="config.controls.volumen"
          class="custom-video-player-button toggle self-center justify-center pl-3"
          v-on:click="controls(type, 'mute')"
        >
          <inline-svg
            v-if="MediaPlayer[`${domElement}_klausPlayer`]?.volumenValue == 0"
            src="icons/volume-xmark-solid.svg"
            height="15"
            fill="white"
            aria-label="Muted"
          ></inline-svg>
          <inline-svg
            v-if="
              MediaPlayer[`${domElement}_klausPlayer`]?.volumenValue > 0.01 &&
              MediaPlayer[`${domElement}_klausPlayer`]?.volumenValue < 0.4
            "
            src="icons/volume-low-solid.svg"
            height="15"
            fill="white"
            aria-label="low"
          ></inline-svg>
          <inline-svg
            v-if="
              MediaPlayer[`${domElement}_klausPlayer`]?.volumenValue >= 0.4 &&
              MediaPlayer[`${domElement}_klausPlayer`]?.volumenValue < 0.75
            "
            src="icons/volume-medium-solid.svg"
            height="15"
            fill="white"
            aria-label="medium"
          ></inline-svg>
          <inline-svg
            v-if="
              MediaPlayer[`${domElement}_klausPlayer`]?.volumenValue >= 0.75
            "
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
          v-on:change="controls(type, 'updateVolume')"
        />
      </div>
      <div
        v-if="config.controls.playbackRate"
        class="relative flex custom-video-player-button toggle self-center justify-center"
        v-on:click="controls(type, 'activeRate')"
      >
        <inline-svg
          src="icons/gauge-solid.svg"
          height="15"
          fill="white"
          aria-label="My image"
        ></inline-svg>
        <div
          v-if="MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateButtom"
          class="absolute bottom-[30px] px-79 px-md-50 bg-white flex flex-row md:flex-col items-center justify-center text-[0.9rem] font-medium text-gray-500 shadow-lg mb-3 playbackrate"
          style="min-width: max; letter-spacing: 0px !important"
        >
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue ==
              0.25
                ? 'bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 0.25)"
          >
            <span class="mb-0 text-white">0.25</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue == 0.5
                ? '!bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 0.5)"
          >
            <span class="mb-0 text-white">0.5</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue ==
              0.75
                ? '!bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 0.75)"
          >
            <span class="mb-0 text-white">0.75</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue == 1
                ? '!bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 1)"
          >
            <span class="mb-0 text-white">1</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue ==
              1.25
                ? '!bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 1.25)"
          >
            <span class="mb-0 text-white">1.25</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue == 1.5
                ? '!bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 1.5)"
          >
            <span class="mb-0 text-white">1.5</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue ==
              1.75
                ? '!bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 1.75)"
          >
            <span class="mb-0 text-white">1.75</span>
          </div>
          <div
            class="w-full px-4 py-3 buttom-rate"
            :class="
              MediaPlayer[`${domElement}_klausPlayer`]?.playBackRateValue == 2
                ? '!bg-[#4d49ef]'
                : ''
            "
            v-on:click="controls(type, 'rate', 2)"
          >
            <span class="mb-0 text-white">2</span>
          </div>
        </div>
      </div>
      <div
        v-if="config.controls.backward"
        class="custom-video-player-button toggle self-center justify-center hidden md:flex"
        v-on:click="controls(type, 'forwardBackward', -10)"
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
        v-on:click="controls(type, 'forwardBackward', 10)"
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
        v-on:click="controls(type, 'fullscreen')"
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
import { mapGetters, mapActions } from "vuex";

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
    ...mapActions(["UPDATE_STATE"]),
    controls(type, controlAction, params) {
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
          this.domElement,
          params
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

    ePointermove(event) {
      if (this.drag && this.grap) {
        this.controls(this.type, "updateCurrentProgress", event);
      }
    },
  },
  computed: {
    ...mapGetters(["MediaPlayer"]),
  },

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
      this.myVideo = utils.initVideoPlayer(this.domElement, this.config);
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
    if (this.type == "videoPlayer") {
      clearInterval(
        this.MediaPlayer[`${this.domElement}_klausPlayer`].progression
      );
      this.$store.dispatch("UPDATE_state", {
        key: `${this.domElement}_klausPlayer`,
        val: undefined,
      });
    }
  },
};
</script>
