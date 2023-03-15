<template>
  <div class="container mx-auto relative min-h-screen">
    <router-link to="/">
      <button
        class="bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6"
      >
        Home
      </button>
    </router-link>
    <div class="flex justify-center items-center h-full">
      <MediaPlayer
        classes="w-1/2"
        source="/lottieFiles/72765-work-from-home.json"
        domElement="lotte1"
        type="lottieFiles"
        :config="{
          controls: {
            play: true,
            volumen: false,
            backward: true,
            forward: true,
            fullscreen: true,
            playbackRate: true,
            progressBar: true,
            time: true,
          },
          loop: true,
          autoplay: true,
          muted: false,
          loader: true,
        }"
        ><inline-svg
          src="images/loaderKlaus.svg"
          class="w-[50%] h-fit"
          fill="white"
          aria-label="loader"
        ></inline-svg
      ></MediaPlayer>
    </div>
  </div>
</template>

<script>
import MediaPlayer from "@/components/MediaPlayer.vue";
import InlineSvg from "vue-inline-svg";
export default {
  name: "lottieExample0",
  components: {
    MediaPlayer,
    InlineSvg,
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed() {},
  mounted() {},
};
</script>
