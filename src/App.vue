<script>
import Vue from "vue";
import pageAnimation from './components/page-animation'

export default {
  // mixins: [pageAnimation],
  data(){
    return{

    }
  },
   globalData:{
     windowHeight:1236,
     windowWidth:640,
     scaleSize:1,
     scaleX:1
   },
  onLaunch: function () {

    uni.getSystemInfo({
      success: function (e) {
        getApp().globalData.windowHeight = e.windowHeight
        getApp().globalData.windowWidth = e.windowWidth
      
        getApp().globalData.scaleSize = e.windowHeight / 1236
        getApp().globalData.scaleX = e.windowWidth / 640
        getApp().globalData.scaleY = e.windowHeight / 1236
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == "android") {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif

        // #ifdef MP-WEIXIN || MP-QQ
        Vue.prototype.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          Vue.prototype.Custom = capsule;
          // Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
          Vue.prototype.CustomBar =
            capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        }
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      },
    });

    Vue.prototype.ColorList = [
      {
        title: "嫣红",
        name: "red",
        color: "#e54d42",
      },
      {
        title: "桔橙",
        name: "orange",
        color: "#f37b1d",
      },
      {
        title: "明黄",
        name: "yellow",
        color: "#fbbd08",
      },
      {
        title: "橄榄",
        name: "olive",
        color: "#8dc63f",
      },
      {
        title: "森绿",
        name: "green",
        color: "#39b54a",
      },
      {
        title: "天青",
        name: "cyan",
        color: "#1cbbb4",
      },
      {
        title: "海蓝",
        name: "blue",
        color: "#0081ff",
      },
      {
        title: "姹紫",
        name: "purple",
        color: "#6739b6",
      },
      {
        title: "木槿",
        name: "mauve",
        color: "#9c26b0",
      },
      {
        title: "桃粉",
        name: "pink",
        color: "#e03997",
      },
      {
        title: "棕褐",
        name: "brown",
        color: "#a5673f",
      },
      {
        title: "玄灰",
        name: "grey",
        color: "#8799a3",
      },
      {
        title: "草灰",
        name: "gray",
        color: "#aaaaaa",
      },
      {
        title: "墨黑",
        name: "black",
        color: "#333333",
      },
      {
        title: "雅白",
        name: "white",
        color: "#ffffff",
      },
    ];
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>


@import "../colorui/main.css";
@import "../colorui/icon.css";
@import "..//colorui/animation.css";
@import "./css/animations.css";

page {
  height: 100%;
  background-image: url('./static/images/role/bg.png');
}

.slide-fade{
  position: fixed;left:0;right: 0;
  width: 100%;
  background-color: white;
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;top: 0;right: 0;
  position: absolute;
  transform:translateX(-500px) translateY(-500px) rotate(-150deg) scale(0.5);
  opacity:1;
}
.slide-fade-enter-active {
  background-color: white;
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.7s ease;
  background-color: white;
  transform:translateX(500px) translateY(500px) rotate(150deg) scale(1) ;
  z-index: 100;
}

@keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40upx);
  }

  100% {
    transform: translateY(0px);
  }
}

@-webkit-keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40upx);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
