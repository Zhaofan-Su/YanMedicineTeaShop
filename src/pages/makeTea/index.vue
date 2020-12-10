<template>
    <view id="end-page" @touchmove.stop.prevent="HandleTouchMove">
        <view id="hole-page" >
            <view class="up">
                <view class="container bg-enter"></view>
                <view class="yandi animation-slide-bottom" style="animationDelay:2s;animationDuration:2s"></view>
                
                <view :class="makeTea?'up-lid animation-fade animation-reverse':''"  ></view>

                <view id="other">
                    <view class="guizi"></view>
                    <view class="ok animation-slide-bottom" style="animationDelay:2s;animationDuration:2s"  @tap="toTeaPage">
                        <image src="../../static/images/makeTea/kaigong.png" :style="getOkCSS()"></image>
                    </view>
                    <view v-for="(tag, index) in tagList" :key="index">
                        <image class="tag-check" :id="index" :src="'../../static/images/makeTea/tag-check/'+tag.name+'-check.png'" :style="getTagCSS(index)" ></image>
                        <image class="tag" :ref="'tag'+index" :id="index" :src="'../../static/images/makeTea/tag/'+tag.name+'-hui.png'" :style="getPicCSS(index)" @tap="add" @touchstart="tagTouchStart"></image>
                    </view>
                </view>
                <view class="fire">
                    <view id="fireBig" class="fire-big"></view>
                    <view id="fireLeft" class="fire-left"></view>
                    <view id="fireRight" class="fire-right"></view>
                </view>
            </view>
            <view id="down-page" >
                
                <view class="down-bg">
                    <!-- <view class="sparkLine" v-for="(spark, index) in sparks" :ref="'spark'+index" :style="'top:'+spark.top+'px;left:'+spark.left+'px;height:3px'" :key="index">
                        <view class="sparkParticle" :style="'height:3px;width:3px;-webkit-animation:fade 1s;'+i/200 +'s infinite'" v-for="(i, ind) in 200" :key="ind"></view>
                    </view> -->
                </view>
                <view :class="makeTea?'down-lid':''"></view>
                <view class="tg" id="tg1">
                    <image src="../../static/images/makeTea/tg-gif1.gif" ></image>
                </view>
                <view class="tg" id="tg2">
                    <image src="../../static/images/makeTea/tg-gif2.gif"></image>
                </view>
                <view class="tg" id="tg3">
                    <image src="../../static/images/makeTea/tg-gif3.gif"></image>
                </view>
                <view class="tg" id="tg4">
                    <image src="../../static/images/makeTea/tg-gif4.gif"></image>
                </view>
                <view class="tg" id="tg5">
                    <image src="../../static/images/makeTea/tg-gif5.gif"></image>
                </view>

            </view>
            
        </view>
    </view>    
    
</template>

