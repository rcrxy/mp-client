<template>
   <view class="main">
      <text class="topTitle gradientFont">{{ nowNews.newsTitle }}</text>
      <view class="content">
         <text>
            {{ nowNews.newsContent }}
         </text>
      </view>
      <view class="button">
         <navigator class="gradientFont left" @click="prev" :style="nowIndex === 0 ? 'opacity: 0.5' : ''">上一篇</navigator>
         <navigator class="gradientFont right" @click="next" :style="nowIndex === maxLength - 1 ? 'opacity: 0.5' : ''">下一篇</navigator>
      </view>

      <image class="inset" src="~static/images/insetNews.png" mode="widthFix" />

      <!-- 分享 -->
      <uni-popup ref="popup" type="bottom">
         <uni-popup-share></uni-popup-share>
      </uni-popup>
   </view>
</template>

<script>
import { getNewsAPI } from "@/servers/ServersHome";
import uniPopupShare from "@/components/uni-popup-share.vue";
import qs from "qs";
export default {
   components: {
      uniPopupShare,
   },
   data() {
      return {
         nowNews: {},
         nowIndex: 0,
         maxLength: 1,
      };
   },
   async onLoad({ id }) {
      const newsList = await this.getNews();
      const nowIndex = newsList.findIndex(item => item.newsId == id);
      this.nowNews = newsList[nowIndex];
      this.nowIndex = nowIndex;
      this.maxLength = newsList.length;
   },
   /**分享按钮 */
   onNavigationBarButtonTap() {
      this.$refs.popup.open();
   },
   methods: {
      async getNews() {
         const { code, data } = await getNewsAPI();
         if (code === 200) {
            return data;
         }
      },
      prev() {
         if (this.nowIndex === 0) {
            uni.showToast({ title: "已经是第一篇了", icon: "none" });
         } else {
            uni.redirectTo({ url: "/pages/home/News?" + qs.stringify({ id: this.nowIndex - 1 }) });
         }
      },
      next() {
         if (this.nowIndex === this.maxLength - 1) {
            uni.showToast({ title: "已经是最后一篇了", icon: "none" });
         } else {
            uni.redirectTo({ url: "/pages/home/News?" + qs.stringify({ id: this.nowIndex + 1 }) });
         }
      },
   },
};
</script>
<style lang="scss" scoped>
.topTitle {
   display: block;
   font-size: 40rpx;
   margin: 0.5em auto;
   text-align: center;
}
.content {
   text {
      display: block;
      width: 90vw;
      margin: 1em auto;
      text-indent: 2em;
      font-size: 30rpx;
   }
}
.button {
   width: 90vw;
   margin: 1rem auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   navigator {
      padding: 0 1rem;
   }
}
</style>
