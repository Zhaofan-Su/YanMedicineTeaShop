<template>
    <view id="all">
        <view id="bg-container" class="bg pt-page-scaleUpCenter" :style="'background-image:url(' + '../../static/images/intro/poster-'+ roleName + '.png)'">
            
        </view>

        <view id="top" class="star" :style="'background-image:url(' + '../../static/images/intro/'+ roleName + '-star.png)'"></view>
        <view class="title " :style="'background-image:url(' + '../../static/images/intro/'+ roleName + '-title.png)'"></view>
        <view class="fire " :style="'background-image:url(' + '../../static/images/intro/'+ roleName + '-fire.png)'"></view>
        <view class="save" >
            <a :href="'../../static/images/download/'+roleName+'.jpg'" :download="roleName">
                <image :src="'../../static/images/intro/poster-'+roleName+'-save.png'" :style="getSaveCSS()"></image>

            </a>
        </view>
        <view class="next" @tap="goHall">
            <image :src="'../../static/images/intro/poster-'+roleName+'-next.png'" :style="getNextCSS()"></image>
        </view>
        <view class="back pt-page-scaleUpCenter" @tap="goBack">
            <image src="../../static/images/final/back.png" :style="backStyle"></image>
        </view>
    </view>
    
</template>

<script>
import downloader from '../../js/img-downloader';

export default {
    data(){
        return{
            scaleX:1,
            scaleY:1,
            roleName:'yao',
            // 按钮位置
            saveS:{
                top:'970px',
                left:'165px',
                width:'56px',
                height:'112px'
            },
            nextS:{
                top:'970px',
                left:'319px',
                width:"55px",
                height:'112px'
            },
            checkAudio:null,
            checkAudioPlaying:false,
            backStyle:'',
        }
    },
    onLoad(obj){
        this.roleName = obj.role
        this.windowHeight = getApp().globalData.windowHeight
        this.windowWidth = getApp().globalData.windowWidth
        this.scaleX = getApp().globalData.scaleX
        this.scaleY = getApp().globalData.scaleY
        getApp().globalData.innerAudioContext = null
        this.backStyle = `top:${43*this.scaleY}px;left:${42*this.scaleX}px;width:${92*this.scaleX}px;height:${33*this.scaleY}px`

        this.addBgm()
    },
    onUnload(){
        if(getApp().globalData.innerAudioContext !== null)
        {
            getApp().globalData.innerAudioContext.destroy()
        }
        if(this.checkAudio!==null){
            this.checkAudio.destroy()
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
            getApp().globalData.innerAudioContext.volume = 0.3
            getApp().globalData.innerAudioContext.src = `../../static/music/${this.roleName}-bgm.mp3`;
          
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
        addCheckAudio(){
            if(this.checkAudioPlaying || this.checkAudio !== null){
                return false
            }
            this.checkAudio = uni.createInnerAudioContext();

            // 自动播放
            this.checkAudio.autoplay = true;
            // 音效声音
            this.checkAudio.volume = 0.2
            
            // 循环播放
            // this.innerAudioContext.loop = true
            this.checkAudio.src = '../../static/music/check.mp3';
            
            this.checkAudio.play()
            
            
            var that = this
            // 音乐开始播放
            this.checkAudio.onPlay(() => {
                that.checkAudioPlaying = !that.checkAudio.paused;//查看是否可以自动播放
            });
            this.checkAudio.onEnded(()=>{
                that.checkAudioPlaying = false
            })
            this.checkAudio.onError((res) => {
                console.log(res.errMsg);
                console.log(res.errCode);
            });
        },
       getSaveCSS(){
           if(this.roleName == 'shang'){
                return{
                    top: this.scaleY * 970 + 'px',
                    left: this.scaleX * 165 + 'px',
                    width: this.scaleX * 56 + 'px',
                    height: this.scaleY * 112 + 'px'
                }
           }else{
                return{
                    top: this.scaleY * 970 + 'px',
                    left: this.scaleX * 222 + 'px',
                    width: this.scaleX * 56 + 'px',
                    height: this.scaleY * 112 + 'px'
                }
           }
       },
       getNextCSS(){
           if(this.roleName == 'shang'){
                return{
                    top: this.scaleY * 970 + 'px',
                    left: this.scaleX * 300 + 'px',
                    width: this.scaleX * 56 + 'px',
                    height: this.scaleY * 112 + 'px'
                }
           }else{
                return{
                    top: this.scaleY * 970 + 'px',
                    left: this.scaleX * 375 + 'px',
                    width: this.scaleX * 56 + 'px',
                    height: this.scaleY * 112 + 'px'
                }
           }
       },
       saveImage(){
            console.log('save')
            let promise = downloader.load('/static/images/intro/poster-shange.png', '商人'); //下载

            promise.then(([err, res])=>{                 //下载结果 
                console.log(err, res);                   // err 和 res 只会有一个存在，另一个为null  
            });
       },
       goHall(){
           this.addCheckAudio()
            const classlist = document.querySelector('#all').classList
            classlist.add('fade')
            setTimeout(function(){
                classlist.remove('fade')
                uni.redirectTo({
                    url:'/pages/hall/index'
                })
            }, 4000)
       },
       goBack(){
           uni.redirectTo({
               url:'/pages/roleA/index'
           })
       }
    }
}
</script>

<style scoped>
.bg,
.fire,
.title,
.star{
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: absolute;
}

.back,
.save,
.next{
    position: fixed;
}

/* 原点动效 */
.star{
    filter: brightness(0%);
    animation: starAnimation 2s ease 3s infinite;
}

/* 火苗动效 */
.fire{
    opacity: 0;
    animation: fireAnimation 4s linear 1s;
    animation-fill-mode: forwards;
}

/* 标题、按钮显现动效 */
.title,
.save,
.next{
    opacity: 0;
    animation: showAnimation 3s ease-out 5s;
    animation-fill-mode: forwards;
}

/* 退场动画 */
.fade{
    animation: fade 4s ease-out 0s;

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
        opacity: 0;
    }
    50%{
        opacity: 0.5;
    }
    60%{
        opacity: 0.6;
        transform: translateY(-1vh);
        transform: scale(0.99);
    }
    65%{
        transform: translateY(0vh);
        transform: scaleY(0.98);
    }
    70%{
        opacity: 0.7;
        transform: translateY(1vh);
        transform: scale(0.99);
    }
    75%{
        transform: translateY(0vh);
        transform: scaleY(1);
    }
    80%{
        opacity: 0.8;
        transform: translateY(-1vh);
        transform: scale(0.99);
    }
    85%{
        transform: translateY(0vh);
        transform: scaleY(0.98);
    }
    90%{
        opacity: 0.9;
        transform: translateY(1vh);
        transform: scale(0.99);
    }
    100%{
        opacity: 1;
        transform: translateY(0vh);
        transform: scale(1);
    }
}

