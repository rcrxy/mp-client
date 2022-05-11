<template>
   <view class="footer_bar">
      <view class="gridBox">
         <u-grid class="grid" col="4" :border="false" clickable>
            <u-grid-item>
               <u-icon size="25" color="#fec673" @click="changeCollect" :name="collect ? 'star-fill' : 'star'"></u-icon>
               <text>收藏</text>
            </u-grid-item>
            <u-grid-item>
               <u-icon size="25" color="#00d4b9" name="checkmark-circle"></u-icon>
               <text>{{ 0 }}</text>
            </u-grid-item>
            <u-grid-item>
               <u-icon size="25" color="#d4000f" name="close-circle"></u-icon>
               <text>{{ 0 }}</text>
            </u-grid-item>
            <u-grid-item @click="show = true">
               <u-icon size="25" color="#666666" name="grid"></u-icon>
               <text>{{ nowIndex }}/{{ quantity }}</text>
            </u-grid-item>
         </u-grid>
      </view>
      <u-popup class="popup" ref="popup" @close="popupClose" :show="show" safeAreaInsetBottom>
         <scroll-view class="roundBox" scroll-y="true">
            <view class="roundList">
               <view class="round" v-for="index in quantity" :key="index">
                  <text :class="index === nowIndex ? 'active' : ''" @click="setIndex(index)">{{ index }}</text>
               </view>
            </view>
         </scroll-view>
      </u-popup>
   </view>
</template>

<script>
import { postAddCollectionAPI, postCancelCollectionAPI } from "@/servers/ServersPractice";
export default {
   props: {
      valueId: String | Number,
      quantity: String | Number,
      value: {
         type: String | Number,
         default: 1,
      },
      collection: Function,
      problemList: Array,
      isCollection: Boolean,
   },
   computed: {
      nowIndex: {
         get() {
            return this.value;
         },
         set() {
            this.$emit("update:value");
         },
      },
      collect: {
         get() {
            return this.isCollection;
         },
         set() {
            this.$emit("update:isCollection");
         },
      },
   },
   data() {
      return {
         show: false,
         nowCollectionId: "",
      };
   },

   methods: {
      changeCollect() {
         const condition = this.collect;
         this.collect = !condition;
         this.collect = true;
         console.log(this.collect);
      },

      async postAddCollection() {
         const sendData = { valueId: this.valueId, valueType: "question" };
         const { code } = await postAddCollectionAPI(sendData);
         if (code === 200) uni.showToast({ icon: "none", title: "收藏成功" });
      },
      async postCancelCollectionAPI() {
         const { code } = await postCancelCollectionAPI({ collectionId: this.nowCollectionId });
         if (code === 200) uni.showToast({ icon: "none", title: "取消成功" });
      },
      popupClose() {
         this.show = false;
      },
      setIndex(index) {
         this.nowIndex = index;
         this.$emit("indexChange", index);
         this.popupClose();
      },
   },
};
</script>

<style lang="scss" scoped>
.gridBox {
   height: 125rpx;
   position: fixed;
   bottom: 0;
   left: 0;
   background: #fff;
   display: flex;
   align-items: center;
   justify-content: center;
   border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
   .grid {
      width: 100vw;

      .u-icon {
         font-size: 30rpx;
      }
      text {
         display: block;
         margin-top: 5px;
         font-size: 25rpx;
      }
   }
}

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
