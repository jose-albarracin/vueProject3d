<template>
  <div class="scene relative">
    <router-link to="/">
      <button
        class="bg-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border hover:border-blue-400 px-4 py-2 rounded-xl absolute left-0 m-6 z-10"
      >
        Home
      </button>
    </router-link>
    <div class="container mx-auto max-w-6xl px-3 my-9">
      <div class="flex justify-center">
        <MediaPlayer
          classes="w-full "
          source="models/buster_drone/scene.gltf"
          domElement="threejs1"
          type="AnimationMixer"
          :config="{
            mode: 'animation',
            aspectRatio: 'panoramic',
            controls: {
              play: true,
              backward: true,
              forward: true,
              fullscreen: true,
              playbackRate: true,
              progressBar: true,
              time: true,
            },
            loop: true,
            autoplay: true,
            backgroundColor: '#9a9a9ab8',
          }"
        ></MediaPlayer>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel diam
        vitae sapien faucibus accumsan aliquet nec eros. Integer posuere
        accumsan fermentum. Cras eu arcu ullamcorper, convallis est at, accumsan
        velit. Proin dapibus orci vel ante euismod rhoncus. Ut porta et turpis
        vel hendrerit. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Morbi maximus tristique ligula, sit amet commodo nibh euismod
        in. Nunc in aliquam metus. Suspendisse tempus sollicitudin orci, in
        finibus ex venenatis accumsan. Quisque porttitor scelerisque dolor vel
        consectetur. Aenean dignissim neque et blandit aliquet. Nunc iaculis
        fringilla viverra. Sed semper dui erat, a efficitur lectus posuere vel.
        Donec sit amet lorem at sem bibendum congue a nec odio. Curabitur tellus
        magna, pellentesque ut justo sit amet, facilisis eleifend ante. Etiam
        commodo diam ut venenatis ornare. In velit arcu, condimentum vitae
        semper id, ullamcorper quis ex. Donec vitae nisi nibh. Pellentesque quam
        purus, tincidunt eget faucibus non, porttitor fringilla nulla. Nullam
        semper placerat turpis, sit amet volutpat metus. Curabitur ultricies
        finibus cursus. Nunc cursus augue commodo dictum posuere. Donec ac
        elementum dolor. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Praesent urna diam, viverra sed viverra sit amet, vestibulum
        sed est. Duis tincidunt quam ac nibh vulputate, quis pellentesque odio
        elementum. Phasellus luctus leo eget quam gravida scelerisque. Mauris
        maximus congue facilisis. Ut vehicula bibendum massa ac suscipit.
        Aliquam auctor commodo nunc, in faucibus arcu mattis sit amet. Phasellus
        fermentum nisi id sapien vehicula, non scelerisque mauris laoreet. In
        vitae diam est. Ut augue mauris, volutpat nec mauris sed, vehicula
        varius lorem. Praesent vel pulvinar purus. Maecenas egestas tortor nisi,
        condimentum mollis tellus posuere nec. Nullam tempor venenatis massa a
        ultricies. Duis et vestibulum nulla. Suspendisse sit amet molestie eros.
        Integer fermentum id lorem sed dictum. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Quisque eget
        lectus dictum, porta neque ac, aliquet diam. Aenean lacinia ipsum et
        tempus consequat. Donec in purus suscipit, convallis lectus vel, posuere
        diam. Morbi euismod varius interdum. Sed elementum erat ut vehicula
        molestie. Vestibulum vitae viverra risus. Donec orci justo, facilisis ut
        nisl et, laoreet sollicitudin ex. Proin lacus nisi, venenatis eu sem eu,
        sagittis congue elit. Vestibulum vitae sagittis quam, quis semper
        libero. Morbi hendrerit mauris sed est pretium mattis. Suspendisse quis
        vehicula neque, et varius nisi. Etiam bibendum libero eu felis congue,
        sed sagittis nisl eleifend. Maecenas fermentum neque ut augue aliquam
        aliquet sed vitae nibh. Proin dignissim, mauris et vehicula faucibus,
        nisi velit interdum augue, id dignissim turpis tellus iaculis ante.
        Curabitur sed tortor semper, ultricies justo sed, congue eros. Vivamus
        vestibulum ligula turpis, in cursus arcu rutrum euismod. Nulla maximus
        consequat interdum. Praesent a dignissim mauris, eget cursus tellus.
        Quisque quis mi vitae felis congue imperdiet. Nam vel lacus vel nulla
        dictum bibendum eu quis odio. Mauris finibus lorem euismod, vestibulum
        eros eget, ultricies nisl. Sed iaculis sapien sit amet diam faucibus, at
        hendrerit diam semper. Phasellus tincidunt tortor consequat, euismod est
        in, auctor nisi. Generated 5 paragraphs, 495 words, 3385 bytes of Lorem
        Ipsum
      </p>
    </div>
  </div>
</template>

<script>
import MediaPlayer from "@/components/MediaPlayer.vue";

export default {
  name: "exampleFour",
  components: {
    MediaPlayer,
  },
  props: {
    msg: String,
    scene: undefined,
  },
  data() {
    return {
      time: undefined,
      timeAction: false,
      forward: false,
      backward: false,
      play: false,
      duration: undefined,
      pause: false,
      valuePercentaje: undefined,
      isNewTime: false,
    };
  },
  methods: {},
  computed() {},

  mounted() {},
};
</script>
