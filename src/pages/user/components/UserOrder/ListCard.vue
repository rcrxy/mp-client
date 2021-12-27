<template>
   <view class="cardBox">
      <view class="cardTop">
         <view class="cardTitle">
            <text>订单号: {{ data.orderId }}</text>
            <text :style="data.state | as_stateColor">{{ data.state | as_state }}</text>
         </view>
         <view class="content">
            <view class="contentLeft">
               <image src="~static/images/homeNews.png" mode="scaleToFill" />
            </view>
            <view class="contentRight">
               <text>{{ data.name2 }}</text>
               <text>
                  价格:
                  <text>￥{{ data.price }}</text>
               </text>
            </view>
         </view>
      </view>
      <view class="center">
         <text>{{ data.classType }}</text>
         <text>
            实付:
            <text>￥{{ data.amount }}</text>
         </text>
      </view>
      <view class="bottom">
         <text>{{ data.addTime }}</text>
         <view class="button">
            <u-button text="删除订单" plain size="mini" shape="circle" type="info"></u-button>
            <u-button text="确认支付" plain size="mini" shape="circle" type="success"></u-button>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   props: ["data"],
   data() {
      return {};
   },
   filters: {
      as_state(type) {
         switch (type) {
            case 0:
               return "未支付";
            case 1:
               return "已支付";
         }
      },
      as_stateColor(type) {
         switch (type) {
            case 0:
               return "color:#F56C6C";
            case 1:
               return "color:#5ac725";
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.cardBox {
   width: 95vw;
   height: fit-content;
   box-sizing: border-box;
   border-radius: 15rpx;
   box-shadow: 0 0 10rpx 1rpx rgba($color: #000000, $alpha: 0.1);
   margin: 20rpx;
   background-color: #fafafa;
   overflow: hidden;
   .cardTop {
      padding: 20rpx 15rpx;
      margin-bottom: 1rpx;
      background-color: #fff;
      .cardTitle {
         width: 100%;
         padding: 5rpx 0;
         display: flex;
         align-items: center;
         justify-content: space-between;
         text {
            font-size: 25rpx;
            &:first-of-type {
               flex: 1;
            }
            &:last-of-type {
               flex-shrink: 0;
            }
         }
      }
      .content {
         width: 100%;
         display: flex;
         flex-flow: row nowrap;
         align-items: inherit;
         justify-content: flex-start;
         margin: 10rpx 0;
         .contentLeft {
            flex-shrink: 0;
            position: relative;
            image {
               width: 240rpx;
               height: 180rpx;
               vertical-align: top;
               margin-right: 20rpx;
            }
         }
         .contentRight {
            flex: 1;
            display: flex;
            flex-flow: column nowrap;
            align-items: inherit;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 15rpx 0;
            text {
               &:first-of-type {
                  font-size: 35rpx;
               }
               &:last-of-type {
                  font-size: 25rpx;
                  text {
                     color: #f56c6c;
                     text-indent: 0.5em;
                     display: inline-block;
                  }
               }
            }
         }
      }
   }
   .center {
      padding: 20rpx 15rpx;
      margin-bottom: 1rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text {
         font-size: 28rpx;
         text {
            color: #f56c6c;
            text-indent: 0.5em;
            display: inline-block;
         }
      }
   }
   .bottom {
      padding: 20rpx 15rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text {
         flex-shrink: 0;
         font-size: 28rpx;
      }
      .button {
         display: flex;
         align-items: center;
         justify-content: flex-end;
         .u-button {
            &:last-of-type {
               margin-left: 15rpx;
            }
         }
      }
   }
}
</style>
