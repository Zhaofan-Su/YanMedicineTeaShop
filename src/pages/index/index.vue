<template>
    <view class="page">
        <view class="animation-scale-up">
            <image class="yandi" src="../../static/images/index/yandi.png" :style="'width:'+yandi.width+';height:'+yandi.height"></image>
        </view>
        <view class="animation-slide-left">
            <image class="title" src="../../static/images/index/title.png" :style="'width:'+title.width+';height:'+title.height+';top:'+title.top+';left:'+title.left"></image>
        </view>
        <view class="animation-shake" style="animationDelay:1s">
            <image class="flag" src="../../static/images/index/flag.png" :style="'width:'+flag.width+';height:'+flag.height+';top:'+flag.top + ';left:'+flag.left"></image>
        </view>
        <view class="animation-fade" style="animationDelay:0.6s">
            <image class="next-btn" src="../../static/images/index/next-btn.png" :style="'width:'+nextBtn.width+';height:'+nextBtn.height+';bottom:0px;left:0px'"></image>
        </view>
      
    </view>
</template>


<script>
export default {
    data(){
        return{
            windowHeight:1236,
            windowWidth:640,
        
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
            }
        }
    },
    onLoad() {
        this.windowHeight = getApp().globalData.windowHeight
        this.windowWidth = getApp().globalData.windowWidth

        // this.imageSize = this.windowHeight * 0.34;
    
        this.calculateDomSize()
   
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

        }
    }
    
}
</script>

<style scoped>
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
</style>