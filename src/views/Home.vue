<template>
  <div class="home">
    <Canvas />
    <Tools />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Canvas from "@/components/Canvas.vue"; // @ is an alias to /src
import Tools from "@/components/Tools.vue";

export default defineComponent({
  name: "Home",
  components: {
    Canvas,
    Tools
  }
});
</script>
