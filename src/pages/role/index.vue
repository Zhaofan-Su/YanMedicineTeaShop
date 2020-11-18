<template>
  <view class="choose-role">
    <view class="role-list">
      <swiper
        class="card-swiper square-dot"
        :indicator-dots="false"
        :circular="true"
        :autoplay="false"
        :vertical="true"
        interval="5000"
        duration="500"
        previous-margin="380px"
        next-margin="380px"
        @change="roleChange"
      >
        <swiper-item v-for="(role, index) in roleList" :key="index">
          <image :src="role.url" mode="aspectFill" :class="roleIndex-1==index?'active':''"></image>
        </swiper-item>
      </swiper>
    </view>
   
  </view>
</template>

<script>
export default {
  data() {
    return {
      roleList: [
        {
          id: 1,
          url: "../../static/images/role.png",
        },
        {
          id: 2,
          url: "../../static/images/role1.png",
        },
        {
          id: 3,
          url: "../../static/images/role.png",
        },
        {
          id: 4,
          url: "../../static/images/role.png",
        },
        {
          id: 5,
          url: "../../static/images/role.png",
        },
      ],
      roleIndex: 1,
    };
  },
  onLoad() {},
  methods: {
    roleChange(e) {
      this.roleIndex = e.detail.current + 1;
    },
    toHall(e) {
      // 到大厅
      uni.redirectTo({
        url: "/pages/hall/index",
        success: (res) => {},
        fail: (res) => {},
      });
    },
  },
};
</script>

<style>
.choose-role {
  background-image: url("../../static/images/role-bg.png");
  background-size: cover;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
}
.role-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1236px;
}
.card-swiper {
  height: 1236px;
}
.active{
  transform: scale(1.2);
  transition: all .5s ease-in 0s;
  z-index: 20;
}
.card-swiper swiper-item{
  left: 0;
}
.card-swiper swiper-item image{
  height: 420px;
  width: 420px;
}
/* .card-swiper uni-swiper-item{
  width: 452px !important;
  height: 452px !important;
  margin-top: 20px;
  left: 0;
}
.card-swiper uni-swiper-item uni-image{
  width: 452px !important;
  height: 452px !important;
  left: 0;
  mix-blend-mode: multiply;       

} */

.choose-btn {
  text-align: center;
  position: absolute;
  top: 600px;
  left: 0;
  right: 0;
}
</style>
