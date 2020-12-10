<template>
 <view class="container" :class="showMenu?'panbg pann':''" id="end" >
    <scroll-view
      scroll-y
      class="DrawerPage"
      style="height: 100%"
      :class="showMenu == true ? 'show' : ''"
    >
      <view class="hall"></view>
      <view class="fire-container">
        <view id="little-fire" class="fire-enter"></view>
      </view>
     
      <view id="yandi-container">
        <view class="yandi pt-page-scaleUpCenter"></view>
      </view>
      <view class="tg pt-page-rotateCarouselLeftIn"  >
        <image id="tg1" :style="getTgCSS(1)" src="../../static/images/hall/tg1.png" @tap="addTgAnimation(1)"></image>
      </view>
      <view class="tg pt-page-rotateCarouselLeftIn"  >
        <image id="tg2" :style="getTgCSS(2)" src="../../static/images/hall/tg2.png" @tap="addTgAnimation(2)"></image>
      </view>
      <view class="tg pt-page-rotateCarouselLeftIn"  >
        <image  id="tg3" :style="getTgCSS(3)" src="../../static/images/hall/tg3.png" @tap="addTgAnimation(3)"></image>
      </view>
      <view class="tg pt-page-rotateCarouselRightIn" >
        <image  id="tg4" :style="getTgCSS(4)" src="../../static/images/hall/tg4.png" @tap="addTgAnimation(4)"></image>
      </view>
      <view class="tg pt-page-rotateCarouselRightIn">
        <image id="tg5" :style="getTgCSS(5)" src="../../static/images/hall/tg5.png" @tap="addTgAnimation(5)"></image>
      </view>
      <view class="tg pt-page-rotateCarouselRightIn" >
        <image  id="tg6" :style="getTgCSS(6)" src="../../static/images/hall/tg6.png" @tap="addTgAnimation(6)"></image>
      </view>
      <view class="menu-btn animation-slide-left" style="animationDelay:1s;animationDuration:1s" @touchmove.stop.prevent="menuBtnMove" @touchend.stop.prevent="menuBtnEnd"> 
        <image ref="menuBtn"  src="../../static/images/hall/menu-btn.png" :style="'top:'+menuBtnStyle.top+';left:'+menuBtnStyle.left+';width:'+menuBtnStyle.width+';height:'+menuBtnStyle.height"></image>
      </view>
      <view class="choose-btn animation-slide-right" style="animationDelay:1s;animationDuration:1s" @touchmove.stop.prevent="chooseBtnMove" @touchend.stop.prevent="chooseBtnEnd">
        <image src="../../static/images/hall/choose-btn.png" :style="'top:'+chooseBtnStyle.top+';left:'+chooseBtnStyle.left+';width:'+chooseBtnStyle.width+';height:'+chooseBtnStyle.height"></image>
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
      <view class="pan-self" @touchstart.stop.prevent="handleTouchStart" @touchend.stop.prevent="handleTouchEnd"></view>
      <view ref="panItems" class="pan-items"></view>
    </view>
  </view>
 
</template>

