<template>
   <view>
      <u-navbar :is-back="false" :border="false" :safeAreaInsetTop="true" fixed>
         <template #left>
            <view class="status_bar">
               <text class="name">题库</text>
               <u-search v-model="searchValue" :placeholder="placeholder" :clearabled="true" :show-action="false"></u-search>
            </view>
         </template>
      </u-navbar>
   </view>
</template>

<script>
import bus from "@/uitls/bus";
export default {
   name: "NavBar",
   data() {
      return {
         searchValue: "",
         placeholder: "大家都在搜: 成人高考",
      };
   },
   watch: {
      searchValue(val) {
         bus.$emit("practiceSearch", val);
      },
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
.status_bar {
   width: 90vw;
   margin: auto;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   .left {
      display: flex;
      .name {
         width: 3em;
         display: flex;
         align-items: center;
         justify-content: flex-start;
         max-height: 3em;
         font-style: normal;
         word-break: keep-all;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         -o-text-overflow: ellipsis;
         -icab-text-overflow: ellipsis;
         -khtml-text-overflow: ellipsis;
         -moz-text-overflow: ellipsis;
         -webkit-text-overflow: ellipsis;
      }
   }

   .u-search {
      margin-left: 20rpx !important;
   }
}
.popup {
   .scrollViewParent {
      width: 100%;
      height: 100%;
      scroll-view {
         width: 100%;
         height: calc(100% - 44px);
         background-color: burlywood;
      }
   }
}
</style>
