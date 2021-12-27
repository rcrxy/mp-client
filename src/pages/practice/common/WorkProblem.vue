<template>
   <view class="mainBox">
      <view class="questionsContent">
         <text>{{ nowIndex }}</text>
         <!-- 选择题 -->
         <!-- <q-select></q-select> -->
         <!-- 完型填空 / 阅读理解 -->
         <!-- <q-cloze></q-cloze>  -->
         <!-- 填空题 -->
         <!-- 简答/作文/ -->
      </view>
      <footer-bar :valueId="valueId" :quantity="quantity" @indexChange="indexChange"></footer-bar>
   </view>
</template>

<script>
import footerBar from "./WorkProblem/footerBar.vue";
export default {
   components: {
      footerBar,
   },
   data() {
      return {
         nowIndex: 1,
         valueId: 1,
         quantity: 10,
         completed: 0,
      };
   },
   onLoad(info) {
      console.log("info", info);
      const { completed, name, quantity } = info;
      if (name) uni.setNavigationBarTitle({ title: name });
      this.quantity = quantity * 1;
      this.completed = completed;
   },
   created() {},
   methods: {
      indexChange(index) {
         this.nowIndex = index;
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-flow: column nowrap;
   align-items: inherit;
   justify-content: space-between;
   .questionsContent {
      flex: 1;
      width: 100vw;
      box-sizing: border-box;
      padding: 10rpx 20rpx;
   }
}
</style>
