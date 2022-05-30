<template>
   <view class="setting">
      <view id="settingCon">
         <!-- <u-cell :border="false" isLink title="仅WIFI下载" :value="isWIFI ? '开启' : '关闭'" :arrow="false"></u-cell> -->
         <!-- <u-cell :border="false" clickable title="通知推送">
            <template #value>
               <u-switch v-model="push" activeColor="#4cd964" @change="pushChange"></u-switch>
            </template>
         </u-cell> -->
         <u-cell :border="false" isLink title="意见反馈" @click="jumpUrl('/pages/user/common/Feedback')"></u-cell>
         <u-cell :border="false" isLink title="关于我们" @click="jumpUrl('/pages/user/common/About')"></u-cell>
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
         push: false,
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

      // pushChange() {
      //    if (this.push) {
      //       uni.showToast({
      //          title: "个性推送开启",
      //          icon: "none",
      //       });
      //    } else {
      //       uni.showToast({
      //          title: "个性推送关闭",
      //          icon: "none",
      //       });
      //    }
      // },
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
