<template>
   <view id="information">
      <u-cell :border="false" title="头像" :arrow="false" @click="changeAvatar">
         <u-image slot="right-icon" width="100rpx" height="100rpx" :src="avatarUrl" shape="circle" :lazy-load="true"></u-image>
      </u-cell>

      <u-cell :border="false" isLink title="用户名" :value="userInfo.userName || userInfo.mobile" @click="jumpChangePage({ title: '用户名', name: 'userName', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="性别" :value="userInfo.sex | asSex" @click="showSetSex = true"></u-cell>
      <u-cell :border="false" isLink title="个性签名" :value="userInfo.sign" @click="jumpChangePage({ title: '签名', name: 'sign', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="手机号码" :value="userInfo.mobile" @click="jumpChangePage({ title: '手机', name: 'mobile', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="修改密码" @click="jumpChangePage({ title: '密码', name: 'password', info: userInfo.userName })"></u-cell>
      <u-cell :border="false" isLink title="地址管理" @click="jumpUrl('/pages/user/Information/Address')"></u-cell>

      <!-- 修改性别 -->
      <u-picker :show="showSetSex" :columns="sexArray" keyName="label" @confirm="setSex" @cancel="showSetSex = false" title="选择性别"></u-picker>
   </view>
</template>

<script>
import { getUserInfoAPI } from "@/servers/ServersCommon";
import { postSetUserInfoAPI } from "@/servers/ServersUser";
import { mapMutations } from "vuex";
import qs from "qs";
export default {
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
      changeAvatar() {
         const that = this;
         uni.chooseImage({
            count: 1,
            sizeType: ["original"],
            sourceType: ["album"],
            success: res => {
               this.avatarUrl = res.tempFilePaths[0];
               // uni.getFileSystemManager().readFile({
               //    filePath: res.tempFilePaths[0], //选择图片返回的相对路径
               //    encoding: "base64", //编码格式
               //    success: res => {
               //       //成功的回调
               //       console.log(res);
               //       let base64 = "data:image/jpeg;base64," + res.data; //不加上这串字符，在页面无法显示的哦
               //    },
               //    fail: e => {
               //       console.log("图片上传失败");
               //    },
               // });
            },
         });
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

<style lang="scss" scoped></style>
