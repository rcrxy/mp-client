<template>
   <view>
      <view class="banner">
         <image src="~static/images/professionalDetailsBannerIe.png" mode="widthFix" />
         <view class="text">
            <text>期限：{{ info.time }}年</text>
            <text>所属类型：{{ info.category }}</text>
         </view>
      </view>
      <u-grid :col="3" :border="false">
         <u-grid-item>
            <image src="~static/images/specialized1.png" mode="widthFix" />
            <text class="grid-text">咨询解答</text>
         </u-grid-item>
         <u-grid-item>
            <image src="~static/images/specialized2.png" mode="widthFix" />
            <text class="grid-text">在线报名</text>
         </u-grid-item>
         <u-grid-item>
            <image src="~static/images/specialized3.png" mode="widthFix" />
            <text class="grid-text">招生院校</text>
         </u-grid-item>
      </u-grid>
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
            <view class="th"><navigator url="" redirect hover-class="className">在线试听</navigator></view>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         info: {},
         course: [],
      };
   },
   onLoad(res) {
      this.info = res;
      this.getProfessionalDetails(res.id);
   },
   onReady() {
      if (this.info) {
         uni.setNavigationBarTitle({
            title: this.info.name,
         });
      }
   },
   methods: {
      getProfessionalDetails(id) {
         console.log("id", id);
      },
   },
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
.u-grid {
   width: 90vw;
   margin: 20rpx auto;
   border-radius: 20rpx;
   overflow: hidden;
   box-shadow: 0 0 5rpx 1rpx rgba($color: #000000, $alpha: 0.25);
   image {
      width: 55rpx;
      vertical-align: top;
      margin-bottom: 10rpx;
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
