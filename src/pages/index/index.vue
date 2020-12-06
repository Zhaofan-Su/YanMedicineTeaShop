<template>

    <view class="container">
        <view class="page" style="z-index:99">
            
            <view class="animation-scale-up">
                <image class="yandi" src="../../static/images/index/yandi.png" :style="'width:'+yandi.width+';height:'+yandi.height"></image>
            </view>
            <view class="animation-slide-left">
                <image class="title" src="../../static/images/index/title.png" :style="'width:'+title.width+';height:'+title.height+';top:'+title.top+';left:'+title.left"></image>
            </view>
            <view class="animation-shake" style="animationDelay:1s">
                <image class="flag" src="../../static/images/index/flag.png" :style="'width:'+flag.width+';height:'+flag.height+';top:'+flag.top + ';left:'+flag.left"></image>
            </view>
            <view class="animation-fade" style="animationDelay:0.6s"  @touchstart.stop.prevent='handleTouchStart' @touchend.stop.prevent='handleTouchEnd'>
                <image class="next-btn" src="../../static/images/index/next-btn.png" @tap="tapTo" :style="'width:'+nextBtn.width+';height:'+nextBtn.height+';bottom:0px;left:0px'"></image>
            </view>
        </view>
        
        <view class="downPage">
            <view class="role-list" :style="'height:' + windowHeight+'px;top:'+windowHeight+'px;position:fixed'">
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
            <view class="enter-btn"  @tap="toHall" >
                <image  :src="roleList[roleIndex-1].name=='yao'?'../../static/images/role/enter-btn.png':'../../static/images/role/enter-btn-disable.png'" :style="'width:'+enterBtn.width + ';height:'+enterBtn.height + ';left:'+enterBtn.left+';top:'+enterBtn.top"></image>
            </view>
            <view class="intro-btn" @tap="toIntro">
                <image v-if="roleList[roleIndex-1].name=='yao'" src="../../static/images/role/intro-btn.png" :style="'width:'+introBtn.width + ';height:'+introBtn.height + ';left:'+introBtn.left+';top:'+introBtn.top"></image>
                <image v-else src="../../static/images/role/intro-btn-disable.png" :style="'width:'+introBtn.width + ';height:'+introBtn.height + ';left:'+introBtn.left+';top:'+introBtn.top"></image>
            </view>
            <view class="role-tag">
                <image :src="'../../static/images/role/role-tag-'+ roleList[roleIndex-1].name + '.png'" :style="'width:'+roleTag.width + ';height:'+roleTag.height + ';left:'+roleTag.left+';top:'+roleTag.top"></image>
            </view>
        </view>
    </view>
    
</template>


