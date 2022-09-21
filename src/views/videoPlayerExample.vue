<template>
  <div class="container relative mx-auto py-4">
    <router-link to="/">
      <button
        class="z-10 bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6"
      >
        Home
      </button>
    </router-link>
    <div class="flex justify-center">
      <video
        id="videoExample"
        class="videoExample"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      ></video>
    </div>
    <controlAnimations
      type="videoPlayer"
      domElement="videoExample"
    ></controlAnimations>
  </div>
</template>

<script>
import controlAnimations from "@/components/controlAnimations.vue";
export default {
  name: "videoPlayerExample",
  props: {},
  components: {
    controlAnimations,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
