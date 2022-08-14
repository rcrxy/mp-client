<template>
   <view class="main" :style="mainStyle">
      <v-nav-bar class="navBar" ref="navBar"></v-nav-bar>
      <view class="skeleton">
         <u-skeleton rows="3" :loading="loading"></u-skeleton>
      </view>
      <view class="list" v-if="options.length >= 1 && !loading">
         <view class="li" v-for="item in options" :key="item.id" @click="mix_jumpUrl('/pages/practice/info', item)">
            <view class="info">
               <text class="title">{{ item.className }}</text>
            </view>
            <view class="button">
               <image src="~static/images/practiceIndexButton.png" mode="widthFix" />
               <text>课程精讲班</text>
            </view>
         </view>
      </view>
      <view class="nullHint" v-else-if="options.length == 0 && !loading">
         <image src="~static/images/emptyImg.png" mode="widthFix" />
         <text>尚未找到符合的课程~</text>
      </view>
   </view>
</template>

<script>
import bus from "@/uitls/bus.js";
import vNavBar from "./components/NavBar.vue";
import { postCourseListAPI } from "@/servers/ServersPractice";
export default {
   components: {
      vNavBar,
   },
   data() {
      return {
         options: [],
         loading: false,
         finished: true,
         mainStyle: "",
         form: {},
      };
   },
   // 下拉刷新重载数据
   async onPullDownRefresh() {
      await this.postCourseList(this.form);
      uni.stopPullDownRefresh();
   },
   created() {
      this.postCourseList();
      bus.$on("searchCourse", val => {
         this.form = val;
         this.postCourseList(val);
      });
   },

   mounted() {
      this.setPadding();
   },
   beforeDestroy() {
      bus.$off("searchCourse");
   },
   methods: {
      async postCourseList(form) {
         this.loading = true;
         const { code, data } = await postCourseListAPI(form);
         if (code === 200) {
            this.options = data.map((item, index) => ({ ...item, id: index }));
         }
         this.loading = false;
      },
      setPadding() {
         const that = this;
         const query = uni.createSelectorQuery().in(this);
         query
            .select(".navBar")
            .boundingClientRect(data => {
               that.mainStyle = `padding-top: ${data.height}px`;
            })
            .exec();
      },
   },
};
</script>

<style lang="scss" scoped>
.main {
   width: 100vw;
   margin: auto;
   // #ifdef H5
   padding-top: 84px;
   // #endif
   .skeleton {
      width: 92vw;
      margin: auto;
   }
   .list {
      width: 92vw;
      margin: auto;
      padding-bottom: 20rpx;
      .li {
         margin: 20rpx auto;
         padding: 20rpx 25rpx;
         border-radius: 15rpx;
         box-sizing: border-box;
         box-shadow: 0 0 10rpx 1rpx rgba($color: #000000, $alpha: 0.1);
         display: flex;
         flex-flow: column nowrap;
         align-items: flex-start;
         justify-content: flex-start;

         .info {
            margin: 0 0 20rpx 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .title {
               font-size: 38rpx;
               font-weight: 500;
               text-align: left;
            }
            .tag {
               padding: 1px 5px;
               border-radius: 1em;
               margin-right: 10rpx;
               align-self: flex-end;
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
   .nullHint {
      width: 100vw;
      // #ifdef H5
      height: calc(100vh - 134px);
      // #endif
      // #ifndef H5
      height: calc(100vh - var(--status-bar-height));
      // #endif
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column nowrap;
      image {
         display: block;
         width: 460rpx;
      }
      text {
         display: block;
         margin: 50rpx auto;
         text-align: center;
         font-size: 30rpx;
      }
   }
}
</style>
