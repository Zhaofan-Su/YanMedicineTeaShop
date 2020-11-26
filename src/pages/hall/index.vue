<template>
  <view class="container">
    <scroll-view
      scroll-y
      class="DrawerPage hall"
      style="height: 100%"
      :class="showMenu == true ? 'show' : ''"
    >
      <view class="char">
        <image src="../../static/images/hall/char.png" :style="computeCharSize()"></image>
      </view>
      <view class="menu-btn" @tap="showMenu=true" >
        <image ref="menuBtn"  src="../../static/images/hall/menu-btn.png" :style="'top:'+menuBtnStyle.top+';left:'+menuBtnStyle.left+';width:'+menuBtnStyle.width+';height:'+menuBtnStyle.height"></image>
      </view>
      <view class="choose-btn">
        <image src="../../static/images/hall/choose-btn.png" :style="computeChooseBtnSize()"></image>
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
      scaleSize:1,
      scaleX:1,
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
      menuBtnStyle:{
        width:'220px',
        height:'128px',
        top:'994px',
        left:'94px'
      },
      r:810,
      menuBtnControl:{
        startX:null,
        startY:null,
        startTime:null
      }
    };
  },
  onLoad(){
    this.scaleSize = getApp().globalData.scaleSize
    this.scaleX = getApp().globalData.scaleX
    this.r *= this.scaleSize
    this.computeMenuBtnSize()
  },
  methods: {
    computeCharSize(){
      return{
        top: 256 * this.scaleSize+ 'px',
        height: 641 * this.scaleSize + 'px',
        width: 641 * this.scaleX + 'px',
        left:0
      }
    },
    computeMenuBtnSize(){
      this.menuBtnStyle.top = 994 * this.scaleSize +'px'
      this.menuBtnStyle.left = 94 * this.scaleX + 'px'
      this.menuBtnStyle.height =  128 * this.scaleSize + 'px'
      this.menuBtnStyle.width = 220 * this.scaleX + 'px'
   
    },
    computeChooseBtnSize(){
      return{
        top: 994 * this.scaleSize +'px',
        left: 324 * this.scaleX + 'px',
        height: 129 * this.scaleSize + 'px',
        width: 219 * this.scaleX + 'px'
      }
    },
    toSelect() {
      uni.navigateTo({
        url: "/pages/select/index",
      });
    },
   
    // 菜单按钮滑动 // TODO: 滑动路径需要修改
    menuBtnStart(e){
      this.menuBtnControl.startX = e.touches[0].clientX 
      this.menuBtnControl.startY = e.touches[0].clientY 
      this.menuBtnControl.startTime = Date.now()
    },
    menuBtnEnd(e){
      
    },
    menuBtnMove(e){
      // 图像跟随移动
      console.log(this.r)
      var nowX = e.touches[0].clientX
      var deltaX = Math.abs(nowX - this.menuBtnControl.startX)
      var deltaY = this.r - Math.sqrt(this.r * this.r - deltaX * deltaX)
      // 图像位置移动
      this.menuBtnStyle.left = 94 * this.scaleX - deltaX + 'px'
      this.menuBtnStyle.top = 994 * this.scaleSize - deltaY + 'px'
    },

    // 转盘的触碰事件
    handleTouchStart(e) {
      this.rotateTable.startTime = Date.now();
      this.rotateTable.startX = e.changedTouches[0].clientX;
      this.rotateTable.startY = e.changedTouches[0].clientY;
    },
    // TODO: 转盘转动有问题
    handleTouchEnd(e) {
    
      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      //判断按下的时长
      if (endTime - this.rotateTable.startTime > 2000) {
        return;
      }
      //滑动的方向
      let direction = 'anti-clockwise';
      //先判断用户滑动的距离，是否合法，合法:判断滑动的方向 注意 距离要加上绝对值
      if (Math.abs(endY - this.rotateTable.startY) > 100) {
        //滑动方向
        direction =
          endY - this.rotateTable.startY < 0 ? "clockwise" : "anti-clockwise";
      } else {
        return;
      }
      //转盘转动
      this.rotate(direction);
    },
    rotate(direction) {
      if (direction == "clockwise") {
        this.listGap -= 1;
      } else {
        this.listGap += 1;
      }

      for (var i = 0; i < this.menuList.length; i++) {
        let domName = "itme" + i;
        let index = Math.abs(i + this.listGap) % this.menuList.length;
        console.log(index)
        let slist
        if(direction == 'clockwise'){
          slist = this.computedCardPosStyle(index, true);
        }
        else{
          slist = this.computedCardPosStyle(index, false);
        }
        this.$refs[`item${i}`][0].$el.style.top = slist.top;
        this.$refs[`item${i}`][0].$el.style.left = slist.left;
        // this.$refs[`item${i}`][0].$el.style.transform = slist.transform;
        this.$refs[`item${i}`][0].$el.style.transition = " all 1s ease";
      }
    },
    computedCardPosStyle(index, clockwise = true) {
      let deg = (index + 1) * (360 / this.menuList.length);
      // if (!clockwise) {
      //   deg = -deg;
      // }
      // deg += 18;
      return {
        left: 500 + Math.cos((deg * Math.PI) / 180) * 400 + "px",
        top: 300 - Math.sin((deg * Math.PI) / 180) * 400 + "px",
        // transform: `translate(-50%, -50%) rotate(${deg}deg)`,
        // transform: `rotate(${deg}deg)`,
        border: `${this.menuList[index].color} 1px solid`,
      };
    },
  },
};
</script>

<style>
.container{
  background-image: url("../../static/images/index/bg.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

.hall {
  background-image: url("../../static/images/hall/bg.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

page {
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
  width: 100vw;
  overflow: hidden;
}

.char,
.choose-btn,
.menu-btn{
  position: fixed;
}

/* 右侧转盘 */
.DrawerPage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0vw;
 
  transition: all 0.4s;
}

.DrawerPage.show {
  transform: scale(0.9, 0.9);
  left: -75vw;
  box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
  transform-origin: 0;
}

.DrawerWindow {
  position: absolute;
  width: 85vw;
  height: 100vh;
  left: 100vw;
  top: 0;
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
 
  border-radius: 50% 50%;
  border: 4px solid  rgba(170, 133, 97, 0.7);
  /* background-color: #f1f1f1; */
  background-color:  rgba(170, 133, 97, 0) ;
}

#effect-windmill > .blade-container {
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  width: 700px;
  height: 700px;
  overflow: hidden;
  z-index: 20;
}

#effect-windmill > .blade-container > .blade-item {
  width: 100px;
  height: 100px;
  position: absolute;
}
</style>
