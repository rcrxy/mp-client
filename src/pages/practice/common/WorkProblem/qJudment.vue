<template>
   <view class="q_box">
      <!-- <text>{{ info }}</text> -->
      <view class="question">
         <u-tag class="tag" :text="info.questionType" size="mini" type="success"></u-tag>
         <rich-text :nodes="info.question"></rich-text>
      </view>

      <checkbox-group>
         <label>
            <checkbox value="cb" checked="true" />
            正确
         </label>
         <label>
            <checkbox value="cb" />
            错误
         </label>
      </checkbox-group>

      <view class="showParse">
         <text @click="showParse = !showParse">{{ showParse ? "隐藏解析" : "显示解析" }}</text>
      </view>
      <view class="parse" v-if="showParse">
         <text class="answer">正确答案：{{ info.answer }}</text>
         <text class="answer">你的答案：{{ userAnswer }}</text>
         <view class="analysis">
            <text class="title">解析：</text>
            <rich-text v-if="info.analysis !== 'undefined'" :nodes="info.analysis"></rich-text>
            <text v-else>本题目暂无解析</text>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   props: {
      info: {
         type: Object,
         default: () => ({}),
      },
   },
   data() {
      return {
         userAnswer: "",
         showParse: false,
      };
   },
   methods: {
      radioChange(val) {
         const {
            detail: { value },
         } = val;
         this.userAnswer = value;
         this.$emit("getUserAnswer", value);

         if (this.userAnswer) {
            this.showParse = true;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.q_box {
   width: 100%;
   height: 100%;
   font-size: 35rpx;
}

.question {
   width: 100%;
   .tag {
      display: inline-block;
      vertical-align: middle;
   }
}

radio-group {
   width: 100%;
   label {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin: 10rpx 0;
      radio {
         flex-shrink: 0;
         font-size: initial;
      }
      rich-text {
         flex: 1;
      }
   }
}
.showParse {
   width: 100%;
   margin-top: 30rpx;
   display: flex;
   align-items: center;
   justify-content: flex-end;
   > text {
      font-size: 30rpx;
      color: #00cba1;
   }
}

::v-deep .parse {
   .answer {
      display: block;
      border-radius: 10rpx;
      font-size: 35rpx;
      margin: 10rpx 0;
   }
   .analysis {
      width: 100%;
      box-sizing: border-box;
      padding: 30rpx;
      background-color: #f5f5f5;
      border-radius: 10rpx;
      font-size: 35rpx;
      .title {
         margin-bottom: 10rpx;
         font-weight: 500;
      }
   }
}
</style>
