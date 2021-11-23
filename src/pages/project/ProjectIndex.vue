<template>
   <view class="project">
      <u-tabs :list="[{ name: '所有课程' }, { name: '我的课程' }]" :is-scroll="false"></u-tabs>
      <view class="tabContent">
         <view class="ul">
            <view class="li" v-for="(item, index) in allProjectList" :key="index" @click="jumpUrl(item)">
               <view class="bgImg">
                  <image src="~static/images/projectBack.png" mode="widthFix" />
                  <text class="name">{{ item.name }}</text>
               </view>
               <view class="footer">
                  <text class="left">
                     <text>{{ item.name }}</text>
                     <br />
                     <text>{{ item.number }}人购买</text>
                  </text>
                  <image class="rightIcon" src="~static/images/homePay.png" mode="widthFix" />
               </view>
            </view>
         </view>
      </view>
   </view>
</template>

<script>
import qs from "qs";
export default {
   data() {
      return {
         active: 0,
         footerIndex: 1,
         searchValue: "",
         allProjectList: [
            { name: "大学语文(二)", number: 1024 },
            { name: "高数", number: 1024 },
            { name: "高数", number: 1024 },
            { name: "高数", number: 1024 },
            { name: "高数", number: 1024 },
            { name: "高数", number: 1024 },
         ],
         myProjectList: [],
      };
   },
   methods: {
      clickRight() {},
      search() {
         console.log(this.searchValue);
      },
      jumpUrl(info) {
         uni.navigateTo({
            url: `/pages/project/ProjectContent?${qs.stringify(info)}`,
         });
      },
   },
};
</script>

<style lang="scss" scoped>
.navBarLeft {
   text-indent: 1em;
}
.searchBar {
   flex: 1;
}
.project {
   .ul {
      width: 90vw;
      margin: auto;
      .li {
         // width: 100%;
         margin: 20rpx 0;
         .bgImg {
            width: 100%;
            font-size: 80rpx;
            position: relative;
            image {
               position: relative;
               width: 100%;
               border-radius: 20rpx;
               overflow: hidden;
               vertical-align: top;
            }
            .name {
               display: flex;
               width: 4em;
               color: #fff;
               position: absolute;
               top: 50%;
               left: 0;
               transform: translate(0.75em, -50%);
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
               -o-text-overflow: ellipsis;
            }
         }
         .footer {
            width: 100%;
            margin-top: 10rpx;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            .left {
               text {
                  &:nth-of-type(1) {
                     font-size: 35rpx;
                  }
                  &:nth-of-type(2) {
                     font-size: 30rpx;
                     opacity: 0.5;
                  }
               }
            }
            .rightIcon {
               width: 150rpx;
            }
         }
      }
   }
}
</style>
