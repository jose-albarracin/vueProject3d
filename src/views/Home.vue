<template>
  <div class="container mx-auto flex justify-center min-h-screen items-center">
    <div class="flex flex-col w-7/12 my-10">
      <h1 class="font-bold text-3xl mb-6">Scenes 3D</h1>
      <div class="flex bg-slate-400 justify-center p-6 gap-4 rounded-3xl">
        <router-link to="/exampleone">
          <button
            class="px-4 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400 w-fit rounded-lg shadow-lg transition-all ease-in-out"
          >
            Example 1
          </button>
        </router-link>

        <router-link to="/exampletwo">
          <button
            class="px-4 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400 w-fit rounded-lg shadow-lg transition-all ease-in-out"
          >
            Example 2
          </button>
        </router-link>
        <router-link to="/examplethree">
          <button
            class="px-4 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400 w-fit rounded-lg shadow-lg transition-all ease-in-out"
          >
            Example 3
          </button>
        </router-link>
        <router-link to="/examplefour">
          <button
            class="px-4 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400 w-fit rounded-lg shadow-lg transition-all ease-in-out"
          >
            Example 4 Animation
          </button>
        </router-link>
      </div>
      <div class="flex bg-slate-400 justify-center p-6 gap-4 rounded-3xl mt-4">
        <router-link to="/lottieexample0">
          <button
            class="px-4 py-2 bg-blue-400 text-white hover:bg-white hover:text-blue-400 w-fit rounded-lg shadow-lg transition-all ease-in-out"
          >
            lottieexample0
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
};
</script>
