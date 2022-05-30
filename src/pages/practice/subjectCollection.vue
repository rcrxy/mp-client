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
import { mapMutations } from "vuex";
export default {
   data() {
      return {
         subject: null,
         collectList: [],
      };
   },
   async onLoad({ subject }) {
      this.subject = subject;
      this.collectList = await this.postUserCollection(subject);
   },
   filters: {
      as_text(val) {
         let newVal = val.replace(/<img src='[\S]+' \/>/, " <i>图片</i> ").replace(/<br>/g, " ");
         newVal = "<div class='content' style='overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;'>".concat(newVal).concat("</div>");
         return newVal;
      },
   },
   async onPullDownRefresh() {
      this.collectList = await this.postUserCollection(this.subject);
      uni.stopPullDownRefresh();
   },
   methods: {
      ...mapMutations(["setProblemList"]),
      /**获取题目收藏列表 */
      async postUserCollection(subject) {
         const sendData = { valueType: "question" };
         const { code, data } = await postUserCollectionAPI(sendData);
         if (code === 200) {
            const list = data
               .filter((item) => item.valueType === "question")
               .map((item) => item.value)
               .filter((item) => item.course === subject);
            this.setProblemList(list);
            return list;
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
      showType(val) {
         return val.questionType;
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
uni-rich-text {
   .content {
      background-color: aqua !important;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
   }
}
</style>
