<template>
   <view class="practice">
      <view class="main">
         <image class="banner" src="~static/images/practiceBanner.png" mode="widthFix" />

         <view class="title">
            <view class="line"></view>
            <text>综合演练</text>
         </view>
         <view class="ul activity">
            <view class="li" v-for="(item, index) in synthesisOptions" :key="index" @click="jumpUrl(item)">
               <image :src="item.image" mode="widthFix" />
               <text>{{ item.name }}</text>
            </view>
         </view>

         <view class="title">
            <view class="line"></view>
            <text>章节练习</text>
         </view>
         <view class="sublevel">
            <u-cell class="li" v-for="(item, index) in sublevelOptions" :key="index" :title="item.name" isLink>
               <template #label>
                  <view class="label">
                     <u-line-progress :percentage="(item.completed / item.max) * 100" height="8" :showText="false"></u-line-progress>
                     <view>
                        <text class="left">{{ item.completed }}</text>
                        /
                        <text class="right">{{ item.max }}</text>
                     </view>
                  </view>
               </template>
            </u-cell>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         synthesisOptions: [
            { name: "每日一练", image: require("../../static/images/practiceIcon1.png") },
            { name: "模拟考试", image: require("../../static/images/practiceIcon2.png") },
            { name: "我的收藏", image: require("../../static/images/practiceIcon4.png") },
            { name: "我的错题", image: require("../../static/images/practiceIcon5.png") },
            { name: "题库纠错", image: require("../../static/images/practiceIcon6.png") },
         ],
         sublevelOptions: [
            { name: "第一章", max: 60, completed: 20 },
            { name: "第二章", max: 30, completed: 21 },
            { name: "第三章", max: 40, completed: 22 },
            { name: "第四章", max: 20, completed: 10 },
         ],
      };
   },
   onLoad(info) {
      uni.setNavigationBarTitle({ title: info.name });
   },
   methods: {
      jumpUrl({ name }) {
         let url;
         switch (name) {
            case "每日一练":
               url = "/pages/practice/common/info/EverDay";
               break;
            case "模拟考试":
               url = "/pages/practice/common/info/mockExam";
               break;
            case "我的收藏":
               url = "/pages/user/UserCollection";
               break;
            case "我的错题":
               break;
            case "题库纠错":
               break;
         }
         uni.navigateTo({ url });
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
         margin: 1rem 0;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         image {
            width: 3em;
         }
         text {
            font-size: 0.9rem;
         }
      }
   }
   .sublevel {
      .label {
         width: 80%;
         display: flex;
         align-items: center;
         justify-content: center;
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
