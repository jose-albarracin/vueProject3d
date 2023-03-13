//import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home.vue");
const ExampleOne = () => import("@/views/exampleOne.vue");

const ExampleFour = () => import("@/views/exampleFour.vue");
const lottieExample0 = () => import("@/views/lottieExample0.vue");
const videoPlayerExample = () => import("@/views/videoPlayerExample.vue");
const audioPlayerExample = () => import("@/views/audioPlayerExample.vue");

//Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/exampleone",
    name: "exampleone",
    component: ExampleOne,
  },
  {
    path: "/examplefour",
    name: "examplefour",
    component: ExampleFour,
  },
  {
    path: "/lottieexample0",
    name: "lottieexample0",
    component: lottieExample0,
  },
  {
    path: "/videoplayerexample",
    name: "videoplayerexample",
    component: videoPlayerExample,
  },
  {
    path: "/audioplayerexample",
    name: "audioplayerexample",
    component: audioPlayerExample,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
