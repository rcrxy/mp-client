<template>
   <view class="mainBox">
      <view class="testContent">
         <view class="top">
            <text class="tag">{{ nowTest.type }}</text>
            <text>{{ nowTest.content }}</text>
         </view>
         <view class="bottom">
            <u-radio-group v-model="radioValue" @change="radioGroupChange" placement="column">
               <u-radio @change="radioChange" v-for="(item, index) in radioOptions" :key="index" :name="item.value" :label="item.label + '：' + item.value" size="22" iconSize="20" labelSize="16"></u-radio>
            </u-radio-group>
         </view>
      </view>

      <u-grid class="grid" col="4" :border="false" clickable>
         <u-grid-item>
            <u-icon size="25" color="#fec673" @click="isCollection = !isCollection" :name="isCollection ? 'star' : 'star-fill'"></u-icon>
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
         <u-grid-item>
            <u-icon size="25" color="#666666" name="grid"></u-icon>
            <text>{{ 1 }}/{{ 10 }}</text>
         </u-grid-item>
      </u-grid>
      <u-modal :show="modalShow" showCancelButton @confirm="quitPage" @cancel="cancel" title="确定退出？" content="已做题目将不会进行保存"></u-modal>
   </view>
</template>

<script>
export default {
   data() {
      return {
         radioValue: "",
         radioOptions: [],
         isCollection: false,
         nowTest: { type: "单选题", content: "在下列每组单词中,有一个单词的划线部分与其他单词的划线部分的读音不同。找出这个词。", answer: "A", options: { A: "game", B: "made", C: "hate", D: "mad" } },
         test: [
            { type: "单选题", content: "这是一个单选题", answer: "A", options: { A: "1", B: 2, C: 3, D: 4 } },
            { type: "单选题", content: "这是一个单选题", answer: "A", options: { A: "1", B: 2, C: 3, D: 4 } },
            { type: "单选题", content: "这是一个单选题", answer: "A", options: { A: "1", B: 2, C: 3, D: 4 } },
            { type: "单选题", content: "这是一个单选题", answer: "A", options: { A: "1", B: 2, C: 3, D: 4 } },
         ],
         modalShow: false,
         isQuit: false,
      };
   },
   watch: {
      isCollection(val) {
         this.$toast.success(val ? "收藏成功" : "取消收藏");
      },
      nowTest: {
         handler({ options }) {
            Object.keys(options).forEach(item => {
               this.radioOptions.push({ label: item, value: options[item] });
            });
         },
         deep: true,
         immediate: true,
      },
   },
   onBackPress(e) {
      if (!this.isQuit) {
         this.modalShow = true;
         return true;
      } else {
         return false;
      }
   },
   methods: {
      radioGroupChange() {},
      radioChange() {},
      quitPage() {
         this.modalShow = false;
         this.isQuit = true;
         uni.navigateBack({});
      },
      cancel() {
         this.modalShow = false;
         this.isQuit = false;
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: 100vh;
   background: #f5f5f5;
   .top {
      text {
         line-height: 32rpx;
         font-size: 30rpx;
      }
      .tag {
         padding: 0 3px;
         margin: 0 3px;
         border-radius: 30rpx;
         background: #00cba1;
         color: #fff;
         font-size: 26rpx;
         vertical-align: middle;
      }
   }
   .testContent {
      width: 90vw;
      margin: auto;
      .botton {
         margin-top: 0.75rem;
         .van-radio-group {
            .van-radio {
               margin: 0.5rem 0;
            }
         }
      }
   }
   .bottom {
      margin: 20rpx 0;
      .u-radio {
         margin: 10rpx 0;
      }
   }
   .grid {
      width: 100vw;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      padding: 15px 0;
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
</style>
