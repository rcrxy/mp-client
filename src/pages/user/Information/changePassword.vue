<template>
   <view class="main">
      <u--form ref="passwordForm" :model="form" :rules="rules" labelWidth="5em" :errorType="['border-bottom']" borderBottom>
         <u-form-item label="手机号码" prop="mobile" borderBottom>
            <u-input v-model="form.mobile" placeholder="请填写手机号"></u-input>
         </u-form-item>
         <u-form-item label="验证码" class="code" prop="smsCode" borderBottom>
            <u-input v-model="form.smsCode" placeholder="请填写验证码"></u-input>
            <send-messages :mobile="form.mobile" @getCode="getCode" :scale="1.15"></send-messages>
         </u-form-item>
         <u-form-item label="新的密码" prop="newPassword" borderBottom>
            <u-input type="password" v-model="form.newPassword" placeholder="请输入新的密码"></u-input>
         </u-form-item>
         <u-form-item label="重复密码" prop="repeatPassword" borderBottom>
            <u-input type="password" v-model="form.repeatPassword" placeholder="请再次输入密码"></u-input>
         </u-form-item>
      </u--form>

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
            repeatPassword: "",
         },
         rules: {
            mobile: [
               { required: true, message: "请填写姓名", trigger: ["blur", "change"] },
               { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, transform: value => String(value), message: "只能包含字母或数字" },
            ],
            smsCode: { required: true, len: 6, message: "请填写6位验证码", trigger: ["blur", "change"] },
            smsId: {},
            newPassword: [
               { required: true, message: "请填写6位验证码", trigger: ["blur", "change"] },
               { pattern: /^(?=\S*\d+)(?=\S*[a-zA-Z]+)\S{8,16}$/, transform: value => String(value), message: "至少包含一个数字和字母，且不低于8位" },
            ],
            repeatPassword: [
               {
                  validator: (rule, value, callback) => {
                     return this.form.newPassword === value;
                  },
                  message: "重复密码与新密码不一致",
                  trigger: ["change", "blur"],
               },
            ],
         },
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
         this.$refs.passwordForm.validate(
            async res => {
               let { code } = await postModifyPasswordAPI(this.form);
               if (code === 200) {
                  uni.showToast({
                     title: "修改成功",
                     icon: "none",
                  });
                  setTimeout(() => {
                     uni.navigateBack();
                  }, 2000);
               }
            },
            err => {
               console.log(err);
            }
         );
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
