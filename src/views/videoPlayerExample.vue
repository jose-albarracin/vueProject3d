<template>
  <div class="container relative mx-auto py-4">
    <router-link to="/">
      <button
        class="z-10 bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6"
      >
        Home
      </button>
    </router-link>
    <div class="flex justify-center"></div>
    <ControlAnimations
      classes="w-full "
      source="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      domElement="video1"
      type="videoPlayer"
      :config="{
        controls: {
          play: true,
          volumen: true,
          backward: true,
          forward: true,
          fullscreen: true,
          playbackRate: true,
          progressBar: true,
          time: true,
        },
        loop: true,
      }"
    ></ControlAnimations>
  </div>
</template>

<script>
import ControlAnimations from "@/components/controlAnimations.vue";
export default {
  name: "videoPlayerExample",
  props: {},
  components: {
    ControlAnimations,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
