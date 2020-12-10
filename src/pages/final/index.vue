<template>
    <view class="show" style="animationDuration:2s">
        <view class="container" >
            <image :src="imageSrc"></image>
        </view>
        <view class="item">
            <image :src="'../../static/images/makeTea/tag/'+item1+'-hui.png'" :style="item1Style"></image>
        </view>
        <view class="item">
            <image :src="'../../static/images/makeTea/tag/'+item2+'-hui.png'" :style="item2Style"></image>
        </view>
        <view class="item">
            <image :src="'../../static/images/makeTea/tag/'+item3+'-hui.png'" :style="item3Style"></image>
        </view>
        <view class="back" @tap="goBack">
            <image src="../../static/images/final/back.png" :style="backStyle"></image>
        </view>
        <view class="buy">
            <image src="../../static/images/final/shop.png" :style="buyStyle"></image>
        </view>
        <view class="save">
            <image src="../../static/images/final/save.png" :style="saveStyle"></image>
        </view>
        
    </view>
  

</template>

<script>
export default {
    data(){
        return{
            imageSrc:'../../static/images/final/mei.png',
            windowHeight:1230,
            windowWidth:640,
            scaleX:1,
            scaleY:1,
            backStyle:'',
            buyStyle:'',
            item1Style:'',
            item2Style:'',
            item3Style:'',
            saveStyle:'',
            item1:'',
            item2:'',
            item3:''
        }
    },
    onLoad(obj){
        this.item1 = obj.item1
        this.item2 = obj.item2
        this.item3 = obj.item3
        this.windowHeight = getApp().globalData.windowHeight
        this.windowWidth = getApp().globalData.windowWidth

        this.scaleX = getApp().globalData.scaleX
        this.scaleY = getApp().globalData.scaleY

        this.getDomStyle()
        this.addOkAudio()
        this.imageSrc = `../../static/images/final/${obj.item1}.png`
    },
    methods:{   
        addOkAudio(){
            var okContext = uni.createInnerAudioContext();

            // 自动播放
            okContext.autoplay = true;
            // 音效声音
            okContext.volume = 1
            
            // 循环播放
            // this.innerAudioContext.loop = true
            okContext.src = `../../static/music/check.mp3`;
            
            okContext.play()
          
            okContext = null
        },
        getTeaCard(){
            return{
                "background-image":this.imageSrc
            }
        },
        getDomStyle(){
            this.backStyle = `top:${43*this.scaleY}px;left:${42*this.scaleX}px;width:${92*this.scaleX}px;height:${33*this.scaleY}px`
            this.buyStyle = `top:${44*this.scaleY}px;left:${466*this.scaleX}px;width:${142*this.scaleX}px;height:${33*this.scaleY}px`
            this.item1Style = `top:${287*this.scaleY}px;left:${199*this.scaleX}px;width:${71*this.scaleX}px;height:${71*this.scaleY}px`
            this.item2Style = `top:${291*this.scaleY}px;left:${304*this.scaleX}px;width:${71*this.scaleX}px;height:${71*this.scaleY}px`
            this.item3Style = `top:${287*this.scaleY}px;left:${407*this.scaleX}px;width:${71*this.scaleX}px;height:${71*this.scaleY}px`
            this.saveStyle = `top:${1085*this.scaleY}px;left:${516*this.scaleX}px;width:${86*this.scaleX}px;height:${86*this.scaleY}px`
        },
        goBack(){
            uni.redirectTo({
                url:'/pages/makeTea/index'
            })
        }
    }
}
</script>

<style scoped>
.container image{
  width: 100%;
  height: 100%;
  position: absolute;
}

.back,
.save,
.share,
.item{
    position: fixed;
}

.show{
    animation: showAnimation 2s ease-in 0s;
}

@keyframes showAnimation {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

@-webkit-keyframes showAnimation {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
</style>
