<template>
   <view></view>
</template>

<script>
import store from "@/store/index";

export default {
   beforeCreate() {
      uni.preloadPage({ url: "/pages/home/HomeIndex" });
      uni.preloadPage({ url: "/pages/common/Login" });

      const { state } = store;
      console.log(state);
      if (state.token) {
         uni.switchTab({ url: "/pages/home/HomeIndex" });
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
