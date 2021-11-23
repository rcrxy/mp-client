<template>
   <view class="mainBox">
      <view class="li" v-for="(item, index) in list" :key="index">
         <image class="icon" :src="item.src" mode="widthFix" />
         <view class="content">
            <view class="top">
               <text class="type">{{ item.type }}</text>
               <text class="time">{{ item.time }}</text>
            </view>
            <view class="summary" ref="summary">
               <u-notice-bar :text="item.summary" bgColor="#FFF" color="#000" icon=""></u-notice-bar>
            </view>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         width: 0,
         textWidth: 0,
         list: [
            { icon: "", type: "system", time: "2021年11月20日", summary: "1111111111111111111111111111111111111111111111111111111111111111111" },
            { icon: "", type: "system", time: "2021年11月20日", summary: "2222222222222222" },
            { icon: "", type: "system", time: "2021年11月20日", summary: "33333333333333" },
            { icon: "", type: "system", time: "2021年11月20日", summary: "444444444444444" },
         ],
      };
   },
   mounted() {},
   methods: {},
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   min-height: 100vh;
   box-sizing: border-box;
   background: #f5f5f5;
   padding-top: 10rpx;
   .li {
      width: 95vw;
      height: 150rpx;
      margin: 0 auto 10rpx;
      box-sizing: border-box;
      padding: 10rpx;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      justify-content: space-between;
      .icon {
         width: 50rpx;
         margin-right: 20rpx;
      }
      .content {
         flex: 1;
         height: 100%;
         display: flex;
         flex-flow: column nowrap;
         align-items: flex-start;
         justify-content: space-between;
         overflow: hidden;
         .top {
            width: 100%;
            text {
               display: block;
               font-size: 25rpx;
            }
         }
         .summary {
            width: 100%;
            padding: 8rpx 15rpx;
            box-sizing: border-box;
            font-size: 30rpx;
            background: #fff;
            border-radius: 15rpx;
            overflow: hidden;
            position: relative;
            .u-notice-bar {
               padding: 0;
            }
         }
      }
   }
}
</style>
