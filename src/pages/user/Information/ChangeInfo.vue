<template>
   <view class="main">
      <view v-if="name === 'userName'">
         <u-input v-model="sendData.userName" clearable label="用户名" placeholder="请输入用户名"></u-input>
      </view>
      <view v-if="name === 'sign'">
         <u-input v-model="sendData.sign" clearable label="签名" placeholder="请输入个性签名"></u-input>
      </view>
      <view v-if="name === 'mobile'">
         <view v-if="!codeTrue">
            <u-form ref="oldPhoneForm" labelWidth="5em">
               <u-form-item label="手机号码">
                  <u-input v-model="phone" placeholder="请填写当前手机号"></u-input>
               </u-form-item>
               <u-form-item label="验证码" class="code">
                  <u-input v-model="code" placeholder="请填写验证码"></u-input>
                  <u-button :text="codeText" @click="sendCode" :disabled="disabled" size="mini" type="success"></u-button>
               </u-form-item>
            </u-form>
         </view>
         <view v-else>
            <u-form ref="newPhoneForm" labelWidth="5em">
               <u-form-item label="手机号码">
                  <u-input v-model="phone" placeholder="请填写新手机号"></u-input>
               </u-form-item>
               <u-form-item label="验证码" class="code">
                  <u-input v-model="code" placeholder="请填写验证码"></u-input>
                  <u-button :text="codeText" @click="sendCode" :disabled="disabled" size="mini" type="success"></u-button>
               </u-form-item>
            </u-form>
         </view>
      </view>
      <view v-if="name === 'password'">
         <u-form ref="passwordForm" labelWidth="5em">
            <u-form-item label="手机号码">
               <u-input v-model="phone" placeholder="请填写手机号"></u-input>
            </u-form-item>
            <u-form-item label="验证码" class="code">
               <u-input v-model="code" placeholder="请填写验证码"></u-input>
               <u-button :text="codeText" @click="sendCode" :disabled="disabled" size="mini" type="success"></u-button>
            </u-form-item>
            <u-form-item label="新的密码">
               <u-input v-model="newPassword" placeholder="请输入新的密码"></u-input>
            </u-form-item>
            <u-form-item label="重复密码">
               <u-input v-model="repeatPassword" placeholder="请再次输入密码"></u-input>
            </u-form-item>
         </u-form>
      </view>

      <view class="button">
         <u-button type="success" @click="submit" shape="circle" :ripple="true" ripple-bg-color="#909399">保存</u-button>
      </view>

      <u-toast ref="uToast" />
   </view>
</template>

<script>
import { postSetUserInfoAPI } from "@/servers/ServersUser";
import { mapMutations } from "vuex";
export default {
   data() {
      return {
         name: "",
         sendData: {
            userName: "",
            mobile: "",
            sign: "",
         },

         codeText: "发送验证码",
         codeTrue: false,
         oldPhone: "",
         code: "",
         newPhone: "",
         newPassword: "",
         repeatPassword: "",
         disabled: false,
      };
   },
   onLoad(data) {
      this.setPage(data);
      this.getUserInfo();
   },
   methods: {
      ...mapMutations(["setUserInfo"]),
      getUserInfo() {
         this.sendData = this.$store.state.userInfo;
      },
      /**设置页面内容 */
      setPage({ title, name, info }) {
         uni.setNavigationBarTitle({ title: `修改${title}` });
         this.name = name;
      },
      /**提交 */
      async submit() {
         let { code, data } = await postSetUserInfoAPI(this.sendData);
         if (code === 200) {
            this.setUserInfo(data);
            uni.navigateBack();
         }
      },
      /**发送短信 */
      sendCode() {
         // this.showPopup = true;
         uni.showLoading({ title: "正在发送短信" });
         setTimeout(() => {
            this.changetag();
            uni.hideLoading();
         }, 1000);
      },
      /**倒计时 */
      changetag() {
         let time = 60;
         let that = this;
         this.disabled = true;
         function changeTime() {
            time === 0 ? (clearInterval(timeCode), (that.codeText = "发送短信"), (that.disabled = false)) : (that.codeText = `${time--}秒后重新发送`);
         }
         changeTime();
         let timeCode = setInterval(changeTime, 1000);
      },
      /**验证验证码 */
      verify() {
         this.codeTrue = !this.codeTrue;
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
