<template>
  <div class="container relative mx-auto min-h-screen">
    <router-link to="/">
      <button
        class="bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6"
      >
        Home
      </button>
    </router-link>
    <div class="flex w-full flex-col h-screen items-center justify-center">
      <div class="flex w-full justify-center">
        <MediaPlayer
          classes="w-1/2 aspect-video"
          source="http://physical-authority.surge.sh/music/2.mp3"
          domElement="Audio1"
          type="audioPlayer"
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
            autoplay: true,
            muted: false,
          }"
        ></MediaPlayer>
      </div>
    </div>
  </div>
</template>

<script>
import MediaPlayer from "@/components/MediaPlayer.vue";
export default {
  name: "audioPlayerExample",
  props: {},
  components: {
    MediaPlayer,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
