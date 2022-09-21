<template>
  <div class="container relative mx-auto min-h-screen">
    <router-link to="/">
      <button
        class="bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6"
      >
        Home
      </button>
    </router-link>
    <div class="flex flex-col h-screen items-center justify-center">
      <div class="flex justify-center">
        <audio
          id="audioPlayer"
          class="audioPlayer mb-4"
          src="http://physical-authority.surge.sh/music/2.mp3"
          controls
        ></audio>
      </div>
      <controlAnimations
        type="audioPlayer"
        domElement="audioPlayer"
      ></controlAnimations>
    </div>
  </div>
</template>

<script>
import controlAnimations from "@/components/controlAnimations.vue";
export default {
  name: "audioPlayerExample",
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
