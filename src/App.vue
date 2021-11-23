<script>
import { getUserInfoAPI } from "@/servers/ServersCommon";
import { mapMutations } from "vuex";
export default {
   onLaunch: function () {},
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

/**引入vant样式 */
@import "vant/lib/index.css";

.gradientFont /* 渐变文字 */ {
   color: transparent;
   background-clip: text;
   background-image: linear-gradient(to bottom, #00c0db 0%, #00cda2 100%);
}
</style>
