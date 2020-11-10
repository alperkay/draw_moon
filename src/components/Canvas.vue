<template>
  <canvas
    id="canvas"
    :height="screenHeight"
    :width="screenWidth"
    :style="{ width: screenWidth, height: screenHeight }"
  ></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Canvas",
  props: {},
  data() {
    return {
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      mouseX: null as number | null,
      mouseY: null as number | null,
      mouseDown: false,
      touchX: null as number | null,
      touchY: null as number | null,
      lastX: -1 as number | null,
      lastY: -1 as number | null,
      brushSize: 10,
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    drawLine(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) {
      // If lastX is not set, set lastX and lastY to the current position
      if (this.lastX == -1) {
        this.lastX = x;
        this.lastY = y;
      }

      // Select a fill style
      ctx.strokeStyle = "black";

      // Set the line "cap" style to round, so lines at different angles can join into each other
      ctx.lineCap = "round";
      //ctx.lineJoin = "round";

      // Draw a filled line
      ctx.beginPath();

      // First, move to the old (previous) position
      ctx.moveTo(this.lastX as number, this.lastY as number);

      // Now draw a line to the current touch/pointer position
      ctx.lineTo(x, y);

      // Set the line thickness and draw the line
      ctx.lineWidth = size;
      ctx.stroke();

      ctx.closePath();

      // Update the last position to reference the current position
      this.lastX = x;
      this.lastY = y;
    },
    clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    onMouseDown() {
      this.mouseDown = true;
      this.drawLine(
        this.ctx as CanvasRenderingContext2D,
        this.mouseX as number,
        this.mouseY as number,
        this.brushSize
      );
    },
    onMouseUp() {
      this.mouseDown = false;
      this.lastX = -1;
      this.lastY = -1;
    },
    onMouseMove(e: MouseEvent) {
      this.getMousePos(e);

      if (this.mouseDown == true) {
        this.drawLine(
          this.ctx as CanvasRenderingContext2D,
          this.mouseX as number,
          this.mouseY as number,
          this.brushSize
        );
      }
    },
    getMousePos(e: MouseEvent) {
      if (e.offsetX) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
      }
    },
    getTouchPos(e: TouchEvent) {
      const bcr = (this.canvas as HTMLCanvasElement).getBoundingClientRect();
      if (e.touches) {
        if (e.touches.length == 1) {
          // Only deal with one finger
          const touch = e.touches[0]; // Get the information for finger #1
          this.touchX = touch.pageX - bcr.x;
          this.touchY = touch.pageY - bcr.y;
        }
      }
    },
    onTouchStart(e: TouchEvent) {
      this.getTouchPos(e);

      this.drawLine(
        this.ctx as CanvasRenderingContext2D,
        this.touchX as number,
        this.touchY as number,
        this.brushSize
      );

      e.preventDefault();
    },
    onTouchEnd() {
      this.lastX = -1;
      this.lastY = -1;
    },
    onTouchMove(e: TouchEvent) {
      // Update the touch co-ordinates
      this.getTouchPos(e);

      // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
      this.drawLine(
        this.ctx as CanvasRenderingContext2D,
        this.touchX as number,
        this.touchY as number,
        this.brushSize
      );

      // Prevent a scrolling action as a result of this touchmove triggering.
      e.preventDefault();
    },
    init() {
      this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
      this.ctx = this.canvas.getContext("2d");
      this.canvas.addEventListener("mousedown", this.onMouseDown, false);
      this.canvas.addEventListener("mousemove", this.onMouseMove, false);
      this.canvas.addEventListener("mouseup", this.onMouseUp, false);

      this.canvas.addEventListener("touchstart", this.onTouchStart, false);
      this.canvas.addEventListener("touchend", this.onTouchEnd, false);
      this.canvas.addEventListener("touchmove", this.onTouchMove, false);
    }
  }
});
</script>

<style scoped lang="scss">
#canvas {
  // height: 600px;
  // width: 1000px;
  background-color: rgb(214, 211, 211);
  box-sizing: border-box;
}
</style>
