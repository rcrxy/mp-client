<template>
   <view class="practice">
      <view class="main">
         <image class="banner" src="~static/images/practiceBanner.png" mode="widthFix" />

         <view class="title">
            <view class="line"></view>
            <text>综合演练</text>
         </view>
         <view class="ul activity">
            <view class="li" v-for="(item, index) in synthesisOptions" :key="index" @click="mix_jumpUrl(item.url, { name: item.name, subject: info.className })">
               <image :src="item.image" mode="widthFix" />
               <text>{{ item.name }}</text>
            </view>
         </view>

         <view class="title">
            <view class="line"></view>
            <text>章节练习</text>
         </view>
         <view class="sublevel">
            <u-skeleton :rows="6" :loading="loading">
               <u-cell class="li" v-for="(item, index) in sublevelOptions" :key="index" :title="item.name" isLink @click="mix_jumpUrl('/pages/practice/common/WorkProblem', item)">
                  <template #label>
                     <view class="label">
                        <u-line-progress :percentage="(item.completed / item.quantity) * 100" height="8" :showText="false"></u-line-progress>
                        <view>
                           <text class="left">{{ item.completed }}</text>
                           /
                           <text class="right">{{ item.quantity }}</text>
                        </view>
                     </view>
                  </template>
               </u-cell>
            </u-skeleton>
         </view>
      </view>
   </view>
</template>

<script>
import { postQuestionsListAPI } from "@/servers/ServersPractice";
export default {
   data() {
      return {
         synthesisOptions: [
            { name: "每日一练", image: require("../../static/images/practiceIcon1.png"), url: "/pages/practice/common/WorkProblem" },
            { name: "模拟考试", image: require("../../static/images/practiceIcon2.png"), url: "/pages/practice/common/info/mockExam" },
            { name: "我的收藏", image: require("../../static/images/practiceIcon4.png"), url: "/pages/practice/subjectCollection" },
            { name: "我的错题", image: require("../../static/images/practiceIcon5.png"), url: "" },
            { name: "题库纠错", image: require("../../static/images/practiceIcon6.png"), url: "" },
         ],
         sublevelOptions: [],
         allList: [],
         info: {},
         loading: false,
      };
   },
   onLoad(info) {
      this.info = info;
      uni.setNavigationBarTitle({ title: info.className });
   },
   created() {
      this.loading = true;
      this.postQuestionsList();
   },
   methods: {
      async postQuestionsList() {
         const sendData = {
            course: this.info.className,
         };
         const { code, data } = await postQuestionsListAPI(sendData);
         if (code === 200) {
            this.allList = data;
            this.getLength(data);
         }
      },
      /** 获取章节题目数量 */
      getLength(list) {
         let nameList = [];
         let lengthList = [];
         list.forEach(item => {
            if (!nameList.includes(item.chapter)) nameList.push(item.chapter);
         });
         nameList.forEach((item, index) => {
            lengthList[index] = 0;
         });
         list.forEach(item => {
            lengthList[nameList.indexOf(item.chapter)] += 1;
         });
         nameList.forEach((item, index) => {
            this.sublevelOptions.push({ name: item, quantity: lengthList[index], completed: 0 });
         });
         this.loading = false;
      },
   },
};
</script>

<style lang="scss" scoped>
.main {
   width: 95vw;
   height: auto;
   margin: auto;
   padding: 20rpx 0;
   .banner {
      width: 100%;
   }
   .title {
      width: 90vw;
      height: 36rpx;
      margin: 50rpx auto 30rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .line {
         display: block;
         width: 7.5rpx;
         height: 45rpx;
         background-color: #10cea2;
         margin-right: 10rpx;
      }
      text {
         font-size: 35rpx;
         font-weight: 500;
      }
   }
   .activity {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
      .li {
         width: 33.33%;
         margin: 20rpx 0;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         image {
            width: 100rpx;
         }
         text {
            font-size: 25rpx;
         }
      }
   }
   .sublevel {
      .label {
         width: 85%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         /deep/ .u-line-progress {
            width: 70% !important;
         }
         .left {
            font-size: 28rpx;
            color: #696969;
         }
         .right {
            font-size: 33rpx;
            color: #19be6b;
         }
      }
   }
}
</style>
