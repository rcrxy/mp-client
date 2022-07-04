<template>
   <view class="navbar">
      <!-- #ifdef APP-PLUS -->
      <view style="height: var(--status-bar-height); width: 100%"></view>
      <!-- #endif -->
      <view class="content">
         <view v-if="true" class="address" @click="changePopup">
            <u-icon name="map" size="20"></u-icon>
            <text class="name">{{ nowProvince || getProvince || "北京市" }}</text>
         </view>
         <view class="status_bar" @click="mix_jumpUrl('/pages/practice/practice')">
            <u-search disabled :placeholder="placeholder" v-model="searchValue" :show-action="false"></u-search>
         </view>
         <u-icon class="customerService" name="kefu-ermai" color="#000000" size="20" @click="mix_jumpUrl('/pages/common/CustomerService')"></u-icon>
      </view>

      <uni-popup ref="popup" type="bottom">
         <view class="popupContent">
            <view class="top">
               <view class="left"></view>
               <view class="title">选择省份</view>
               <u-icon @click="closePopup" name="close" size="20"></u-icon>
            </view>
            <view class="now">
               <text>当前定位:</text>
               <u-tag :text="getProvince" @click="setProvince(getProvince)" plain></u-tag>
            </view>
            <scroll-view class="list" scroll-y="true">
               <u-cell-group>
                  <u-cell v-for="(item, index) in provinceOptions" :key="index" :title="item.label" @click="setProvince(item.label)" clickable></u-cell>
               </u-cell-group>
            </scroll-view>
         </view>
      </uni-popup>
   </view>
</template>

<script>
import provinceJson from "@static/json/province.json";
import { addressInverseCodingAPI } from "@/servers/ServersCommon";
import { requestAndroidPermission } from "@/common/permission";
import { getUserInfoAPI } from "@/servers/ServersCommon";
import { postSetUserInfoAPI } from "@/servers/ServersUser";
export default {
   name: "NavBar",
   data() {
      return {
         provinceOptions: provinceJson[0],
         searchValue: "",
         placeholder: "大家都在搜：成人高考",
         nowProvince: "",
         getProvince: "",
      };
   },
   created() {
      this.getAddress();
   },
   methods: {
      async getUserInfo() {
         const { code, data } = await getUserInfoAPI();
         if (code === 200) {
            return data;
         }
      },

      async changePopup() {
         let result = true;
         // #ifdef APP-PLUS
         result = await requestAndroidPermission("android.permission.ACCESS_FINE_LOCATION");
         console.log("result", result);
         // #endif

         if (result == 1) {
            this.getAddress(false);
            this.$refs.popup.open();
         } else {
            uni.showToast({
               icon: "none",
               title: "您拒绝了位置授权，请先手机权限设置中打开",
            });
         }
      },
      async getAddress(passive = true) {
         uni.getLocation({
            type: "gcj02",
            complete: val => {
               const { latitude, longitude } = val;
               if (latitude && longitude) {
                  const sendData = {
                     postStr: {
                        lon: longitude,
                        lat: latitude,
                        ver: 1,
                     },
                     type: "geocode",
                     tk: "075ae04a49af312b01870f400d9f1ba1",
                  };

                  addressInverseCodingAPI(sendData).then(async data => {
                     const {
                        result: { addressComponent },
                     } = data;
                     this.getProvince = addressComponent.province || "获取失败";
                     if (passive) {
                        const info = await this.getUserInfo();
                        if (!info.province || info.province == "null") postSetUserInfoAPI({ province: this.getProvince });
                     }
                  });
               }
            },
         });
      },

      /**选择省份 */
      setProvince(val) {
         if (val === "获取失败") {
            this.getProvince();
         } else {
            this.nowProvince = val;
            postSetUserInfoAPI({ manualProvince: val });
            this.$refs.popup.close();
         }
      },

      closePopup() {
         this.$refs.popup.close();
      },
   },
};
</script>

<style lang="scss" scoped>
.navbar {
   width: 100vw;
   box-sizing: border-box;
   position: fixed;
   background-color: #fff;
   z-index: 1024;

   .content {
      width: 100vw;
      height: 44px;
      padding: 7px 3vw;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .address {
         display: flex;
         align-items: center;
         justify-content: center;
         padding: 0 10rpx;

         .name {
            font-size: 30rpx;
            max-width: 4em;
            font-style: normal;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            -icab-text-overflow: ellipsis;
            -khtml-text-overflow: ellipsis;
            -moz-text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
         }
      }

      .status_bar {
         flex: 1;
         display: flex;
         flex-direction: row;
         align-items: center;
         justify-content: space-between;
         .left {
            display: flex;
         }

         .u-search {
            margin: 0 10rpx !important;
         }
      }

      .customerService {
         padding: 0 10rpx;
      }

      .address,
      .status_bar,
      .customerService {
         &:active {
            opacity: 0.5;
         }
      }
   }
}

.popupContent {
   height: 60vh;
   background-color: #fff;
   overflow: hidden;
   position: relative;
   border-top-left-radius: 30rpx;
   border-top-right-radius: 30rpx;

   .top {
      height: 110rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 35rpx;
      box-sizing: border-box;
      padding: 30rpx;

      .left {
         width: 20px;
         height: 20px;
      }
   }

   .now {
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 30rpx;
      box-sizing: border-box;
      padding: 0 30rpx;
      > text {
         margin-right: 20rpx;
      }
   }
   .list {
      margin-top: 10rpx;
      height: calc(100% - 180rpx);
      position: relative;

      .listContent {
         height: 100%;
      }
   }
}
</style>
