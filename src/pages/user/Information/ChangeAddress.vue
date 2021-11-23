<template>
   <view class="mainBox">
      <u-cell-group class="add" :border="false">
         <u-cell @click="jumpUrl('/pages/user/Information/AddAddress')" icon="tags" title="新增地址" isLink :border="false"></u-cell>
      </u-cell-group>
      <view class="content">
         <u-cell title="收货人信息" :border="false"></u-cell>
         <u-line></u-line>
         <u-cell :border="false" isLink v-for="item in addressList" :key="item.id" :title="item.detail" :label="item.addressUserName" :value="item.defaultTag ? '默认' : ''"></u-cell>
      </view>
   </view>
</template>

<script>
import { getAddressListAPI } from "@/servers/ServersUser";
export default {
   data() {
      return {
         addressList: [],
      };
   },
   onShow() {
      this.getAddressList();
   },
   methods: {
      async getAddressList() {
         let { code, data } = await getAddressListAPI();
         if (code === 200) {
            this.addressList = data;
         }
      },
      jumpUrl(url) {
         uni.navigateTo({ url });
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   min-height: 100vh;
   background: #f5f5f5;
   display: flex;
   flex-flow: column nowrap;
   .add {
      flex: 0;
      background: #fff;
      margin-bottom: 10rpx;
   }
   .content {
      flex: 1;
      overflow: auto;
      padding: 0 3vw;
      box-sizing: border-box;
      background: #fff;
   }
}
</style>
