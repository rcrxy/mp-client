<template>
   <view class="mainBox">
      <view class="navbar">
         <view style="width: 100vw; height: 44px; background-color: #ffffff"></view>
         <view class="navbarContent">
            <view class="backButton" @click="leftClick">
               <u-icon name="arrow-left" size="25" :color="backButtonColor"></u-icon>
            </view>
         </view>
      </view>

      <view class="banner" :style="`height:${bannerHeight}px`">
         <image src="~static/images/projectBack.png" mode="windthFix" />
         <text>{{ info.name }}</text>
      </view>

      <view class="tabsBox">
         <view class="info">
            <text :class="scrollTop >= 180 ? 'title titleActive' : 'title'">{{ info.name }}</text>
            <view>
               <text>课时: {{ info.time || "1" }} 课时</text>
               <text>老师: {{ info.teacher || "老师" }}</text>
               <text>时长: {{ info.timeLength || "120" }}分钟</text>
            </view>
         </view>
         <c-tabs-group class="tabs" v-model="tabIndex" :list="['简介', '目录']"></c-tabs-group>
         <swiper class="tabsContent" :current="tabIndex" @change="swiperChange">
            <swiper-item :style="scrollTop >= 195 ? 'overflow: auto' : ''"><info /></swiper-item>
            <swiper-item :style="scrollTop >= 195 ? 'overflow: auto' : ''"><project-menu :info="info" /></swiper-item>
         </swiper>
      </view>

      <u-back-top :scroll-top="scrollTop" icon="arrow-up"></u-back-top>

      <view class="bottomCell">
         <view class="icon">
            <u-icon name="kefu-ermai" color="#000000" size="30"></u-icon>
         </view>
         <u-button type="primary" text="立即购买" color="#00cba1"></u-button>
      </view>
   </view>
</template>

<script>
import info from "./components/projectContent/Info.vue";
import projectMenu from "./components/projectContent/Menu.vue";
import cTabsGroup from "@/components/customize/c-tabs-group.vue";
export default {
   components: {
      info,
      projectMenu,
      cTabsGroup,
   },
   data() {
      return {
         info: {},
         tabIndex: 0,
         tabsList: [{ name: "简介" }, { name: "目录" }],
         scrollTop: 0,
         backButtonColor: "#FFFFFF",
         bannerHeight: 250,
      };
   },
   onLoad(info) {
      this.info = info;
   },
   onPageScroll({ scrollTop }) {
      this.scrollTop = scrollTop;
      this.bannerHeight = 250 - scrollTop;
      if (scrollTop >= 125) {
         this.backButtonColor = "#000000";
      } else {
         this.backButtonColor = "#FFFFFF";
      }
   },
   methods: {
      tabsClick(info) {
         this.active = info.name;
      },
      leftClick() {
         uni.navigateBack();
      },
      swiperChange({ detail: { current } }) {
         this.tabIndex = current;
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: 100vh;
   padding-top: 44px;
   box-sizing: border-box;
   .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      z-index: 1024;
      .navbarContent {
         padding: 7px 3px;
         height: 44px;
         box-sizing: border-box;
         display: flex;
         align-items: center;
         justify-content: flex-start;
         .backButton {
            .u-icon {
               transition: all 0.3s;
            }
         }
      }
   }
   .banner {
      width: 100vw;
      position: relative;
      overflow: hidden;
      transform-origin: center center;
      image {
         width: 100vw;
         display: inline-block;
         vertical-align: top;
      }
      text {
         position: absolute;
         top: 50%;
         left: 0;
         transform: translateY(-50%);
         color: #fff;
         font-size: 80rpx;
         text-indent: 1em;
      }
   }
   .tabsBox {
      width: 100vw;
      height: calc(100vh - 44px);
      margin: auto;
      overflow: hidden;
      border-top-left-radius: 15rpx;
      border-top-right-radius: 15rpx;
      position: absolute;
      top: 244px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      .info {
         width: 100%;
         padding: 7px 30rpx 0;
         box-sizing: border-box;
         background-color: #fff;
         position: relative;
         flex-shrink: 0;
         .title {
            // width: 100%;
            position: relative;
            left: 0;
            transform: translate(0%);
            font-size: 40rpx;
            transition: all 0.3s;
            display: inline-block;
         }
         .titleActive {
            left: 50%;
            transform: translate(-50%);
         }
         view {
            width: 100%;
            margin: 20rpx 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text {
               display: block;
               width: calc(100% / 3);
               font-size: 25rpx;
               color: gray;
               &:nth-of-type(1) {
                  text-align: left;
               }
               &:nth-of-type(2) {
                  text-align: center;
               }
               &:nth-of-type(3) {
                  text-align: right;
               }
            }
         }
      }
      .tabs {
         flex-shrink: 0;
      }
      .tabsContent {
         width: 100%;
         flex: 1;
         swiper-item {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: flex-start;
         }
      }
   }
}
.bottomCell {
   width: 100vw;
   height: 60px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   background-color: #fff;
   position: fixed;
   left: 0;
   bottom: 0;
   box-sizing: border-box;
   padding: 0 2.5vw 2.5vw 2.5vw;
   border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
   .icon {
      width: 40%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .u-button {
      flex: 1;
      height: 80%;
   }
}
</style>
