<template>
    <view id="index-page" @tap="addBgm">
        <view id="other" class="container ">
            <view class="title"></view>
            <view class="yandi"></view>
            <view class="yi"></view>
            <view class="jiang"></view>
            <view class="cha"></view>
            <view class="nong"></view>
            <view class="shang"></view>
            <view id="topStar" class="star"></view>
        </view>
        <view id="fireFire" class="fire" @tap="toRolePage"></view>
    </view>
</template>

<script>
export default {
    data(){
        return{
            enterEnable:false,
            fireAudio:null,
            fireAudioPlaying:false
        }
    },
    onLoad(){
        var that = this
        setTimeout(function(){
            that.enterEnable = true
        },10000)      
    },
    onReady(){
        
    },
    onUnload(){
        // 小火苗音乐销毁
        if(this.fireAudio!=null){
            this.fireAudio.destroy()
        }
        
    },
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
        },
        addFireAudio(){
            if(this.fireAudioPlaying || this.fireAudio !== null){
                return false
            }
            this.fireAudio = uni.createInnerAudioContext();

            // 自动播放
            this.fireAudio.autoplay = true;
            // 音效声音
            this.fireAudio.volume = 0.2
            
            // 循环播放
            // this.innerAudioContext.loop = true
            this.fireAudio.src = '../../static/music/index-fire-rise.wav';
            
            this.fireAudio.play()
            
            
            var that = this
            // 音乐开始播放
            this.fireAudio.onPlay(() => {
                that.fireAudioPlaying = !that.fireAudio.paused;//查看是否可以自动播放
            });
            that.fireAudio.onEnded(()=>{
                that.fireAudioPlaying = false
            })
            that.fireAudio.onError((res) => {
                console.log(res.errMsg);
                console.log(res.errCode);
            });


        },
        toRolePage(){
            if(this.enterEnable){
                var that = this
                setTimeout(function(){
                    that.addFireAudio()
                }, 2000)
                


                const FireClassList = document.querySelector('#fireFire').classList
                const other = document.querySelector('#other').classList
              
                other.add('fade')

                setTimeout(function(){
                    FireClassList.add('changePage')
                    setTimeout(function(){
                        uni.redirectTo({
                            url:'/pages/roleA/index'
                        })
                    }, 6200)
                }, 1000)
                
                
                
            }
            
        }
    }
}
</script>

<style scoped>
.container,
.title,
.yandi,
.fire,
.yi,
.jiang,
.cha,
.nong,
.shang,
.star {
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: absolute;
}

.container{
    background-image: url('../../static/images/index/bg.png');
}



/* title动画 */
.title {
    background-image: url('../../static/images/index/title.png');
    filter: brightness(5%);
    animation: titleAnimation 6s ease-out 8s ;
    animation-fill-mode: forwards;
}


/* 炎帝动画 */
.yandi{
    background-image: url('../../static/images/index/yandi.png');
    animation: yandiAnimation  6s ease;

}

/* 标签动画 */
.yi{
    background-image: url('../../static/images/index/yi.png');
    animation: tagAnimation 1s ease 1s;
}
.jiang{
    background-image: url('../../static/images/index/jiang.png');
    animation: tagAnimation 1s ease 2s;
}
.cha{
    background-image: url('../../static/images/index/cha.png');
    animation: tagAnimation 1s ease 3s;
}
.nong{
    background-image: url('../../static/images/index/nong.png');
    animation: tagAnimation 1s ease 4s;
}
.shang{
    background-image: url('../../static/images/index/shang.png');
    animation: tagAnimation 1s ease 5s;
}

/* star动画 */
.star{
    background-image: url('../../static/images/index/star.png');
    filter: brightness(70%);
    animation: starAnimation 2s ease 6s infinite;
}

/* fire动画 */
.fire{
    background-image: url('../../static/images/index/fire-norm.png');
    opacity: 0;
    animation: fireAnimation 4s linear 6s;
    animation-fill-mode: forwards;
}

/* fire反向动画 */
.fire-reverse{
    animation: fireAnimation 4s linear 0s;
    animation-fill-mode: forwards;
    animation-direction: reverse;
}

/* 火苗换页动画 */
.changePage{
    animation: changePageAnimation 6s ease-in 0s;
}

/* 其他元素的退场动画 */
.fade{
    animation: fadeAnimation 4s ease-in 0s;
    animation-fill-mode: forwards;
}


@keyframes titleAnimation { 
    0%{
        filter: brightness(10%);
    }
    20%{
        filter: brightness(40%);
    }
    40%{
        filter: brightness(10%);
    }
    60%,70%{
        filter: brightness(40%);
    }
    80%{
        filter: brightness(130%);
    }
    100%{
        filter: brightness(100%);
    }
    
}

