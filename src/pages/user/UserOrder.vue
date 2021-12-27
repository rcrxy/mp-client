<template>
   <view class="mainBox">
      <!-- <u-tabs :list="tabsList" @click="tabsclick"></u-tabs> -->
      <c-tabs-group class="tabs" v-model="tabIndex" :list="tabsList"></c-tabs-group>
      <swiper class="tabsContent" :current="tabIndex" @change="swiperChange">
         <swiper-item>
            <view class="emptyState" v-if="orderList.length === 0">
               <image src="~static/images/emptyImg.png" mode="widthFix" />
            </view>
            <view v-else><list-card v-for="(item, index) in orderList" :key="index" :data="item"></list-card></view>
         </swiper-item>
         <swiper-item>
            <view class="emptyState" v-if="notPaid.length === 0">
               <image src="~static/images/emptyImg.png" mode="widthFix" />
            </view>
            <view v-else><list-card v-for="(item, index) in notPaid" :key="index" :data="item"></list-card></view>
         </swiper-item>
         <swiper-item>
            <view class="emptyState" v-if="paid.length === 0">
               <image src="~static/images/emptyImg.png" mode="widthFix" />
            </view>
            <view v-else><list-card v-for="(item, index) in paid" :key="index" :data="item"></list-card></view>
         </swiper-item>
      </swiper>
   </view>
</template>

<script>
import UserOrderInfo from "./common/UserOrderInfo.vue";
import cTabsGroup from "@/components/customize/c-tabs-group.vue";
import ListCard from "./components/UserOrder/ListCard.vue";

export default {
   components: {
      UserOrderInfo,
      cTabsGroup,
      ListCard,
   },
   data() {
      return {
         tabIndex: 0,
         // tabsList: [{ name: "全部" }, { name: "未支付" }, { name: "已支付" }],
         tabsList: ["全部", "未支付", "已支付"],
         allOrder: null,
         unCompletedOrder: null,
         CompletedOrder: null,
         orderList: [
            { orderId: "202164356835654314", state: 0, name: "高数(一)", name2: "成考高数(一)", classType: "课程精讲班", addTime: "2021-10-22", price: 50, amount: 49.99 },
            { orderId: "202164356835654315", state: 1, name: "高数(一)", name2: "成考高数(一)", classType: "课程精讲班", addTime: "2021-10-23", price: 100, amount: 99 },
            { orderId: "202164356835654316", state: 1, name: "高数(一)", name2: "成考高数(一)", classType: "课程精讲班", addTime: "2021-10-24", price: 75, amount: 60 },
            { orderId: "202164356835654317", state: 0, name: "高数(一)", name2: "成考高数(一)", classType: "课程精讲班", addTime: "2021-10-25", price: 50, amount: 45 },
            { orderId: "202164356835654318", state: 1, name: "高数(一)", name2: "成考高数(一)", classType: "课程精讲班", addTime: "2021-10-26", price: 25, amount: 25 },
            { orderId: "202164356835654319", state: 0, name: "高数(一)", name2: "成考高数(一)", classType: "课程精讲班", addTime: "2021-10-27", price: 200, amount: 188 },
         ],
         paid: [],
         notPaid: [],
      };
   },
   created() {
      this.setList();
   },
   methods: {
      swiperChange({ detail: { current } }) {
         this.tabIndex = current;
      },
      setList() {
         this.orderList.forEach(item => {
            if (item.state === 0) this.notPaid.push(item);
            if (item.state === 1) this.paid.push(item);
         });
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
      left: 50%;
      transform: translate(-50%, 100%);
   }
}
.mainBox {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-flow: column nowrap;
   align-items: inherit;
   justify-content: flex-start;
   .tabs {
      flex-shrink: 0;
   }
   .tabsContent {
      flex: 1;
      swiper-item {
         width: 100%;
         height: 100%;
         display: flex;
         flex-flow: column nowrap;
         align-items: center;
         justify-content: flex-start;
         overflow: auto;
      }
   }
}
</style>
