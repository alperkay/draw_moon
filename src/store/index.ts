import { createStore } from "vuex";
import chroma from "chroma-js";

interface AppState {
  drawing: boolean;
  colorPalette: string[];
  selectedColorIndex: number;
}

const state: AppState = {
  drawing: false,
  colorPalette: [],
  selectedColorIndex: 0
};

export default createStore({
  state,
  mutations: {
    draw(state, n) {
      state.drawing = n;
    },
    createColorPalette(state) {
      state.colorPalette = chroma.scale(["red", "pink"]).colors(5);
    },
    selectColor(state, n) {
      state.selectedColorIndex = n;
    }
  },
  getters: {
    isDrawing(state) {
      return state.drawing;
    }
  },
  modules: {}
});
