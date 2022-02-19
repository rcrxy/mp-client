<template>
   <view class="main">
      <v-nav-bar></v-nav-bar>
      <view class="list" v-if="options.length >= 1">
         <view class="li" v-for="item in options" :key="item.id" @click="mix_jumpUrl('/pages/practice/info', item)">
            <view class="info">
               <text class="title">{{ item.className }}</text>
               <view class="tag" style="background-color: #709eff">
                  <text>{{ item.firstType }}</text>
               </view>
               <view v-if="item.secondType" class="tag" style="background-color: #eb5cf4">
                  <text>{{ item.secondType }}</text>
               </view>
            </view>
            <view class="button">
               <image src="~static/images/practiceIndexButton.png" mode="widthFix" />
               <text>课程精讲班</text>
            </view>
         </view>
      </view>
      <view class="nullHint" v-else>
         <view>
            <image src="~static/images/emptyImg.png" mode="widthFix" />
            <text>尚未找到符合的课程~</text>
         </view>
      </view>
   </view>
</template>

<script>
import bus from "@/uitls/bus";
import vNavBar from "./components/NavBar.vue";
import { postCourseListAPI } from "@/servers/ServersCommon";
export default {
   components: {
      vNavBar,
   },
   data() {
      return {
         options: [],
         allData: [],
         loading: false,
         finished: true,
         loading: false,
      };
   },
   created() {
      this.postCourseList();
      bus.$on("practiceSearch", val => {
         this.searchResult(val);
      });
   },
   // 下拉刷新重载数据
   async onPullDownRefresh() {
      await this.postCourseList();
      uni.stopPullDownRefresh();
   },
   methods: {
      async postCourseList() {
         const { code, data } = await postCourseListAPI();
         if (code === 200) {
            this.allData = data;
            this.allData.forEach((item, index) => {
               item.id = index;
            });
            this.options = this.allData;
         }
         if (this.options === 0) this.postCourseList();
      },
      // 返回搜索结果
      searchResult(val) {
         if (!val) {
            this.options = this.allData;
         } else {
            let newList = this.allData.filter(item => {
               const { className, firstType, secondType } = item;
               return className.indexOf(val) !== -1 || firstType.indexOf(val) !== -1 || secondType.indexOf(val) !== -1;
            });
            this.$nextTick();
            this.options = newList ? newList : [];
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.main {
   width: 92vw;
   margin: auto;
   padding-top: 88px;
   .list {
      width: 100%;
      .li {
         margin: 20rpx auto;
         padding: 20rpx 15rpx;
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
      position: relative;
      > view {
         position: absolute;
         left: 50%;
         transform: translate(-50%, 30px);
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
}
</style>
