<template>
   <view class="main">
      <!-- <van-tabs v-model="tabIndex" swipeable animated sticky>
         <van-tab v-for="(item, index) in tabOptions" :key="index" :title="item.title" color="#00CBA1">
            <user-order-info :active="tabIndex" />
         </van-tab>
      </van-tabs> -->
      <u-tabs :list="tabsList" @click="tabsclick"></u-tabs>
      <view class="tabsContent">
         <view v-if="tabIndex === 0">
            <view class="emptyState" v-if="!allOrder">
               <image src="~static/images/emptyImg.png" mode="widthFix" />
            </view>
            <view v-else></view>
         </view>
         <view v-if="tabIndex === 1">
            <view class="emptyState" v-if="!allOrder">
               <image src="~static/images/emptyImg.png" mode="widthFix" />
            </view>
            <view v-else></view>
         </view>
         <view v-if="tabIndex === 2">
            <view class="emptyState" v-if="!allOrder">
               <image src="~static/images/emptyImg.png" mode="widthFix" />
            </view>
            <view v-else></view>
         </view>
      </view>
   </view>
</template>

<script>
import UserOrderInfo from "./common/UserOrderInfo.vue";
export default {
   components: {
      UserOrderInfo,
   },
   data() {
      return {
         tabIndex: 0,
         tabsList: [{ name: "全部" }, { name: "未支付" }, { name: "已支付" }],
         allOrder: null,
         unCompletedOrder: null,
         CompletedOrder: null,
      };
   },
   methods: {
      tabsclick(info) {
         this.tabIndex = info.index;
      },
   },
};
</script>

<style lang="scss" scoped>
.emptyState {
   width: 100vw;
   height: 100%;
   position: relative;
   image {
      display: block;
      width: 460rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
   }
}
</style>
