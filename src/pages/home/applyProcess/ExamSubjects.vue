<template>
   <view class="main">
      <view class="topTitle">
         <text>{{ time.year }}成人高考时间为{{ time.month }}月{{ time.start }}-{{ time.end }}日</text>
      </view>

      <view class="examTime">
         <view class="highSchool">
            <image class="examTimeTitle" src="~static/images/highSchool.png" mode="heightFix" />
            <view class="table">
               <view class="tr">
                  <view class="th"><text>时间/日期</text></view>
                  <view class="th"><text>10月24日</text></view>
                  <view class="th"><text>10月25日</text></view>
               </view>
               <view class="tr">
                  <view class="td"><text>9:00-11:00</text></view>
                  <view class="td"><text>语文</text></view>
                  <view class="td"><text>外语</text></view>
               </view>
               <view class="tr">
                  <view class="td"><text>14:30-16:30</text></view>
                  <view class="td">
                     <text>数学(文科)</text>
                     <text>数学(理科)</text>
                  </view>
                  <view class="td">
                     <text>史地(高起本文科)</text>
                     <text>史地(高起本理科)</text>
                  </view>
               </view>
            </view>
         </view>
         <view class="specialist">
            <image class="examTimeTitle" src="~static/images/specialist.png" mode="heightFix" />
            <view class="table">
               <view class="tr">
                  <view class="th"><text>时间/日期</text></view>
                  <view class="th"><text>10月24日</text></view>
                  <view class="th"><text>10月25日</text></view>
               </view>
               <view class="tr">
                  <view class="td"><text>9:00-11:00</text></view>
                  <view class="td"><text>政治</text></view>
                  <view class="td">
                     <text>大学语文</text>
                     <text>高等数学一</text>
                     <text>高等数学二</text>
                     <text>教育理论</text>
                  </view>
               </view>
               <view class="tr">
                  <view class="td"><text>14:30-17:00</text></view>
                  <view class="td"><text>外语</text></view>
                  <view class="td">
                     <text>民法</text>
                     <text>生态基础</text>
                     <text>艺术概论</text>
                     <text>医学综合</text>
                  </view>
               </view>
            </view>
         </view>
         <view class="subjects">
            <image class="examTimeTitle" src="~static/images/subjects.png" mode="heightFix" />
            <view class="div" v-for="(item, index) in subjectsOptions" :key="index">
               <text class="name">{{ item.name }}</text>
               <view class="ul" v-if="item.type === 'list'">
                  <view class="li" v-for="(key, index) in item.list" :key="index">{{ key }}</view>
               </view>
               <view class="text" v-if="item.type === 'text'">
                  <text>{{ item.text }}</text>
               </view>
            </view>
         </view>
      </view>

      <view class="recommend">
         <text class="title">推荐招生专业</text>
         <view class="table">
            <view class="tr">
               <view class="th"><text>专业名称</text></view>
               <view class="th"><text>专科</text></view>
               <view class="th"><text>本科</text></view>
               <view class="th"><text>详细信息</text></view>
            </view>
            <view class="tr" v-for="(item, index) in recommendOptions" :key="index">
               <view class="td">
                  <text>{{ item }}</text>
               </view>
               <view class="td"><text>2.5年</text></view>
               <view class="td"><text>2.5年</text></view>
               <view class="td">
                  <navigator url="" redirect hover-class="className">详细信息</navigator>
               </view>
            </view>
         </view>
      </view>

      <!-- 分享 -->
      <uni-popup ref="popup" type="bottom">
         <uni-popup-share></uni-popup-share>
      </uni-popup>
   </view>
</template>

<script>
import subjectsOptions from "@/static/json/subjectsOptions.json";
import uniPopupShare from "@/components/uni-popup-share.vue";
export default {
   components: {
      uniPopupShare,
   },
   data() {
      return {
         time: {
            year: 2021,
            month: 10,
            start: 24,
            end: 25,
         },
         subjectsOptions,
         recommendOptions: ["房屋建筑工程【推荐】", "教育学【推荐】", "工程管理", "行政管理", "会计", "工商管理", "英语", "人力资源管理"],
      };
   },
   metextods: {},
   /**分享按钮 */
   onNavigationBarButtonTap() {
      textis.$refs.popup.open();
   },
};
</script>

<style lang="scss" scoped>
.main {
   padding-bottom: 5rem;
}
.topTitle {
   width: 80vw;
   height: 3rem;
   margin: 1rem auto;
   background-image: url(../../../static/images/ExamSubjectsTopTitle.png);
   background-position: center top;
   background-repeat: no-repeat;
   background-size: 100% 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   text {
      color: viewansparent;
      background-clip: text;
      background-image: linear-gradient(to bottom, #00cda2 0%, #00c0db 100%);
   }
}

.examTime {
   > view {
      width: 90vw;
      height: auto;
      background-color: #f5f5f5;
      position: relative;
      margin: 1.5rem auto;
      padding: 2em 1em 1em 1em;
      box-sizing: border-box;
      .examTimeTitle {
         height: 1.5em;
         position: absolute;
         top: 0;
         left: 50%;
         transform: translate(-50%, -43%);
      }
      .table {
         width: 100%;
         .tr {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15rpx 0;
            &:nth-of-type(1) {
               background-color: #46b1eb;
               text {
                  color: #fff;
                  font-weight: 500;
               }
            }
            &:nth-of-type(2) {
               background-color: #e2f2fb;
            }
            &:nth-of-type(3) {
               background-color: #e2e4fb;
            }
            .td,
            .th {
               text-align: center;
               width: 33.33%;
            }
         }
         text {
            font-size: 25rpx;
            display: block;
            color: #005d8f;
            width: 100%;
         }
      }
   }
   .subjects {
      padding-top: 1.5em;
      .div {
         margin: 1em auto;
         .name {
            display: block;
            margin-bottom: 20rpx;
            font-size: 33rpx;
            font-weight: 500;
            text-align: center;
         }
         .ul {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            .li {
               font-size: 30rpx;
               margin: 0 10rpx;
               padding: 0.25em 0.5em;
               color: #005d8f;
               background-color: #e2f2fb;
               border-radius: 0.25rem;
            }
         }
         .text {
            font-size: 30rpx;
            line-height: 50rpx;
            text-indent: 2em;
            color: #2c3de8;
            background-color: #e2e4fb;
            border-radius: 10rpx;
            padding: 1.25em 1em;
         }
      }
   }
}

.recommend {
   width: 90vw;
   margin: auto;
   .title {
      display: block;
      margin: 0 0 30rpx 0;
      font-size: 40rpx;
      font-weight: normal;
   }
   .table {
      background-color: #e2f2fb;
      .tr {
         width: 100%;
         text-align: center;
         display: flex;
         .td,
         .th {
            padding: 5rpx 0;
            text {
               white-space: nowrap;
            }
            &:nth-of-type(1) {
               flex: 1;
            }
            &:nth-of-type(2) {
               width: 3.5em;
            }
            &:nth-of-type(3) {
               width: 3.5em;
            }
            &:nth-of-type(4) {
               width: 5.5em;
            }
         }
         .th {
            font-weight: 500;
            background-color: #46b1eb;
            text {
               color: #fff;
            }
         }
      }
      .td {
         &:nth-of-type(1),
         &:nth-of-type(2) {
            color: #005d8f;
         }
         &:nth-of-type(3) {
            color: #e90026;
         }
         &:nth-of-type(4) {
            color: #01ad5a;
         }
      }
   }
}
</style>
