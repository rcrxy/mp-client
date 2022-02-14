<template>
   <u-button class="send-messages" :text="codeText" @click="sendMessages(mobile)" :disabled="disabled" size="mini" type="success" :hairline="false" :style="'transform: scale(' + scale + ')'"></u-button>
</template>

<script>
import { postSmsSendAPI } from "@/servers/ServersCommon";
export default {
   props: {
      mobile: String,
      scale: {
         type: Number,
         default: 1,
      },
   },
   data() {
      return {
         codeText: "发送短信",
         disabled: false,
      };
   },
   methods: {
      /**发送验证码 */
      async sendMessages(mobile) {
         let title = "";
         switch (false) {
            case Boolean(mobile):
               title = "请输入手机号码";
               break;
            case this.mix_monileExp.test(mobile):
               title = "请输入正确的手机号";
               break;
         }

         if (title) {
            uni.showToast({ title, icon: "none" });
         } else {
            uni.showLoading({ title: "正在发送短信" });
            const { code, data } = await postSmsSendAPI({ mobile });
            uni.hideLoading();
            if (code === 200) {
               this.$emit("getCode", data);
               this.changetag();
            } else {
               uni.showToast({ title: "发送失败，请稍后重试", icon: "none" });
            }
         }
      },
      /**倒计时 */
      changetag() {
         let time = 60;
         let that = this;
         this.disabled = true;
         function changeTime() {
            time === 0 ? (clearInterval(timeCode), (that.codeText = "发送短信"), (that.disabled = false)) : (that.codeText = `${time--}秒重发`);
         }
         changeTime();
         let timeCode = setInterval(changeTime, 1000);
      },
   },
};
</script>
<style lang="scss" scoped>
.send-messages {
   white-space: nowrap;
   text {
      font-size: 40rpx;
   }
}
</style>
