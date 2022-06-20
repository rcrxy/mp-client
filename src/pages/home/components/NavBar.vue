<template>
   <view class="navbar">
      <!-- #ifdef APP-PLUS -->
      <view style="height: var(--status-bar-height); width: 100%"></view>
      <!-- #endif -->
      <view class="content">
         <view v-if="true" class="address" @click="changePicker">
            <u-icon name="map" size="20"></u-icon>
            <text class="name">{{ nowProvince }}</text>
         </view>
         <view class="status_bar" @click="mix_jumpUrl('/pages/practice/practice')">
            <u-search disabled :placeholder="placeholder" v-model="searchValue" :show-action="false"></u-search>
         </view>
         <u-icon class="customerService" name="kefu-ermai" color="#000000" size="20" @click="mix_jumpUrl('/pages/common/CustomerService')"></u-icon>
      </view>

      <u-picker :show="showPicker" :defaultIndex="defaultIndex" :columns="provinceOptions" keyName="label" @cancel="showPicker = false" @confirm="handlderConfirm"></u-picker>

      <!-- <uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup> -->
   </view>
</template>

<script>
import provinceOptions from "@static/json/province.json";
import { addressInverseCodingAPI } from "@/servers/ServersCommon";
import { requestAndroidPermission } from "@/common/permission";
export default {
   name: "NavBar",
   data() {
      return {
         provinceOptions,
         searchValue: "",
         placeholder: "大家都在搜：成人高考",
         showPicker: false,
         nowProvince: "北京市",
         defaultIndex: [9],
      };
   },
   created() {
      this.getAddress();
   },
   methods: {
      async changePicker() {
         let result = true;
         // #ifdef APP-PLUS
         result = await requestAndroidPermission("android.permission.ACCESS_FINE_LOCATION");
         // #endif

         if (result == 1) {
            this.getAddress();
            this.showPicker = !this.showPicker;
         } else {
            uni.showToast({
               icon: "none",
               title: "您拒绝了位置授权，请先手机权限设置中打开",
            });
         }
      },
      async getAddress() {
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

                  addressInverseCodingAPI(sendData).then(data => {
                     const {
                        result: { addressComponent },
                     } = data;
                     this.nowProvince = addressComponent.province;
                     provinceOptions[0].forEach((item, index) => {
                        if (addressComponent.province === item.label) {
                           this.defaultIndex[0] = index;
                        }
                     });
                  });
               }
            },
         });
      },

      /**选择省份 */
      setProvince(val) {
         this.nowProvince = val;
         this.$refs.drawerLeft.close();
      },
      handlderConfirm(info) {
         const { value } = info;
         this.nowProvince = value[0].label;

         this.showPicker = false;
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
</style>
