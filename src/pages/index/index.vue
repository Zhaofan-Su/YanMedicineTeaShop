<template>
  <view class="choose-role">
    <view class="role-list">
      <swiper
        class="screen-swiper square-dot"
        :indicator-dots="true"
        :circular="true"
        :autoplay="false"
        interval="5000"
        duration="500"
        @change="roleChange"
      >
        <swiper-item v-for="(role, index) in roleList" :key="index">
          <image :src="role.url" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="choose-btn" @tap="toHall">
      <button
        class="cu-btn round lg"
        :class="roleIndex == 1 ? 'bg-mauve' : 'bg-grey'"
        :disabled="roleIndex == 1 ? false : true"
      >
        {{ roleIndex == 1 ? "我选好了" : "暂未解锁" }}
      </button>
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
          url: "../../static/role1.png",
        },
        {
          id: 2,
          url: "../../static/role2.png",
        },
        {
          id: 3,
          url: "../../static/role3.png",
        },
        {
          id: 4,
          url: "../../static/role4.png",
        },
        {
          id: 5,
          url: "../../static/role5.png",
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
  background-image: url("../../static/选角色-bg.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
.role-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
}
.screen-swiper {
  height: 500px;
}
.choose-btn {
  text-align: center;
  position: absolute;
  top: 600px;
  left: 0;
  right: 0;
}
</style>
