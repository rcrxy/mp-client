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
      <u-picker :show="show.level" :columns="LevelOptions" keyName="label" @confirm="confirmLevel" @cancel="show.level = false"></u-picker>

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
export default {
   components: {
      uniPopupShare,
   },
   data() {
      return {
         fromData: {},
         fromOptions: [
            { name: "province", label: "报名省份", type: "select" },
            { name: "school", label: "报名院校", type: "text" },
            { name: "level", label: "报名层次", type: "select" },
            { name: "phone", label: "联系电话", type: "text" },
            { name: "name", label: "您的姓名", type: "text" },
         ],
         rules: {},
         show: {
            province: false,
            level: false,
         },
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
      /**打开选择器 */
      openPicker(name) {
         switch (name) {
            case "province":
               this.provinceShow = true;
               break;
            case "level":
               this.levelShow = true;
               break;

            default:
               break;
         }
      },
      /**提交信息 */
      onSubmit() {
         this.$refs.uForm
            .validate()
            .then(() => {})
            .catch(err => {
               console.log(err);
            });
      },
      onFailed(info) {},
      /**提交省份 */
      confirmProvince(val) {
         this.fromData.province = val.value[0].label;
         this.show.province = false;
      },
      confirmLevel(val) {
         this.fromData.level = val.value[0].label;
         this.show.level = false;
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
