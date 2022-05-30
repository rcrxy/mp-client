<template>
   <view class="mainBox">
      <v-navbar :barTitle="barTitle" v-model="nowIndex" :valueId="valueId" @indexChange="indexChange" :quantity="problemList.length || 8"></v-navbar>
      <u-loading-page :loading="skeleton" loading-text="抽取题目中..."></u-loading-page>
      <view class="questionsContent">
         <swiper class="swiper" v-if="!loading" :current="nowIndex" @change="swiperChange">
            <swiper-item v-for="(item, index) in problemList" :key="index">
               <scroll-view scroll-y="true">
                  <components :is="setType(item)" :info="item"></components>
               </scroll-view>
            </swiper-item>
         </swiper>
         <view class="loading" v-else>
            <u-loading-icon></u-loading-icon>
         </view>
      </view>
   </view>
</template>

<script>
import { postQuestionsListAPI } from "@/servers/ServersPractice";
import { postUserCollectionAPI } from "@/servers/ServersUser";
import footerBar from "./WorkProblem/footerBar.vue";
import qSelect from "./WorkProblem/qSelect.vue";
import qJudgment from "./WorkProblem/qJudment.vue";
import qMultiSelect from "./WorkProblem/qMultiSelect.vue";
import otherType from "./WorkProblem/otherType.vue";
import { mapState, mapMutations } from "vuex";
import vNavbar from "./WorkProblem/navbar.vue";

export default {
   components: {
      footerBar,
      qSelect,
      qJudgment,
      qMultiSelect,
      otherType,
      vNavbar,
   },
   data() {
      return {
         barTitle: "模拟练习",
         loading: false,
         nowIndex: 0,
         valueId: 1,
         completed: 0,
         maxlength: 8,
         problemList: [],
         collectionList: [],
         showParse: false,
         skeleton: false,
      };
   },
   computed: {
      ...mapState(["questions"]),
   },
   watch: {
      nowIndex: {
         handler(newVal, oldVal) {
            if (oldVal - newVal >= 2 || oldVal - newVal <= -2) {
               this.loading = true;
               setTimeout(() => {
                  this.loading = false;
               }, 300);
            }
            this.valueId = this.problemList[newVal].questionId;
         },
      },
   },
   async onLoad(info) {
      this.skeleton = true;
      let { name, subject, index, max, quantity } = info;
      if (quantity && max) {
         quantity = quantity * 1;
         max = max * 1;
         this.maxlength = Boolean(quantity > max || quantity > 8) ? max : quantity;
      } else {
         this.maxlength = max ? max * 1 : 8;
      }
      this.barTitle = name ? name : "模拟练习";
      await this.getProblemList(name, subject);
      this.nowIndex = index ? index * 1 : 0;
      this.valueId = this.problemList[this.nowIndex].questionId;
   },
   methods: {
      ...mapMutations(["setProblemList"]),
      /** 初始化 */
      async getProblemList(name, subject) {
         try {
            this.collectionList = await this.getUserCollection(subject);
            let list = [];
            if (name === "每日一练" || name === "模拟练习") {
               list = this.extract(this.questions, this.maxlength);
            } else if (name === "收藏练习") {
               list = this.collectionList;
            } else {
               const filterList = this.questions.filter((item) => item.chapter === name);
               list = this.extract(filterList, this.maxlength);
            }

            const colIdList = this.collectionList.map((item) => {
               return {
                  collectionId: item.collectionId,
                  questionId: item.questionId,
               };
            });
            this.problemList = list.map((item) => {
               const info = colIdList.find((key) => key.questionId === item.questionId);
               return {
                  ...item,
                  isCollection: info ? true : false,
                  collectionId: info ? info.collectionId : null,
               };
            });
            this.setProblemList(this.problemList);
            this.skeleton = false;
         } catch (error) {
            this.skeleton = false;
            console.log(error);
         }
      },
      /**识别题型 */
      setType(info) {
         const { questionType } = info;
         const typeList = [
            { name: "判断", type: "qJudgment" },
            { name: "单选", type: "qSelect" },
            { name: "多选", type: "qMultiSelect" },
         ];
         const nowType = typeList.find((item) => item.name === questionType);
         if (Boolean(nowType)) {
            return nowType.type;
         } else {
            return "otherType";
         }
      },

      /**获取题目列表 */
      async getQuestions(subject) {
         const { code, data } = await postQuestionsListAPI({ course: subject });
         if (code === 200) {
            return data;
         }
      },
      /**获取收藏列表 */
      async getUserCollection(subject = "") {
         const sendData = { valueType: "question" };
         const { code, data } = await postUserCollectionAPI(sendData);
         if (code === 200) {
            let value = data
               .filter((item) => item.valueType === "question")
               .map((item) => {
                  return {
                     ...item.value,
                     collectionId: item.collectionId,
                  };
               });
            value = subject ? value.filter((item) => item.course === subject) : value;
            return value;
         }
      },

      /** 抽取题目 */
      extract(arr, num) {
         const nowList = [];
         const max = arr.length - 1;

         for (let i = 0; i < num; i++) {
            while (true) {
               const nowIndex = Math.floor(Math.random() * max);

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
         this.nowIndex = current;
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
      height: 100%;
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