<script>
export default {
    data(){
        return{
            windowWidth:640,
            windowHeight:1230,
            tagWidth:71,
            tagHeight:71,
            scaleX:1,
            scaleY:1,
            tagList:[
                {
                    id:0,
                    name:'mei',
                    checked:false,
                    left:0,
                    top:0,
            
                },
                {
                    id:1,
                    name:'bai',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:2,
                    name:'mu',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:3,
                    name:'luo',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:4,
                    name:'huang',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:5,
                    name:'xue',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:6,
                    name:'ning',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:7,
                    name:'pu',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:8,
                    name:'wu',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:9,
                    name:'gui',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:10,
                    name:'gou',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:11,
                    name:'zao',
                    checked:false,
                    left:0,
                    top:0,
                }
            ],
            cartPosList:[
                {
                    // id: 1,
                    left: 50,
                    top: 925,
                    has:-1,
                    itemName:''
                },
                {
                    // id: 2,
                    left: 190,
                    top: 960,
                    has:-1,
                    itemName:''
                }, 
                {
                    // id: 3,
                    left: 390,
                    top: 960,
                    has:-1,
                    itemName:''
                },
                {
                    // id: 4,
                    left: 540,
                    top: 925,
                    has:-1,
                    itemName:''
                }
            ],
            lastTouchTime:0,
            makeTea:false,
            sparks:[
            ],
            fireContext:null,
            
        }
    },
    onLoad(){
        this.scaleX = getApp().globalData.scaleX
        this.scaleY = getApp().globalData.scaleY

        this.windowWidth = getApp().globalData.windowWidth
        this.windowHeight = getApp().globalData.windowHeight

        for(var i = 0; i < this.cartPosList.length; i++){
            this.cartPosList[i].top *= this.scaleY
            this.cartPosList[i].left *= this.scaleX
        }
     
        // for(var i = 0; i <= 10; i++){
        //     this.sparks.push({
        //         id: i,
        //         left: this.windowWidth / 10 * i, 
        //         top: 300
        //     })
        // }

        this.addBgm()
    },
    methods:{
        addBgm(){
           
            if(getApp().globalData.bgmPlaying || getApp().globalData.innerAudioContext !== null){
                return false
            }
            getApp().globalData.innerAudioContext = uni.createInnerAudioContext();

            // 自动播放
            getApp().globalData.innerAudioContext.autoplay = true;
            // 循环播放
            getApp().globalData.innerAudioContext.loop = true
            getApp().globalData.innerAudioContext.src = '../../static/music/yao-bgm.mp3';
            // getApp().globalData.innerAudioContext.volume = 0.7
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
        addTagAudio(){
            var tagContext = uni.createInnerAudioContext();

            // 自动播放
            tagContext.autoplay = true;
            // 音效声音
            tagContext.volume = 0.2
            
            // 循环播放
            // this.innerAudioContext.loop = true
            tagContext.src = `../../static/music/drawer-open.mp3`;
            
            tagContext.play()
          
            tagContext = null
        },
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
        addFireLongAudio(){
            this.fireContext = uni.createInnerAudioContext();

            // 自动播放
            this.fireContext.autoplay = true;
            this.fireContext.loop = true
            // 音效声音
            this.fireContext.volume = 1
            
            // 循环播放
            this.fireContext.src = `../../static/music/fire-long2.mp3`;
            
            this.fireContext.play()
                    
                
        },
        addProcessingAudio(){
            var proContext = uni.createInnerAudioContext();

            // 自动播放
            proContext.autoplay = true;
            // 音效声音
            proContext.volume = 1
            
            // 循环播放
            proContext.src = `../../static/music/processing.mp3`;
            
            proContext.play()
                    
                
        },
        addFireShortAudio(){
            var fireContext = uni.createInnerAudioContext();

            // 自动播放
            fireContext.autoplay = true;
            // 音效声音
            fireContext.volume = 0.7
            
            // 循环播放
            // this.innerAudioContext.loop = true
            fireContext.src = `../../static/music/fire-short.wav`;
            
            fireContext.play()
        },
        HandleTouchMove(){
            return false
        },
        createLine(index,num,color,width,height,speed,left,top,deg){
            console.log(this.$refs[`spark${index}`])
            this.$refs[`spark${index}`][0].$el.style.top = this.sparks[index].top + 'px'
            this.$refs[`spark${index}`][0].$el.style.left = this.sparks[index].left + 'px'
            this.$refs[`spark${index}`][0].$el.style.height = this.sparks[index].height + 'px'
            this.$refs[`spark${index}`][0].$el.style.transform = 'rotate(90)deg'
				// this.$refs.spark.$el.style.top = top + 'px'
				// this.$refs.spark.$el.style.left = left + 'px'
				// this.$refs.spark.$el.style.height = height + 'px'
				// this.$refs.spark.$el.style.tranform = `rotateZ(${deg}deg)` 
        },
        initData(){
            this.tagList = [
                {
                    id:0,
                    name:'mei',
                    checked:false,
                    left:0,
                    top:0,
            
                },
                {
                    id:1,
                    name:'bai',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:2,
                    name:'mu',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:3,
                    name:'luo',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:4,
                    name:'huang',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:5,
                    name:'xue',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:6,
                    name:'ning',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:7,
                    name:'pu',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:8,
                    name:'wu',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:9,
                    name:'gui',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:10,
                    name:'gou',
                    checked:false,
                    left:0,
                    top:0,
                },
                {
                    id:11,
                    name:'zao',
                    checked:false,
                    left:0,
                    top:0,
                }
            ]
            this.cartPosList = [
                {
                    // id: 1,
                    left: 70,
                    top: 925,
                    has:-1,
                    itemName:''
                },
                {
                    // id: 2,
                    left: 220,
                    top: 950,
                    has:-1,
                    itemName:''
                }, 
                {
                    // id: 3,
                    left: 415,
                    top: 950,
                    has:-1,
                    itemName:''
                },
                {
                    // id: 4,
                    left: 540,
                    top: 925,
                    has:-1,
                    itemName:''
                }
            ]
        }, 
        getOkCSS(){
            return{
                top: 890 * this.scaleY + 'px',
                left: 265 * this.scaleX + 'px',
                width: 106 * this.scaleX + 'px',
                height : 106 * this.scaleY + 'px'
            }
        },
        getTagCSS(index){
            var res = {
                width:37 * this.scaleX+'px',
                height:83 * this.scaleY+'px'
            }
            // 左侧一列
            if(index < 4){
                if(index % 4 == 0){
                    res.top = 190 * this.scaleY + 'px'
                    this.tagList[index].top = 188 * this.scaleY
                }
                if(index % 4 == 1){
                    res.top = 302 * this.scaleY + 'px'
                    this.tagList[index].top = 302 * this.scaleY
                }
                if(index % 4 == 2){
                    res.top = 409 * this.scaleY + 'px'
                    this.tagList[index].top = 406 * this.scaleY
                }
                if(index % 4 == 3){
                    res.top = 515 * this.scaleY + 'px'
                    this.tagList[index].top = 512 * this.scaleY
                }
                    res.left = 203 * this.scaleX + 'px'
                    this.tagList[index].left = 203 * this.scaleX
            }
            else if(index >=4 && index < 8){
                if(index % 4 == 0){
                    res.top = 190 * this.scaleY + 'px'
                    this.tagList[index].top = 188 * this.scaleY
                }
                if(index % 4 == 1){
                    res.top = 301.5 * this.scaleY + 'px'
                    this.tagList[index].top = 302 * this.scaleY
                }
                if(index % 4 == 2){
                    res.top = 407.6 * this.scaleY + 'px'
                    this.tagList[index].top = 406 * this.scaleY
                }
                if(index % 4 == 3){
                    res.top = 513 * this.scaleY + 'px'
                    this.tagList[index].top = 512 * this.scaleY
                }
                res.left = 361 * this.scaleX + 'px'
                this.tagList[index].left = 360 * this.scaleX
            }
            else{
                res.left = 515 * this.scaleX + 'px'
                this.tagList[index].left = 515 * this.scaleX
                if(index == 8){
                    res.top = 202 * this.scaleY + 'px'
                    this.tagList[index].top = 200 * this.scaleY 
                }
                if(index == 9){
                    res.top = 316 * this.scaleY + 'px'
                    this.tagList[index].top = 314 * this.scaleY 
                }
                if(index == 10){
                    res.top = 423.5 * this.scaleY + 'px'
                    this.tagList[index].top = 421 * this.scaleY
                }
                if(index == 11){
                    res.top = 531 * this.scaleY + 'px'
                    this.tagList[index].top = 530 * this.scaleY 
                }
            }
            if(this.tagList[index].checked){
                res.opacity = 0.5
            }else{
                res.opacity = 0
            }
            // res.opacity = 1
            return res


        },
        getPicCSS(index){
            var res = {
                width:71 * this.scaleX+'px',
                height:71 * this.scaleY+'px'
            }
            // 左侧一列
            if(index < 4){
                if(index % 4 == 0){
                    res.top = 190 * this.scaleY + 'px'
                    this.tagList[index].top = 188 * this.scaleY
                }
                if(index % 4 == 1){
                    res.top = 302 * this.scaleY + 'px'
                    this.tagList[index].top = 302 * this.scaleY
                }
                if(index % 4 == 2){
                    res.top = 409 * this.scaleY + 'px'
                    this.tagList[index].top = 406 * this.scaleY
                }
                if(index % 4 == 3){
                    res.top = 515 * this.scaleY + 'px'
                    this.tagList[index].top = 512 * this.scaleY
                }
                    res.left = 203 * this.scaleX + 'px'
                    this.tagList[index].left = 203 * this.scaleX
            }
            else if(index >=4 && index < 8){
                if(index % 4 == 0){
                    res.top = 190 * this.scaleY + 'px'
                    this.tagList[index].top = 188 * this.scaleY
                }
                if(index % 4 == 1){
                    res.top = 301.5 * this.scaleY + 'px'
                    this.tagList[index].top = 302 * this.scaleY
                }
                if(index % 4 == 2){
                    res.top = 407.6 * this.scaleY + 'px'
                    this.tagList[index].top = 406 * this.scaleY
                }
                if(index % 4 == 3){
                    res.top = 513 * this.scaleY + 'px'
                    this.tagList[index].top = 512 * this.scaleY
                }
                res.left = 361 * this.scaleX + 'px'
                this.tagList[index].left = 360 * this.scaleX
            }
            else{
                res.left = 515 * this.scaleX + 'px'
                this.tagList[index].left = 515 * this.scaleX
                if(index == 8){
                    res.top = 202 * this.scaleY + 'px'
                    this.tagList[index].top = 200 * this.scaleY 
                }
                if(index == 9){
                    res.top = 316 * this.scaleY + 'px'
                    this.tagList[index].top = 314 * this.scaleY 
                }
                if(index == 10){
                    res.top = 423.5 * this.scaleY + 'px'
                    this.tagList[index].top = 421 * this.scaleY
                }
                if(index == 11){
                    res.top = 531 * this.scaleY + 'px'
                    this.tagList[index].top = 530 * this.scaleY 
                }
            }
            if(this.tagList[index].checked){
                res.opacity = 0.5
            }else{
                res.opacity = 0
            }
            // res.opacity = 1
            return res


        },
        tagTouchStart(){
        
        },
        add(e){
            this.addTagAudio()
            var nowTouchTime = new Date().getTime()
            if(nowTouchTime - this.lastTouchTime < 1000){
                return
            }
            this.lastTouchTime = nowTouchTime
        
            var tagIndex = parseInt(e.currentTarget.id)
            this.tagList[tagIndex].checked = true
            var cartIndex = -1

            if(tagIndex < 4){
                cartIndex = 0
            }else if(tagIndex < 8){
                cartIndex = 1
            }else if(tagIndex < 12){
                cartIndex = 2
            }
            if(this.cartPosList[cartIndex].has > -1){
                // 已有东西，先取消掉
                this.tagList[this.cartPosList[cartIndex].has].checked = false
                this.$refs[`tag${this.cartPosList[cartIndex].has}`][0].$el.style.top = this.tagList[this.cartPosList[cartIndex].has].top + 'px'
                this.$refs[`tag${this.cartPosList[cartIndex].has}`][0].$el.style.left = this.tagList[this.cartPosList[cartIndex].has].left + 'px'

                
            }
            this.cartPosList[cartIndex].has = tagIndex
            this.cartPosList[cartIndex].itemName = this.tagList[tagIndex].name
            this.toCart(e, this.cartPosList[cartIndex])
            
                         
        },
        toTeaPage(){
            console.log('开始制茶')
            this.addOkAudio()
            if(this.cartPosList[0].has == -1){
                return false
            }
            this.makeTea = true
            const classList = document.querySelector("#other").classList
            classList.add('down')
            var that = this
            // 下降之后小火苗出现
            setTimeout(function(){
                
                setTimeout(function(){
                    that.addFireLongAudio()
                }, 500)

                
                const class1 = document.querySelector("#fireBig").classList
                const class2 = document.querySelector("#fireLeft").classList
                const class3 = document.querySelector("#fireRight").classList

                class1.add('fire-big-enter')
                class2.add('fire-small-enter')
                class3.add('fire-small-enter')

                setTimeout(function(){
                    
                    
                    class1.remove('fire-big-enter')
                    class2.remove('fire-small-enter')
                    class3.remove('fire-small-enter')

                    class1.add('fire-down')
                    class2.add('fire-down')
                    class3.add('fire-down')
                    setTimeout(function(){
                        that.fireContext.destroy()
                        that.addFireShortAudio()
                        that.addProcessingAudio()
                    }, 1700)
                    const downClassList = document.querySelector('#down-page').classList
                    downClassList.add('down')
                    const pageClassList = document.querySelector("#hole-page").classList
                    pageClassList.add('page-up')

                    // 页面退出
                    setTimeout(function(){
                        const endClassList = document.querySelector('#end-page').classList
                        endClassList.add('endPage')
                        setTimeout(function(){
                            var items = []
                            for(var i =0; i<3; i++){
                                items.push(that.cartPosList[i].has == -1 ? 'null' : that.cartPosList[i].itemName)
                            }
                            uni.redirectTo({
                                url:`/pages/final/index?item1=${items[0]}&item2=${items[1]}&item3=${items[2]}`
                            })
                        }, 5000)
                    }, 4000)
                }, 3000)
            }, 0)
        },
        toCart(e, endPos){
            var controPos = {}
            var touchPos = {}
            touchPos.x = e.touches[0].clientX
            touchPos.y = e.touches[0].clientY

            // 控制点的y坐标定在低的点的上方150处
            if(touchPos.y < endPos.top){
                controPos.y = touchPos.y - 10
            }else{
                controPos.y = endPos.top - 10
            }

            controPos.x = Math.abs(touchPos.x - endPos.left) / 2

            // 控制点的x坐标在购物车和点击点之间
            if(touchPos.x < endPos.left){
                controPos.x = (endPos.left - touchPos.x) / 2 + touchPos.x
            }else{
                controPos.x = (touchPos.x - endPos.left) / 2 + endPos.left
            }

            // 计算贝塞尔曲线上的点
            var linePoints = this.bezier([touchPos, controPos, {x:endPos.left, y:endPos.top}], 100)
          
            // 执行动画
            this.animate(e, linePoints)
        },
        bezier(pots, amount){
            var pot
            var lines
            var ret = []
            var points
            for(var i = 0; i < amount; i++){
                // lines = []
                // points = pots.slice(0)
                // while(pot = points.shift()){
                //     if(points.length){
                //         // lines.push(pointLine([pot, points[0]], i/amount))
                //         lines.push(pointLine(points, i/amount))
                //     }else if(lines.length > 1){
                //         points = lines
                //         lines = []
                //     }else{
                //         break
                //     }
                // }
                
                // ret.push(lines[0])


                ret.push(pointLine(pots, i/amount))
            }

     
            function pointLine(points, rate){
                // var pA, pB, pDistance, xDistance, yDistance, tan, radian, tempPointDistance
                // var ret = []
                // pA = points[0]
                // pB = points[1]
                // xDistance = pB.x - pA.x
                // yDistance = pB.y - pA.y

                // pDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2)
                // tan = yDistance / xDistance
                // radian = Math.atan(tan)
                // tempPointDistance = pDistance * rate
                
                // ret = {
                //     x: pB.x + tempPointDistance * Math.cos(radian),
                //     y: pB.y + tempPointDistance * Math.sin(radian)
                // }
                // return ret
                var ret = {}
                ret.x = points[0].x * Math.pow(1 - rate, 2) + points[1].x * rate * (1 - rate) * 2 + points[2].x * Math.pow(rate, 2)
                ret.y = points[0].y * Math.pow(1 - rate, 2) + points[1].y * rate * (1 - rate) * 2 + points[2].y * Math.pow(rate, 2)
                return ret

            }

            // 返回贝塞尔曲线上点的坐标
            return ret
        },
        animate(e, linePoints){
            var that = this
            // 计时器
            this.timer = setInterval(function(){
                for(let i = 0; i < linePoints.length; i++){
                    setTimeout(function(){
                        that.$refs[`tag${e.currentTarget.id}`][0].$el.style.opacity = 0.5
                        that.$refs[`tag${e.currentTarget.id}`][0].$el.style.left = linePoints[i].x + 'px'
                        that.$refs[`tag${e.currentTarget.id}`][0].$el.style.top = linePoints[i].y + 'px'
                    }, i*10)
                    if(i == linePoints.length - 1){
                        clearInterval(that.timer)
                    }
                }
            }, 0)
        }
    }
}
</script>

<style scoped>
.container,
.guizi,
.yandi,
#other,
.fire-big,
.fire-left,
.fire-right,
.up-lid{
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: absolute;
}

.container{
    background-image: url("../../static/images/makeTea/bg.png");
    opacity: 0;
    animation: enterAnimation 2s ease-in 2s;
    animation-fill-mode: forwards;
}

.guizi{
    background-image: url("../../static/images/makeTea/guizi.png");
    animation: enterAnimation 2s ease-out 0s;
}
.yandi{
    background-image: url("../../static/images/makeTea/yandi.png");
}

.up-lid{
    background-image: url('../../static/images/makeTea/up-lid.png');
    z-index: 1;

}
/* 材料的tag图片 */
.tag,
.ok{
    position:fixed;
    z-index: 2;
}

.tag-check{
    position: fixed;
}
.tag image{
    opacity: 0;
}

.ok{
    filter: brightness(60%);
}

.cart{
    position: fixed;
    right: 0;
    bottom: 0;
}

.item image{
    position: fixed;
    width: 32px;
    height: 32px;
}

/* 下沉动画 */
.down{
    animation: downAnimation 1s ease-in 0s;
    animation-fill-mode: forwards;
}

/* 火苗 */
.fire-big{
    background-image: url('../../static/images/makeTea/fire-big.png');
    opacity: 0;
}

.fire-left{
    background-image: url('../../static/images/makeTea/fire-left.png');
    opacity: 0;
}
.fire-right{
    background-image: url('../../static/images/makeTea/fire-right.png');
    opacity: 0;
}

/* 火苗出现动效 */
.fire-big-enter{
    animation: fireEnterAnimation 2s ease-in 0s;
    animation-fill-mode: forwards;
}

.fire-small-enter{
    animation: fireEnterAnimation 2s ease-in 1s;
    animation-fill-mode: forwards;
}

/* 火苗下落动画 */
.fire-down{
    animation: fireDownAnimation 3s linear 0s;
    
}

/****************************** 下部页面样式 ******************************/
#hole-page{
    width: 100vw;
    height: 100vh;
    
    position: absolute;
}


