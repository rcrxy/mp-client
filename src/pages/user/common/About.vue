<template>
   <view>
      <view class="top">
         <image :src="logo" mode="widthFix" />
         <text class="name">成考辅导</text>
         <text class="version">版本号：1.0.0</text>
      </view>

      <u-cell title="官方网站" value="www.njjcjykj.cn" :arrow="false" hover-class="none"></u-cell>
      <!-- <u-cell title="微信公众号" value="" :arrow="false" hover-class="none"></u-cell> -->
      <u-cell title="用户协议" isLink @click="mix_jumpUrl('/pages/common/protocol')"></u-cell>
      <u-cell title="隐私政策" isLink @click="mix_jumpUrl('/pages/common/privacy')"></u-cell>
   </view>
</template>

<script>
export default {
   data() {
      return {
         logo: require("@/static/images/144x144.png"),
      };
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
.top {
   width: 100vw;
   height: 310rpx;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   justify-content: center;

   image {
      width: 144rpx;
      height: 144rpx;
   }
   .name {
      display: block;
      margin: 10rpx 0;
   }
}
</style>
