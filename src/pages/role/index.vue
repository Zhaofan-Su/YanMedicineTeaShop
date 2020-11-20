<template>
  <view class="choose-role">
    <view class="role-list" :style="'height:' + windowHeight+'px'">
      <swiper
        class="card-swiper square-dot"
        :indicator-dots="false"
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
        @touchend.stop.prevent="handleTouchEnd"
      >
        <swiper-item :style="'width:'+imageSize+'px !important;height:'+imageSize+'px !important'" v-for="(role, index) in roleList" :key="index" >
          <image :src="role.url" mode="aspectFill" :class="roleIndex-1==index?'active':''" :style="'width:'+imageSize+'px;height:'+imageSize+'px'"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="role-name">
      <image :src="'../../static/images/role/role-name-'+roleList[roleIndex-1].name+'.png'" :style="'width:'+roleName.width + ';height:'+roleName.height + ';left:'+roleName.left+';top:'+roleName.top"></image>
    </view>
    <view class="enter-btn">
      <!-- <transition name="fade">
        <image v-if="roleList[roleIndex-1].name=='yao'" src="../../static/images/enter-btn.png" :style="'width:'+enterBtn.width + ';height:'+enterBtn.height + ';left:'+enterBtn.left+';top:'+enterBtn.top"></image>
        <image v-else src="../../static/images/enter-btn-disable.png" :style="'width:'+enterBtn.width + ';height:'+enterBtn.height + ';left:'+enterBtn.left+';top:'+enterBtn.top"></image>

      </transition> -->

      <image :src="roleList[roleIndex-1].name=='yao'?'../../static/images/role/enter-btn.png':'../../static/images/enter-btn-disable.png'" :style="'width:'+enterBtn.width + ';height:'+enterBtn.height + ';left:'+enterBtn.left+';top:'+enterBtn.top"></image>
    </view>
    <view class="intro-btn" @tap="toIntro">
      <image :src="roleList[roleIndex-1].name=='yao'?'../../static/images/role/intro-btn.png':'../../static/images/intro-btn-disable.png'" :style="'width:'+introBtn.width + ';height:'+introBtn.height + ';left:'+introBtn.left+';top:'+introBtn.top"></image>
    </view>
    <view class="role-tag">
      <!-- <transition name = "fade"> -->
        <!-- <image v-if="roleList[roleIndex-1].name" :src="'../../static/images/role-tag-'+ roleList[roleIndex-1].name + '.png'" :style="'width:'+roleTag.width + ';height:'+roleTag.height + ';left:'+roleTag.left+';top:'+roleTag.top"></image> -->
  
        <image :src="'../../static/images/role/role-tag-'+ roleList[roleIndex-1].name + '.png'" :style="'width:'+roleTag.width + ';height:'+roleTag.height + ';left:'+roleTag.left+';top:'+roleTag.top"></image>
      <!-- </transition> -->
    </view>
  </view>
  
</template>



<script>

// TODO: 页面元素切换动效需要做
export default {
 
  data() {
    return {
      imageSize:420,
      windowHeight:1236,
      windowWidth:640,
      roleList: [
        {
          id: 1,
          url: "../../static/images/role/role.png",
          name:'yao'
        },
        {
          id: 2,
          url: "../../static/images/role/role.png",
          name:'shang'
        },
        {
          id: 3,
          url: "../../static/images/role/role.png",
          name:'yi'
        },
        {
          id: 4,
          url: "../../static/images/role/role.png",
          name:'shen'
        },
        {
          id: 5,
          url: "../../static/images/role/role.png",
          name:'jiang'
        },
      ],
      roleIndex: 1,
      roleName:{
        width:'105px',
        height:'197px',
        left:'284px',
        top:'333px'
      },
      enterBtn:{
        width:'31px',
        height:'96px',
        left:'392px',
        top:'333px'
      },
      introBtn:{
        width:'31px',
        height:'97px',
        left:'392px',
        top:'433px'
      },
      roleTag:{
        width:'51px',
        height:'51px',
        left:'564px',
        top:'558px'
      }
    };
  },
  onLoad() {
    this.windowHeight = getApp().globalData.windowHeight
    this.windowWidth = getApp().globalData.windowWidth

    this.imageSize = this.windowHeight * 0.34;
   
    this.calculateDomSize()
   
  },
  methods: {
    calculateDomSize(){
      var scaleSize = this.windowHeight / 1236;
      // 角色名字的图片尺寸和位置
      this.roleName.width = scaleSize * 105 + 'px'
      this.roleName.height = scaleSize * 197 +'px'
      this.roleName.left = scaleSize * 284 +'px'
      this.roleName.top = scaleSize * 333 + 'px'

      // 进入店铺按钮的尺寸和位置
      this.enterBtn.width = scaleSize * 31 + 'px'
      this.enterBtn.height = scaleSize * 96 + 'px'
      this.enterBtn.top = scaleSize * 333 + 'px'
      this.enterBtn.left = scaleSize * 392 + 'px'

      // 人物简介按钮的尺寸和位置
      this.introBtn.width = scaleSize * 31 + 'px'
      this.introBtn.height = scaleSize * 97 + 'px'
      this.introBtn.left = scaleSize * 392 + 'px'
      this.introBtn.top = scaleSize * 433 + 'px'

      // 人物tag按钮的尺寸和位置
      this.roleTag.width = scaleSize * 51 + 'px'
      this.roleTag.height = scaleSize * 51 +'px'
      this.roleTag.left = scaleSize * 609 + 'px'
      this.roleTag.top = scaleSize * 558 + 'px'

    },
    roleChange(e) {
      this.roleIndex = e.detail.current + 1;
    },
    toHall(e) {
      // 到大厅
      uni.redirectTo({
        url: "/pages/hall/index",
        success: (res) => {},
        fail: (res) => {},
      });
    },
    toIntro(e){
      console.log(e)
      if(this.roleIndex == 1){
        uni.navigateTo({
          url:'/pages/intro/index',
          success:res=>{},
          fail:res=>{}
        })
      }
      
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
  background-image: url("../../static/images/role/role-bg.png");

  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
}
.role-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.active{
  transform: scale(1.4);
  transition: all .5s ease-in 0s;
  z-index: 20;
  
}
.card-swiper swiper-item{
  left: 0;
}
.card-swiper swiper-item image{
  height: 100%;
  width: 100%;
}

/* 固定元素 */
.enter-btn,
.intro-btn,
.role-name,
.role-tag{
  position: fixed;
}
</style>