<script>
export default {
    data(){
        return{
            windowHeight:1236,
            windowWidth:640,
            startY:0,
            title:{
                    width:'170px',
                    height:'543px',
                    top:'260px',
                    left:'204px'
            },
            nextBtn:{
                width:'647px',
                height:'330px'
            },
            yandi:{
                width:'387px',
                height:'227px'
            },
            flag:{
                width:'54px',
                height:'51px',
                left:'350px',
                top:'258px'
            },
            // 以下是role的
             imageSize:420,
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
      }
    },
    onLoad() {
        this.windowHeight = getApp().globalData.windowHeight
        this.windowWidth = getApp().globalData.windowWidth

        this.imageSize = this.windowHeight * 0.34;
    
        this.calculateDomSize()
        this.calculateRoleDomSize()
        
    
    },
    onReady(){
        this.tapTo()
    },
    onUnload(){
        
    },
    methods:{
        calculateDomSize(){
            var scaleSize = this.windowHeight / 1236
            this.title.width = scaleSize * 170 + 'px'
            this.title.height = scaleSize * 543 + 'px'
            this.title.top = scaleSize * 260 + 'px'
            this.title.left = scaleSize * 204 + 'px'

            // 进入下页
            this.nextBtn.height = scaleSize * 330 + 'px'

            // 炎帝头像
            this.yandi.width = scaleSize * 387 + 'px'
            this.yandi.height = scaleSize * 227 + 'px'

            // 红色小flag
            this.flag.width = scaleSize * 54 + 'px'
            this.flag.height = scaleSize * 51 + 'px'
            this.flag.left = scaleSize * 350 + 'px'
            this.flag.top = scaleSize * 258 + 'px'

        },
        handleTouchStart(e){
            this.startY = e.touches[0].clientY
          
        },
        handleTouchEnd(e){
            var endY = e.changedTouches[0].clientY
            if((this.startY - endY)>0){
                // const classList = document.querySelector('uni-page').classList
                // classList.add('animation-leave')  // 新代码
                // setTimeout(function(){
                //     uni.redirectTo({
                //         url: "/pages/role/index",
                //         success: (res) => {},
                //         fail: (res) => {},
                //     })
                // }, 2000)      
              
                
            }
        },
        tapTo(){
                console.log('向上拉')   
                uni.createSelectorQuery().select(".downPage").boundingClientRect((res)=>{
                    console.log(res)
                    uni.pageScrollTo({
                        duration:0,
                        scrollTop:res.top
                    })
                }).exec();  
        },
        // 以下是role的
         calculateRoleDomSize(){
      var scaleSize = this.windowHeight / 1236;
      // 角色名字的图片尺寸和位置
      this.roleName.width = scaleSize * 105 + 'px'
      this.roleName.height = scaleSize * 197 +'px'
      this.roleName.left = scaleSize * 284 +'px'
      this.roleName.top = scaleSize * 333 + this.windowHeight + 'px'
  

      // 进入店铺按钮的尺寸和位置
      this.enterBtn.width = scaleSize * 31 + 'px'
      this.enterBtn.height = scaleSize * 96 + 'px'
      this.enterBtn.top = scaleSize * 333 + this.windowHeight + 'px'
      this.enterBtn.left = scaleSize * 392 + 'px'

      // 人物简介按钮的尺寸和位置
      this.introBtn.width = scaleSize * 31 + 'px'
      this.introBtn.height = scaleSize * 97 + 'px'
      this.introBtn.left = scaleSize * 392 + 'px'
      this.introBtn.top = scaleSize * 433 + this.windowHeight + 'px'

      // 人物tag按钮的尺寸和位置
      this.roleTag.width = scaleSize * 51 + 'px'
      this.roleTag.height = scaleSize * 51 +'px'
      this.roleTag.left = scaleSize * 609 + 'px'
      this.roleTag.top = scaleSize * 558 + this.windowHeight + 'px'

    },
    roleChange(e) {
      this.roleIndex = e.detail.current + 1;
    },
    toHall(e) {
      // 到大厅
      if(this.roleIndex == 1){
        // uni.redirectTo({
        //   url: "/pages/hall/index",
        //   success: (res) => {},
        //   fail: (res) => {},
        // });
        uni.navigateTo({
          url: '/pages/hall/index',
          animationType: 'pop-in',
          animationDuration: 200
        })
      }
      
    },
    toIntro(e){
      console.log(e)
      if(this.roleIndex == 1){
        uni.navigateTo({
          url:'/pages/intro/index',
          animationType: 'pop-in',
          animationDuration: 200,
          success:res=>{},
          fail:res=>{}
        })
      }
      
    },
    handleTouchEnd(e){
      // 上下滑动定位 
      this.$refs.swiper.$refs.slideFrame.style.transform = `translate(0px, -${(this.roleIndex-1)*100}% translateZ(0px)`
    }
    }
    
}
</script>

<style scoped>
.container{
    background-image: url("../../static/images/index/bg.png");
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
}
.page{
    background-image: url("../../static/images/index/bg.png");
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
}

.yandi,
.title,
.next-btn,
.flag{
position: fixed;
}

.yandi{
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
}

.animation-slide-left{
    animation-duration: 1s;
}
.animation-scale-up{
    animation-duration: 1s;
}

/* 页面退出动画 */
uni-page.animation-leave {
	-webkit-animation: moveToTop 2s ease both;
	-moz-animation: moveToTop 2s ease both;
	animation: moveToTop 2s ease both;
}
@-webkit-keyframes moveToTop {
	to {
		-webkit-transform: translateY(-100%);
	}
}
@-moz-keyframes moveToTop {
	to {
		-moz-transform: translateY(-100%);
	}
}

@keyframes moveToTop {
	to {
		transform: translateY(-100%);
	}
}


/* 以下是role的 */
.downPage{
    z-index: -1;
}
.choose-role {
  background-image: url("../../static/images/role/role-bg.png");
  background-blend-mode: multiply;

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

.enter-btn,
.intro-btn{
  animation-name: imageFade;
  animation-timing-function: ease-in-out;
  /* animation-iteration-count: infinite; */
  animation-duration: 1s;
  /* animation-direction: alternate; */
  /* transition: all .3s; */
}

@keyframes enterToDisable {
  0% {
    background-image: url("../../static/images/role/enter-btn.png");
  }

  100% {
    background-image: url("../../static/images/role/enter-btn-disable.png");
  }
}

</style>