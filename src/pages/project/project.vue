<template>
   <view class="project">
      <c-tabs-group class="tabs" v-model="tabIndex" :list="['所有课程', '我的课程']"></c-tabs-group>
      <swiper class="tabsContent" :current="tabIndex" @change="swiperChange">
         <swiper-item>
            <project-card v-for="(item, index) in allProjectList" :key="index" :data="item" text="点击试看" @click.native="mix_jumpUrl('/pages/project/ProjectContent', item, true)"></project-card>
         </swiper-item>
         <swiper-item>
            <view class="emptyState" v-if="myProjectList.length === 0">
               <image src="~static/images/emptyImg.png" mode="widthFix" />
            </view>
            <view v-else>
               <project-card v-for="(item, index) in myProjectList" :key="index" :data="item" text="立即观看" @click.native="mix_jumpUrl('/pages/project/ProjectContent', item, true)"></project-card>
            </view>
         </swiper-item>
      </swiper>
   </view>
</template>

<script>
import cTabsGroup from "@/components/customize/c-tabs-group.vue";
import projectCard from "./components/projectIndex/projectCard.vue";
import { postCourseListAPI } from "@/servers/ServersCommon";
export default {
   components: {
      cTabsGroup,
      projectCard,
   },
   data() {
      return {
         tabIndex: 0,
         active: 0,
         footerIndex: 1,
         allProjectList: [],
         myProjectList: [],
      };
   },
   created() {
      this.postCourseList();
   },
   methods: {
      async postCourseList() {
         const { code, data } = await postCourseListAPI();
         if (code === 200) {
            this.allProjectList = data;
         }
      },
      swiperChange({ detail: { current } }) {
         this.tabIndex = current;
      },
   },
};
</script>

<style lang="scss" scoped>
.navBarLeft {
   text-indent: 1em;
}
.searchBar {
   flex: 1;
}
.project {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-flow: column nowrap;
   align-items: inherit;
   justify-content: flex-start;
   .tabs {
      flex-shrink: 0;
   }
   .tabsContent {
      flex: 1;
      swiper-item {
         width: 100%;
         height: 100%;
         display: flex;
         flex-flow: column nowrap;
         align-items: center;
         justify-content: flex-start;
         overflow: auto;
      }
   }
}
.emptyState {
   width: 100vw;
   height: 100%;
   position: relative;
   image {
      display: block;
      width: 460rpx;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 100%);
   }
}
</style>
