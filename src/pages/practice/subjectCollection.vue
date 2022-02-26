<template>
   <view class="mainBox">
      <u-cell class="problemCell" v-for="(item, index) in collectList" :key="index" isLink @click="mix_jumpUrl('/pages/practice/common/WorkProblem', { index, name: '收藏练习', subject: item.course })">
         <template #title>
            <view class="celltitle">
               <u-tag class="tag" :text="item.questionType" size="mini" type="warning"></u-tag>
               <rich-text :nodes="item.question | as_text"></rich-text>
            </view>
         </template>
      </u-cell>
   </view>
</template>

<script>
import { postUserCollectionAPI } from "@/servers/ServersUser";
export default {
   data() {
      return {
         collectList: [],
      };
   },
   async onLoad({ subject }) {
      subject = "化学";
      const data = await this.postUserCollection();
      this.collectList = data
         .map(item => {
            if (item.valueType === "question") {
               return item.value;
            }
         })
         .map(item => {
            if (item.course === subject) {
               return item;
            }
         });
   },
   filters: {
      as_text(val) {
         const newVal = val.replace(/<img src='[\S]+' \/>/, " <i>图片</i> ");
         return newVal;
      },
   },
   onPullDownRefresh() {},
   methods: {
      async postUserCollection() {
         const sendData = { valueType: "question" };
         const { code, data } = await postUserCollectionAPI(sendData);
         if (code === 200) {
            return data;
         }
      },
      /**分组筛选 */
      classificationScreening(arr = [], mark = "") {
         const nowList = arr;
         if (arr.length > 0) {
            this.classificationScreening(arr, mark);
         } else {
            return nowList;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.celltitle {
   display: flex;
   align-items: center;
   justify-content: flex-start;
   .tag {
      margin-right: 10rpx;
   }
}
</style>
