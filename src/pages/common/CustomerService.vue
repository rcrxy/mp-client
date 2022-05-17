<template>
   <view class="mainBox">
      <web-view class="webBox" src="/static/html/index.html" :update-title="false"></web-view>
   </view>
</template>

<script>
var wv; //计划创建的webview
export default {
   data() {
      return {};
   },
   onLoad(info) {
      if (Boolean(info)) {
         uni.setNavigationBarTitle({ title: info.title });
      }
   },
   onReady() {
      // // #ifdef APP-PLUS
      // var currentWebview = this.$scope.$getAppWebview();
      // // setTimeout(function () {
      // //    wv = currentWebview.children()[0];
      // //    wv.setStyle({ top: 0, height: "100vh" });
      // // }, 1000);
      // wv = currentWebview.children()[0];
      // wv.setStyle({ top: 34, height: "100vh" });
      // console.log(wv);
      // // #endif
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: 100vh;
   overflow: hidden;
}
.webBox {
   width: 100vw;
   height: calc(100vh + 44px);
}
.navbar {
   z-index: 1024;
   background-color: #fff;
}
</style>
