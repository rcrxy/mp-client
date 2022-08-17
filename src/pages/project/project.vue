<template>
   <view class="project">
      <c-tabs-group class="tabs" v-model="tabIndex" :list="['所有课程', '我的课程']" @title-click="titleClick"></c-tabs-group>
      <view class="list">
         <empty v-if="list.length === 0"></empty>
         <view class="cardUl" v-else>
            <project-card v-for="(item, index) in list" :key="index" :data="item" text="查看详情" @click.native="mix_jumpUrl('/pages/project/ProjectContent', { ...item, tabName: activeTab })"></project-card>
         </view>
      </view>
   </view>
</template>

<script>
import cTabsGroup from "@/components/customize/c-tabs-group.vue";
import projectCard from "./components/projectIndex/projectCard.vue";
import empty from "@/components/emptyState.vue";
import { postCourseListAPI } from "@/servers/ServersPractice";
import { getUsersProject_API } from "@/servers/ServersProject";
export default {
   components: {
      empty,
      cTabsGroup,
      projectCard,
   },
   data() {
      return {
         tabIndex: 0,
         active: 0,
         allProjectList: [],
         myProjectList: [],
         list: [],
      };
   },
   onPullDownRefresh() {
      this.tabIndex === 0 ? this.postCourseList() : this.getUsersProject();

      uni.stopPullDownRefresh();
   },
   async created() {
      await this.postCourseList();
      await this.getUsersProject();
      this.list = this.tabIndex === 0 ? this.allProjectList : this.myProjectList;
   },
   methods: {
      swiperChange({ detail: { current } }) {
         this.tabIndex = current;
      },

      // 获取所有课程列表
      async postCourseList() {
         const { code, data } = await postCourseListAPI();
         if (code === 200) {
            this.allProjectList = data;
         }
      },

      // 获取用户课程列表
      async getUsersProject() {
         const { code, data } = await getUsersProject_API();
         if (code === 200) {
            this.myProjectList = data.list.map(item => {
               return {
                  ...item,
                  className: item.project_name,
               };
            });
         }
      },

      titleClick({ index }) {
         this.list = index === 0 ? this.allProjectList : this.myProjectList;
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

   .tabs {
      position: fixed;
      top: 0;
      width: 100vw;
      z-index: 10;
      background: #fff;
      // #ifdef H5
      top: 44px;
      // #endif
   }

   .list {
      padding-top: 37px;

      .cardUl {
         display: flex;
         flex-flow: column nowrap;
         align-items: center;
         justify-content: flex-start;
      }
   }
}

.emptyState {
   width: 100vw;
   height: 100vh;
   position: fixed;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   justify-content: center;
   image {
      display: block;
      width: 460rpx;
      margin-bottom: 20rpx;
   }
}
</style>
