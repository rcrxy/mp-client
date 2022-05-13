<template>
   <view>
      <web-view src="/static/html/index.html"></web-view>
   </view>
</template>

<script>
export default {
   data() {
      return {};
   },

   onLoad(info) {
      console.log(info.title);
      if (info) {
         uni.setNavigationBarTitle({ title: info.title });
      }
   },
};
</script>

<style lang="scss" scoped></style>
