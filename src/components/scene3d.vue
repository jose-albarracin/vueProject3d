<template>
  <div class="scene">
    <!-- <h1 class="text-amber-500 text-[3rem] font-bold justify-center">
      Nuevo proyecto 3D
    </h1> -->
    <!-- <canvas id="myCanvas"></canvas> -->
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "scene-3d",
  props: {
    msg: String,
    scene: undefined,
  },
  methods: {
    init() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const canvas = document.getElementById("myCanvas");
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
      });
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      //const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      // renderer.domElement.id = "scene3D";

      /* console.log("scene:", scene);
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube); */

      const loader = new GLTFLoader();
      loader.load(
        "models/strong_chicken/scene.gltf",
        function (gltf) {
          scene.add(gltf.scene);

          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Group
          gltf.scenes; // Array<THREE.Group>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          console.log("An error happened: ", error);
        }
      );

      camera.position.z = 5;
      //camera.position.y = 1;

      window.addEventListener("resize", onWindowResize, false);
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
      }
      function animate() {
        requestAnimationFrame(animate); /* 
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01; */
        //renderer.render(scene, camera);
        render();
      }
      animate();
      function render() {
        renderer.render(scene, camera);
      }
    },
  },
  computed() {},

  mounted() {
    this.init();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
