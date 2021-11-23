<template>
   <view>
      <u-navbar :is-back="false" :border="false" :safeAreaInsetTop="true" fixed>
         <template #left>
            <view class="status_bar">
               <!-- <view class="left" @click="showPopup = true">
               <u-icon name="map" color="#000000" size="35"></u-icon>
               <text class="name">{{ province }}</text>
            </view> -->
               <u-search @search="search" :placeholder="placeholder" v-model="searchValue" :clearabled="true" :show-action="false"></u-search>
               <u-icon name="kefu-ermai" color="#000000" size="20"></u-icon>
            </view>
         </template>
      </u-navbar>

      <!-- <view class="popup"> -->
      <!-- <u-popup v-model="showPopup" mode="bottom" :closeable="true" close-icon-size="40" z-index="">
         <text class="name">{{ province }}</text>
      </u-popup> -->
      <!-- </view> -->
   </view>
</template>

<script>
import provinceOptions from "@static/json/province.json";
export default {
   name: "NavBar",
   data() {
      return {
         province: this.$store.state.province,
         provinceOptions,
         searchValue: "",
         placeholder: "大家都在搜：成人高考",
         showPopup: false,
      };
   },
   methods: {
      /**打开左侧抽屉 */
      clickLeft() {
         this.$refs.drawerLeft.open();
      },
      /**选择省份 */
      setProvince(val) {
         this.province = val;
         this.$refs.drawerLeft.close();
      },
      clickRight() {},
      search() {
         console.log(this.searchValue);
      },
      jumpUrl(url) {
         console.log(url);
      },
   },
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
      margin: 0 10rpx !important;
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
