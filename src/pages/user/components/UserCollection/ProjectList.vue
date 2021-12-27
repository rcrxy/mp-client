<template>
   <view class="dataBox">
      <u-collapse :border="false">
         <u-collapse-item title="已购买">
            <view v-if="dataOptions.purchased.length === 0">
               <text class="promptText">尚未收藏任何已购买课程</text>
            </view>
            <view v-else>
               <view class="li" v-for="(item, index) in dataOptions.purchased" :key="index" @click="mix_jumpUrl('/pages/project/ProjectContent', item)">
                  <view class="left">
                     <image src="~static/images/projectBack.png" mode="widthFix" />
                     <text>{{ item.name }}</text>
                  </view>
                  <view class="middle">
                     <text class="title">{{ item.name2 }}</text>
                     <view class="purchases">讲师: {{ item.teacher }}</view>
                  </view>
                  <view class="right">
                     <text>立即观看 ></text>
                  </view>
               </view>
            </view>
         </u-collapse-item>
         <u-collapse-item title="未购买">
            <view v-if="dataOptions.notPurchased.length === 0">
               <text class="promptText">尚未收藏任何未购买课程</text>
            </view>
            <view v-else>
               <view class="li" v-for="(item, index) in dataOptions.notPurchased" :key="index" @click="mix_jumpUrl('/pages/project/ProjectContent', item)">
                  <view class="left">
                     <image src="~static/images/projectBack.png" mode="widthFix" />
                     <text>{{ item.name }}</text>
                  </view>
                  <view class="middle">
                     <text class="title">{{ item.name2 }}</text>
                     <view class="purchases">讲师: {{ item.teacher }}</view>
                  </view>
                  <view class="right">
                     <text>点击试看 ></text>
                  </view>
               </view>
            </view>
         </u-collapse-item>
      </u-collapse>
   </view>
</template>

<script>
// topicList
export default {
   data() {
      return {
         allOrder: "",
         dataOptions: {
            purchased: [
               { name: "语文", name2: "大学语文(一)", teacher: "您老师" },
               { name: "数学", name2: "大学数学(二)", teacher: "您老师" },
               { name: "英语", name2: "大学英语", teacher: "您老师" },
               { name: "语文", name2: "大学语文(一)", teacher: "您老师" },
               { name: "数学", name2: "大学数学(二)", teacher: "您老师" },
               { name: "英语", name2: "大学英语", teacher: "您老师" },
            ],
            notPurchased: [
               { name: "语文", name2: "大学语文(一)", teacher: "您老师" },
               { name: "数学", name2: "大学数学(二)", teacher: "您老师" },
               { name: "英语", name2: "大学英语", teacher: "您老师" },
            ],
         },
         arr: [],
      };
   },
   mounted() {},
   methods: {},
};
</script>

<style lang="scss" scoped>
.dataBox {
   width: 95vw;
   height: 100%;
   margin: auto;
   // overflow: auto;
   .u-collapse-item {
      box-shadow: 0 0 10rpx 1rpx rgba($color: #000000, $alpha: 0.1);
      border-radius: 15rpx;
      margin: 10rpx 0;
      overflow: hidden;
   }
}
.emptyState {
   width: 100vw;
   height: 100%;
   position: relative;
   image {
      display: block;
      width: 460rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
   }
}
.li {
   width: 100%;
   margin: 5rpx 0;
   display: flex;
   align-items: stretch;
   justify-content: space-between;
   box-sizing: border-box;
   padding: 20rpx 15rpx;
   border-radius: 15rpx;
   // box-shadow: 0 5rpx 10rpx 3rpx rgba($color: #000000, $alpha: 0.1);
   .left {
      width: 250rpx;
      position: relative;
      image {
         width: 100%;
         vertical-align: top;
      }
      text {
         position: absolute;
         top: 50%;
         left: 0;
         transform: translateY(-50%);
         font-size: 40rpx;
         text-indent: 40rpx;
         color: #fff;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }
   }
   .middle {
      flex: 1;
      box-sizing: border-box;
      padding-left: 30rpx;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      text {
         display: block;
      }
      .title {
         font-size: 35rpx;
      }
      .purchases {
         opacity: 0.5;
         font-size: 25rpx;
         display: flex;
         flex-flow: row nowrap;
         align-items: center;
         justify-content: center;
         .u-count-num {
            vertical-align: bottom;
         }
      }
   }
   .right {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text {
         display: block;
         font-weight: 400;
         font-size: 24rpx;
         box-sizing: border-box;
         color: #fff;
         padding: 5rpx 15rpx;
         border-radius: 1em;
         background-image: linear-gradient(to bottom, #00c0db 0%, #00cda2 100%);
      }
   }
}
.promptText {
   display: block;
   width: 100%;
   text-align: center;
   font-size: 30rpx;
}
</style>
