<template>
   <view class="mainBox">
      <u-cell-group class="add" :border="false">
         <u-cell @click="mix_jumpUrl('/pages/user/Information/AddAddress')" icon="tags" title="新增地址" isLink :border="false"></u-cell>
      </u-cell-group>
      <view class="line"></view>
      <view class="content">
         <u-cell title="收货人信息" :border="false"></u-cell>
         <u-line></u-line>
         <u-cell :border="false" v-for="item in addressList" :key="item.id" :label="item.detail" :arrow="false">
            <template #title>
               <view class="cellTitle">
                  <text>{{ item.addressUserName }}</text>
                  <text>{{ item.mobile }}</text>
               </view>
            </template>
            <template #value>
               <u-tag v-if="item.defaultTag" text="默认" type="success" size="mini"></u-tag>
               <u-icon class="rightIcon" name="more-dot-fill" @click="actionSheetShow(item)"></u-icon>
            </template>
         </u-cell>
         <u-action-sheet :actions="list" :show="show" cancelText="取消" @select="actionSheetClick" @close="show = false"></u-action-sheet>
      </view>
   </view>
</template>

<script>
import { getAddressListAPI, postEditAddressAPI, postdeleteAddressAPI } from "@/servers/ServersUser";
export default {
   data() {
      return {
         addressList: [],
         show: false,
         list: [
            { name: "设为默认" },
            { name: "修改地址" },
            {
               name: "删除地址",
               color: "#f56c6c",
            },
         ],
         nowData: {},
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
      actionSheetShow(info) {
         this.nowData = info;
         this.show = true;
      },
      async actionSheetClick({ name }) {
         switch (name) {
            case "设为默认":
               this.nowData.defaultTag = 1;
               await postEditAddressAPI(this.nowData).then(async res => {
                  if (res.code === 200) {
                     uni.showToast({ title: "设置成功", icon: "none" });
                     await this.getAddressList();
                  }
               });
               break;
            case "修改地址":
               this.mix_jumpUrl("/pages/user/Information/AddAddress", this.nowData);
               break;
            case "删除地址":
               await postdeleteAddressAPI({ id: this.nowData.id }).then(async res => {
                  if (res.code === 200) {
                     uni.showToast({ title: "删除成功", icon: "none" });
                     await this.getAddressList();
                  }
               });
               break;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-flow: column nowrap;
   .add {
      flex: 0;
      background: #fff;
      margin-bottom: 10rpx;
   }
   .line {
      flex-shrink: 0;
      background-color: #f5f5f5;
      width: 100vw;
      height: 10rpx;
   }
   .content {
      flex: 1;
      overflow: auto;
      padding: 0 3vw;
      box-sizing: border-box;
      background: #fff;
      .cellTitle {
         display: flex;
         align-items: center;
         justify-content: flex-start;
         text {
            display: block;
            margin-right: 30rpx;
         }
      }
      .rightIcon {
         font-size: 30rpx;
         transform: rotateZ(90deg);
         margin-left: 20rpx;
      }
      .hoverIcon {
         opacity: 0.5;
      }
   }
}
</style>
