<template>
   <view>
      <view class="banner">
         <image src="~static/images/professionalDetailsBannerIe.png" mode="widthFix" />
         <view class="text">
            <text>期限：{{ info.time }}年</text>
            <text>所属类型：{{ info.category }}</text>
         </view>
      </view>
      <view class="hr">
         <view class="line"></view>
         <text>考试课程安排</text>
         <view class="line"></view>
      </view>
      <view class="table">
         <view class="tr">
            <view class="td"><text>序号</text></view>
            <view class="td"><text>课程层次</text></view>
            <view class="td"><text>课时</text></view>
            <view class="td"><text>试听</text></view>
         </view>
         <view class="tr" v-for="(item, index) in course" :key="index">
            <view class="th">
               <text>{{ item.serialNumber }}</text>
            </view>
            <view class="th">
               <text>{{ item.courseName }}</text>
            </view>
            <view class="th">
               <text>{{ item.timeLength }}</text>
            </view>
            <view class="th">
               <text class="link" @click="mix_jumpUrl('/pages/common/CustomerService')">立即咨询</text>
            </view>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         info: {},
         course: [
            { serialNumber: "1", courseName: "语文（高起专/高起本）", timeLength: "30" },
            { serialNumber: "2", courseName: "英语（高起专/高起本）", timeLength: "30" },
            { serialNumber: "3", courseName: "数学（高起专/高起本）", timeLength: "30" },
            { serialNumber: "4", courseName: "政治（高起专/高起本）", timeLength: "30" },
         ],
      };
   },
   onLoad(res) {
      this.info = res;
   },
   onReady() {
      if (this.info) {
         uni.setNavigationBarTitle({
            title: this.info.name,
         });
      }
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
.banner {
   width: 100vw;
   height: 270rpx;
   background: url(~static/images/professionalDetailsBanner.png) no-repeat center top / 100% 100%;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: center;
   image {
      width: 150rpx;
   }
   .text {
      margin-left: 30rpx;
      text {
         display: block;
         font-size: 35rpx;
         color: #fff;
         line-height: 50rpx;
      }
   }
}
.hr {
   margin: 50rpx auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   text {
      font-size: 35rpx;
      color: #00cba1;
      display: block;
      margin: 0 20rpx;
   }
   .line {
      height: 9rpx;
      background-color: #00cba1;
      flex: 1;
   }
}
.table {
   width: 650rpx;
   margin: auto;
   background-color: rgba($color: #000000, $alpha: 0.1);
   .tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:nth-of-type(1) {
         background-color: rgba($color: #000000, $alpha: 0.15);
      }
      .td,
      .th {
         font-size: 30rpx;
         padding: 10rpx 0;
         text-align: center;
         &:nth-of-type(1) {
            width: 15%;
         }
         &:nth-of-type(2) {
            width: 35%;
         }
         &:nth-of-type(3) {
            width: 25%;
         }
         &:nth-of-type(4) {
            width: 25%;
         }
         text {
            display: block;
            width: 100%;
            height: 100%;
         }
      }
   }
}
</style>
