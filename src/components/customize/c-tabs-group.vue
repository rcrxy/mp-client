<template>
   <view>
      <view class="c-tabs-group">
         <view class="c-tabs-group__title-box">
            <view class="c-tabs-group__title">
               <text class="c-tabs-group__title-text" v-for="(item, index) in list" :key="index" @click="titleClick(item, index)" :style="`width:${100 / list.length}% `">{{ item }}</text>
            </view>
            <view class="c-tabs-group__title-line" v-if="line" :style="`left:${lineLeft + distance * index}px`"></view>
         </view>
      </view>
   </view>
</template>

<script>
/**
 * @property {Array}    list           标题列表
 * @property {Object}   replace        属性名替换
 * @property {string}   replace.title  标题字段
 * @property {Boolean}  line           标题底部动态线条
 * @property {function} change         标签变化时返回标题及索引
 */

export default {
   name: "cTabsGroup",
   props: {
      list: Array,
      replace: Object,
      line: {
         type: Boolean,
         default: true,
      },
      value: [Number, String],
   },
   computed: {
      index: {
         get() {
            // this.titleClick(this.list[this.value], this.value);
            return this.value;
         },
         set() {
            this.$emit("update:value");
         },
      },
   },
   data() {
      return {
         lineLeft: 0,
         distance: 0,
      };
   },
   mounted() {
      this.setInitLineLeft();
   },
   methods: {
      setInitLineLeft() {
         let query = uni.createSelectorQuery().in(this);
         query
            .select(".c-tabs-group__title-text")
            .boundingClientRect(data => {
               this.lineLeft = data.width / 2;
               this.distance = data.width;
            })
            .exec();
      },
      titleClick(item, index) {
         this.index = index;
         this.$emit("input", index);
         this.$emit("change", { item, index });
      },
   },
};
// customization customize
</script>

<style lang="scss" scoped>
.c-tabs-group {
   width: 100%;
   padding-bottom: 5px;
   // overflow: hidden;
   .c-tabs-group__title-box {
      width: 100%;
      position: relative;
      .c-tabs-group__title {
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         text {
            padding: 10rpx 0;
            text-align: center;
            font-size: 35rpx;
            color: rgba($color: #000000, $alpha: 0.75);
         }
         .title__active {
            color: #000000;
         }
      }
      .c-tabs-group__title-line {
         width: 25px;
         height: 4px;
         border-radius: 4px;
         background-color: $u-success;
         position: absolute;
         z-index: 2021;
         left: 0;
         bottom: -2px;
         transform: translateX(-50%);
         transition: all 0.3s;
      }
   }
}
</style>
