<template>
   <view>
      <u-navbar title="模拟练习" placeholder :autoBack="true">
         <template slot="right">
            <view class="con" @click="changeCollect">
               <u-icon size="25" color="#fec673" :name="nowCollection ? 'star-fill' : 'star'"></u-icon>
            </view>
            <view class="page" @click="show = true">
               <u-icon size="25" color="#666666" name="grid"></u-icon>
            </view>
         </template>
      </u-navbar>

      <u-popup class="popup" ref="popup" @close="popupClose" :show="show" safeAreaInsetBottom>
         <scroll-view class="roundBox" scroll-y="true">
            <view class="roundList">
               <view class="round" v-for="index in quantityList" :key="index">
                  <text :class="index === nowIndex ? 'active' : ''" @click="setIndex(index)">{{ index + 1 }}</text>
               </view>
            </view>
         </scroll-view>
      </u-popup>
   </view>
</template>

<script>
import { postAddCollectionAPI, postCancelCollectionAPI } from "@/servers/ServersPractice";
import { postUserCollectionAPI } from "@/servers/ServersUser";
import { mapState, mapMutations } from "vuex";

export default {
   props: {
      barTitle: String,
      valueId: String | Number,
      quantity: String | Number,
      value: {
         type: String | Number,
         default: 1,
      },
   },
   computed: {
      ...mapState({
         problemList: (state) => state.problemList,
      }),
      nowIndex: {
         get() {
            this.isCollection(this.value);
            return this.value;
         },
         set() {
            this.$emit("update:value");
         },
      },
      quantityList() {
         let list = [];
         for (let i = 0; i < this.quantity; i++) {
            list.push(i);
         }
         return list;
      },
   },

   data() {
      return {
         show: false,
         nowCollectionId: null,
         nowCollection: false,
         // problemList: [],
      };
   },
   created() {
      this.isCollection();
   },
   methods: {
      ...mapMutations(["setProblemList"]),
      changeCollect() {
         const collect = this.problemList[this.nowIndex].isCollection;
         if (collect) {
            this.postCancelCollection(this.nowIndex);
         } else {
            this.postAddCollection(this.nowIndex);
         }
         this.problemList[this.nowIndex].isCollection = !collect;
         this.isCollection();
      },

      async postAddCollection(index) {
         const sendData = { valueId: this.valueId, valueType: "question" };
         const { code } = await postAddCollectionAPI(sendData);
         if (code === 200) {
            uni.showToast({ icon: "none", title: "收藏成功" });
            const { code: colCode, data } = await postUserCollectionAPI({ valueType: "question" });
            if (colCode === 200) {
               let now = data.filter((item) => item.valueType === "question").find((item) => item.valueId == this.valueId);
               this.problemList[index].collectionId = now.collectionId;
               this.nowCollectionId = now.collectionId;
               this.setProblemList(this.problemList);
            }
         }
      },
      async postCancelCollection(index) {
         const { code } = await postCancelCollectionAPI({ collectionId: this.nowCollectionId });
         if (code === 200) {
            uni.showToast({ icon: "none", title: "取消收藏成功" });
            this.problemList[index].collectionId = null;
            this.nowCollectionId = null;
            this.setProblemList(this.problemList);
         }
      },
      popupClose() {
         this.show = false;
      },
      setIndex(index) {
         this.nowIndex = index;
         this.$emit("indexChange", index);
         this.popupClose();
      },
      async isCollection(nowIndex) {
         if (nowIndex || nowIndex == 0) {
            this.nowCollection = this.problemList[nowIndex]?.isCollection;
            this.nowCollectionId = this.problemList[nowIndex]?.collectionId;
         } else {
            this.nowCollection = this.problemList[this.nowIndex]?.isCollection;
            this.nowCollectionId = this.problemList[this.nowIndex]?.collectionId;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.u-popup {
   .roundBox {
      width: 100%;
      height: 60vh;
      padding: 50rpx 2vw;
      box-sizing: border-box;
      // overflow-y: auto;
      .roundList {
         width: 100%;
         display: flex;
         align-items: flex-start;
         justify-content: flex-start;
         align-content: center;
         flex-wrap: wrap;
         .round {
            width: 20%;
            margin: 15rpx 0;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            text {
               display: block;
               width: 65rpx;
               height: 65rpx;
               border: 1px solid #00cba1;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
            }
            .active {
               background-color: #00cba1;
               color: #fff;
            }
         }
      }
   }
}
</style>
