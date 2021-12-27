<template>
   <view class="content">
      <view class="li" v-for="(item, index) in options" :key="index">
         <image class="left" :src="item.img" mode="widthFix" />
         <view class="middle">
            <text class="title">{{ item.title }}</text>
            <text class="summary">{{ item.label }}</text>
         </view>
         <text class="right" @click="mix_jumpUrl('/pages/home/Specialized')">更多详情 ></text>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         options: [
            { title: "经管类热门专业", label: "电子商务、物流管理", img: require("static/images/specialized1.png") },
            { title: "医学类热门专业", label: "护理学、动物医学", img: require("static/images/specialized2.png") },
            { title: "理工类热门专业", label: "软件工程、电子信息工程", img: require("static/images/specialized3.png") },
         ],
      };
   },
};
</script>

<style lang="scss" scoped>
.content {
   width: 90vw;
   .li {
      width: 100%;
      height: auto;
      margin: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 15rpx;
      box-shadow: 0 5rpx 10rpx 3rpx rgba($color: #000000, $alpha: 0.1);
      box-sizing: border-box;
      border-radius: 15rpx;
      .left {
         width: 100rpx;
         flex-shrink: 0;
      }
      .middle {
         flex: 1;
         height: 100%;
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         justify-content: space-between;
         box-sizing: border-box;
         padding-left: 25rpx;
         text {
            display: block;
            margin: 5rpx;
         }
         .title {
            font-size: 35rpx;
            color: #333333;
         }
         .summary {
            font-size: 25rpx;
         }
      }
      .right {
         display: block;
         flex-shrink: 0;
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
</style>
