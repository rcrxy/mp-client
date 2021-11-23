<template>
   <view>
      <view class="top">
         <view class="logo">
            <image src="" mode="" />
         </view>
         <text class="name">成人高考培训</text>
         <text class="version">版本号：1.0.0</text>
      </view>

      <u-cell title="官方网站" value="mcncmc.com" :arrow="false" hover-class="none"></u-cell>
      <u-cell title="微信公众号" value="江苏成考服务网" :arrow="false" hover-class="none"></u-cell>
      <u-cell title="QQ客服" value="1231231546" :arrow="false" hover-class="none"></u-cell>
      <u-cell title="客服电话" value="958645123" :arrow="false" hover-class="none"></u-cell>
   </view>
</template>

<script>
export default {
   data() {
      return {};
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

   .logo {
      width: 141rpx;
      height: 141rpx;
      background-color: #00cba1;
   }
   .name {
      display: block;
      margin: 10rpx 0;
   }
}
</style>
