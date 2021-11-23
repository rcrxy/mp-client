<template>
   <view class="main">
      <image class="banner" src="~static/images/specializedBanner.png" mode="widthFix" />
      <u-grid class="grid" :col="3" :border="false">
         <u-grid-item>
            <image src="~static/images/specialized1.png" mode="widthFix" />
            <text class="grid-text">咨询解答</text>
         </u-grid-item>
         <u-grid-item>
            <image src="~static/images/specialized2.png" mode="widthFix" />
            <text class="grid-text">在线报名</text>
         </u-grid-item>
         <u-grid-item>
            <image src="~static/images/specialized3.png" mode="widthFix" />
            <text class="grid-text">招生院校</text>
         </u-grid-item>
      </u-grid>
      <view class="tree">
         <view class="left">
            <view :class="nowIndex === index ? 'active' : ''" v-for="(item, index) in treeSelectOptios" :key="index" @click="leftClick(item, index)">
               <image src="" mode="widthFix" />
               <text>{{ item.title }}</text>
            </view>
         </view>
         <view class="right">
            <view class="right_ul">
               <view class="right_li" v-for="(item, index) in professionalList" :key="index" @click="jumpUrl(item)">
                  <text class="title">{{ item.name }}</text>
                  <text class="label">{{ item.label || item.name }}</text>
               </view>
            </view>
         </view>
      </view>
   </view>
</template>

<script>
import { getProfessionalClassificationAPI } from "@/servers/ServersHome";
import qs from "qs";
export default {
   data() {
      return {
         active: 0,
         nowIndex: 0,
         treeSelectOptios: [],
         professionalList: [],
      };
   },
   onLoad() {},
   created() {
      this.getProfessionalClassification();
   },
   methods: {
      async getProfessionalClassification() {
         let { code, data } = await getProfessionalClassificationAPI();
         if (code === 200) {
            this.treeSelectOptios = data;
            console.log(this.treeSelectOptios);
            this.leftClick(data[0], 0);
         }
      },

      leftClick(info, index) {
         this.nowIndex = index;
         this.professionalList = info.list;
      },

      jumpUrl(info) {
         uni.navigateTo({
            url: `/pages/home/Specialized/ProfessionalDetails?${qs.stringify(info)}`,
         });
      },
   },
};
</script>

<style lang="scss" scoped>
.main {
   height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   .banner {
      width: 100vw;
      vertical-align: top;
      flex-shrink: 0;
   }
   .u-grid {
      width: 90vw;
      margin: 20rpx auto;
      image {
         width: 55rpx;
         vertical-align: top;
         margin-bottom: 10rpx;
      }
   }
   .tree {
      flex: 1;
      width: 95vw;
      height: 55vw;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      justify-content: space-between;
      .left {
         width: 30%;
         height: 100%;
         overflow-y: auto;
         background-color: #f5f5f5;
         > view {
            width: 100%;
            height: 95rpx;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: flex-start;
            image {
               width: 30rpx;
               height: 30rpx;
               margin-right: 15rpx;
            }
            text {
               font-size: 28rpx;
            }
         }
         .active {
            background-color: #fff;
         }
      }
      .right {
         overflow-y: auto;
         width: 70%;
         height: 100%;
         background-color: #fff;
         position: relative;
         .right_ul {
            width: 100%;
            .right_li {
               width: 95%;
               height: 142rpx;
               margin: 7rpx auto;
               box-sizing: border-box;
               display: flex;
               flex-flow: column nowrap;
               align-items: flex-start;
               justify-content: center;
               &:nth-of-type(3n - 2) {
                  background: url(~static/images/TreeSelectContent1.png) no-repeat center center / 100% 100%;
               }
               &:nth-of-type(3n - 1) {
                  background: url(~static/images/TreeSelectContent2.png) no-repeat center center / 100% 100%;
               }
               &:nth-of-type(3n) {
                  background: url(~static/images/TreeSelectContent3.png) no-repeat center center / 100% 100%;
               }
               text {
                  width: calc(80% - 40rpx);
                  text-indent: 40rpx;
                  color: #fff;
                  display: block;
                  margin: 5rpx 0;
                  box-sizing: border-box;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
               }
               .title {
                  font-size: 35rpx;
                  font-weight: 700;
               }
               .label {
                  font-size: 25rpx;
               }
            }
         }
      }
      .right_li_loading {
         width: 95%;
         height: 142rpx;
         margin: 7rpx auto;
         box-sizing: border-box;
         display: flex;
         flex-flow: column nowrap;
         align-items: flex-start;
         justify-content: center;
         border-radius: 15rpx;
         .title_loading {
            width: calc(80% - 40rpx);
            font-size: 35rpx;
            height: 1.25em;
            border-radius: 5rpx;
            color: transparent;
            display: block;
            margin: 5rpx 0 5rpx 40rpx;
         }
         .label_loading {
            width: calc(80% - 40rpx);
            font-size: 25rpx;
            height: 1.25em;
            border-radius: 5rpx;
            margin: 5rpx 0 5rpx 40rpx;
            color: transparent;
            display: block;
         }
      }
      .right_li_loading,
      .title_loading,
      .label_loading {
         overflow: hidden;
         position: relative;
         &::before {
            content: "";
            position: absolute;
            right: 0;
            width: 300%;
            height: 100%;
            background-image: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
            animation: gradient 4s infinite;
         }
      }
      @keyframes gradient {
         0%,
         100% {
            transform: translateX(0);
         }
         50% {
            transform: translateX(66.66%);
         }
      }
   }
}
</style>
