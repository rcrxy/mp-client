<template>
   <view class="main">
      <u-form ref="passwordForm" labelWidth="5em">
         <u-form-item label="手机号码">
            <u-input v-model="form.mobile" placeholder="请填写手机号"></u-input>
         </u-form-item>
         <u-form-item label="验证码" class="code">
            <u-input v-model="form.smsCode" placeholder="请填写验证码"></u-input>
            <send-messages :mobile="form.mobile" @getCode="getCode" :scale="1.15"></send-messages>
         </u-form-item>
         <u-form-item label="新的密码">
            <u-input type="password" v-model="form.newPassword" placeholder="请输入新的密码"></u-input>
         </u-form-item>
         <u-form-item label="重复密码">
            <u-input type="password" v-model="repeatPassword" placeholder="请再次输入密码"></u-input>
         </u-form-item>
      </u-form>

      <view class="button">
         <u-button type="success" @click="submit" shape="circle" :ripple="true" ripple-bg-color="#909399">立即修改</u-button>
      </view>

      <u-toast ref="uToast" />
   </view>
</template>

<script>
import { postModifyPasswordAPI } from "@/servers/ServersUser";
import { mapState } from "vuex";
import sendMessages from "@/components/sendMessages.vue";
export default {
   components: {
      sendMessages,
   },
   data() {
      return {
         form: {
            mobile: "",
            smsCode: "",
            smsId: "",
            newPassword: "",
         },
         repeatPassword: "",
      };
   },
   computed: {
      ...mapState(["userInfo"]),
   },
   onLoad() {
      this.getUserInfo();
   },
   methods: {
      getUserInfo() {
         this.form.mobile = this.userInfo.mobile;
      },

      async submit() {
         if (this.repeatPassword != this.form.newPassword) {
            uni.showToast({
               title: "重复密码与新密码不一致",
               icon: "none",
            });
         } else {
            let { code } = await postModifyPasswordAPI(this.form);
            if (code === 200) {
               uni.showToast({
                  title: "修改成功",
                  icon: "none",
               });
               uni.navigateBack();
            }
         }
      },
      getCode(info) {
         this.form.smsId = info;
      },
   },
};
</script>

<style lang="scss" scoped>
.main {
   width: 90vw;
   margin: auto;
   .code {
      display: flex;
      align-items: center;
      justify-content: center;
      .u-input {
         margin-right: 15rpx;
      }
   }
}
.button {
   width: 60vw;
   margin: 50rpx auto;
}
</style>
