<template>
    <view class="container pt-page-scaleUpCenter" @tap="addBgm"></view>
</template>

<script>
export default {
    methods:{
        addBgm(){
            if(getApp().globalData.innerAudioContext !== null){
                return false
            }
            getApp().globalData.innerAudioContext = uni.createInnerAudioContext();

            // 自动播放
            getApp().globalData.innerAudioContext.autoplay = true;
            // 循环播放
            getApp().globalData.innerAudioContext.loop = true
            getApp().globalData.innerAudioContext.src = '../../static/music/P1-bgm-new.mp3';
          
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


            setTimeout(function(){
                uni.redirectTo({
                    url:'/pages/indexA/index'
                })
            }, 200)
        }
    }
}
</script>

<style scoped>
.container{
    background-image: url('../../static/images/first.png');
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>