<template>
   <view></view>
</template>

<script>
import store from "@/store/index";

export default {
   beforeCreate() {
      uni.preloadPage({ url: "/pages/common/Login" });
      uni.preloadPage({ url: "/pages/home/home" });
      uni.preloadPage({ url: "/pages/project/project" });
      uni.preloadPage({ url: "/pages/practice/practice" });
      uni.preloadPage({ url: "/pages/user/user" });

      const { state } = store;
      console.log(state);
      if (state.token) {
         uni.switchTab({ url: "/pages/home/home" });
      } else {
         uni.navigateTo({ url: "/pages/common/Login" });
      }
   },
};
</script>

<style lang="scss" scoped>
view {
   width: 100%;
   height: 100%;
   background: #ffffff;
   opacity: 0;
}
</style>
