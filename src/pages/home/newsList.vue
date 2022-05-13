<template>
   <view class="mainBox">
      <view class="li" v-for="(item, index) in newsList" :key="index" @click="mix_jumpUrl('/pages/home/News', { id: item.newsId })">
         <view class="item">
            <image v-if="item.newsPoster" :src="item.newsPoster" mode="aspectFill" />
            <image v-else src="~static/images/homeNews.png" mode="aspectFill" />
            <view class="text">
               <text class="title">{{ item.newsTitle }}</text>
               <text class="summary">{{ item.newsAbstract }}</text>
            </view>
         </view>
         <view class="line"></view>
      </view>
   </view>
</template>

<script>
import { getNewsAPI } from "@/servers/ServersHome";
export default {
   data() {
      return {
         isNetWork: true,
         newsList: [],
      };
   },
   created() {
      this.getNewsList();
   },
   onPullDownRefresh() {
      this.getNewsList();
      uni.stopPullDownRefresh();
   },
   methods: {
      async getNewsList() {
         // this.newsList = [
         //    { newsPoster: "https://www.jcjyjy.com/upload/images/2022/2/dc4c8d3e0b90399f.jpg", newsTitle: "江苏成人高考毕业率高吗", newsAbstract: "江苏成人高考毕业率高吗?关注江苏成考服务网最新资讯的考生可能会知道，成考改革之后，每年都有部分成考生不能顺利毕业。这主要是因为，成人高考已经脱离了只要入学考试通过每年交学费就万事大吉的老套路。但这也并不意味着江苏成考毕业难度很大。" },
         //    { newsPoster: "", newsTitle: "初中可以参加成人高考吗", newsAbstract: "初中毕业提升学历的方式有四种，自学考试、成人高考、网络远程教育、国家开放大学" },
         //    { newsPoster: "", newsTitle: "上班族如何提升学历", newsAbstract: "学历，在当今社会，至关重要，它意味着你有没有一个体面的工作，有没有升职加薪的空间，能不能在城市落户，能不能考研考公务员" },
         //    { newsPoster: "https://www.jcjyjy.com/upload/images/2021/12/9e263e6db8d734b9.jpg", newsTitle: "大专毕业怎么提升学历", newsAbstract: "大学专科生提升学历的方式有很多，可以通过自考，成人高考，远程教育，开放大学四种方式来提升学历，只要具备学信网可查的大专学历即可报考，" },
         //    { newsPoster: "", newsTitle: "2022成人自考本科需要考什么", newsAbstract: "每年的成人自考专业和院校考生可以根据自己的实际情况任意选择。目前比较热门的专业有：行政管理、汉语言文学、" },
         //    { newsPoster: "", newsTitle: "成人高考国家承认吗?", newsAbstract: "认可，成人高考属于国民教育系列，国民教育系列指纳入国家教育计划里的教育系列，其主管部门是国家教育部，通过这种方式颁发的文凭都是在教育部电子注册的，" },
         //    { newsPoster: "", newsTitle: "成人高考高升专分数线", newsAbstract: "因为成人高考的考试题目相对于比较简单，而且考试科目又少，所以分数线比较低。总分加在一起450分左右，而且成人高考的录取分数线较低，一般学校120分左右就会录取。平均算下来，每科只需考40分就可以达到录取分数线了。" },
         //    { newsPoster: "https://www.jcjyjy.com/upload/images/2021/12/56062da455d836c5.jpg", newsTitle: "2022年江苏成人高考加分政策", newsAbstract: "1、25周岁及以上（1994年8月31日及以前出生者），生活能够自理，且不影响本人所报专业学习的残疾人，省教育考试院可在考生文化考试成绩基础上增加50分投档，是否录取由招生院校确定。" },
         // ];
         const { code, data } = await getNewsAPI();
         if (code === 200) {
            this.newsList = data;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: auto;
   .li {
      width: 95vw;
      margin: auto;
      .item {
         box-sizing: border-box;
         width: 100%;
         padding: 20rpx 0;
         margin: auto;
         display: flex;
         align-items: flex-start;
         justify-content: flex-start;
         image {
            width: 200rpx;
            height: 120rpx;
            margin-right: 20rpx;
            flex-shrink: 0;
            border: 1rpx solid rgba($color: #000000, $alpha: 0.05);
            display: block;
            border-radius: 5rpx;
            overflow: hidden;
         }
         .text {
            flex: 1;
            .title {
               width: inherit;
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
               font-size: 35rpx;
               font-weight: 500;
            }
            .summary {
               margin-top: 10rpx;
               width: inherit;
               display: -webkit-box;
               text-overflow: ellipsis;
               -webkit-box-orient: vertical;
               -webkit-line-clamp: 2;
               font-size: 25rpx;
               opacity: 0.6;
               overflow: hidden;
               line-height: 30rpx;
            }
         }
      }
      .line {
         width: 99%;
         height: 1px;
         margin: 5rpx auto;
         background-color: #000000;
         opacity: 0.05;
      }
      &:last-of-type {
         .line {
            display: none;
         }
      }
   }
}
</style>
