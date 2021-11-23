<template>
   <view class="main">
      <view class="navbar">
         <view class="top"></view>
         <u-navbar @leftClick="leftClick" bgColor="transparent"></u-navbar>
      </view>

      <view class="banner">
         <image src="~static/images/projectBack.png" mode="windthFix" />
         <text>{{ name }}</text>
      </view>

      <u-tabs :list="tabsList" @click="tabsClick" :is-scroll="false"></u-tabs>
      <view class="tabsContent">
         <info v-if="active === '简介'" />
         <project-menu v-if="active === '目录'" />
      </view>

      <u-back-top :scroll-top="scrollTop" icon="arrow-up"></u-back-top>
   </view>
</template>

<script>
import info from "./projectContent/Info.vue";
import projectMenu from "./projectContent/Menu.vue";
export default {
   components: {
      info,
      projectMenu,
   },
   data() {
      return {
         name: "",
         active: "简介",
         tabsList: [{ name: "简介" }, { name: "目录" }],
         scrollTop: 100,
      };
   },
   onLoad(info) {
      this.name = info.name;
   },
   onPageScroll(e) {
      this.scrollTop = e.scrollTop;
   },
   methods: {
      tabsClick(info) {
         this.active = info.name;
      },
      leftClick() {
         uni.navigateBack();
      },
   },
};
</script>

<style lang="scss" scoped>
.main {
   width: 100vw;
   padding-top: 44px;
   .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      z-index: 100;
      .top {
         width: 100vw;
         height: 44px;
         background-color: #fff;
      }
      /deep/.uicon-arrow-left {
         color: #fff !important;
      }
   }
   .banner {
      width: 95vw;
      margin: auto;
      position: relative;
      image {
         display: block;
         width: 95vw;
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
}
</style>
