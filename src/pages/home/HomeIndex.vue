<template>
   <view class="home">
      <v-nav-bar></v-nav-bar>

      <image class="banner" src="~static/images/homeBanner.png" mode="widthFix" />

      <uni-grid class="synthesis" :column="4" :showBorder="false" :square="false">
         <uni-grid-item>
            <image src="~static/images/homeCol1.png" mode="widthFix" @click="jumpUrl('/pages/home/tabs/ScoreQuery')" />
            <text class="text">成绩查询</text>
         </uni-grid-item>
         <uni-grid-item>
            <image src="~static/images/homeCol2.png" mode="widthFix" @click="jumpUrl('')" />
            <text class="text">我的课程</text>
         </uni-grid-item>
         <uni-grid-item>
            <image src="~static/images/homeCol3.png" mode="widthFix" @click="jumpUrl('/pages/home/tabs/Guide')" />
            <text class="text">成考指南</text>
         </uni-grid-item>
         <uni-grid-item>
            <image src="~static/images/homeCol4.png" mode="widthFix" @click="jumpUrl('/pages/home/tabs/Answering')" />
            <text class="text">在线答疑</text>
         </uni-grid-item>
      </uni-grid>

      <view class="process">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">报考流程</text>
            </view>
         </view>
         <uni-grid class="uniGrid" :column="2" :showBorder="false" :square="false">
            <uni-grid-item><image src="~static/images/process1.png" mode="widthFix" @click="jumpUrl('/pages/home/applyProcess/Time')" /></uni-grid-item>
            <uni-grid-item><image src="~static/images/process2.png" mode="widthFix" @click="jumpUrl('/pages/home/applyProcess/Entrance')" /></uni-grid-item>
            <uni-grid-item><image src="~static/images/process3.png" mode="widthFix" @click="jumpUrl('/pages/home/applyProcess/ExamSubjects')" /></uni-grid-item>
            <uni-grid-item><image src="~static/images/process4.png" mode="widthFix" @click="jumpUrl('/pages/home/applyProcess/Condition')" /></uni-grid-item>
         </uni-grid>
      </view>

      <view class="news">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">最新资讯</text>
            </view>
            <view class="right" @click="jumpUrl('/pages/home/News')">
               <text>更多资讯</text>
               <u-icon name="arrow-right"></u-icon>
            </view>
         </view>
         <view class="content">
            <view class="left">
               <image src="~static/images/homeNews.png" mode="widthFix" />
            </view>
            <view class="right">
               <text class="title">{{ news.title }}</text>
               <text class="paragraph">{{ news.value }}</text>

               <text class="goAll" @click="jumpUrl('/pages/home/News')">查看全部>></text>
            </view>
         </view>
      </view>

      <view class="specialized">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">院校专业</text>
            </view>
            <view class="right" @click="jumpUrl('/pages/home/Specialized')">
               <text>更多院校</text>
               <u-icon name="arrow-right"></u-icon>
            </view>
         </view>
         <view class="content">
            <view class="li" v-for="(item, index) in specializedList" :key="index">
               <image class="left" :src="item.img" mode="widthFix" />
               <view class="middle">
                  <text class="title">{{ item.title }}</text>
                  <text class="summary">{{ item.label }}</text>
               </view>
               <image class="right" src="~static/images/homeMore.png" mode="widthFix" @click="jumpUrl('/pages/home/Specialized')" />
            </view>
         </view>
      </view>

      <view class="project">
         <view class="columnTitle">
            <view class="left">
               <view class="leftIcon"></view>
               <text class="text">热门课程</text>
            </view>
            <view class="right" @click="jumpProject('more')">
               <text>更多课程</text>
               <u-icon name="arrow-right"></u-icon>
            </view>
         </view>
         <view class="content">
            <view class="li" v-for="(item, index) in projectList" :key="index" @click="jumpProject(item)">
               <view class="left">
                  <image src="~static/images/projectBack.png" mode="widthFix" />
                  <text>{{ item.title }}</text>
               </view>
               <view class="middle">
                  <text class="title">{{ item.title }}</text>
                  <view class="purchases">
                     <u-count-to :start-val="1" :end-val="item.label" separator="," font-size="13"></u-count-to>
                     <text>人购买</text>
                  </view>
               </view>
               <view class="right">
                  <image src="~static/images/homePay.png" mode="widthFix" />
               </view>
            </view>
         </view>
      </view>
   </view>
</template>

