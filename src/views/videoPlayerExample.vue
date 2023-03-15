<template>
  <div class="container relative mx-auto py-4">
    <router-link to="/">
      <button
        class="z-10 bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6"
      >
        Home
      </button>
    </router-link>
    <div class="container max-w-6xl mx-auto">
      <div class="flex justify-center">
        <MediaPlayer
          classes="w-full"
          source="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          domElement="video2"
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
            autoplay: false,
            muted: false,
            loader: true,
          }"
        >
          <inline-svg
            src="images/loaderKlaus.svg"
            class="w-[50%] h-fit"
            fill="white"
            aria-label="fullscreen"
          ></inline-svg
        ></MediaPlayer>
      </div>
    </div>
  </div>
</template>

<script>
import MediaPlayer from "@/components/MediaPlayer.vue";
import InlineSvg from "vue-inline-svg";
export default {
  name: "videoPlayerExample",
  props: {},
  components: {
    MediaPlayer,
    InlineSvg,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
