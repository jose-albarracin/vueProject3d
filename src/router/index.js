//import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import ExampleOne from "@/views/exampleOne.vue";
import ExampleTwo from "@/views/exampleTwo.vue";
import ExampleThree from "@/views/exampleThree.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
