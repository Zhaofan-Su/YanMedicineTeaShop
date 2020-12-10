<template>
  <view class="choose-role" >
     
    <view class="role-tag">
        <image :src="'../../static/images/role/tag-'+ roleList[roleIndex-1].name + '.png'"></image>
    </view>

    <view class="right-bar">
        <image src="../../static/images/role/rightBar.png"></image>
    </view>

    <view class="role-list" :style="'height:' + windowHeight+'px'" >
      <swiper
        class="card-swiper"
        :circular="true"
        :autoplay="false"
        :vertical="true"
        interval="5000"
        duration="500"
        :previous-margin="imageSize*0.85 + 'px'"
        :next-margin="imageSize*0.85 + 'px'"
        :style="'height:' + windowHeight+'px'"
        @change="roleChange"
        ref="swiper"
        @touchend="handleTouchEnd"
        
      >
        <swiper-item :class="roleIndex-1==index?'active':''" :style="'width:'+imageSize+'px !important;height:'+imageSize+'px !important'" v-for="(role, index) in roleList"  :ref="'swiperItem'+index" :key="index" >
          <image @tap="toIntro" :src="role.url" mode="aspectFill"  :style="'width:'+imageSize+'px;height:'+imageSize+'px'"></image>
        </swiper-item>
      </swiper>
    </view>
  
  </view>
  
</template>



<script>

export default {
 
  data() {
    return {
      imageSize:530,
      roleList: [
        {
          id: 1,
          url: "../../static/images/role/yao.png",
          name:'yao'
        },
        {
          id: 2,
          url: "../../static/images/role/shang.png",
          name:'shang'
        },
        {
          id: 3,
          url: "../../static/images/role/yi.png",
          name:'yi'
        },
        {
          id: 4,
          url: "../../static/images/role/nong.png",
          name:'nong'
        },
        {
          id: 5,
          url: "../../static/images/role/jiang.png",
          name:'jiang'
        },
      ],
      roleIndex: 1,
      rotateAudio:null,
      rotatePlaying:false
    };
  },
 
  onLoad() {
    this.windowHeight = getApp().globalData.windowHeight
    this.windowWidth = getApp().globalData.windowWidth
    this.imageSize = this.windowHeight * 0.34;
  },
  onUnload(){
    if(getApp().globalData.innerAudioContext !== null){
      getApp().globalData.innerAudioContext.destroy()
    }
    if(this.rotateAudio!==null){
      this.rotateAudio.destroy()
    }
  },
  methods: {
    addRotateAudio(){
      if(this.rotatePlaying || this.rotateAudio!== null){
                return false
            }
            this.rotateAudio = uni.createInnerAudioContext();

            // 自动播放
            this.rotateAudio.autoplay = true;
            // 音效声音
            this.rotateAudio.volume = 0.2
            
            // 循环播放
            // this.innerAudioContext.loop = true
            this.rotateAudio.src = '../../static/music/rotate.wav';
            
            this.rotateAudio.play()
            
            
            var that = this
            // 音乐开始播放
            this.rotateAudio.onPlay(() => {
                that.rotatePlaying = !that.rotateAudio.paused;//查看是否可以自动播放
            });
            that.rotateAudio.onEnded(()=>{
                that.rotatePlaying = false
            })
            that.rotateAudio.onError((res) => {
                console.log(res.errMsg);
                console.log(res.errCode);
            });

    },
    roleChange(e) {
      this.roleIndex = e.detail.current + 1;
    },
    toIntro(){
      this.addRotateAudio()
      const classList = document.querySelector('.uni-swiper-wrapper').classList
      var that = this
      for(var i = 0; i < this.roleList.length; i++){
        if(i !== this.roleIndex -1 ){
          this.$refs[`swiperItem${i}`][0].$el.style.cssText = this.$refs[`swiperItem${this.roleIndex-1}`][0].$el.style.cssText + ";transition:all 1s ease-out 0s;z-index:-1"
        }
        setTimeout(function(){
            classList.add('pt-page-rotateOutNewspaper')
        }, 1000)
      }
      setTimeout(function(){
        that.$refs[`swiperItem0`][0].$el.style.cssText = `height:100%;width:100%;position:absolute;transform:translate(0px 0%) translateZ(0px)`
        that.$refs[`swiperItem1`][0].$el.style.cssText = `height:100%;width:100%;position:absolute;transform:translate(0px 100%) translateZ(0px)`
        that.$refs[`swiperItem2`][0].$el.style.cssText = `height:100%;width:100%;position:absolute;transform:translate(0px 200%) translateZ(0px)`
        that.$refs[`swiperItem3`][0].$el.style.cssText = `height:100%;width:100%;position:absolute;transform:translate(0px -200%) translateZ(0px)`
        that.$refs[`swiperItem4`][0].$el.style.cssText = `height:100%;width:100%;position:absolute;transform:translate(0px -100%) translateZ(0px)`

        classList.remove('pt-page-rotateOutNewspaper')
        uni.redirectTo({
          url: `/pages/intro/index?role=${that.roleList[that.roleIndex-1].name}`
        })
      }, 2000)
     
      
    },
    handleTouchEnd(e){
      // 上下滑动定位 
      this.$refs.swiper.$refs.slideFrame.style.transform = `translate(0px, -${(this.roleIndex-1)*100}% translateZ(0px)`
    }
  },
};
</script>

<style>
.choose-role {
  background-image: url("../../static/images/role/bg.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

.role-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  animation: roleShow 4s ease-out 0s;
}

.active image{
  transform: scale(1.4);
  transition: all .5s ease-in 0s;
  filter: brightness(100%) !important;
}

.card-swiper swiper-item{
  left: 0;
}
.card-swiper swiper-item image{
  height: 100%;
  width: 100%;
  filter: brightness(50%);
}

/* 固定元素 */
.role-tag image, .right-bar image{
  position: absolute;
  width: 100%;
  height: 100%;
  animation: show 3s ease-in-out 2s;
  filter: brightness(0%);
  animation-fill-mode: forwards;
}

@keyframes roleShow {
  0%{
    filter: brightness(0%);
    transform: scale(0.9);
  }
  100%{
    filter: brightness(100%);
    transform: scale(1);
  }
}

@-webkit-keyframes roleShow {
  0%{
    filter: brightness(0%);
    -webkit-transform: scale(0.9);
  }
  100%{
    filter: brightness(100%);
    -webkit-transform: scale(1);
  }
}

@keyframes show {
  0%{
    filter: brightness(0%);
  }
  80%{
    filter: brightness(120%);
  }
  100%{
    filter: brightness(100%);
  }
}

@-webkit-keyframes show {
  0%{
    -webkit-filter: brightness(0%);
  }
  80%{
    -webkit-filter: brightness(120%);
  }
  100%{
    -webkit-filter: brightness(100%);
  }
}
</style>
