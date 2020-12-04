<template>
    <view class="container">
        <view class="item item  1" id="item1"  @tap='toCart'>     
            <image ref="item1"  src="../../static/images/makeTea/item1.png" :style="'top:'+item1.top+'px;left:'+item1.left+'px'"></image>
        </view>
        <view class="item item2"  id="item2" @tap='toCart'>
            <image  src="../../static/images/makeTea/item2.png" :style="'top:'+item2.top+'px;left:'+item2.left+'px'"></image>
        </view>
         <view class="item item3" id="item3" @tap='toCart'>
            <image src="../../static/images/makeTea/item3.png" :style="'top:'+item3.top+'px;left:'+item3.left+'px'"></image>
        </view>
        <view class="cart" ref="cart">
            <image src="../../static/images/makeTea/购物车.png" style="width:48px;height:48px"></image>
        </view>

        <view class="cu-btn" @tap="toTest">
            点击
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return{
            cartPos:{

            },
            touchPos:{},
            linePoints:[],
            item1:{
                top:10,
                left:20
            },
            item2:{
                top:10,
                left:80
            },
            item3:{
                top:10,
                left:140
            }

        }
    },
    mounted(){
    
        const query = uni.createSelectorQuery().in(this);
        var that = this
        query.select('.cart').boundingClientRect(data => {
            // console.log(data)
            that.cartPos = data
        }).exec();
    },
    methods:{
        toTest(e){
            // this.$router.push('/pages/hall/index')
            console.log(this.$router)
           
        },
        toCart(e){
            var controPos = {}
            // 点击点位置
            this.touchPos.x = e.touches[0].clientX
            this.touchPos.y = e.touches[0].clientY

            // 控制点的y坐标定在低的点的上方150处
            if(this.touchPos.y < this.cartPos.top){
                controPos.y = this.touchPos.y - 10
            }else{
                controPos.y = this.cartPos.top - 10
            }

            controPos.x = Math.abs(this.touchPos.x - this.cartPos.left) / 2

            // 控制点的x坐标在购物车和点击点之间
            if(this.touchPos.x < this.cartPos.left){
                controPos.x = (this.cartPos.left - this.touchPos.x) / 2 + this.touchPos.x
            }else{
                controPos.x = (this.touchPos.x - this.cartPos.left) / 2 + this.cartPos.left
            }

            // 计算贝塞尔曲线上的点
            this.linePoints = this.bezier([this.touchPos, controPos, {x:this.cartPos.left, y:this.cartPos.top}], 100)
          
            // 执行动画
            this.animate(e)
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
        animate(e){
            var that = this
            console.log(this.linePoints)
            // 计时器
            this.timer = setInterval(function(){
                for(let i = 0; i < that.linePoints.length; i++){
                    setTimeout(function(){
                        that.$refs[e.currentTarget.id].$el.style.left = that.linePoints[i].x + 'px'
                        that.$refs[e.currentTarget.id].$el.style.top = that.linePoints[i].y + 'px'
                    }, i*10)
                    if(i == that.linePoints.length - 1){
                        clearInterval(that.timer)
                    }
                }
            }, 0)
            
            // this.timer = setInterval(function(){
                
            //     for(let i = 0; i < that.linePoints.length; i++){
            //         that.$refs[e.currentTarget.id].$el.style.left = that.linePoints[i].x + 'px'
            //         that.$refs[e.currentTarget.id].$el.style.top = that.linePoints[i].y + 'px'
                    
            //         if(i == that.linePoints.length -1){
            //             clearInterval(that.timer)
            //         }
            //     }
                
            // }, 250)
            

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

.cart{
    position: fixed;
    right: 0;
    bottom: 0;
}
/* .item{
    position: fixed;
} */
.item image{
    position: fixed;
    width: 32px;
    height: 32px;
    /* transition: all .25s ease-in-out;    */
    /* transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1) ; */
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
/* .item1{
    left: 20px;
    top: 10px;
} */
/* .item2{
    left: 80px;
    top: 10px;
}
.item3{
    left:140px;
    top: 10px;
} */
</style>