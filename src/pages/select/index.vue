<template>
  <view id="effect-windmill" @tap="zhuan">
    <view
      class="blade-container"
      :style="rote == true ? 'animation: wind 0.5s linear 0s 1' : ''"
    >
      <view
        v-for="(item, index) in menuList"
        :key="index"
        class="blade-item"
        :style="computedCardPosStyle(index)"
        :ref="'item' + index"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rote:true,
      listGap: 0,
      menuList: [
        {
          id: 0,
          color: "#e74c3c",
        },
        {
          id: 1,
          color: "#e67e22",
        },
        {
          id: 2,
          color: "#f1c40f ",
        },
        {
          id: 3,
          color: "#2ecc71",
        },
        {
          id: 4,
          color: "#a328eb",
        },

        {
          id: 0,
          color: "#e74c3c",
        },
        {
          id: 1,
          color: "#e67e22",
        },
        {
          id: 2,
          color: "#f1c40f ",
        },
        {
          id: 3,
          color: "#2ecc71",
        },
        {
          id: 4,
          color: "#a328eb",
        },
      ],
    };
  },
  methods: {
    computedCardPosStyle(index) {
      let deg = -index * (360 / this.menuList.length);
      return {
        top: 150 - Math.cos((deg * Math.PI) / 180) * 100 + "px",
        left: 150 + Math.sin((deg * Math.PI) / 180) * 100 + "px",
        // transform: `translate(-50%, -50%) rotate(${deg}deg)`,
        // transform: `rotate(${deg}deg)`,
        border: `${this.menuList[index].color} 1px solid`,
      };
    },
    zhuan() {
      this.listGap += 1;
      for (var i = 0; i < this.menuList.length; i++) {
        let domName = "itme" + i;
        let index = (i + this.listGap) % this.menuList.length;
        let slist = this.computedCardPosStyle(index);
        this.$refs[`item${i}`][0].$el.style.top = slist.top;
        this.$refs[`item${i}`][0].$el.style.left = slist.left;
        // this.$refs[`item${i}`][0].$el.style.transform = slist.transform;
        this.$refs[`item${i}`][0].$el.style.transition = " all 1s ease";
      }
    },
  },
};
</script>

<style scoped>
#effect-windmill {
  position: relative;
  margin: auto;
  margin-top: 80px;
  width: 600px;
  height: 600px;
  border: 1px solid gray;
  border-radius: 50% 50%;
}

#effect-windmill > .blade-container {
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  width: 300px;
  height: 300px;
  overflow: hidden;
  z-index: 20;

  /* border: gray 1px solid; */
  animation: wind 0.5s linear 0s 1;
  -webkit-animation: wind 0.5s linear 0s 1;
}

.animate {
  animation: wind 10s linear 3s 1;
  -webkit-animation: wind 10s linear 3s 1;
}

#effect-windmill > .blade-container > .blade-item {
  width: 50px;
  height: 50px;
  /* border: #2ecc71 1px solid; */
  position: absolute;
}


@keyframes wind {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  to {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }
}
</style>