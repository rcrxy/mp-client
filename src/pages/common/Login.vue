<template>
   <view class="main">
      <view class="login">
         <view class="table">
            <view class="tabsTitle">
               <view class="titles" @click="tabIndex = 0" :style="tabIndex === 0 ? 'background-color: #fff;' : ''">
                  <text :style="tabIndex === 0 ? 'color: #00cba1' : 'color: #5d5d5d;'">手机登录</text>
               </view>
               <view :class="`triangle${tabIndex === 0 ? 'Left' : 'Right'}`"></view>
               <view class="titles" @click="tabIndex = 1" :style="tabIndex === 1 ? 'background-color: #fff;' : ''">
                  <text :style="tabIndex === 1 ? 'color: #00cba1' : 'color: #5d5d5d;'">账号登录</text>
               </view>
            </view>
            <view class="tabsContent">
               <view class="tabs left" v-show="tabIndex === 0">
                  <view class="input inputPhone">
                     <u-icon class="inputLeftIcon" name="account-fill" color="#cccccc" size="30"></u-icon>
                     <u-input v-model="fromCode.mobile" placeholder="输入手机号" border="none"></u-input>
                  </view>
                  <view class="input code">
                     <view class="inputCode">
                        <u-icon class="inputLeftIcon" name="lock-fill" color="#cccccc" size="30"></u-icon>
                        <u-input v-model="fromCode.smsCode" placeholder="输入验证码" border="none"></u-input>
                     </view>
                     <send-messages :mobile="fromCode.mobile" @getCode="getCode"></send-messages>
                  </view>
                  <u-button class="submit" @click="onSubmit" type="success">登录</u-button>
               </view>
               <view class="tabs right" v-show="tabIndex === 1">
                  <view class="input">
                     <u-icon class="inputLeftIcon" name="account-fill" color="#cccccc" size="30"></u-icon>
                     <u-input v-model="fromPwd.mobile" placeholder="输入账号" border="none"></u-input>
                  </view>
                  <view class="input">
                     <u-icon class="inputLeftIcon" name="lock-fill" color="#cccccc" size="30"></u-icon>
                     <u-input type="password" v-model="fromPwd.password" placeholder="输入密码" border="none"></u-input>
                  </view>
                  <u-button class="submit" @click="onSubmit" type="success">登录</u-button>
               </view>
            </view>
            <view class="tabsFooter">
               <u-checkbox-group @change="protocolChange" iconPlacement="right" placement="row">
                  <u-checkbox name="protocol" size="15" shape="circle"></u-checkbox>
               </u-checkbox-group>
               <text class="radioText">
                  我已阅读并同意
                  <text class="name" @click="mix_jumpUrl('/pages/common/protocol')">《用户协议》</text>
                  和
                  <text class="name" @click="mix_jumpUrl('/pages/common/privacy')">《隐私政策》</text>
               </text>
            </view>
         </view>
      </view>

      <u-toast ref="uToast" />
   </view>
</template>

<script>
import { postAccountLoginAPI, postSmsLoginAPI } from "@/servers/ServersCommon";
import { mapMutations } from "vuex";
import sendMessages from "@/components/sendMessages.vue";
export default {
   components: {
      sendMessages,
   },
   data() {
      return {
         tabIndex: 0,
         protocolState: false,
         fromCode: {
            mobile: "",
            smsCode: "",
            smsId: "",
            // #ifdef APP-PLUS
            source: plus.runtime.channel,
            // #endif
         },
         fromPwd: {
            mobile: "",
            password: "",
         },
      };
   },
   mounted() {
      this.isLoading = false;
   },
   onBackPress() {
      return true;
   },
   methods: {
      ...mapMutations(["setToken", "setUserInfo"]),
      async onSubmit() {
         try {
            uni.clearStorage();
            if (!this.protocolState) {
               this.$refs.uToast.show({ message: "请先阅读并同意协议及政策", type: "error" });
            } else {
               let acceptInfo = {};

               // TODO 表单验证
               if (this.tabIndex === 0) {
                  acceptInfo = await postSmsLoginAPI(this.fromCode);
               } else {
                  acceptInfo = await postAccountLoginAPI(this.fromPwd);
               }

               if (acceptInfo.code === 200) {
                  this.setToken(acceptInfo.data.token);
                  uni.switchTab({ url: "/pages/home/home" });
               } else {
                  uni.showToast({ title: acceptInfo.message, icon: "none" });
               }
            }
         } catch (error) {
            console.log(error);
         }
      },
      getCode(info) {
         this.fromCode.smsId = info;
      },
      /**协议选中状态 */
      protocolChange(stateArr) {
         let state = stateArr[0];
         state === "protocol" ? (this.protocolState = true) : (this.protocolState = false);
      },
   },
};
</script>

