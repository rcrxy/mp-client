<template>
   <view class="projectCard">
      <view class="cardTop">
         <image src="~static/images/projectBack.png" mode="scaleToFill" />
         <text>{{ data.className }}</text>
      </view>
      <view class="cardBottom">
         <view class="cardBottomLeft">
            <text>{{ data.className }}</text>
            <text>{{ data.number }}人购买</text>
         </view>
         <view class="cardBottomRight">
            <text>{{ text }}</text>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   name: "projectCard",
   props: ["data", "text"],
};
</script>

<style lang="scss" scoped>
.projectCard {
   width: 95vw;
   margin: auto;
   height: auto;
   box-sizing: border-box;
   margin: 15rpx 0;
   padding: 20rpx 15rpx;
   border-radius: 15rpx;
   box-shadow: 0 0 10rpx 1rpx rgba($color: #000000, $alpha: 0.1);
   .cardTop {
      position: relative;
      width: 100%;
      height: auto;
      margin-bottom: 25rpx;
      image {
         width: 100%;
         height: 45vw;
         vertical-align: top;
         border-radius: 15rpx;
         overflow: hidden;
      }
      text {
         position: absolute;
         top: 50%;
         left: 50rpx;
         transform: translateY(-50%);
         color: #fff;
         font-size: 60rpx;
         max-width: 6em;
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
      }
   }
   .cardBottom {
      display: flex;
      align-items: inherit;
      justify-content: space-between;
      .cardBottomLeft {
         text {
            display: block;
            line-height: 40rpx;
            &:first-of-type {
               font-size: 35rpx;
               margin-bottom: 15rpx;
            }
            &:last-of-type {
               font-size: 25rpx;
               color: gray;
            }
         }
      }
      .cardBottomRight {
         flex-shrink: 0;
         display: flex;
         align-items: flex-end;
         text {
            display: block;
            font-size: 25rpx;
            color: #fff;
            padding: 5rpx 20rpx;
            border-radius: 1em;
            background-image: linear-gradient(to bottom, #00c0db 0%, #00cda2 100%);
         }
      }
   }
}
</style>
