<template>
   <view class="mainBox">
      <u-cell-group>
         <u-cell v-for="(item, index) in list" :key="index" isLink @click="mix_jumpUrl('/pages/practice/common/WorkProblem', { name: '模拟练习', subject: item.subject, max: item.num })">
            <template #title>
               <text class="title">{{ item.name }}</text>
            </template>
            <template #label>
               <text class="label">{{ item.label }} 共{{ item.num }}道题</text>
            </template>
         </u-cell>
      </u-cell-group>

      <u-toast ref="uToast"></u-toast>
   </view>
</template>

<script>
export default {
   data() {
      return {
         subject: "",
         list: [
            { name: "模拟试题（一）", label: "全国", num: 10, subject: "" },
            { name: "模拟试题（二）", label: "全国", num: 10, subject: "" },
            { name: "模拟试题（三）", label: "全国", num: 10, subject: "" },
         ],
      };
   },
   onLoad(info) {
      const { subject } = info;
      this.list.forEach((item) => {
         item.subject = subject;
      });
      console.log(subject, this.list);
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