.down-bg{
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -3;
    transform: translateY(-9.8vh);
    top: 100vh;
}

.down-bg{
    background-image: url('../../static/images/makeTea/bg-down.png');
    filter: brightness(80%);
}
.down-lid{
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    position: absolute;
    transform: translateY(-9.8vh);
    background-image: url('../../static/images/makeTea/down-lid.png');
    filter: brightness(80%);
    z-index: 1;
    top: 100vh;
    /* opacity: 0; */
    /* animation: lidShow 4s ease 0s; */
    /* animation-fill-mode: forwards; */
}

/* .down-lid-up{
   animation: lidUp 1s ease 0s;
   animation-fill-mode: forwards;
} */
.tg{
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 100vh;
    transform: translateY(-9.8vh);
}
.tg image{
    height: 100vh;
    width: 100vw;
    filter: brightness(60%);
    /* opacity: 0.7; */
}

.page-up{
    animation: pageUpAnimation 3s linear 1s;
    animation-fill-mode: forwards;
}

.sparkContainer{
    position:absolute;
}
/* spark的动画 */
.sparkLine{
    position: absolute;
    transform-origin:left top;
    top: 20vh;
    z-index: 999;

}
.sparkLine .sparkParticle{
    width:1px;
    height:1px;
    float:left;
    color:white;
    background: white;
    box-shadow: 0 0 10px white;
    opacity: 0;
}

