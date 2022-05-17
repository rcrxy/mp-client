<template>
   <view>
      <uni-grid class="synthesis" :column="4" :showBorder="false" :square="false">
         <uni-grid-item>
            <view class="itemContent">
               <image src="~static/images/homeCol1.png" mode="widthFix" @click="mix_jumpUrl('/pages/home/tabs/ScoreQuery')" />
               <text class="text">成绩查询</text>
            </view>
         </uni-grid-item>
         <uni-grid-item>
            <view class="itemContent">
               <image src="~static/images/homeCol2.png" mode="widthFix" @click="mix_jumpUrl('/pages/project/project')" />
               <text class="text">我的课程</text>
            </view>
         </uni-grid-item>
         <uni-grid-item>
            <view class="itemContent">
               <image src="~static/images/homeCol3.png" mode="widthFix" @click="mix_jumpUrl('/pages/home/tabs/Guide')" />
               <text class="text">成考指南</text>
            </view>
         </uni-grid-item>
         <uni-grid-item>
            <view class="itemContent">
               <image src="~static/images/homeCol4.png" mode="widthFix" @click="mix_jumpUrl('/pages/common/CustomerService', { title: '在线答疑' })" />
               <text class="text">在线答疑</text>
            </view>
         </uni-grid-item>
      </uni-grid>
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
.synthesis {
   width: 90vw;
   background-color: #fff;
   // border-radius: 10px;
   margin: 40rpx auto;
   .uni-grid-item {
      text-align: center;
      border-radius: 10rpx;
      overflow: hidden;
      .itemContent {
         padding: 15rpx 0;
         display: flex;
         flex-flow: column nowrap;
         align-items: center;
         justify-content: space-around;
         image {
            margin: auto;
            width: 100rpx;
            flex-shrink: 0;
         }
         text {
            font-size: 28rpx;
         }
      }
   }
}
</style>
