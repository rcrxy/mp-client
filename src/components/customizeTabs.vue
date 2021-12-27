<template>
   <view class="tabMain">
      <u-tabbar :value="tabsName" :placeholder="place" :safeAreaInsetBottom="false">
         <u-tabbar-item v-for="(item, index) in tabbarList" :key="index" :text="item.text" :icon="item.icon" @click="tabsClick"></u-tabbar-item>
      </u-tabbar>
   </view>
</template>

<script>
export default {
   props: ["placeholder"],
   computed: {
      place: {
         get() {
            return this.placeholder || true;
         },
      },
   },
   data() {
      return {
         tabsName: "",
         tabbarList: [
            { text: "在线答疑", icon: require("@/static/images/customizeTabs1.png"), url: "" },
            { text: "网上报名", icon: require("@/static/images/customizeTabs2.png"), url: "" },
            { text: "电话咨询", icon: require("@/static/images/customizeTabs3.png"), url: "" },
         ],
      };
   },
   methods: {
      tabsClick(index) {
         console.log("index", index);
      },
   },
};
</script>

<style lang="scss" scoped>
.tabMain {
   width: 100%;
   height: auto;
}
</style>