.endPage{
    animation: endPageAnimation 5s ease-out 0s;
    animation-fill-mode: forwards;
}

@keyframes fade {
    0% {
    opacity: 0;
    }
    50% {
    opacity: 1;
    }
    100% {
    opacity: 0;
    }
}
@keyframes enterAnimation {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
@-webkit-keyframes enterAnimation {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
@keyframes move {
    from {
        transfrom: translateX(0px);
    }
    to {
        transfrom: translateX(410px);
    }
}

@-webkit-keyframes move {
    from {
        transfrom: translateX(0px);
    }
    to {
        transfrom: translateX(410px);
    }
}

/* 下沉动画 */
@keyframes downAnimation {
    to{
        transform: translateY(9.8vh);
    }
}
@-webkit-keyframes downAnimation {
    to{
        -webkit-transform: translateY(9.8vh);
    }
}

/* 火苗出现动画 */
@keyframes fireEnterAnimation {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
    0%,
    100%{
        
        filter: brightness(100%);
        transform: translateY(0)
    }

    50% {
        filter: brightness(150%);
        transform: translateY(1vh)
    }
}

@-webkit-keyframes fireEnterAnimation {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
    0%,
    100%{
        
        -webkit-filter: brightness(100%);
        -webkit-transform: translateY(0)
    }

    50% {
        -webkit-filter: brightness(150%);
        -webkit-transform: translateY(1vh)
    }
}
/* 火苗下落动画 */
@keyframes fireDownAnimation {
    0%{
        opacity: 1;
    }
    10%{
        transform: scale(1.01) translateX(-2vh)  translateY(2vh);
    }
    20%{
        transform: scale(1.02)  translateX(-4vh) translateY(6vh);
    }
    30%{
        transform: scale(1.04) translateX(-6vh) translateY(16vh);
    }
    40%{
        transform: scale(1.06) translateX(-8vh)  translateY(30vh);
    }
    50%{
        transform: scale(1.09) translateX(-10vh) translateY(45vh);
    }
    60%{
        transform: scale(1.10) translateX(-10vh)  translateY(60vh);
    }
    70%{
        transform: scale(1.13) translateX(-10vh)  translateY(78vh);
    }
    80%{
        transform: scale(1.17) translateX(-10vh) translateY(90vh);
    }
    90%{
        opacity: 0.8;
        transform: scale(1.2) translateX(-10vh)  translateY(100vh);
    }
    100%{
        opacity: 0;
        transform: translateY(100vh) translateX(-10vh)  scale(1.2);
        
    }
}

@-webkit-keyframes fireDownAnimation {
    0%{
        opacity: 1;
    }
    10%{
        -webkit-transform: translateY(2vh);
    }
    20%{
        -webkit-transform: scale(1.02)  translateX(-4vh) translateY(6vh);
    }
    30%{
        -webkit-transform: scale(1.04) translateX(-6vh) translateY(16vh);
    }
    40%{
        -webkit-transform: scale(1.06) translateX(-8vh)  translateY(30vh);
    }
    50%{
        -webkit-transform: scale(1.09) translateX(-10vh) translateY(45vh);
    }
    60%{
        -webkit-transform: scale(1.10) translateX(-10vh)  translateY(60vh);
    }
    70%{
        -webkit-transform: scale(1.13) translateX(-10vh)  translateY(78vh);
    }
    80%{
        -webkit-transform: scale(1.17) translateX(-10vh) translateY(90vh);
    }
    90%{
        opacity: 0.8;
        -webkit-transform: scale(1.2) translateX(-10vh)  translateY(100vh);
    }
    100%{
        opacity: 0;
        -webkit-transform: translateY(100vh) translateX(-10vh)  scale(1.2);
        
    }
}

/* 页面上升动画 */
@keyframes pageUpAnimation {
 
    10%{
        transform: translateY(-2vh);
    }
    20%{
        transform: translateY(-6vh);
    }
    30%{
        transform: translateY(-16vh);
    }
    40%{
        transform: translateY(-30vh);
    }
    50%{
        transform: translateY(-45vh);
    }
    60%{
        transform: translateY(-60vh);
    }
    70%{
        transform: translateY(-78vh);
    }
    80%{
        transform: translateY(-90vh);
    }
    90%{
        transform: translateY(-100vh);
    }
    100%{
        transform: translateY(-100vh);
        
    }
}
@-webkit-keyframes pageUpAnimation {
 
    10%{
        -webkit-transform: translateY(-2vh);
    }
    20%{
        -webkit-transform: translateY(-6vh);
    }
    30%{
        -webkit-transform: translateY(-16vh);
    }
    40%{
        -webkit-transform: translateY(-30vh);
    }
    50%{
        -webkit-transform: translateY(-45vh);
    }
    60%{
        -webkit-transform: translateY(-60vh);
    }
    70%{
        -webkit-transform: translateY(-78vh);
    }
    80%{
        -webkit-transform: translateY(-90vh);
    }
    90%{
        -webkit-transform: translateY(-100vh);
    }
    100%{
        -webkit-transform: translateY(-100vh);
        
    }
}

/* 页面退出动画 */
@keyframes endPageAnimation {
    to{
        opacity: 0;
    }
}
@-webkit-keyframes endPageAnimation{
    to{
        opacity: 0;
    }
}

@keyframes lidShow {
    to{
        opacity: 1;
    }
}
@-webkit-keyframes lidShow {
    to{
        opacity: 1;
    }
}
</style>