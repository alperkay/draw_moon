<template>
  <div
    v-if="!isDrawing"
    class="tools-wrapper"
    :style="{ width: toolsVisible ? '720px' : '100px' }"
  >
    <div
      class="tools-toggle"
      @click="toggleToolsVisible"
      :style="{ 'background-color': selectedColor }"
    >
      hey
    </div>
    <transition>
      <ul
        id="tools"
        v-if="toolsVisible"
        :style="{ 'border-color': selectedColor }"
      >
        <li
          :style="{
            backgroundColor: color
          }"
          class="littleBox"
          v-for="color in colorPalette"
          :key="color"
          @click="selectColor(color)"
        ></li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tools",
  props: {},
  data() {
    return {
      toolsVisible: false
    };
  },
  computed: {
    isDrawing: function() {
      return store.state.drawing;
    },
    colorPalette: function() {
      return store.state.colorPalette;
    },
    selectedColor: function() {
      return store.state.selectedColor;
    }
  },
  methods: {
    toggleToolsVisible: function() {
      this.toolsVisible = !this.toolsVisible;
    },
    selectColor: function(color: string) {
      store.commit("selectColor", color);
    }
  },
  mounted() {
    store.commit("createColorPalette");
  }
});
</script>

<style scoped lang="scss">
.tools-wrapper {
  display: flex;
  height: 100px;
  position: sticky;
  bottom: 30px;
  left: 30px;
  .tools-toggle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: black;
    cursor: pointer;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $base-color;
    font-size: $font-40;
  }
  #tools {
    width: 600px;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 3px solid black;
    border-radius: 6px;
    list-style: none;
    position: relative;
    left: -50px;

    .littleBox {
      width: 30px;
      height: 70px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
          rgba(0, 0, 0, 0.22) 0px 10px 10px;
      }
    }
  }
}
</style>
