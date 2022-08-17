<template>
   <view class="emptyState" :style="`width: ${w}; height: ${h};`">
      <image src="~static/images/emptyImg.png" mode="widthFix" />
   </view>
</template>

<script>
export default {
   props: {
      width: {
         type: String | Number,
         default: "100vw",
      },
      height: {
         type: String | Number,
         default: "100vh",
      },
   },
   computed: {
      w: {
         get() {
            return this.width instanceof String ? this.width : this.width + "rpx";
         },
      },
      h: {
         get() {
            return this.height instanceof String ? this.height : this.height + "rpx";
         },
      },
   },
   data() {
      return {};
   },
   methods: {},
};
</script>

<style lang="scss" scoped>
view {
   display: flex;
   align-items: center;
   justify-content: center;

   image {
      width: 200px;
   }
}
</style>
