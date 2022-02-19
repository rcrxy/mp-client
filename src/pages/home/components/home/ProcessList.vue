<template>
   <view class="gridBox">
      <view class="gridItem" v-for="(item, index) in gridOptions" :key="index" @click="mix_jumpUrl(item.url)">
         <image :src="item.img" mode="widthFix" />
         <view class="text">
            <text class="title">{{ item.title }}</text>
            <text class="label">{{ item.label }}</text>
            <u-button class="button" text="点击进入" size="mini" type="success"></u-button>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         gridOptions: [
            { title: "报名时间", img: require("@/static/images/process1.png"), label: "不要错过时间", url: "/pages/home/process/Time" },
            { title: "报名入口", img: require("@/static/images/process2.png"), label: "提升学历渠道", url: "/pages/home/process/Entrance" },
            { title: "考试科目", img: require("@/static/images/process3.png"), label: "了解考试科目", url: "/pages/home/process/ExamSubjects" },
            { title: "报考条件", img: require("@/static/images/process4.png"), label: "查看录取分数", url: "/pages/home/process/Condition" },
         ],
      };
   },
   created() {},
   methods: {},
};
</script>

<style lang="scss" scoped>
.gridBox {
   width: 90vw;
   margin: auto;
   display: flex;
   flex-flow: row wrap;
   align-content: space-between;
   justify-content: space-between;
   .gridItem {
      width: 48%;
      position: relative;
      box-shadow: 0 0 10rpx 1rpx rgba($color: #000000, $alpha: 0.1);
      border-radius: 8rpx;
      margin-bottom: 20rpx;
      overflow: hidden;

      image {
         width: 100%;
         vertical-align: top;
      }
      .text {
         position: absolute;
         top: 1em;
         left: 1em;
         display: flex;
         flex-flow: column nowrap;
         align-items: flex-start;
         justify-content: space-between;
         text {
            margin-bottom: 5rpx;
         }
         .title {
            font-size: 30rpx;
         }
         .label {
            font-size: 28rpx;
            color: gray;
         }
         .button {
            margin: 0;
         }
      }
   }
}
</style>
