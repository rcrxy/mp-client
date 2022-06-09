<template>
   <view id="information">
      <u-cell :border="false" title="头像" :arrow="false" @click="changeAvatar">
         <u-image slot="right-icon" width="100rpx" height="100rpx" :src="userInfo.headImg" shape="circle" :lazy-load="true"></u-image>
      </u-cell>

      <u-cell :border="false" isLink title="用户名" :value="userInfo.userName || userInfo.mobile" @click="jumpChangePage({ title: '用户名', name: 'userName', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="性别" :value="userInfo.sex | asSex" @click="showSetSex = true"></u-cell>
      <u-cell :border="false" isLink title="个性签名" :value="userInfo.sign" @click="jumpChangePage({ title: '签名', name: 'sign', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="手机号码" :value="userInfo.mobile" @click="jumpChangePage({ title: '手机', name: 'mobile', info: userInfo.userName })"></u-cell>
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
import { postSetUserInfoAPI } from "@/servers/ServersUser";
import { mapMutations, mapState } from "vuex";
import { requestAndroidPermission } from "@/common/permission";
import { pathToBase64, base64ToPath } from "@/common/image-tools";
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
                     const path = res.tempFilePaths[0];

                     this.$refs.compressImage
                        .compress({
                           src: path,
                           maxSize: 60,
                           fileType: "jpg",
                           quality: 1,
                           minSize: -1,
                        })
                        .then(async res => {
                           let img = res;
                           // #ifdef APP-PLUS
                           img = await pathToBase64(res);
                           // #endif
                           postSetUserInfoAPI({ headImg: img })
                              .then(res => {
                                 const { code, data } = res;
                                 if (code === 200) {
                                    uni.showToast({
                                       icon: "none",
                                       title: "修改成功",
                                    });
                                    this.userInfo = data;
                                    this.setUserInfo(data);
                                 } else {
                                    uni.showToast({
                                       icon: "none",
                                       title: "修改失败",
                                    });
                                 }
                              })
                              .catch(err => {
                                 uni.showToast({
                                    icon: "none",
                                    title: "修改失败",
                                 });
                                 console.log(err);
                              });
                        })
                        .catch(err => {
                           console.log(err);
                           // 压缩失败回调
                        });
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
