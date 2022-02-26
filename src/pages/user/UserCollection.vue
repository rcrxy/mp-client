<template>
   <view class="mainBox">
      <c-tabs-group class="tabs" v-model="tabIndex" :list="tabsList"></c-tabs-group>
      <swiper class="tabsContent" :current="tabIndex" @change="swiperChange">
         <swiper-item>
            <project-list></project-list>
         </swiper-item>
         <swiper-item>
            <problem-list></problem-list>
         </swiper-item>
      </swiper>
   </view>
</template>

<script>
import ProjectList from "./components/UserCollection/ProjectList.vue";
import ProblemList from "./components/UserCollection/ProblemList.vue";
import cTabsGroup from "@/components/customize/c-tabs-group.vue";
export default {
   components: {
      ProjectList,
      ProblemList,
      cTabsGroup,
   },
   data() {
      return {
         tabIndex: 0,
         // tabsList: [{ name: "课程" }, { name: "题目" }],
         tabsList: ["课程", "题目"],
      };
   },

   methods: {
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
</style>
