<template>
   <view class="main">
      <text class="topTitle gradientFont">成考资讯</text>
      <view class="content">
         <text>2019年江苏成人高考成绩查询时间：11月25日</text>
         <text>2019年江苏成人高考成绩查询时间11月25日。考生可在11月25日18:00后，登陆江苏省教育考试院门户网站(网址：http://www.jseea.cn/)查询个人成绩。</text>
         <text>如考生对本人成人高考成绩有疑问，可于11月26日至27日携带本人身份证和准考证，向报名信息确认地招(考)办提交复核成绩的书面申请。</text>
      </view>
      <view class="button">
         <navigator class="gradientFont left" url="" redirect>上一篇</navigator>
         <navigator class="gradientFont right" url="" redirect>下一篇</navigator>
      </view>

      <image class="inset" src="~static/images/insetNews.png" mode="widthFix" />

      <!-- 分享 -->
      <uni-popup ref="popup" type="bottom">
         <uni-popup-share></uni-popup-share>
      </uni-popup>
   </view>
</template>

<script>
import uniPopupShare from "@/components/uni-popup-share.vue";
export default {
   components: {
      uniPopupShare,
   },
   data() {
      return {};
   },
   created() {},
   methods: {},
   /**分享按钮 */
   onNavigationBarButtonTap() {
      this.$refs.popup.open();
   },
};
</script>
<style lang="scss" scoped>
.topTitle {
   display: block;
   font-size: 45rpx;
   margin: 0.5em auto;
   text-align: center;
}
.content {
   text {
      display: block;
      width: 90vw;
      margin: 1em auto;
      text-indent: 2em;
   }
}
.button {
   width: 90vw;
   margin: 1rem auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   navigator {
      padding: 0 1rem;
   }
}
</style>
