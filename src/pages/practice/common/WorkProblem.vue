<template>
   <view class="mainBox">
      <view class="questionsContent">
         <swiper class="swiper" v-if="!loading" :current="nowIndex - 1" @change="swiperChange">
            <swiper-item v-for="(item, index) in problemList" :key="index">
               <scroll-view scroll-y="true">
                  <!-- 选择题 -->
                  <q-select v-if="showType(item, 'select')" :info="item" @getUserAnswer="getUserAnswer"></q-select>
                  <!-- 完型填空 / 阅读理解 -->
                  <!-- <q-cloze></q-cloze>  -->
                  <!-- 填空题 -->
                  <!-- 简答/作文/ -->
               </scroll-view>
            </swiper-item>
         </swiper>
         <view class="loading" v-else>
            <u-loading-icon></u-loading-icon>
         </view>
      </view>
      <footer-bar v-model="nowIndex" :valueId="valueId" :quantity="problemList.length || 5" @indexChange="indexChange"></footer-bar>
   </view>
</template>

<script>
import { postQuestionsListAPI } from "@/servers/ServersPractice";
import footerBar from "./WorkProblem/footerBar.vue";

import qSelect from "./WorkProblem/qSelect.vue";
export default {
   components: {
      footerBar,
      qSelect,
   },
   data() {
      return {
         loading: false,
         nowIndex: 1,
         valueId: 1,
         completed: 0,
         problemList: [],
      };
   },
   watch: {
      nowIndex(newVal, oldVal) {
         if (oldVal - newVal >= 2 || oldVal - newVal <= -2) {
            console.log(newVal);
            this.loading = true;
            setTimeout(() => {
               this.loading = false;
            }, 300);
         }
      },
   },
   onLoad(info) {
      console.log(info);
      const { name, subject } = info;
      this.getProblemList(name, "化学");
      if (name) uni.setNavigationBarTitle({ title: name });
   },
   methods: {
      showType(info, type) {
         const { questionType } = info;
         switch (type) {
            case "select":
               const select = ["单选", "多选", "判断"];
               if (select.indexOf(questionType) !== -1) return true;
         }
      },

      getUserAnswer(an) {
         console.log(an);
      },

      async getProblemList(name, subject) {
         try {
            if (name === "每日一练") {
               const res = await postQuestionsListAPI({ course: subject });
               if (res.code === 200) {
                  this.problemList = this.extract(res.data, 8);
                  console.log(this.problemList);
               }
            } else {
            }
         } catch (error) {
            console.log(error);
         }
      },
      /** 抽取题目 */
      extract(arr, num) {
         let nowList = [];
         const max = arr.length;

         for (let i = 0; i < num; i++) {
            while (true) {
               const nowIndex = Math.floor(Math.random() * max) + 1;

               if (nowList.indexOf(nowIndex) === -1) {
                  nowList[i] = nowIndex;
                  break;
               }
            }
         }
         let list = [];
         nowList.forEach((item, index) => {
            list[index] = arr[item];
         });
         return list;
      },

      swiperChange({ detail: { current } }) {
         this.nowIndex = current + 1;
      },

      indexChange(index) {
         this.nowIndex = index;
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-flow: column nowrap;
   align-items: inherit;
   justify-content: space-between;
   .questionsContent {
      flex: 1;
      width: 100vw;
      box-sizing: border-box;
      padding: 10rpx 20rpx;
   }
   .swiper {
      width: 100%;
      height: calc(100vh - 65px);
      swiper-item {
         width: 100%;
         height: 100%;
         scroll-view {
            width: 100%;
            height: 100%;
         }
      }
   }
}
</style>
