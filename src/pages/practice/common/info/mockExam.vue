<template>
   <view class="mainBox">
      <u-cell-group>
         <u-cell v-for="(item, index) in list" :key="index" isLink>
            <template #title>
               <text class="title">{{ item.name }}</text>
            </template>
            <template #label>
               <text class="label">{{ item.label }} 共{{ item.num }}道题</text>
            </template>
         </u-cell>
      </u-cell-group>
   </view>
</template>

<script>
export default {
   data() {
      return {
         list: [
            { name: "全国语文专升本2019真题（卷一）", label: "全国", num: 50 },
            { name: "全国语文专升本2018真题（卷二）", label: "全国", num: 50 },
            { name: "全国语文专升本2017真题（卷一）", label: "全国", num: 50 },
         ],
      };
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
.u-cell {
   .title {
      font-size: 30rpx;
   }
   .label {
      font-size: 26rpx;
      color: rgba($color: #000000, $alpha: 0.6);
   }
}
</style>
