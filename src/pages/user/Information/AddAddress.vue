<template>
   <view class="mainBox">
      <u-form labelPosition="top" labelWidth="80px">
         <u-form-item label="联系人">
            <u-input v-model="form.addressUserName" placeholder="请输入联系人"></u-input>
         </u-form-item>
         <u-form-item label="联系电话">
            <u-input v-model="form.mobile" placeholder="请输入联系电话"></u-input>
         </u-form-item>
         <u-form-item label="地址" @click="show = true">
            <u-input v-model="address" placeholder="请输入地址" disabled></u-input>
         </u-form-item>
         <u-form-item label="详细地址">
            <u-textarea v-model="detail" placeholder="请输入详细地址" count maxlength="25"></u-textarea>
         </u-form-item>
         <u-form-item>
            <u-button @click="submit" type="success" size="large" text="保存"></u-button>
         </u-form-item>
      </u-form>

      <u-picker :show="show" ref="uPicker" :columns="columns" @change="changeHandler" @confirm="saveAddress" @cancel="show = false"></u-picker>
   </view>
</template>

<script>
import addressOptions from "@/static/json/address.json";
export default {
   data() {
      return {
         addressOptions,
         address: "",
         detail: "",
         form: {
            addressUserName: "",
            detail: "",
            defaultTag: 0,
            mobile: "",
         },
         show: false,
         columns: [[], [], []],
      };
   },
   created() {
      // console.log(addressOptions);
      this.setColumns();
   },
   methods: {
      setColumns() {
         this.addressOptions.forEach(item => {
            this.columns[0].push(item.value);
         });
         this.addressOptions[0].children.forEach(item => {
            this.columns[1].push(item.value);
         });
         this.addressOptions[0].children[0].children.forEach(item => {
            this.columns[2].push(item.value);
         });
      },
      changeHandler(e) {
         console.log(e);
         const { columnIndex, index, indexs, picker = this.$refs.uPicker } = e;
         if (columnIndex === 0) {
            let level1 = [];
            let level2 = [];
            this.addressOptions[indexs[0]].children.forEach(item => {
               level1.push(item.value);
            });
            this.addressOptions[indexs[0]].children[0].children.forEach(item => {
               level2.push(item.value);
            });
            picker.setColumnValues(1, level1);
            picker.setColumnValues(2, level2);
         }
         if (columnIndex === 1) {
            let level2 = [];
            this.addressOptions[indexs[0]].children[indexs[1]].children.forEach(item => {
               level2.push(item.value);
            });
            picker.setColumnValues(2, level2);
         }
      },
      saveAddress({ value }) {
         this.address = value.join("-");
         this.show = false;
      },
      submit() {},
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 90vw;
   margin: auto;
   /deep/ .u-textarea {
      width: 100% !important;
   }
   /deep/ .u-picker {
      .u-picker__view__column__item {
         font-size: 28rpx !important;
      }
   }
}
</style>
