<template>
   <view id="information">
      <u-cell :border="false" title="头像" :arrow="false" @click="changeAvatar">
         <u-image slot="right-icon" width="100rpx" height="100rpx" :src="userInfo.headImg ? 'http://app.jsskdx.com/' + userInfo.headImg : undefined" shape="circle" :lazy-load="true"></u-image>
      </u-cell>

      <u-cell :border="false" isLink title="用户名" :value="userInfo.userName || userInfo.mobile" @click="jumpChangePage({ title: '用户名', name: 'userName', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="性别" :value="userInfo.sex | asSex" @click="showSetSex = true"></u-cell>
      <u-cell :border="false" isLink title="个性签名" :value="userInfo.sign" @click="jumpChangePage({ title: '签名', name: 'sign', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="手机号码" :value="userInfo.mobile" @click="jumpChangePage({ title: '手机', name: 'mobile', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="绑定课程" :value="userInfo.bindVideos" @click="mix_jumpUrl('/pages/user/Information/bindVideos')"></u-cell>
      <u-cell :border="false" isLink title="修改密码" @click="mix_jumpUrl('/pages/user/Information/changePassword')"></u-cell>
      <u-cell :border="false" isLink title="地址管理" @click="jumpUrl('/pages/user/Information/Address')"></u-cell>

      <!-- 修改性别 -->
      <u-picker :show="showSetSex" :columns="sexArray" keyName="label" @confirm="setSex" @cancel="showSetSex = false" title="选择性别"></u-picker>

      <u-toast ref="uToast" />

      <compress-image ref="compressImage"></compress-image>
   </view>
</template>

<script>
import { getUserInfoAPI } from "@/servers/ServersCommon";
import { postSetUserInfoAPI, getQTokenAPI } from "@/servers/ServersUser";
import { mapMutations, mapState } from "vuex";
import { requestAndroidPermission } from "@/common/permission";
import compressImage from "@/common/compressImage.vue";
import qs from "qs";
export default {
   components: {
      compressImage,
   },
   data() {
      return {
         userInfo: {},
         showSetSex: false,
         sexArray: [
            [
               { label: "保密", value: 0 },
               { label: "男", value: 1 },
               { label: "女", value: 2 },
            ],
         ],
         avatar: null,
         avatarUrl: "https://img01.yzcdn.cn/vant/cat.jpeg",
         disabledPush: false,
         canvasSize: "width:100px;height100px",
      };
   },
   onShow() {
      this.getUserInfo();
   },

   mounted() {},
   /**下拉刷新 */
   onPullDownRefresh() {
      uni.startPullDownRefresh({
         success: async () => {
            await this.getUserInfo();
            uni.stopPullDownRefresh();
         },
      });
   },

   filters: {
      asSex(val) {
         switch (val) {
            case 0:
               return "保密";
            case 1:
               return "男";
            case 2:
               return "女";
         }
      },
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
      async setSex(res) {
         let { code, data } = await postSetUserInfoAPI({ sex: res.value[0].value });
         if (code === 200) {
            this.userInfo = data;
            this.setUserInfo(data);
         }
         this.showSetSex = false;
      },
      async changeAvatar() {
         const that = this;
         let result = true;
         // #ifdef APP-PLUS
         result = await requestAndroidPermission("android.permission.READ_EXTERNAL_STORAGE");
         // #endif

         if (result == 1) {
            uni.chooseImage({
               count: 1,
               sizeType: ["original"],
               sourceType: ["album"],
               success: async res => {
                  const info = res.tempFiles[0];
                  const isLt2M = info.size / 1024 / 1024 < 10;

                  if (isLt2M) {
                     const { code, data } = await getQTokenAPI();
                     if (code === 200) {
                        uni.uploadFile({
                           url: "http://upload-z2.qiniup.com",
                           filePath: res.tempFilePaths[0],
                           name: "file",
                           formData: {
                              token: data,
                           },
                           success: res => {
                              if (typeof res.data === "string") {
                                 const body = JSON.parse(res.data);
                                 postSetUserInfoAPI({ headImg: body.key }).then(({ code: setCode }) => {
                                    if (setCode === 200) {
                                       uni.showToast({
                                          icon: "none",
                                          title: "修改成功",
                                       });
                                       this.getUserInfo();
                                    }
                                 });
                              }
                           },
                           fail: val => {
                              uni.showToast({
                                 icon: "none",
                                 title: "上传失败，请重试",
                              });
                           },
                        });
                     }
                  } else {
                     uni.showToast({
                        icon: "none",
                        title: "头像大小不能超过2M",
                     });
                  }
               },
            });
         } else {
            uni.showToast({
               icon: "none",
               title: "您拒绝了存储授权，请先前往设置中打开",
            });
         }
      },
      jumpUrl(url) {
         uni.navigateTo({ url });
      },
      jumpChangePage(data) {
         uni.navigateTo({
            url: `/pages/user/Information/ChangeInfo?${qs.stringify(data)}`,
         });
      },
   },
};
</script>

<style lang="scss" scoped>
#canvas {
   display: none;
}
</style>
