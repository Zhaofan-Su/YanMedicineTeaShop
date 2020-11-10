<template>
  <view class="bg-gradual-blue">
    <scroll-view
      scroll-y
      class="DrawerPage hall"
      style="height: 100%"
      :class="showMenu == true ? 'show' : ''"
    >
      <cu-custom bgColor="bg-gradual-blue" :isBack="true"
        ><block slot="backText">返回</block>
        <block slot="content">炎帝药茶铺</block>
      </cu-custom>

      <view class="choose-btn flex justify-around">
        <button
          class="cu-btn bg-mauve lg round"
          @tap="showMenu = true"
          data-target="menuList"
        >
          搭配清单
        </button>
        <button class="cu-btn bg-mauve lg round" @tap="toSelect">选材</button>
      </view>
    </scroll-view>

    <view
      class="DrawerClose"
      :class="showMenu == true ? 'show' : ''"
      @tap="showMenu = false"
    >
      <text class="cuIcon-pullleft"></text>
    </view>
    <view class="DrawerWindow" :class="showMenu == true ? 'show' : ''">
      <view id="effect-windmill">
        <view
          class="blade-container"
          @touchstart.stop.prevent="handleTouchStart"
          @touchend.stop.prevent="handleTouchEnd"
        >
          <view
            v-for="(item, index) in menuList"
            :key="index"
            class="blade-item"
            :style="computedCardPosStyle(index)"
            :ref="'item' + index"
            >{{ index }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
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
      rotateTable: {
        startX: null,
        startY: null,
        startTime: null,
      },
    };
  },
  methods: {
    toSelect() {
      uni.navigateTo({
        url: "/pages/select/index",
      });
    },
    computedCardPosStyle(index, clockwise = true) {
      let deg = (index + 1) * (360 / this.menuList.length);
      if (!clockwise) {
        deg = -deg;
      }
      deg += 18;
      return {
        top: 300 - Math.cos((deg * Math.PI) / 180) * 400 + "px",
        left: 500 + Math.sin((deg * Math.PI) / 180) * 400 + "px",
        // transform: `translate(-50%, -50%) rotate(${deg}deg)`,
        // transform: `rotate(${deg}deg)`,
        border: `${this.menuList[index].color} 1px solid`,
      };
    },
    handleTouchStart(e) {
      this.rotateTable.startTime = Date.now();
      this.rotateTable.startX = e.changedTouches[0].clientX;
      this.rotateTable.startY = e.changedTouches[0].clientY;
    },
    handleTouchEnd(e) {
      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      //判断按下的时长
      if (endTime - this.rotateTable.startTime > 2000) {
        return;
      }
      //滑动的方向
      let direction = true;
      //先判断用户滑动的距离，是否合法，合法:判断滑动的方向 注意 距离要加上绝对值
      if (Math.abs(endY - this.rotateTable.startY) > 100) {
        //滑动方向
        direction =
          endY - this.rotateTable.startY > 0 ? "clockwise" : "anti-clockwise";
      } else {
        return;
      }
      //转盘转动
      this.rotate(direction);
    },
    rotate(direction = "clockwise") {
      if (direction == "clockwise") {
        this.listGap += 1;
      } else {
        this.listGap -= 1;
      }

      for (var i = 0; i < this.menuList.length; i++) {
        let domName = "itme" + i;
        let index = Math.abs(i + this.listGap) % this.menuList.length;
        let slist = this.computedCardPosStyle(index, direction);
        this.$refs[`item${i}`][0].$el.style.top = slist.top;
        this.$refs[`item${i}`][0].$el.style.left = slist.left;
        // this.$refs[`item${i}`][0].$el.style.transform = slist.transform;
        this.$refs[`item${i}`][0].$el.style.transition = " all 1s ease";
      }
    },
  },
};
</script>

<style>
.hall {
  background-image: url("../../static/大厅-bg.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
.choose-btn {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}
page {
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
  width: 100vw;
  overflow: hidden;
}

.DrawerPage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0vw;
  /* right: 0vw; */
  background-color: #f1f1f1;
  transition: all 0.4s;
}

.DrawerPage.show {
  /* transform: scale(0.9, 0.9); */
  /* left: 85vw; */
  transform: scale(0.9, 0.9);
  left: -75vw;
  box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
  transform-origin: 0;
}

.DrawerWindow {
  position: absolute;
  width: 85vw;
  height: 100vh;
  /* left: 0; */
  /* right: 0; */
  left: 100vw;
  top: 0;
  /* transform: scale(0.9, 0.9) translateX(-100%); */
  transform: scale(0.9, 0.9) translateX(100%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
  padding: 100upx 0;
}

.DrawerWindow.show {
  transform: scale(1, 1) translateX(0%);
  opacity: 1;
  pointer-events: all;
}

.DrawerClose {
  position: absolute;
  width: 40vw;
  height: 100vh;
  right: 0;
  top: 0;
  color: transparent;
  padding-bottom: 30upx;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.01),
    rgba(0, 0, 0, 0.6)
  );
  letter-spacing: 5px;
  font-size: 50upx;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
}

.DrawerClose.show {
  opacity: 1;
  opacity: 0.5;
  pointer-events: all;
  width: 15vw;
  color: #fff;
  left: 0;
}

/* 以下是转盘的样式 */
#effect-windmill {
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  left: -300px;
  width: 700px;
  height: 700px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ffffff;
  border-radius: 50% 50%;
}

#effect-windmill > .blade-container {
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  width: 700px;
  height: 700px;
  overflow: hidden;
  z-index: 20;
  /* right: 10px; */
}

#effect-windmill > .blade-container > .blade-item {
  width: 100px;
  height: 100px;
  position: absolute;
}
</style>
