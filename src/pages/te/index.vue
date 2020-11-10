<template>
  <div
    class="container"
    :style="{
      transform: `scale(${containerScale})`,
    }"
    ref="container"
  >
    <ul
      class="turntable"
      :style="{
        transform: `rotate(${turnRotate}deg)`,
        bottom: -0.7 * this.turntableR + 'px',
      }"
    >
      <li
        v-for="index in cardCount"
        :key="index"
        class="card"
        :style="computedCardPosStyle(index - 1)"
        @mousedown.prevent
        @mouseup.prevent
        @mousemove.prevent
      >
        {{ index }}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "TouchMoveAction",
  props: {
    turntableR: {
      type: Number,
      default: 1000,
    },
    cardCount: {
      type: Number,
      default: 35,
    },
  },
  data: () => ({
    // 动画
    startX: 0,
    endX: 0,
    timer: null,
    UDLMactionTimer: null,
    mouseIsDown: false,
    xGap: 0,
    lastSpeed: 0,
    direction: 1,
    containerScale: 1,
    // 配置
    timeGap: 20,
    turnRotateProportion: 500,
    reduceSpeed: 0.7,
    // 数据
    cards: ["card1", "card2"],
  }),
  computed: {
    turnRotate() {
      return (
        (this.xGap * this.turnRotateProportion) /
        (2 * Math.PI * this.turntableR)
      );
    },
    unitCardDeg() {
      return 360 / this.cardCount;
    },
  },
  methods: {
    handleMouseDown(e) {
      clearInterval(this.UDLMactionTimer);
      this.mouseIsDown = true;
      this.startX = e.clientX || e.touches[0].clientX;
      this.endX = e.clientX || e.touches[0].clientX;
    },
    handleMouseUp() {
      this.mouseIsDown = false;
      clearInterval(this.timer);
      this.timer = null;
      this.startX = 0;
      this.endX = 0;
      if (this.lastSpeed) this.UDLMaction();
    },
    handleMouseMove(e) {
      this.endX = e.clientX || e.touches[0].clientX;
      if (!this.mouseIsDown) return;
      if (!this.timer) {
        this.timer = setInterval(() => {
          let moveGap = this.endX - this.startX;
          this.lastSpeed = moveGap / this.timeGap;
          this.xGap += moveGap;
          this.direction = moveGap > 0 ? 1 : -1;
          this.startX = this.endX;
        }, this.timeGap);
      }
    },
    computedCardPosStyle(index) {
      let deg = index * this.unitCardDeg;
      let absDeg = Math.abs((deg + this.turnRotate) % 360);
      let z_index =
        absDeg > 180 ? Math.ceil(absDeg - 180) : Math.ceil(180 - absDeg);
      return {
        top: -Math.cos((deg * Math.PI) / 180) * this.turntableR + "px",
        left: Math.sin((deg * Math.PI) / 180) * this.turntableR + "px",
        transform: `translate(-50%, -50%) rotate(${deg}deg)`,
        zIndex: z_index,
      };
    },
    UDLMaction() {
      let a = -this.reduceSpeed * this.direction;
      this.UDLMactionTimer = setInterval(() => {
        this.lastSpeed =
          (this.lastSpeed + a) * this.direction >= 0 ? this.lastSpeed + a : 0;
        this.xGap += this.lastSpeed * this.timeGap;
        if (!this.lastSpeed) {
          this.moreDynamic();
          return clearInterval(this.UDLMactionTimer);
        }
      }, this.timeGap);
    },
    moreDynamic() {
      let time = 10;
      let timer = setInterval(() => {
        this.xGap += this.direction * 3;
        if (--time <= 0) clearInterval(timer);
      }, 20);
    },
    responseContainerScale() {
      if (window.innerWidth < 650) {
        this.containerScale = window.innerWidth / 650;
        this.turnRotateProportion = 800;
      }
    },
  },
  mounted() {
    let container_dom = this.$refs.container;
    container_dom.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    container_dom.addEventListener("mouseup", this.handleMouseUp.bind(this));
    container_dom.addEventListener("mouseleave", this.handleMouseUp.bind(this));
    container_dom.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    container_dom.addEventListener(
      "touchstart",
      this.handleMouseDown.bind(this)
    );
    container_dom.addEventListener("touchend", this.handleMouseUp.bind(this));
    container_dom.addEventListener(
      "touchcancel",
      this.handleMouseUp.bind(this)
    );
    container_dom.addEventListener(
      "touchmove",
      this.handleMouseMove.bind(this)
    );
    window.addEventListener("resize", this.responseContainerScale.bind(this));
    window.addEventListener("load", this.responseContainerScale.bind(this));
  },
  beforeDestroy() {
    let container_dom = this.$refs.container;
    container_dom.removeEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    container_dom.removeEventListener("mouseup", this.handleMouseUp.bind(this));
    container_dom.removeEventListener(
      "mouseleave",
      this.handleMouseUp.bind(this)
    );
    container_dom.removeEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    container_dom.removeEventListener(
      "touchstart",
      this.handleMouseDown.bind(this)
    );
    container_dom.removeEventListener(
      "touchend",
      this.handleMouseUp.bind(this)
    );
    container_dom.removeEventListener(
      "touchcancel",
      this.handleMouseUp.bind(this)
    );
    container_dom.removeEventListener(
      "touchmove",
      this.handleMouseMove.bind(this)
    );
    window.removeEventListener(
      "resize",
      this.responseContainerScale.bind(this)
    );
  },
};
</script>


<style lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  .turntable {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 50%;
    .card {
      width: 230px;
      height: 320px;
      background-color: rgb(34, 145, 169);
      position: absolute;
      line-height: 320px;
      text-align: center;
      color: #fff;
      font-size: 30px;
      &:nth-child(2n) {
        background-color: gray;
      }
    }
  }
}
</style>
