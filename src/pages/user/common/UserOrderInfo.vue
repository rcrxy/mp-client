<template>
   <view>
      <van-empty v-if="isEmpty" class="custom-image" :image="require('../../../static/images/emptyImg.png')" />
      <!-- <van-list v-if="!isEmpty" finished-text="没有更多数据了" @load="onLoad">
         <van-cell-group inset v-for="(item, index) in list" :key="index">
            <van-cell :title="`订单号：${item.orderNumber}`" label-class="topLabel">
               <template #title>
                  <view class="topTitle">
                     <text>订单号：{{ item.orderNumber }}</text>
                     <text :style="item.state ? '' : 'color:#f50000'">{{ item.state === 1 ? "已支付" : "未支付" }}</text>
                  </view>
               </template>
               <template #label>
                  <view class="title">
                     <image :src="require('../../../static/images/projectBack2.png')" alt="" />
                     <text>{{ item.name }}</text>
                  </view>
                  <view class="right">
                     <text>{{ item.name2 }}</text>
                     <text>
                        实付:
                        <text class="actualPay">￥{{ item.actualPay }}</text>
                     </text>
                  </view>
               </template>
               <template></template>
            </van-cell>
            <van-cell :title="`${item.name2}(${item.type})`" label="课程精讲班">
               <template #default>
                  <text>
                     实付:
                     <text class="actualPay">￥{{ item.actualPay }}</text>
                  </text>
               </template>
            </van-cell>
            <van-cell :title="item.time" center>
               <template>
                  <van-button round plain type="primary" size="mini" color="rgb(121, 121, 121)">删除订单</van-button>
                  <van-button round plain type="primary" size="mini" v-if="!item.state">支付订单</van-button>
               </template>
            </van-cell>
         </van-cell-group>
      </van-list> -->
   </view>
</template>

<script>
export default {
   props: {
      active: Number,
   },
   data: () => ({
      list: [
         { orderNumber: "32163538434", state: 0, name: "高数", name2: "成考高数(一)", type: "精讲班", actualPay: "50.00", time: "2021年10月22日" },
         { orderNumber: "32163538434", state: 0, name: "高数", name2: "成考高数(一)", type: "精讲班", actualPay: "50.00", time: "2021年10月22日" },
         { orderNumber: "32163538434", state: 0, name: "高数", name2: "成考高数(一)", type: "精讲班", actualPay: "50.00", time: "2021年10月22日" },
         { orderNumber: "32163538434", state: 1, name: "高数", name2: "成考高数(一)", type: "精讲班", actualPay: "50.00", time: "2021年10月22日" },
         { orderNumber: "32163538434", state: 1, name: "高数", name2: "成考高数(一)", type: "精讲班", actualPay: "50.00", time: "2021年10月22日" },
      ],
      options: [],
      isEmpty: false,
      loading: true,
      finished: true,
   }),
   watch: {
      active: {
         handler(val) {
            switch (val) {
               case 0:
                  this.options = this.list;
               case 1:
                  this.options = this.list.forEach(item => item.state === 0);
               case 2:
                  this.options = this.list.forEach(item => item.state === 1);
            }
         },
         immediate: true,
      },
      options: {
         handler(val) {
            val ? (this.isEmpty = true) : (this.isEmpty = false);
         },
         deep: true,
         immediate: true,
      },
   },
   methods: {
      onLoad() {},
   },
};
</script>

<style lang="scss" scoped>
.van-cell-group {
   margin: 0.5rem 0.75rem;
   .topTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
   }
   .topLabel {
      display: flex;
      justify-content: flex-start;
      .title {
         position: relative;
         image {
            width: 8.5rem;
            vertical-align: top;
         }
         text {
            font-size: 1.35rem;
            color: #fff;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(1em, -50%);
         }
      }
      .right {
         margin-left: 1rem;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         > text {
            font-size: 1.05rem;
            color: #000;
         }
      }
   }
}
.actualPay {
   color: #f50000;
}
</style>
