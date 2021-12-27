<template>
   <view class="mainBox">
      <u-form labelPosition="top" labelWidth="100%">
         <u-form-item label="默认地址">
            <u-switch v-model="form.defaultTag" activeValue="1" inactiveValue="0" activeColor="#00cba1"></u-switch>
         </u-form-item>
         <u-form-item label="联系人">
            <u-input v-model="form.addressUserName" placeholder="请输入联系人" maxlength="6"></u-input>
         </u-form-item>
         <u-form-item label="联系电话">
            <u-input v-model="form.mobile" placeholder="请输入联系电话"></u-input>
         </u-form-item>
         <u-form-item label="地址" @click="show = true">
            <u-input v-model="address" placeholder="点击选择地址" disabled></u-input>
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
import { postaddAddressAPI, postEditAddressAPI } from "@/servers/ServersUser";
export default {
   data() {
      return {
         addressOptions,
         type: "add",
         address: "",
         detail: "",
         defaultTag: 0,
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
   onLoad(info) {
      if (Object.keys(info).length !== 0) {
         this.type = "edit";
         Object.keys(this.form).forEach(item => {
            if (item !== "detail") this.form[item] = info[item];
         });
         console.log(this.form);
         this.address = info.detail.slice(0, info.detail.indexOf(";"));
         this.detail = info.detail.slice(info.detail.indexOf(";") + 1);
      } else {
         this.type = "add";
      }
   },
   created() {
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
      async submit() {
         let title;
         switch (false) {
            case Boolean(this.form.addressUserName):
               title = "请输入联系人姓名";
               break;
            case Boolean(this.form.mobile):
               title = "请输入联系人电话";
               break;
            case this.mix_monileExp.test(this.form.mobile):
               title = "请输入正确的联系人电话";
               break;
            case Boolean(this.address):
               title = "请选择地址";
               break;
            case Boolean(this.detail):
               title = "请输入详细地址";
               break;
            default:
               title = null;
         }
         if (title) {
            uni.showToast({ title, icon: "none" });
         } else {
            try {
               let sendData = this.form;
               sendData.detail = this.address + ";" + this.detail;
               let res;

               switch (this.type) {
                  case "add":
                     res = await postaddAddressAPI(sendData);
                     if (res.code === 200) uni.showToast({ title: "添加成功", icon: "none" });
                     break;
                  case "edit":
                     res = await postEditAddressAPI(sendData);
                     if (res.code === 200) uni.showToast({ title: "修改成功", icon: "none" });
                     break;
               }
               if (res.code === 200) uni.navigateBack();
            } catch (err) {
               console.log(err);
            }
         }
      },
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
         width: 100%;
         font-size: 28rpx !important;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
   }
}
</style>
