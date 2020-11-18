<template>
  <div v-if="!isDrawing" id="tools">
    <div
      :style="{ backgroundColor: color }"
      class="littleBox"
      v-for="color in colorPalette"
      :key="color"
    ></div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tools",
  props: {},
  computed: {
    isDrawing: function() {
      return store.state.drawing;
    },
    colorPalette: function() {
      return store.state.colorPalette;
    }
  },
  mounted() {
    store.commit("createColorPalette");
  }
});
</script>

<style scoped lang="scss">
#tools {
  position: sticky;
  bottom: 30px;
  left: 30px;
  width: 400px;
  height: 100px;
  display: flex;
  border: 1px solid black;
}

.littleBox {
  width: 50px;
  height: 70px;
  margin-right: 10px;
}
</style>
