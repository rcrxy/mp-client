<template>
   <view class="tabMain">
      <u-tabbar :value="tabsName" :placeholder="place" :safeAreaInsetBottom="false">
         <u-tabbar-item v-for="(item, index) in tabbarList" :key="index" :text="item.text" :icon="item.icon" @click="tabsClick(item)"></u-tabbar-item>
      </u-tabbar>

      <u-modal :show="showModal" :content="'拨打电话: ' + phone" showCancelButton @cancel="showModal = false" @confirm="confirm"></u-modal>
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
            { text: "在线答疑", icon: require("@/static/images/customizeTabs1.png"), url: "/pages/common/CustomerService" },
            { text: "网上报名", icon: require("@/static/images/customizeTabs2.png"), url: "/pages/home/process/Entrance" },
            { text: "电话咨询", icon: require("@/static/images/customizeTabs3.png"), url: "/pages/common/CustomerService" },
         ],
         showModal: false,
         phone: "025-86595985",
      };
   },
   methods: {
      tabsClick(item) {
         const { text, url } = item;
         if (text === "电话咨询") {
            this.showModal = true;
         } else {
            this.mix_jumpUrl(url);
         }
      },
      confirm() {
         uni.makePhoneCall({ phoneNumber: this.phone });
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
