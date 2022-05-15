<template>
   <view class="mainBox">
      <view class="emptyState" v-if="list.length === 0">
         <image src="~static/images/emptyImg.png" mode="widthFix" />
         <text>暂无通知</text>
      </view>

      <view v-else class="li" v-for="(item, index) in list" :key="index">
         <image class="icon" :src="item.src" mode="widthFix" />
         <view class="content">
            <view class="top">
               <text class="type">{{ item.type }}</text>
               <text class="time">{{ item.time }}</text>
            </view>
            <view class="summary" ref="summary">
               <p>{{ item.summary }}</p>
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
         list: [],
      };
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   min-height: 100vh;
   box-sizing: border-box;
   background: #f5f5f5;

   .emptyState {
      width: 100vw;
      height: 100vh;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      image {
         display: block;
         width: 460rpx;
      }
      text {
         margin-top: 20rpx;
         display: block;
         font-size: 30rpx;
         text-align: center;
         opacity: 0.5;
      }
   }
   .li {
      width: 95vw;
      // height: 150rpx;
      margin: 0 auto 10rpx;
      box-sizing: border-box;
      padding: 10rpx;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      justify-content: space-between;
      .icon {
         width: 50rpx;
         height: 50rpx;
         margin-right: 15rpx;
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
               font-size: 30rpx;
               margin: 10rpx 0;
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
