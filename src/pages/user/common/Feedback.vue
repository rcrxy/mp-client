<template>
   <view class="feedback">
      <u--textarea v-model="message" maxlength="50" count placeholder="请输入您的意见"></u--textarea>

      <u-button class="button" type="success" @click="onSubmit" :loading="loading" :ripple="true" ripple-bg-color="#909399" shape="circle">提交</u-button>
      <u-toast ref="uToast" />
   </view>
</template>

<script>
export default {
   data() {
      return {
         message: "",
         textLength: 0,
         maxLength: 50,
         loading: false,
      };
   },
   methods: {
      onSubmit() {
         this.loading = true;
         if (this.message) {
            this.$refs.uToast.show({
               title: "提交成功",
               type: "success",
            });
            this.message = "";
         } else {
            this.$refs.uToast.show({
               title: "请勿提交空的内容",
               type: "warning",
            });
         }
         this.loading = false;
      },
   },
};
</script>

<style lang="scss" scoped>
.feedback {
   width: 90vw;
   margin: auto;
   .button {
      width: 60vw;
      margin: 30rpx auto;
   }
}
</style>