<style lang="scss" scoped>
$titleHeight: 95rpx;
/deep/ .input-placeholder {
   opacity: 0.5;
}

.main {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   justify-content: flex-end;
   padding-bottom: 10%;
   box-sizing: border-box;
   background-image: url(~static/images/LoginBack.png);
   background-position: top center;
   background-repeat: no-repeat;
   background-size: 100% auto;
   .van-loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
   .login {
      width: 661rpx;
      height: 781rpx;
      border-radius: 40rpx;
      box-sizing: border-box;
      box-shadow: 0 0 10rpx 3rpx rgba($color: #000000, $alpha: 0.3);
      background: #fff;
      overflow: hidden;
      .table {
         width: 100%;
         height: 100%;
         display: flex;
         flex-flow: column nowrap;
         align-items: initial;
         justify-content: space-between;
         .tabsTitle {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: $titleHeight;
            background-color: #f7f7f7;
            .titles {
               width: calc(50% - 15rpx);
               height: 100%;
               display: flex;
               align-items: center;
               justify-content: center;
               text {
                  font-size: 36rpx;
                  color: #000;
               }
            }
            .triangleLeft {
               width: 0;
               height: 0;
               border-bottom: $titleHeight solid #fff;
               border-right: 30rpx solid transparent;
            }
            .triangleRight {
               width: 0;
               height: 0;
               border-bottom: $titleHeight solid #fff;
               border-left: 30rpx solid transparent;
            }
         }
         .tabsContent {
            flex: 1;
            width: 100%;
            height: 100%;
            position: relative;
            .tabs {
               width: 100%;
               height: 100%;
               position: absolute;
               top: 0;
               box-sizing: border-box;
               padding: 85rpx;
               .inputLeftIcon {
                  margin: 0 20rpx;
               }
            }
            .left {
               .input {
                  margin-bottom: 30rpx;
               }
               .inputPhone {
                  height: 95rpx;
                  border-radius: 15rpx;
                  overflow: hidden;
                  background-color: rgba(0, 0, 0, 0.05);
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  input {
                     flex: 1;
                  }
               }
               .code {
                  margin-top: 30rpx;
                  height: 95rpx;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .inputCode {
                     height: 95rpx;
                     border-radius: 15rpx;
                     overflow: hidden;
                     background-color: rgba(0, 0, 0, 0.05);
                     display: flex;
                     align-items: center;
                     justify-content: space-between;
                     margin-right: 30rpx;
                  }
               }
            }
            .right {
               .input {
                  height: 95rpx;
                  border-radius: 15rpx;
                  overflow: hidden;
                  background-color: rgba(0, 0, 0, 0.05);
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 30rpx;
                  input {
                     flex: 1;
                  }
               }
            }
            .submit {
               border-radius: 15rpx;
            }
         }
         .tabsFooter {
            width: 100%;
            height: 100rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            .radioText {
               font-size: 24rpx;
               opacity: 0.8;
               .name {
                  color: #00cba1;
               }
            }
         }
      }
   }
}
</style>
