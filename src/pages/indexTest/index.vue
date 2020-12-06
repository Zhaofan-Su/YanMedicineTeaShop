<template>
    <scroll-view scroll-y scroll-with-animation  class="container" >
        <!-- <scroll-view scroll-y scroll-with-animation style="position:relative"> -->
            <view class="startPart" style="position:relative">
                
                <view class="animation-scale-up">
                    <image class="yandi" src="../../static/images/index/yandi.png" :style="'width:'+yandi.width+';height:'+yandi.height"></image>
                </view>
                <view class="animation-slide-left">
                    <image class="title" src="../../static/images/index/title.png" :style="'width:'+title.width+';height:'+title.height+';margin-top:'+title.top+';margin-left:'+title.left"></image>
                </view>
                <view class="animation-shake" style="animationDelay:1s">
                    <image class="flag" src="../../static/images/index/flag.png" :style="'width:'+flag.width+';height:'+flag.height+';margin-top:'+flag.top + ';margin-left:'+flag.left"></image>
                </view>
                <view class="animation-fade" style="animationDelay:0.6s">
                    <image class="next-btn" src="../../static/images/index/next-btn.png" :style="'width:'+nextBtn.width+';height:'+nextBtn.height+';margin-top:' + nextBtn.top +';margin-left:0px'"></image>
                </view>
            </view>
            <view class="rolePart" :style="'position:relative;overflow:hidden;top:'+windowHeight+'px'">
                <view class="role-list" :style="'height:' + windowHeight+'px;'">
                    <swiper
                        id="role-swiper"
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

                <view class="role-name" >
                        <image :src="'../../static/images/role/role-name-'+roleList[roleIndex-1].name+'.png'" :style="'width:'+roleName.width + ';height:'+roleName.height + ';margin-left:'+roleName.left+';margin-top:'+roleName.top"></image>
                </view>
               
            </view>
        <!-- </scroll-view> -->
    </scroll-view>
   
</template>

<script>
export default {
    data(){
        return{
            windowHeight:1236,
            windowWidth:640,
            startY:0,
            // scrollTo:'startPart',
            title:{
                    width:'170px',
                    height:'543px',
                    top:'260px',
                    left:'204px'
            },
            nextBtn:{
                width:'647px',
                height:'330px',
                top:'910px'
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

            // role部分
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
            this.nextBtn.top = scaleSize * 910 + 'px'

            // 炎帝头像
            this.yandi.width = scaleSize * 387 + 'px'
            this.yandi.height = scaleSize * 227 + 'px'

            // 红色小flag
            this.flag.width = scaleSize * 54 + 'px'
            this.flag.height = scaleSize * 51 + 'px'
            this.flag.left = scaleSize * 350 + 'px'
            this.flag.top = scaleSize * 258 + 'px'

        },
        calculateRoleDomSize(){
            var scaleSize = this.windowHeight / 1236;
            this.imageSize = this.windowHeight * 0.34;
            // 角色名字的图片尺寸和位置
            this.roleName.width = scaleSize * 105 + 'px'
            this.roleName.height = scaleSize * 197 +'px'
            this.roleName.left = scaleSize * 284 +'px'
            this.roleName.top = scaleSize * 333 +  'px'

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
.yandi,
.title,
.next-btn,
.flag{
/* position: fixed; */
position: absolute;
}


.enter-btn,
.intro-btn,
.role-name,
.role-tag{
  /* position: absolute; */
}

/* role部分的样式 */
.active{
  transform: scale(1.4);
  transition: all .5s ease-in 0s;
  z-index: 20;
  
}
</style>