<template>
   <view>
      <view class="content">
         <text class="title">全国成考成绩查询入口、录取分数线(汇总)</text>
         <text class="concern">(关注公众号回复“成绩查询”， 获得最新咨询)</text>

         <table border="1" cellspacing="0" rules="all">
            <tr>
               <th>地区</th>
               <th>查询时间</th>
               <th>查询入口</th>
               <th>录取分数线</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
               <td>{{ item.name }}</td>
               <td>{{ item.time }}</td>
               <td><a :href="item.entrance">分数查询</a></td>
               <td><a :href="item.score">录取分数线</a></td>
            </tr>
         </table>
      </view>

      <!-- 分享 -->
      <uni-popup ref="popup" type="bottom">
         <uni-popup-share></uni-popup-share>
      </uni-popup>
   </view>
</template>

<script>
import uniPopupShare from "@/components/uni-popup-share.vue";
export default {
   components: {
      uniPopupShare,
   },
   data() {
      return {
         tableData: [
            { name: "苏州", time: "11月12日", entrance: "", score: "" },
            { name: "南京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
            { name: "北京", time: "11月12日", entrance: "", score: "" },
         ],
      };
   },
   methods: {},
   /**分享按钮 */
   onNavigationBarButtonTap() {
      this.$refs.popup.open();
   },
};
</script>

<style lang="scss" scoped>
.content {
   width: 90vw;
   margin: 20px auto;

   .title {
      font-size: 40rpx;
      text-align: center;
      display: block;
   }
   .concern {
      display: block;
      text-align: center;
      margin: 20rpx 0;
      color: red;
      font-size: 30rpx;
   }
   > table {
      width: 100%;
      font-size: 35rpx;
      tr,
      th {
         text-align: center;
         a {
            color: #00207c;
         }
      }
   }
}
</style>
