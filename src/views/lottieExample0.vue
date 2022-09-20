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
      <div class="w-9/12 h-fit" id="lottie2" />
    </div>
    <controlAnimations
      type="lottieFiles"
      source="/lottieFiles/72765-work-from-home.json"
      domElement="lottie2"
    ></controlAnimations>
  </div>
</template>

<script>
import controlAnimations from "@/components/controlAnimations.vue";
export default {
  name: "lottieExample0",
  components: {
    controlAnimations,
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
