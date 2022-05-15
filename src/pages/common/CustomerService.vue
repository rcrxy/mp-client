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
      if (Boolean(info)) {
         uni.setNavigationBarTitle({ title: info.title });
      }
   },
   methods: {},
};
</script>

<style lang="scss" scoped></style>