<script>
export default {
  data() {
    return {
      scaleY:1,
      scaleX:1,
      windowHeight:1230,
      windowWidth:640,
      showMenu: false,
      listGap: 0,
      menuList: [
        {
          id: 1,
          color: "#e74c3c",
        },
        {
          id: 2,
          color: "#e67e22",
        },
        {
          id: 3,
          color: "#f1c40f ",
        },
        {
          id: 4,
          color: "#2ecc71",
        },
        {
          id: 5,
          color: "#a328eb",
        },
        {
          id: 6,
          color: "#e74c3c",
        }
      ],
      choosedMenu:2,
      rotateTable: {
        startX: null,
        startY: null,
        startTime: null,
      },
      menuBtnStyle:{
        width:'206px',
        height:'92px',
        top:'1020px',
        left:'106px'
      },
      chooseBtnStyle:{
         width:'206px',
        height:'92px',
        top:'1020px',
        left:'328px'
      },
      r:810,
      menuBtnControl:{
        startX:null,
        startY:null,
        startTime:null
      },
      panItem:{
        width: 494,
        height: 412
      },

      slideAudio:null,
      slideAudioPlaying:false,
      fireContext:null
    };
  },
  onLoad(){
    this.scaleY = getApp().globalData.scaleY
    this.scaleX = getApp().globalData.scaleX
    this.windowHeight = getApp().globalData.windowHeight
    this.windowWidth = getApp().globalData.windowWidth
    this.r *= this.scaleSize
    this.panItem.width = 494 * this.scaleX
    this.panItem.height = 412 * this.scaleY
    setTimeout(function(){
      const classList = document.querySelector('#little-fire').classList
      classList.remove('fire-enter')
      classList.add('fire')
    }, 2000)
    this.computeMenuBtnSize()
    this.computeChooseBtnSize()
    getApp().globalData.innerAudioContext = null
    this.addBgm()

    var that = this
    // setTimeout(function(){
    //   that.addTGAudio(2)
    //   that.addTGAudio(4)
    // }, 4000)

    setTimeout(function(){
      that.addSlideAudio()
      that.addFireAudio()
    }, 2000)
    
  },
  onUnload(){
    if(this.fireContext != null){
      this.fireContext.destroy()
    }
  },  
  methods: {
    addBgm(){
           
            if(getApp().globalData.innerAudioContext !== null){
                return false
            }
            getApp().globalData.innerAudioContext = uni.createInnerAudioContext();

            // 自动播放
            getApp().globalData.innerAudioContext.autoplay = true;
            // 循环播放
            getApp().globalData.innerAudioContext.loop = true
            getApp().globalData.innerAudioContext.src = '../../static/music/yao-bgm.mp3';
            getApp().globalData.innerAudioContext.volume = 0.5
            getApp().globalData.innerAudioContext.play()
            
            var that = this
            // 音乐开始播放
            getApp().globalData.innerAudioContext.onPlay(() => {
                getApp().globalData.bgmPlaying = !getApp().globalData.innerAudioContext.paused;//查看是否可以自动播放
            });
            getApp().globalData.innerAudioContext.onEnded(()=>{
                getApp().globalData.bgmPlaying = false
            })
            getApp().globalData.innerAudioContext.onError((res) => {
                console.log(res.errMsg);
                console.log(res.errCode);
            });
    },
    addSlideAudio(){
      if(this.slideAudioPlaying || this.slideAudio !== null){
                return false
            }
            this.slideAudio = uni.createInnerAudioContext();

            // 自动播放
            this.slideAudio.autoplay = true;
            // 音效声音
            this.slideAudio.volume = 0.4
            
            // 循环播放
            // this.innerAudioContext.loop = true
            this.slideAudio.src = '../../static/music/slidebutton.wav';
            
            this.slideAudio.play()
            
            
            var that = this
            // 音乐开始播放
            this.slideAudio.onPlay(() => {
                // that.slideAudioPlaying = !that.slideAudio.paused;//查看是否可以自动播放
            });
            that.slideAudio.onEnded(()=>{
                that.slideAudioPlaying = false
                
            })
            that.slideAudio.onError((res) => {
                console.log(res.errMsg);
                console.log(res.errCode);
            });
            that.slideAudio = null

    },
    addTGAudio(index){
       var tgContext = uni.createInnerAudioContext();

            // 自动播放
            tgContext.autoplay = true;
            // 音效声音
            tgContext.volume = 0.5
            
            // 循环播放
            // this.innerAudioContext.loop = true
            tgContext.src = `../../static/music/jar/04-jar0${index}.wav`;
            
            tgContext.play()
            
            
            // 音乐开始播放
            tgContext.onPlay(() => {
                // that.slideAudioPlaying = !that.slideAudio.paused;//查看是否可以自动播放
            });
            tgContext = null
    },
    addPanAudio(){
       var panContext = uni.createInnerAudioContext();

            // 自动播放
            panContext.autoplay = true;
            // 音效声音
            panContext.volume = 0.1
            
            // 循环播放
            // this.innerAudioContext.loop = true
            panContext.src = `../../static/music/wood.wav`;
            
            panContext.play()
          
            panContext = null
    },
    addFireAudio(){
      this.fireContext = uni.createInnerAudioContext();

      // 自动播放
      this.fireContext.autoplay = true;
      this.fireContext.loop = true
      // 音效声音
      this.fireContext.volume = 0.7
      
      // 循环播放
      // this.innerAudioContext.loop = true
      this.fireContext.src = `../../static/music/fire-long.mp3`;
      
      this.fireContext.play()
            
        
    },
    getTgCSS(index){
      switch(index){
        case 1:
          return{
            top: 819 * this.scaleY + 'px',
            left: 29 * this.scaleX + 'px',
            width: 55 * this.scaleX + 'px',
            height: 45 * this.scaleY + 'px'
          }
          break;
        case 2:
          return{
            top: 862 * this.scaleY + 'px',
            left: 70 * this.scaleX + 'px',
            width: 91 * this.scaleX + 'px',
            height: 74 * this.scaleY + 'px'
          }
          break;
        case 3:
          return{
            top: 905 * this.scaleY + 'px',
            left: 162 * this.scaleX + 'px',
            width: 154 * this.scaleX + 'px',
            height: 87 * this.scaleY + 'px'
          }
          break;
        case 4:
          return{
            top: 862 * this.scaleY + 'px',
            left: 320 * this.scaleX + 'px',
            width: 127 * this.scaleX + 'px',
            height: 142 * this.scaleY + 'px'
          }
          break;
        case 5:
          return{
            top: 830 * this.scaleY + 'px',
            left: 451 * this.scaleX + 'px',
            width: 104 * this.scaleX + 'px',
            height: 127 * this.scaleY + 'px'
          }
          break;
        case 6:
          return{
            top: 752 * this.scaleY + 'px',
            left: 542 * this.scaleX + 'px',
            width: 78 * this.scaleX + 'px',
            height: 114 * this.scaleY + 'px'
          }
          break;
      }
    },
    computeMenuBtnSize(){
      this.menuBtnStyle.top = 1020 * this.scaleY +'px'
      this.menuBtnStyle.left = 106 * this.scaleX + 'px'
      this.menuBtnStyle.height =  92 * this.scaleY + 'px'
      this.menuBtnStyle.width = 206 * this.scaleX + 'px'
   
    },
    computeChooseBtnSize(){
      this.chooseBtnStyle.top = 1020 * this.scaleY +'px'
      this.chooseBtnStyle.left = 328 * this.scaleX + 'px'
      this.chooseBtnStyle.height = 92 * this.scaleY + 'px'
      this.chooseBtnStyle.width = 206 * this.scaleX + 'px' 
    },
    addTgAnimation(index){
      this.addTGAudio(index)
      const classList = document.querySelector(`#tg${index}`).classList
      classList.add('tg-touch')
      setTimeout(function(){
        classList.remove('tg-touch')
      }, 1000)
    },
    toSelect() {
      uni.navigateTo({
        url: "/pages/select/index",
      });
    },
    menuBtnEnd(e){
      this.addSlideAudio()
      this.menuBtnStyle.left = 106 * this.scaleX  + 'px'
      this.menuBtnStyle.top = 1020 * this.scaleY  + 'px'
      var that = this
      setTimeout(function(){
        that.showMenu = true
      }, 500)
    },
    menuBtnMove(e){
      // 图像位置移动
      
      this.menuBtnStyle.left = 106 * this.scaleX - 10 + 'px'
      this.menuBtnStyle.top = 1020 * this.scaleY - 3 + 'px'
    },
    chooseBtnMove(e){
      
      this.chooseBtnStyle.left = 328 * this.scaleX + 10 + 'px'
      this.chooseBtnStyle.top = 1020 * this.scaleY - 3 + 'px'
    },
    chooseBtnEnd(e){
      this.addSlideAudio()
      this.chooseBtnStyle.left = 328 * this.scaleX + 'px'
      this.chooseBtnStyle.top = 1020 * this.scaleY + 'px'
      const classList = document.querySelector("#yandi-container").classList
      var that = this
      setTimeout(function(){
        classList.add('yandi-end') 
        setTimeout(function(){
          const page_list = document.querySelector("#end").classList
          page_list.add('end')

          setTimeout(function(){
            uni.redirectTo({
              url:'/pages/makeTea/index'
            })
          }, 4000)
        }, 2000) 
      }, 500)
     
    },
    // 转盘的触碰事件
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
      let direction = 'anti-clockwise';
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
    rotate(direction) {
      this.addPanAudio()
      if (direction == "clockwise") {
        this.listGap -= 1;
      } else {
        this.listGap += 1;
      }

      this.$refs.panItems.$el.style.cssText = `transform:rotate(${this.listGap * 30}deg); transition:all 1s ease 0s;`
 
    }
  },
};
</script>

