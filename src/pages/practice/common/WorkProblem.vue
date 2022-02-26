<template>
   <view class="mainBox">
      <view class="questionsContent">
         <swiper class="swiper" v-if="!loading" :current="nowIndex - 1" @change="swiperChange">
            <swiper-item v-for="(item, index) in problemList" :key="index">
               <scroll-view scroll-y="true">
                  <components :is="setType(item)" :info="item" @getUserAnswer="getUserAnswer"></components>
               </scroll-view>
            </swiper-item>
         </swiper>
         <view class="loading" v-else>
            <u-loading-icon></u-loading-icon>
         </view>
      </view>
      <footer-bar v-model="nowIndex" :valueId="valueId" :problemList="problemList" :quantity="problemList.length || 8" @indexChange="indexChange"></footer-bar>
   </view>
</template>

<script>
import { postQuestionsListAPI } from "@/servers/ServersPractice";
import footerBar from "./WorkProblem/footerBar.vue";

import qSelect from "./WorkProblem/qSelect.vue";
import qJudgment from "./WorkProblem/qJudment.vue";
import qMultiSelect from "./WorkProblem/qMultiSelect.vue";
import otherType from "./WorkProblem/otherType.vue";

export default {
   components: {
      footerBar,
      qSelect,
      qJudgment,
      qMultiSelect,
      otherType,
   },
   data() {
      return {
         loading: false,
         nowIndex: 1,
         valueId: 1,
         completed: 0,
         maxlength: 8,
         problemList: [],
         collectionList: [],
         showParse: false,
      };
   },
   watch: {
      nowIndex(newVal, oldVal) {
         if (oldVal - newVal >= 2 || oldVal - newVal <= -2) {
            this.loading = true;
            setTimeout(() => {
               this.loading = false;
            }, 300);
         }
      },
   },
   onLoad(info) {
      const { name, subject } = info;
      this.getProblemList(name, "化学");
      if (name) uni.setNavigationBarTitle({ title: name });
   },
   methods: {
      /**识别题型 */
      setType(info) {
         const { questionType } = info;
         const typeList = [
            { name: "判断", type: "qJudgment" },
            { name: "单选", type: "qSelect" },
            { name: "多选", type: "qMultiSelect" },
         ];
         const nowType = typeList.find(item => item.name === questionType);
         if (Boolean(nowType)) {
            return nowType.type;
         } else {
            return "otherType";
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
                  this.problemList = this.extract(res.data, this.maxlength);
               }
            } else {
            }
         } catch (error) {
            console.log(error);
         }
      },
      /** 抽取题目 */
      extract(arr, num) {
         const nowList = [];
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
         console.log(list);
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
   }
   .swiper {
      width: 100%;
      height: calc(100% - 125rpx);
      swiper-item {
         width: 100%;
         height: 100%;
         scroll-view {
            width: 100%;
            height: 100%;
            padding: 10rpx 25rpx;
            box-sizing: border-box;
         }
      }
   }
}

.parse {
   width: 100%;
}

.footerBox {
   width: 100vw;
   height: 125rpx;
   background: #fff;
   border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
   display: flex;
   align-items: center;
   justify-content: space-evenly;
   position: fixed;
   left: 0;
   bottom: 0;
   z-index: 999;
   .u-button {
      width: 45% !important;
      flex-shrink: 0;
   }
   .line {
      flex-shrink: 0;
      width: 1px;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.1);
   }
}

::v-deep img {
   max-width: 100%;
   vertical-align: middle;
}

::v-deep .parse {
   margin-top: 30rpx;

   .showParse {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      > text {
         font-size: 30rpx;
         color: #00cba1;
      }
   }

   .answer {
      display: block;
      border-radius: 10rpx;
      font-size: 35rpx;
      margin: 10rpx 0;
   }
   .analysis {
      width: 100%;
      box-sizing: border-box;
      padding: 30rpx;
      background-color: #f5f5f5;
      border-radius: 10rpx;
      font-size: 35rpx;
      .title {
         margin-bottom: 10rpx;
         font-weight: 500;
      }
   }
}
</style>
