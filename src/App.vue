<script>
import { getUserInfoAPI } from "@/servers/ServersCommon";
import { mapMutations } from "vuex";
import store from "./store";

export default {
   onLaunch: function () {
      const { state } = store;
      if (!state.token) {
         uni.navigateTo({ url: "/pages/common/Login" });
      }
   },
   onShow: function () {},
   onHide: function () {},
   methods: {
      ...mapMutations(["setUserInfo"]),
   },
};
</script>

<style lang="scss">
// 引入uview样式
@import "uview-ui/index.scss";

.gradientFont /* 渐变文字 */ {
   color: transparent;
   background-clip: text;
   background-image: linear-gradient(to bottom, #00c0db 0%, #00cda2 100%);
}
// 插图
.inset {
   display: block;
   width: 90vw;
   margin: 20rpx auto;
   border-radius: 15rpx;
   overflow: hidden;
   box-shadow: 0 5rpx 10rpx 3rpx rgba($color: #000000, $alpha: 0.1);
}
</style>