<style>
.container,
.hall,
.circle,
.yandi,
.fire{
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: absolute;
}
.panbg{
  animation: fireEnterAnimation 4s ease-out 0s;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  
}

.hall {
  background-image: url("../../static/images/hall/bg.png");
  z-index: 1;
}
.fire-enter{
  background-image: url('../../static/images/hall/fire.png');
  animation: fireEnterAnimation 2s ease-in 0s;
  animation-fill-mode: forwards;
}
.fire{
  background-image: url('../../static/images/hall/fire.png');
  opacity: 1;
  z-index: 1;
  animation: upDownAnimation 2s ease-in-out 3s infinite;
}

.yandi{
  background-image: url('../../static/images/hall/yandi.png');
  z-index: 0;
}
page {
  width: 100vw;
  overflow: hidden;
}

.choose-btn,
.menu-btn,
.tg{
  position: fixed;
  z-index: 2;
}
.tg{
  animation-delay: 1.2s;
}

.tg-touch{
  animation: tgAnimation 1s ease-in-out 0s infinite;
}

/* 退场动画 */
.yandi-end{
  animation: endFadeAnimation 2s ease-out 0s;
  animation-fill-mode: forwards;
}
.end{
  animation: endAnimation 4s ease-in 0s;
  animation-fill-mode: forwards;
}
/* 右侧转盘 */
.DrawerPage {
  
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0vw;
 
  transition: all 1s;
}

