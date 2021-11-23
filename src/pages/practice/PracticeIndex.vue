<template>
   <view class="main">
      <view class="search">
         <input type="text" placeholder="大家都在搜：高考语文" placeholder-class="input-placeholder" />
         <button :loading="loading" @click="loading = !loading">立即搜索</button>
      </view>
      <view class="list">
         <view class="li" v-for="(item, index) in options" :key="index" @click="jumpUrl(item)">
            <text class="title">{{ item.name }}</text>
            <view class="tags">
               <view class="tag" style="background-color: #709eff"><text>在线题库</text></view>
               <view class="tag" style="background-color: #eb5cf4"><text>咨询解答</text></view>
               <view class="tag" style="background-color: #ff537f"><text>模拟试卷</text></view>
            </view>

            <view class="button">
               <image src="~static/images/practiceIndexButton.png" mode="widthFix" />
               <text>课程精讲班</text>
            </view>
         </view>
      </view>
   </view>
</template>

<script>
import qs from "qs";
import { getSubjectPracticeAPI } from "@/servers/ServersPractice.js";
export default {
   data: () => ({
      options: [
         { id: "01", name: "语文", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "02", name: "数学", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "03", name: "英语", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "04", name: "政治", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "05", name: "生物", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "06", name: "大学语文(一)", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "07", name: "大学数学(二)", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "08", name: "高等数学", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "09", name: "教育理论", isOnline: 1, isAnswer: 1, isSimulation: 1 },
         { id: "10", name: "医学综合", isOnline: 1, isAnswer: 1, isSimulation: 1 },
      ],
      loading: false,
      finished: true,
      loading: false,
   }),
   created() {},
   methods: {
      async getSubjectPractice() {
         let { code, body } = await getSubjectPracticeAPI();
         if (code === 200) {
            this.options = body.list;
            console.log(this.options);
         }
      },
      jumpUrl(info) {
         uni.navigateTo({
            url: `/pages/practice/info?${qs.stringify(info)}`,
         });
      },
   },
};
</script>

<style lang="scss" scoped>
.main {
   width: 90vw;
   margin: auto;
   .search {
      width: 100%;
      margin: 20rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid rgba($color: #000000, $alpha: 0.1);
      border-radius: 20rpx;
      overflow: hidden;
      .leftIcon {
         font-weight: 700;
         color: rgba($color: #000000, $alpha: 0.5);
         margin: 0 20rpx;
      }
      input {
         flex: 1;
      }
      .input-placeholder {
         font-size: 30rpx;
      }
      button {
         border: none;
         outline: none;
         border-radius: 0;
         font-size: 30rpx;
         width: 175rpx;
         height: 65rpx;
         padding: 0;
         display: flex;
         align-items: center;
         justify-content: center;
         color: #fff;
         background-color: #00cba1;
         &::after {
            border: none;
         }
      }
   }
   .list {
      width: 100%;
      .li {
         border-radius: 20rpx;
         margin-bottom: 15rpx;
         padding: 20rpx;
         box-sizing: border-box;
         box-shadow: 0 0 10px 2px rgba($color: #000000, $alpha: 0.1);
         display: flex;
         flex-flow: column nowrap;
         align-items: flex-start;
         justify-content: flex-start;
         .title {
            font-size: 36rpx;
            font-weight: 700;
            text-align: left;
         }
         .tags {
            margin: 30rpx 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .tag {
               padding: 1px 5px;
               border-radius: 1em;
               margin-right: 10rpx;
               display: flex;
               align-items: center;
               justify-content: center;
               text {
                  font-size: 25rpx;
                  color: #fff;
                  text-align: center;
               }
            }
         }
         .button {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            image {
               width: 75rpx;
            }
            text {
               font-size: 25rpx;
            }
         }
      }
   }
}
</style>
