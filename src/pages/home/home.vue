<template>
   <view class="home">
      <v-nav-bar></v-nav-bar>

      <u-swiper class="banner" :list="bannerList"></u-swiper>

      <!-- 快捷入口 -->
      <synthesis-list></synthesis-list>

      <!-- 报考流程 -->
      <view class="process">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">报考流程</text>
            </view>
         </view>
         <process-list></process-list>
      </view>

      <!-- 最新咨询 -->
      <view class="news">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">最新资讯</text>
            </view>
            <view class="right" @click="mix_jumpUrl('/pages/home/newsList')">
               <text>更多资讯</text>
               <u-icon name="arrow-right"></u-icon>
            </view>
         </view>
         <view class="content" @click="mix_jumpUrl('/pages/home/News', { id: news.newsId })">
            <view class="left">
               <image src="~static/images/homeNews.png" mode="widthFix" />
            </view>
            <view class="right">
               <text class="title">{{ news.newsTitle }}</text>
               <text class="paragraph">{{ news.newsAbstract }}</text>
            </view>
         </view>
      </view>

      <!-- 热门专业 -->
      <view class="specialized">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">热门专业</text>
            </view>
            <view class="right" @click="mix_jumpUrl('/pages/home/Specialized')">
               <text>更多专业</text>
               <u-icon name="arrow-right"></u-icon>
            </view>
         </view>
         <view class="content">
            <specialized-list></specialized-list>
         </view>
      </view>

      <view class="project">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">热门课程</text>
            </view>
            <view class="right" @click="mix_jumpUrl('/pages/project/project')">
               <text>更多课程</text>
               <u-icon name="arrow-right"></u-icon>
            </view>
         </view>
         <project-list></project-list>
      </view>
   </view>
</template>

<script>
import SynthesisList from "@/pages/home/components/home/SynthesisList.vue";
import ProcessList from "@/pages/home/components/home/ProcessList.vue";
import SpecializedList from "@/pages/home/components/home/SpecializedList.vue";
import ProjectList from "@/pages/home/components/home/ProjectList.vue";
import vNavBar from "@/pages/home/components/NavBar.vue";
import news from "@/static/json/news.json";
import { mapState } from "vuex";

export default {
   components: {
      SynthesisList,
      SpecializedList,
      ProcessList,
      ProjectList,
      vNavBar,
   },
   data() {
      return {
         footerIndex: 0,
         bannerList: [require("@/static/images/HomeBanner1.png"), require("@/static/images/HomeBanner2.png"), require("@/static/images/HomeBanner3.png")],
         news: {
            title: "2021最新知识点",
            value: "会计学专业培养具有良好思想道德品质，进一步系统地掌握本科水平的会计...",
         },
         newsList: [],
      };
   },
   created() {
      this.getNews();
   },
   methods: {
      async getNews() {
         this.news = news[0];
         // const { code, data } = await getNewsAPI();
         // if (code === 200) {
         //    this.news = data[0];
         // }
      },
   },
};
</script>

<style lang="scss" scoped>
.home {
   overflow: hidden;
}
.banner {
   display: block;
   width: 90vw;
   margin: 84px auto 20rpx;
}

.columnTitle {
   width: 90vw;
   height: 36rpx;
   margin: 50rpx auto 30rpx;
   display: flex;
   align-items: center;
   justify-content: space-between;

   .left {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .leftIcon {
         display: block;
         width: 7.5rpx;
         height: 45rpx;
         background-color: #10cea2;
         margin-right: 10rpx;
      }
      .text {
         font-size: 40rpx;
         font-weight: 500;
      }
   }

   .right {
      font-size: 25rpx;
      color: rgba(0, 0, 0, 0.7);
      padding: 5rpx 15rpx;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 25rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      opacity: 0.5;
   }
}

.news {
   width: 90vw;
   margin: auto;

   .content {
      width: 100%;
      margin: auto;
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      .left {
         flex-shrink: 0;
         width: 200rpx;
         margin-right: 30rpx;
         display: flex;
         align-items: center;
         justify-content: center;
         image {
            width: 100%;
         }
      }
      .right {
         flex: 1;
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         text {
            display: block;
         }

         .title {
            font-size: 35rpx;
            font-weight: 500;
            margin-bottom: 5rpx;
         }
         .paragraph {
            font-size: 26rpx;
            opacity: 0.5;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
         }

         .goAll {
            color: #10cea2;
            font-size: 26rpx;
            text-align: right;
         }
      }
   }
}

.specialized {
   width: 90vw;
   margin: auto;
   .con {
      .van-cell--borderless {
         image {
            width: 18vw;
            margin-right: 2vw;
         }
      }
      .van-cell__title {
         font-size: 1.1rem;
         font-weight: 500;
      }

      .rightIcon {
         width: 4rem;
         transform: translateY(75%);
      }
   }
}

.project {
   width: 90vw;
   margin: auto;
}
</style>
