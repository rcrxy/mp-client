<template>
   <view>
      <view class="ul">
         <view class="left">
            <text>报名费用</text>
            <text>查询</text>
         </view>
         <view class="middle">
            <text>成考信息</text>
            <text>采集</text>
         </view>
         <view class="right">
            <text>成人高考</text>
            <text>公众号</text>
         </view>
      </view>

      <u-form class="from" :model="fromData" ref="uForm" :rules="rules" :error-type="['none']">
         <u-form-item v-for="(item, index) in fromOptions" :key="index" :label="item.label" :prop="item.name" label-width="5em">
            <u-input v-if="item.type === 'text'" v-model="fromData[item.name]" :placeholder="`请输入${item.label}`" type="text" />
            <view class="code" v-if="item.type === 'code'">
               <u-input v-model="fromData[item.name]" :placeholder="`请输入${item.label}`" type="text" />
               <send-messages :mobile="fromData.mobile" @getCode="getCode" :scale="1.15"></send-messages>
            </view>
            <view class="mask" v-if="item.type === 'select'" @click="show[item.name] = true">
               <u-input v-model="fromData[item.name]" :placeholder="`请选择${item.label}`" disabled />
               <view class="maskSon">
                  <u-icon name="arrow-down-fill" color="#cccccc" size="18"></u-icon>
               </view>
            </view>
         </u-form-item>
         <u-form-item>
            <u-button type="success" size="large" text="立即报名" @click="onSubmit"></u-button>
         </u-form-item>
      </u-form>

      <!-- 选择省份 -->
      <u-picker :show="show.province" :columns="provinceJson" keyName="label" @confirm="confirmProvince" @cancel="show.province = false"></u-picker>

      <!-- 选择层次 -->
      <u-picker :show="show.gradation" :columns="LevelOptions" keyName="label" @confirm="confirmLevel" @cancel="show.gradation = false"></u-picker>

      <!-- 分享 -->
      <uni-popup ref="popup" type="bottom">
         <uni-popup-share></uni-popup-share>
      </uni-popup>
   </view>
</template>

<script>
import provinceJson from "@/static/json/province.json";
import LevelOptions from "@/static/json/LevelOptions.json";
import uniPopupShare from "@/components/uni-popup-share.vue";
import sendMessages from "@/components/sendMessages.vue";
import { postSignUpAPI } from "@/servers/ServersHome";
export default {
   components: {
      uniPopupShare,
      sendMessages,
   },
   data() {
      return {
         fromData: {
            smsId: "",
         },
         fromOptions: [
            { label: "您的姓名", name: "signName", type: "text" },
            { label: "联系电话", name: "mobile", type: "text" },
            { label: "短信验证", name: "smsCode", type: "code" },
            { label: "报名省份", name: "province", type: "select" },
            { label: "报名层次", name: "gradation", type: "select" },
            { label: "报名院校", name: "college", type: "text" },
         ],
         rules: {},
         show: {
            province: false,
            gradation: false,
         },
         disabled: false,
         codeText: "获取验证码",
         LevelOptions,
         provinceJson,
      };
   },
   created() {
      this.setRules();
   },
   methods: {
      setRules() {
         this.fromOptions.forEach(item => {
            if (item.type === "text") this.rules[item.name] = { required: true, message: `请填写${item.label}`, trigger: ["blur", "change"] };
            if (item.type === "select") this.rules[item.name] = { required: true, message: `请选择${item.label}`, trigger: ["blur", "change"] };
         });
      },
      getCode(info) {
         this.fromData.smsId = info;
      },

      /**提交信息 */
      onSubmit() {
         this.$refs.uForm
            .validate()
            .then(async () => {
               const sendData = { ...this.fromData };
               const { code } = await postSignUpAPI(sendData);
               if (code === 200) uni.showToast({ title: "报名成功，请等待老师联系", icon: "none" });
            })
            .catch(err => {
               console.log(err);
            });
      },
      /**提交省份 */
      confirmProvince(val) {
         this.fromData.province = val.value[0].label;
         this.show.province = false;
      },
      confirmLevel(val) {
         this.fromData.gradation = val.value[0].label;
         this.show.gradation = false;
      },
   },

   /**分享按钮 */
   onNavigationBarButtonTap() {
      this.$refs.popup.open();
   },
};
</script>

<style lang="scss" scoped>
.ul {
   width: 95vw;
   margin: 0.75rem auto;
   display: flex;
   align-items: center;
   justify-content: space-around;
   view {
      width: 30%;
      height: 20vw;
      color: #005fca;
      box-sizing: border-box;
      padding: 0.5em 0 0 0.5em;
      text {
         display: block;
      }
   }
   .left {
      background: url(../../../static/images/Entrance1.png) center center / 100% 100%;
   }
   .middle {
      background: url(../../../static/images/Entrance2.png) center center / 100% 100%;
   }
   .right {
      background: url(../../../static/images/Entrance3.png) center center / 100% 100%;
   }
}
.from {
   width: 90vw;
   margin: auto;
   .code {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .send-messages {
         margin-left: 30rpx;
      }
   }
   .mask {
      flex: 1;
      position: relative;
      .maskSon {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         z-index: 10;
         padding-right: 20rpx;
         box-sizing: border-box;
         display: flex;
         align-items: center;
         justify-content: flex-end;
      }
   }
}
</style>
