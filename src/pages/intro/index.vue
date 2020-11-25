<template>
    <view class="container">
        <view class="back">
            <image src="../../static/images/intro/back.png" :style="'width:'+back.width+';height:'+back.height+';left:'+back.left+';top:'+back.top"></image>
        </view>
        <view class="share">
            <image src="../../static/images/intro/share.png" :style="'width:'+share.width+';height:'+share.height+';left:'+share.left+';top:'+share.top"></image>
        </view>
        <view class="char">
            <image src="../../static/images/intro/char.png" :style="'width:'+char.width+';height:'+char.height+';bottom:0px;left:0px'"></image>
        </view>
         <view class="charBg">
            <image src="../../static/images/intro/char-bg.png" :style="'width:'+charBg.width+';height:'+charBg.height+';top:'+charBg.top"></image>
        </view>
        
    </view>
</template>

<script>
export default {
    data(){
        return{
            scaleSize:1,
            back:{
                width:'70px',
                height:'51px',
                left:'36px',
                top:'57px'
            },
            share:{
                width:'68px',
                height:'37px',
                left:'538px',
                top:'65px'
            },
            char:{
               width:'640px',
               height:'1236px'
            },
            charBg:{
                width:'724px',
                height:'1084px',
                top:'0px'
            }
        }
    },
    onLoad(){
        
        this.calculateDomSize()
    },
    methods:{
        calculateDomSize(){
            var scaleSize = getApp().globalData.scaleSize
            var scaleX = getApp().globalData.scaleX
            this.back.width = 70 * scaleSize + 'px'
            this.back.height = 51 * scaleSize + 'px'
            this.back.top = 57 * scaleSize + 'px'
            this.back.left = 36 * scaleSize + 'px'

            this.share.width = 68 * scaleSize + 'px'
            this.share.height = 37 * scaleSize + 'px'
            this.share.top = 65 * scaleSize + 'px'
            this.share.left = 538 * scaleX + 'px'

            this.char.width = 640 * scaleX+'px'
            this.char.height = 1236 * scaleSize + 'px'

            this.charBg.width = 724 * scaleX + 'px'
            console.log(this.charBg.width)
            this.charBg.height = 1084 * scaleSize + 'px'      
            // this.charBg.top = 94 * scaleSize + 'px'      
        }
    }
}
</script>

<style scoped>
.container{
    background-image: url('../../static/images/intro/bg.png');
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
}
.back,
.share,
.char,
.charBg{
    position: fixed;
}

.charBg{
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
}


</style>