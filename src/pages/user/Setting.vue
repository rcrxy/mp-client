<template>
   <view class="setting">
      <view id="settingCon">
         <!-- <u-cell :border="false" isLink title="仅WIFI下载" :value="isWIFI ? '开启' : '关闭'" :arrow="false"></u-cell> -->
         <u-cell :border="false" isLink title="意见反馈" @click="jumpUrl('/pages/user/common/Feedback')"></u-cell>
         <u-cell :border="false" isLink title="关于我们" @click="jumpUrl('/pages/user/common/About')"></u-cell>
         <u-cell :border="false" isLink title="版本号" value="1.0.0"></u-cell>
         <u-cell :border="false" isLink title="退出登录" @click="signOut(1)"></u-cell>
         <u-cell :border="false" isLink title="注销账号" @click="signOut(2)"></u-cell>

         <u-modal :show="showModal" :content="modalText" @confirm="confirm" @cancel="showModal = false" show-cancel-button></u-modal>
      </view>
   </view>
</template>

<script>
export default {
   data() {
      return {
         barTitle: "软件设置",
         isWIFI: true,
         showModal: false,
         modalText: "",
      };
   },
   methods: {
      /**跳转 */
      jumpUrl(url) {
         uni.navigateTo({ url });
      },
      /**退出 */
      signOut(key) {
         switch (key) {
            case 1:
               this.modalText = "是否退出登录?";
               break;
            case 2:
               this.modalText = "是否注销当前账号?";
               break;
         }
         this.showModal = true;
      },
      confirm() {
         this.showModal = false;
         try {
            uni.clearStorage();
            uni.clearStorageSync();
            uni.redirectTo({ url: "/pages/common/Login" });
         } catch (err) {
            console.log(err);
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.setting {
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: flex-start;
   justify-content: flex-start;
   > view {
      width: 100vw;
   }
}
</style>
