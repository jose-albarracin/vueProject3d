<template>
  <div class="scene relative bg-gray-500">
    <router-link to="/">
      <button
        class="bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6"
      >
        Home
      </button>
    </router-link>
    <canvas id="myCanvas"></canvas>

    <ControlAnimations
      classes="absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-[100%]  bg-black/80"
      source="models/buster_drone/scene.gltf"
      domElement="myCanvas"
      type="AnimationMixer"
    ></ControlAnimations>
  </div>
</template>

<script>
import ControlAnimations from "@/components/controlAnimations.vue";

export default {
  name: "exampleFour",
  components: {
    ControlAnimations,
  },
  props: {
    msg: String,
    scene: undefined,
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
    };
  },
  methods: {},
  computed() {},

  mounted() {},
};
</script>
