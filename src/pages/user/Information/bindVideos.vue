<template>
   <view class="mainBox">
      <u-form ref="form" :model="form" :rules="rules" labelWidth="4em">
         <u-form-item label="账号" prop="account">
            <u-input v-model="form.account" placeholder="请输入学习中心账号"></u-input>
         </u-form-item>
         <u-form-item label="密码" prop="password">
            <u-input v-model="form.password" placeholder="请输入密码" type="password"></u-input>
         </u-form-item>
         <u-form-item>
            <u-button @click="submit" :loading="loading" :disabled="loading" type="success" :text="buttonText"></u-button>
         </u-form-item>
      </u-form>
   </view>
</template>

<script>
import { detectBindingStatus_API } from "@/servers/ServersUser";
import { learningLogin_API } from "@/servers/ServersUser";

export default {
   data() {
      return {
         form: {
            account: "",
            password: "",
         },
         rules: {
            account: { type: "string", required: true, message: "请输入学习中心账号", trigger: ["blur", "change"] },
            password: { type: "string", required: true, message: "请输入密码", trigger: ["blur", "change"] },
         },
         token: "",
         buttonText: "登录",
         loading: false,
         baseUrl: "",
      };
   },
   methods: {
      // 提交信息
      submit() {
         try {
            this.$refs.form
               .validate()
               .then(async () => {
                  this.loading = true;
                  this.buttonText = "验证中...";

                  let isBind = true;
                  const { code: bindCode, data: bindData } = await detectBindingStatus_API({ account: this.form.account });
                  if (bindCode === 200) {
                     isBind = bindData.isBind;
                  } else {
                     uni.showToast({ icon: "none", title: "信息读取失败，请检查网络后重试" });
                     return;
                  }

                  if (isBind) {
                     uni.showToast({ icon: "none", title: "当前学习中心账号已被绑定" });
                  } else {
                     const login = this.login(this.form);

                     let info = { value: {}, done: false },
                        value = {};

                     login: do {
                        if (info.done) break login;
                        info = await login.next();
                        if (!info.done) value = info.value;
                     } while (!Boolean(value.code) || value.code !== 200);

                     const { code, data, message } = value;
                     if (code === 200) {
                        const sendData = {
                           baseUrl: this.baseUrl,
                           token: data.token,
                           studentId: data.studentId,
                        };
                        this.mix_jumpUrl("/pages/user/Information/bindVideos/info", sendData);
                     } else {
                        uni.showToast({ icon: "none", title: message, duration: 2000 });
                     }
                  }
                  this.loading = false;
                  this.buttonText = "登录";
               })
               .catch(() => {
                  console.log("1", 1);
               });
         } catch (error) {
            this.loading = false;
            console.log("error", error);
         }
      },

      // 登录验证
      async *login(form) {
         const { NODE_ENV } = process.env;
         this.baseUrl = NODE_ENV === "development" ? "http://test2.stu.jsskdx.com" : "http://stu.jsskdx.com";
         // this.baseUrl = "http://stu.jsskdx.com";

         yield await learningLogin_API(this.baseUrl, form);
         yield await learningLogin_API("http://tc.stu.jsskdx.com", form);
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 90vw;
   margin: auto;
}
.button {
   width: 60vw;
   margin: 50rpx auto;
}
</style>
