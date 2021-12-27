<template>
   <view class="content">
      <view class="li" v-for="(item, index) in options" :key="index" @click="mix_jumpUrl('/pages/project/ProjectContent', item)">
         <view class="left">
            <image src="~static/images/projectBack.png" mode="widthFix" />
            <text>{{ item.title }}</text>
         </view>
         <view class="middle">
            <text class="title">{{ item.title }}</text>
            <view class="purchases">
               <u-count-to :start-val="1" :end-val="item.label" separator="," font-size="13"></u-count-to>
               <text>人购买</text>
            </view>
         </view>
         <view class="right">
            <text>点击试看 ></text>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         options: [
            { title: "高数(一)", name: "高数(一)", label: "1021" },
            { title: "大学语文", name: "大学语文", label: "234" },
            { title: "高数(一)", name: "高数(一)", label: "1024" },
            { title: "高数(一)", name: "高数(一)", label: "3068" },
         ],
      };
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
.content {
   width: 100%;
   .li {
      width: 100%;
      margin: 20rpx 0;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20rpx 15rpx;
      border-radius: 15rpx;
      box-shadow: 0 5rpx 10rpx 3rpx rgba($color: #000000, $alpha: 0.1);
      .left {
         width: 250rpx;
         position: relative;
         image {
            width: 100%;
            vertical-align: top;
         }
         text {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-size: 40rpx;
            text-indent: 40rpx;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
         }
      }
      .middle {
         flex: 1;
         box-sizing: border-box;
         padding-left: 30rpx;
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         justify-content: space-evenly;
         text {
            display: block;
         }
         .title {
            font-size: 35rpx;
         }
         .purchases {
            opacity: 0.5;
            font-size: 25rpx;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            .u-count-num {
               vertical-align: bottom;
            }
         }
      }
      .right {
         flex-shrink: 0;
         display: flex;
         align-items: center;
         justify-content: center;
         text {
            display: block;
            font-weight: 400;
            font-size: 24rpx;
            box-sizing: border-box;
            color: #fff;
            padding: 5rpx 15rpx;
            border-radius: 1em;
            background-image: linear-gradient(to bottom, #00c0db 0%, #00cda2 100%);
         }
      }
   }
}
</style>