.DrawerPage.show {
  transform: scale(0.9, 0.9);
  left: -75vw;
  box-shadow: 0 0 60upx rgba(223, 135, 135, 0.2);
  transform-origin: 0;
}

.DrawerWindow {
  position: absolute;
  height: 100vh;
  top: 0;
  transform: scale(0.9, 0.9) translateX(100%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.8s;
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
  transition: all 0.8s;
}

.DrawerClose.show {
  opacity: 1;
  opacity: 0.5;
  pointer-events: all;
  width: 15vw;
  color: #fff;
  left: 0;
}

.pan-self{
  background-image: url('../../static/images/hall/pan-bgg.png');
  position: absolute;
  background-size: 100% 100%;
  width: 80vh;
  height: 80vh;
  left: calc(100vw - 40vh);
  top: 10vh;
  z-index: 999;
}

.pan-items{
  background-image: url('../../static/images/hall/pan-items.png');
  position: absolute;
  background-size: 100% 100%;
  width: 65.85vh;
  height: 65.85vh;
  left: calc(100vw - 32.925vh);
  top: 17.5vh;
  z-index: 998;
}

@keyframes rotate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(-360deg);
  }
}

@-webkit-keyframes rotate {
  0%{
    -webkit-transform: rotate(0deg);
  }
  100%{
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes tgAnimation {
   0%,
    100% {
        filter: brightness(100%);
        transform: translateX(0)
    }

    10% {
        transform: translateX(-9px)
    }

    20% {
        transform: translateX(8px)
    }

    30% {
        transform: translateX(-7px)
    }

    40% {
        transform: translateX(6px)
    }

    50% {
        filter: brightness(200%);
        transform: translateX(-5px)
    }

    60% {
        transform: translateX(4px)
    }

    70% {
        transform: translateX(-3px)
    }

    80% {
        transform: translateX(2px)
    }

    90% {
        transform: translateX(-1px)
    }
}

@-webkit-keyframes tgAnimation {
   0%,
    100% {
        filter: brightness(100%);
        -webkit-transform: translateX(0)
    }

    10% {
        -webkit-transform: translateX(-9px)
    }

    20% {
        -webkit-transform: translateX(8px)
    }

    30% {
        -webkit-transform: translateX(-7px)
    }

    40% {
        -webkit-transform: translateX(6px)
    }

    50% {
        filter: brightness(150%);
        -webkit-transform: translateX(-5px)
    }

    60% {
        -webkit-transform: translateX(4px)
    }

    70% {
        -webkit-transform: translateX(-3px)
    }

    80% {
        -webkit-transform: translateX(2px)
    }

    90% {
        -webkit-transform: translateX(-1px)
    }
}


@keyframes endAnimation {
  to{
    transform: scale(2) translateY(30vh);
    opacity: 0;   
  }
}

@-webkit-keyframes endAnimation {
  to{
    -webkit-transform: scale(2);
  }
}

@keyframes endFadeAnimation {
  to{
    opacity: 0;
  }
}

@-webkit-keyframes endFadeAnimation {
  to{
    opacity: 0;
  }
}

@keyframes upDownAnimation {
    0%,
    100% {
        filter: brightness(100%);
        transform: translateY(0)
    }

    50% {
        filter: brightness(150%);
        transform: translateY(1vh)
    }
}
@-webkit-keyframes upDownAnimation {
    0%,
    100% {
        filter: brightness(100%);
        -webkit-transform: translateY(0)
    }

    50% {
        filter: brightness(150%);
        -webkit-transform: translateY(1vh)
    }
}

@keyframes fireEnterAnimation {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@-webkit-keyframes fireEnterAnimation {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

</style>
