<template>
  <div class="relative" :class="classes">
    <div
      id="parentThreeJS"
      class="w-full"
      :class="
        config.aspectRatio == 'panoramic' ? 'aspect-video' : 'aspect-[4/3]'
      "
    >
      <canvas class="" :id="domElement"></canvas>
    </div>

    <div
      class="py-2 hidden md:flex gap-4 w-full justify-center items-center absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-[100%] bg-black/80"
    >
      <button
        @click="
          () => {
            controls(type, 'backward');
          }
        "
        class="bg-blue-400 h-fit text-white border border-blue-400 hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-1 rounded"
      >
        backward
      </button>

      <button
        @click="
          () => {
            controls(type, 'forward');
          }
        "
        class="bg-blue-400 h-fit text-white border border-blue-400 hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-1 rounded"
      >
        forward
      </button>

      <button
        @click="
          () => {
            controls(type, 'pause');
          }
        "
        class="bg-blue-400 h-fit text-white border border-blue-400 hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-1 rounded"
      >
        Pause
      </button>

      <button
        @click="
          () => {
            controls(type, 'play');
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
        @keyup.enter="controls(type, 'percentaje')"
      />
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import utils from "../util/MediaPlayer";

export default {
  name: "controlAnimations",
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
  },
  computed() {},

  mounted() {
    if (this.type == "AnimationMixer") {
      this.initThreeJs();
    }
    if (this.type == "lottieFiles") {
      this.lottieAnimation = utils.initLottie(this.domElement, this.source);
    }
    if (this.type == "videoPlayer") {
      this.myVideo = utils.initVideoPlayer(this.domElement);
    }
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
