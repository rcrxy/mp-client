<template>
   <view class="navbar">
      <!-- #ifdef APP-PLUS -->
      <view style="height: var(--status-bar-height); width: 100%"></view>
      <!-- #endif -->
      <view class="content">
         <!-- #ifdef APP-PLUS -->
         <view v-if="false" class="address" @click="showPicker = !showPicker">
            <u-icon name="map" size="20"></u-icon>
            <text class="name">{{ nowProvince }}</text>
         </view>
         <!-- #endif -->
         <view class="status_bar" @click="mix_jumpUrl('/pages/practice/practice')">
            <u-search disabled :placeholder="placeholder" v-model="searchValue" :show-action="false"></u-search>
         </view>
         <u-icon class="customerService" name="kefu-ermai" color="#000000" size="20" @click="mix_jumpUrl('/pages/common/CustomerService')"></u-icon>
      </view>

      <u-picker :show="showPicker" :columns="provinceOptions" keyName="label" @cancel="showPicker = false" @confirm="handlderConfirm"></u-picker>
   </view>
</template>

<script>
import provinceOptions from "@static/json/province.json";
export default {
   name: "NavBar",
   data() {
      return {
         provinceOptions,
         searchValue: "",
         placeholder: "大家都在搜：成人高考",
         showPicker: false,
         nowProvince: "",
      };
   },
   created() {
      uni.getLocation({
         type: "gcj02",
         geocode: true,
         success: res => {
            // #ifdef APP-PLUS
            const { address } = res;
            this.nowProvince = address.province?.replace("省", "");
            // #endif
         },
      });
   },
   methods: {
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
            max-width: 3em;
            display: flex;
            align-items: center;
            justify-content: flex-start;
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
