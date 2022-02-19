<template>
   <view class="mainBox">
      <view class="li" v-for="(item, index) in newsList" :key="index" @click="mix_jumpUrl('/pages/home/News', { id: item.newsId })">
         <view class="item">
            <!-- <image src="item.newsPoster" mode="widthFix" /> -->
            <image src="~static/images/homeNews.png" mode="widthFix" />
            <view class="text">
               <text class="title">{{ item.newsTitle }}</text>
               <text class="summary">{{ item.newsAbstract }}</text>
            </view>
         </view>
         <view class="line"></view>
      </view>
   </view>
</template>

<script>
import { getNewsAPI } from "@/servers/ServersHome";
export default {
   data() {
      return {
         isNetWork: true,
         newsList: [],
      };
   },
   created() {
      this.getNewsList();
   },
   onPullDownRefresh() {
      this.getNewsList();
      uni.stopPullDownRefresh();
   },
   methods: {
      async getNewsList() {
         const { code, data } = await getNewsAPI();
         if (code === 200) {
            this.newsList = data;
         } else {
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: auto;
   .li {
      width: 100vw;
      .item {
         box-sizing: border-box;
         width: 100vw;
         padding: 20rpx 3.25vw;
         display: flex;
         align-items: flex-start;
         justify-content: flex-start;
         image {
            width: 200rpx;
            height: auto;
            margin-right: 20rpx;
            flex-shrink: 0;
         }
         .text {
            flex: 1;
            .title {
               width: inherit;
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
               font-size: 35rpx;
               font-weight: 500;
            }
            .summary {
               width: inherit;
               display: -webkit-box;
               text-overflow: ellipsis;
               -webkit-box-orient: vertical;
               -webkit-line-clamp: 2;
               font-size: 25rpx;
               opacity: 0.6;
               height: 2em;
            }
         }
      }
      .line {
         width: 100%;
         border-top: 1px solid rgba($color: #000000, $alpha: 0.15);
         &:last-of-type {
            display: none;
         }
      }
   }
}
</style>
