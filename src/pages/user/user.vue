<template>
   <view ref="my" class="my">
      <view id="myCon" ref="myCon">
         <view class="userInfo">
            <view class="avatar" @click="mix_jumpUrl('/pages/user/Information')">
               <image src="https://img01.yzcdn.cn/vant/cat.jpeg" mode="aspectFill" />
               <text class="text name">{{ userInfo.userName }}</text>
               <text class="text sign">{{ userInfo.sign === "null" ? "还没设置签名~" : userInfo.sign }}</text>
            </view>
         </view>
         <u-cell-group :border="false">
            <u-cell :border="false" isLink title="通知消息" icon="bell" @click="mix_jumpUrl('/pages/user/Notice')"></u-cell>
            <u-cell :border="false" isLink title="我的订单" icon="bag" @click="mix_jumpUrl('/pages/user/UserOrder')"></u-cell>
            <u-cell :border="false" isLink title="我的收藏" icon="star" @click="mix_jumpUrl('/pages/user/UserCollection')"></u-cell>
         </u-cell-group>
         <u-cell-group :border="false">
            <u-cell :border="false" isLink title="联系电话" icon="phone" @click="showModal = true"></u-cell>
         </u-cell-group>
         <u-cell-group :border="false">
            <u-cell :border="false" isLink title="软件设置" icon="setting" @click="mix_jumpUrl('/pages/user/Setting')"></u-cell>
         </u-cell-group>
      </view>
      <!-- notice -->
      <!-- 拨打电话 -->
      <u-modal :show="showModal" :content="'拨打电话: ' + phone" showCancelButton @cancel="showModal = false" @confirm="confirm"></u-modal>
   </view>
</template>

<script>
import { getUserInfoAPI } from "@/servers/ServersCommon";
import { mapMutations } from "vuex";
export default {
   data() {
      return {
         footerIndex: 3,
         userInfo: {},
         phone: "025-86595985",
         isIndex: true,
         showModal: false,
      };
   },
   onShow() {
      this.getUserInfo();
   },
   methods: {
      ...mapMutations(["setUserInfo"]),
      async getUserInfo() {
         let { code, data } = await getUserInfoAPI();
         if (code === 200) {
            this.userInfo = data;
            this.setUserInfo(data);
         }
      },
      confirm() {
         uni.makePhoneCall({ phoneNumber: this.phone });
      },
   },
};
</script>

<style lang="scss" scoped>
.my {
   height: 100vh;
   background-color: #f0f0f0;
}
#myCon {
   width: 100vw;
   flex-shrink: 0;

   &::-webkit-scrollbar {
      display: none;
   }
   .userInfo {
      width: 750rpx;
      background-image: url(../../static/images/myBack.png);
      background-position: center center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .avatar {
         width: 750rpx;
         height: 600rpx;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         image {
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
            margin-bottom: 30rpx;
         }
         .text {
            color: #fff;
            line-height: 45rpx;
            text-align: center;
            font-size: 30rpx;
            margin: 5rpx 0;
         }
      }
   }
}
.u-cell-group {
   margin: 15rpx 0;
   background: #fff;
}
</style>
