//import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import ExampleOne from "@/views/exampleOne.vue";
import ExampleTwo from "@/views/exampleTwo.vue";
import ExampleThree from "@/views/exampleThree.vue";
import ExampleFour from "@/views/exampleFour.vue";
import lottieExample0 from "@/views/lottieExample0.vue";

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
    path: "/exampletwo",
    name: "exampletwo",
    component: ExampleTwo,
  },
  {
    path: "/examplethree",
    name: "examplethree",
    component: ExampleThree,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