@-webkit-keyframes fireAnimation {
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0.5;
    }
    60%{
        opacity: 0.6;
        -webkit-transform: translateY(-1vh);
        -webkit-transform: scale(0.99);
    }
    65%{
        -webkit-transform: translateY(0vh);
        -webkit-transform: scaleY(0.98);
    }
    70%{
        opacity: 0.7;
        -webkit-transform: translateY(1vh);
        -webkit-transform: scale(0.99);
    }
    75%{
        -webkit-transform: translateY(0vh);
        -webkit-transform: scaleY(1);
    }
    80%{
        opacity: 0.8;
        -webkit-transform: translateY(-1vh);
        -webkit-transform: scale(0.99);
    }
    85%{
        -webkit-transform: translateY(0vh);
        -webkit-transform: scaleY(0.98);
    }
    90%{
        opacity: 0.9;
        -webkit-transform: translateY(1vh);
        -webkit-transform: scale(0.99);
    }
    100%{
        opacity: 1;
        -webkit-transform: translateY(0vh);
        -webkit-transform: scale(1);
    }
    
}

@keyframes showAnimation{
    from {
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
@-webkit-keyframes showAnimation {
    from {
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

@keyframes fade {
    to{
        opacity: 0;
    }    
}

@-webkit-keyframes fade {
    to{
        opacity: 0;
    }    
}
</style>