@-webkit-keyframes titleAnimation { 
    0%{
        -webkit-filter: brightness(10%);
    }
    20%{
        -webkit-filter: brightness(40%);
    }
    40%{
        -webkit-filter: brightness(10%);
    }
    60%,70%{
        -webkit-filter: brightness(40%);
    }
    80%{
        -webkit-filter: brightness(130%);
    }
    100%{
        -webkit-filter: brightness(100%);
    }
    
}

@keyframes yandiAnimation {
    0%{
        filter: brightness(5%);
        transform: translateY(40vh);
    }
    25%{
        filter: brightness(25%);
    }
    50%{
        filter: brightness(50%);
    }
    75%{   
        filter: brightness(75%);
    }
    100%{   
        filter: brightness(100%);
        transform: translateY(0vh);
    }
}

@-webkit-keyframes yandiAnimation {
    0%{
        -webkit-filter: brightness(5%);
        -webkit-transform: translateY(-50vh);
    }
    30%{
        -webkit-filter: brightness(30%);
        -webkit-transform: translateY(-30vh);
    }
    60%{
        -webkit-filter: brightness(60%);
        -webkit-transform: translateY(-20vh);
    }
    100%{   
        -webkit-filter: brightness(100%);
        -webkit-transform: translateY(0vh);
    }
}

@keyframes tagAnimation {
    50%{
        filter: brightness(300%);
    }
    100%{
        filter: brightness(100%);    
    }
    
}

@-webkit-keyframes tagAnimation {
    50%{
        -webkit-filter: brightness(300%);
    }
    100%{
        -webkit-filter: brightness(100%);    
    }
    
}

@keyframes starAnimation {
    0%{
        filter: brightness(50%);
    }
    50%{
        filter: brightness(140%);
    }
    100%{
        filter: brightness(50%);
    }
}

@-webkit-keyframes starAnimation {
    0%{
        -webkit-filter: brightness(50%);
    }
    50%{
        -webkit-filter: brightness(140%);
    }
    100%{
        -webkit-filter: brightness(50%);
    }
}

@keyframes fireAnimation {
    0%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0;
    }
    50%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.5;
    }
    60%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.6;
        transform: translateY(-1vh);
        transform: scale(0.99);
    }
    65%{
        transform: translateY(0vh);
        transform: scaleY(0.98);
    }
    70%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.7;
        transform: translateY(1vh);
        transform: scale(0.99);
    }
    75%{
        transform: translateY(0vh);
        transform: scaleY(1);
    }
    80%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.8;
        transform: translateY(-1vh);
        transform: scale(0.99);
    }
    85%{
        transform: translateY(0vh);
        transform: scaleY(0.98);
    }
    90%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.9;
        transform: translateY(1vh);
        transform: scale(0.99);
    }
    100%{
        background-image: url('../../static/images/index/fire-enter.png');
        opacity: 1;
        transform: translateY(0vh);
        transform: scale(1);
    }
}

@-webkit-keyframes fireAnimation {
    0%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0;
    }
    50%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.5;
    }
    60%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.6;
        transform: translateY(-1vh);
        transform: scale(0.99);
    }
    65%{
        transform: translateY(0vh);
        transform: scaleY(0.98);
    }
    70%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.7;
        transform: translateY(1vh);
        transform: scale(0.99);
    }
    75%{
        transform: translateY(0vh);
        transform: scaleY(1);
    }
    80%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.8;
        transform: translateY(-1vh);
        transform: scale(0.99);
    }
    85%{
        transform: translateY(0vh);
        transform: scaleY(0.98);
    }
    90%{
        background-image: url('../../static/images/index/fire-norm.png');
        opacity: 0.9;
        transform: translateY(1vh);
        transform: scale(0.99);
    }
    100%{
        background-image: url('../../static/images/index/fire-enter.png');
        opacity: 1;
        transform: translateY(0vh);
        transform: scale(1);
    }
    
}

@keyframes  changePageAnimation {
    0%{
        opacity: 1;
        background-image: url('../../static/images/index/fire-enter.png');
    }
    2%{
        opacity: 0.98;
        background-image: url('../../static/images/index/fire-norm.png');
    }
    100%{
        opacity: 0;
        transform: translateY(-80vh) scale(2);
    }
}

@-webkit-keyframes changePageAnimation {
    0%{
        opacity: 1;
        background-image: url('../../static/images/index/fire-enter.png');
    }
    2%{
        opacity: 0.98;
        background-image: url('../../static/images/index/fire-norm.png');
    }
    100%{
        opacity: 0;
        -webkit-transform: translateY(-80vh) scale(2);
    }
}

@keyframes fadeAnimation {
    to{
        opacity: 0;
    }
}

@-webkit-keyframes fadeAnimation {
    to {
        opacity: 0;
    }
}

</style>