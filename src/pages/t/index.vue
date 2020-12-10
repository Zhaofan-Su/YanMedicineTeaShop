<template>
  		<view class="container">
			 <view class="sparkLine" v-for="(spark, index) in sparks" :ref="'spark'+index" :style="'top:'+spark.top+'px;left:'+spark.left+'px;height:3px'" :key="index">
			        <view class="sparkParticle" :style="'height:3px;width:3px;-webkit-animation:fade 1s;'+i/200 +'s infinite'" v-for="(i, ind) in 200" :key="ind"></view>
			    </view>
		</view>
</template>


<script>
export default {
  data(){
return{
	sparks:[
            ]

}
  },
  onLoad(){
 for(var i = 0; i <= 10; i++){
            this.sparks.push({
                id: i,
                left: this.windowWidth / 10 * i, 
                top: 300
            })
        }
  },
	onReady(){
        // 生成sparks
        for(var i = 0; i <= 10; i++){
            this.createLine(i, 200, 'white',2,2,1,20,20,90)
        }
    },
  methods: {
    createLine(index,num,color,width,height,speed,left,top,deg){
				//粒子数（px），颜色，宽度，高度，速度，位置左，位置右，角度
				console.log(this.$refs[`spark${index}`])
            this.$refs[`spark${index}`][0].$el.style.top = this.sparks[index].top + 'px'
            this.$refs[`spark${index}`][0].$el.style.left = this.sparks[index].left + 'px'
            this.$refs[`spark${index}`][0].$el.style.height = this.sparks[index].height + 'px'
            this.$refs[`spark${index}`][0].$el.style.transform = 'rotate(90)deg'
				// var $sparkLine=$('<div class="sparkLine"></div>');
				// $sparkLine.css("top",top);
				// $sparkLine.css("left",left);
				// $sparkLine.css("height",height);
				// $sparkLine.css("transform",' rotateZ('+deg+'deg)');
				// for(var i=0;i<num;i++){
					// var $sparkParticle=$('<div class="sparkParticle"></div>');
					// $sparkParticle.css("-webkit-animation","fade "+speed+"s "+i/100+"s infinite");
					// $sparkParticle.css("width",width);
					// $sparkParticle.css("height",height);
					// $sparkLine.append($sparkParticle)
				// }
				// $(".container").append($sparkLine)
			}
  }
};
</script>


<style scoped>
			.container{
				background:black;
				position:relative;border:1px solid #ddd;
				width:1000px;height:800px;
			}
			.sparkLine{
				position: absolute;transform-origin:left top;
 
			}
			.sparkLine .sparkParticle{
				width:1px;height:1px;float:left;
				color:white;background: white;
				box-shadow: 0 0 10px white;
				opacity: 0;
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
			
			.sparkLine .sparkParticle {
			}
</style>