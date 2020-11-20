import { createStore } from "vuex";
import chroma from "chroma-js";

interface AppState {
  drawing: boolean;
  colorPalette: string[];
  selectedColor: string;
}

const state: AppState = {
  drawing: false,
  colorPalette: [],
  selectedColor: "black"
};

export default createStore({
  state,
  mutations: {
    draw(state, n) {
      state.drawing = n;
    },
    createColorPalette(state) {
      state.colorPalette = chroma.scale(["E53B00", "008DBF"]).colors(12);
    },
    selectColor(state, n) {
      state.selectedColor = n;
    }
  },
  getters: {
    isDrawing(state) {
      return state.drawing;
    }
  },
  modules: {}
});