<script>
import vNavBar from "@/components/NavBar.vue";
import qs from "qs";
export default {
   components: {
      vNavBar,
   },
   data() {
      return {
         footerIndex: 0,
         images: ["https://img01.yzcdn.cn/vant/apple-1.jpg", "https://img01.yzcdn.cn/vant/apple-2.jpg"],
         news: {
            title: "2021最新知识点",
            value: "会计学专业培养具有良好思想道德品质，进一步系统地掌握本科水平的会计...",
         },
         specializedList: [
            { title: "经管类热门专业", label: "电子商务、物流管理", img: require("static/images/specialized1.png") },
            { title: "医学类热门专业", label: "护理学、动物医学", img: require("static/images/specialized2.png") },
            { title: "理工类热门专业", label: "软件工程、电子信息工程", img: require("static/images/specialized3.png") },
         ],
         projectList: [
            { title: "高数(一)", name: "高数(一)", label: "1021" },
            { title: "大学语文", name: "大学语文", label: "234" },
            { title: "高数(一)", name: "高数(一)", label: "1024" },
            { title: "高数(一)", name: "高数(一)", label: "3068" },
         ],
      };
   },
   methods: {
      jumpUrl(url) {
         uni.navigateTo({ url });
      },
      jumpProject(info) {
         if (info === "more") {
            uni.switchTab({ url: "/pages/project/ProjectIndex" });
         } else if (info) {
            uni.navigateTo({
               url: `/pages/project/ProjectContent?${qs.stringify(info)}`,
            });
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.banner {
   display: block;
   width: 90vw;
   margin: 84px auto 20rpx;
}

.synthesis {
   width: 90vw;
   background-color: #fff;
   // border-radius: 10px;
   margin: 40rpx auto;
   .uni-grid-item {
      text-align: center;
      image {
         margin: auto;
         width: 75%;
         flex-shrink: 0;
      }
      text {
         font-size: 28rpx;
      }
   }
}

.columnTitle {
   width: 90vw;
   height: 36rpx;
   margin: 50rpx auto 30rpx;
   display: flex;
   align-items: center;
   justify-content: space-between;

   .left {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .leftIcon {
         display: block;
         width: 7.5rpx;
         height: 45rpx;
         background-color: #10cea2;
         margin-right: 10rpx;
      }
      .text {
         font-size: 40rpx;
         font-weight: 500;
      }
   }

   .right {
      font-size: 25rpx;
      color: rgba(0, 0, 0, 0.7);
      padding: 5rpx 15rpx;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 25rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      opacity: 0.5;
   }
}

.process {
   width: 90vw;
   margin: auto;
   .uniGrid {
      width: 90vw;
      image {
         width: 100%;
      }
   }
}

.news {
   width: 90vw;
   margin: auto;

   .content {
      width: 100%;
      margin: auto;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      .left {
         flex-shrink: 0;
         width: 200rpx;
         margin-right: 30rpx;
         display: flex;
         align-items: center;
         justify-content: center;
         image {
            width: 100%;
         }
      }
      .right {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         text {
            display: block;
         }

         .title {
            font-size: 35rpx;
            font-weight: 500;
            margin-bottom: 5rpx;
         }
         .paragraph {
            font-size: 26rpx;
            opacity: 0.5;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
         }

         .goAll {
            color: #10cea2;
            font-size: 26rpx;
            text-align: right;
         }
      }
   }
}

.specialized {
   width: 90vw;
   margin: auto;
   .content {
      width: 90vw;
      .li {
         width: 100%;
         height: auto;
         margin: 30rpx 0;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .left {
            width: 100rpx;
            flex-shrink: 0;
         }
         .middle {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            box-sizing: border-box;
            padding-left: 25rpx;
            text {
               display: block;
               margin: 5rpx;
            }
            .title {
               font-size: 35rpx;
               color: #333333;
            }
            .summary {
               font-size: 25rpx;
            }
         }
         .right {
            flex-shrink: 0;
            width: 140rpx;
         }
      }
   }

   .con {
      .van-cell--borderless {
         image {
            width: 18vw;
            margin-right: 2vw;
         }
      }
      .van-cell__title {
         font-size: 1.1rem;
         font-weight: 500;
      }

      .rightIcon {
         width: 4rem;
         transform: translateY(75%);
      }
   }
}

.project {
   width: 90vw;
   margin: auto;
   .content {
      width: 100%;
      .li {
         width: 100%;
         margin: 20rpx 0;
         display: flex;
         align-items: stretch;
         justify-content: space-between;
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
            width: 140rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            image {
               width: 100%;
            }
         }
      }
   }
}
</style>
