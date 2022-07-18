<template>
   <view class="mainBox">
      <view class="statusBar" style="min-height: var(--status-bar-height); width: 100%"></view>
      <view class="navBar">
         <view class="top">
            <text>题库</text>
            <u-search v-model="form.className" @search="handlerSearch" @clear="handlerSearch" :placeholder="placeholder" clearabled :show-action="false"></u-search>
            <!-- <uni-search-bar v-model="form.className" @confirm="handlerSearch" radius="30" :placeholder="placeholder"></uni-search-bar> -->
         </view>
         <view class="bottom">
            <view class="button">
               <text @click="changePopupShow('level')">{{ form.level || "全部层次" }}</text>
               <view class="line"></view>
               <text @click="changePopupShow('category')">{{ form.category || "全部类别" }}</text>
            </view>
         </view>
      </view>

      <view class="popup" :style="popupStyle">
         <text v-for="(item, index) in list" :key="index" :class="item.class" @click="itemClick(item)">{{ item.label }}</text>
      </view>
   </view>
</template>

<script>
import { getCourseLevel_API, getCourseCategory_API } from "@/servers/ServersPractice";
import bus from "@/uitls/bus";

export default {
   data() {
      return {
         placeholder: "大家都在搜: 成人高考",
         list: [],
         levelList: [],
         categoryList: [],
         popupStyle: "",
         showPopup: false,
         timeout: true,
         nowType: "",
         form: {
            className: "",
            level: "",
            category: "",
         },
      };
   },
   created() {
      this.getCourseLevel();
      this.getCourseCategory();
   },
   methods: {
      /** 获取课程层次 */
      async getCourseLevel() {
         const { code, data } = await getCourseLevel_API();
         if (code === 200) {
            this.levelList = data;
         }
      },
      /** 获取课程类别 */
      async getCourseCategory(level) {
         const { code, data } = await getCourseCategory_API({ level });
         if (code === 200) {
            this.categoryList = data;
         }
      },
      async changePopupShow(type) {
         if (this.timeout) {
            this.timeout = false;
            setTimeout(() => {
               this.timeout = true;
            }, 300);

            this.popupStyle = this.popupStyle ? "" : "transform: translate(0, 100%);";
            if (type != this.nowType && this.showPopup) {
               this.timeout = true;
               this.nowType = type;
               setTimeout(() => {
                  this.changePopupShow(type);
               }, 300);
            }
            if (type === "level") {
               this.nowType != type ? (this.list = this.levelList) : setTimeout(() => (this.list = this.levelList), 300);
            } else if (type === "category") {
               this.nowType != type ? (this.list = this.categoryList) : setTimeout(() => (this.list = this.categoryList), 300);
            }

            this.showPopup = !this.showPopup;
            this.nowType = type;
         }
      },
      async itemClick(item) {
         this.showPopup = false;
         this.popupStyle = "";
         if (this.nowType === "level") {
            this.levelList.forEach(key => (key.label === item.label ? (key.class = "on") : (key.class = "")));
            this.list = this.levelList;
            this.form.level = item.value;
            this.form.category = "";
            this.getCourseCategory(item.value);
         } else if (this.nowType === "category") {
            this.categoryList.forEach(key => (key.label === item.label ? (key.class = "on") : (key.class = "")));
            this.list = this.categoryList;
            this.form.category = item.value;
         }

         bus.$emit("searchCourse", this.form);
      },

      handlerSearch(value) {
         this.form.className = value;
         bus.$emit("searchCourse", this.form);
      },
   },
};
</script>

<style lang="scss" scoped>
.statusBar {
   position: relative;
   z-index: 1024;
   background-color: #ffffff;
}

.mainBox {
   position: fixed;
   top: 0;
   width: 100vw;
   box-sizing: border-box;
   z-index: 1024;
   background-color: #ffffff;

   .navBar {
      background-color: #ffffff;
      position: relative;
      z-index: 2;
      .top {
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 10rpx 4vw;
         box-sizing: border-box;
         > text {
            margin-right: 15rpx;
         }
      }
      .bottom {
         width: 100%;
         position: relative;
         z-index: 10;
         background-color: #ffffff;
         .button {
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text {
               display: block;
               width: 49%;
               height: 80rpx;
               text-align: center;
               line-height: 80rpx;
               font-size: 30rpx;
            }
            .line {
               height: 40rpx;
               width: 1px;
               background-color: #000000;
               opacity: 0.25;
            }
         }
      }
   }

   .popup {
      width: 100vw;
      height: auto;
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      transform: translate(0, 0);
      transition: all 0.3s;
      flex-flow: row wrap;
      box-sizing: border-box;
      padding: 2vw;
      border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
      background-color: #ffffff;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
      text {
         display: block;
         padding: 10rpx 15rpx;
         margin: 10rpx 15rpx;
         border: 1px solid #3c9cff;
         float: left;
         border-radius: 5px;
         font-size: 25rpx;
      }
      .on {
         background-color: #3c9cff;
         color: #ffffff;
      }
   }
}
</style>
