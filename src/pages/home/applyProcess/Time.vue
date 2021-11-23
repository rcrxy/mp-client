<template>
   <view>
      <view class="title">
         <text class="gradientFont">{{ nowYear }}成人高考日程安排</text>
      </view>
      <view class="content">
         <view class="contentTime">
            <view class="contentTitle">
               <text>一、报名时间</text>
            </view>
            <view class="contentText">
               <text>
                  成考招生中，点击进入：
                  <navigator url="/pages/home/applyProcess/Entrance" redirect hover-class="className">【报名入口】</navigator>
               </text>
            </view>
         </view>
         <view class="contentApply">
            <view class="contentTitle">
               <text>二、正式报名</text>
            </view>
            <view class="contentText">
               <text>
                  8月底9月初：登录考试院官网，查看考试院关于
                  <text>{{ nowYear }}</text>
                  年成人高考额官方信息，在规定时间内完成晚上预报名 （预报名具体时间参照考试院通知）。
               </text>
            </view>
         </view>
      </view>

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
      return {
         barTitle: "报名时间",
         nowYear: "",
      };
   },
   created() {
      this.setNowYear();
   },
   methods: {
      setNowYear() {
         let time = new Date();
         this.nowYear = time.getFullYear();
      },
   },
   /**分享按钮 */
   onNavigationBarButtonTap() {
      this.$refs.popup.open();
   },
};
</script>

<style lang="scss" scoped>
.title {
   text-align: center;
   margin: 30rpx 0;
   text {
      font-size: 42rpx;
   }
}

.content {
   width: 90vw;
   margin: auto;
   .contentTitle {
      display: inline-block;
      font-size: 30rpx;
      color: #fff;
      background-image: linear-gradient(to bottom, #00c0db 0%, #00cda2 100%);
      padding: 2rpx 25rpx;
      border-radius: 30rpx;
   }
   .contentText {
      font-size: 28rpx;
      background-color: rgba($color: #000000, $alpha: 0.05);
      padding: 0.75em 1em;
      margin: 20rpx 0 50rpx 0;
      navigator {
         display: inline-block;
         color: #003abf;
      }
   }
}

.van-tabbar {
   height: 4rem;
}
</style>
