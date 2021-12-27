<template>
   <view>
      <view class="emptyState" v-if="problemList.length === 0">
         <image src="~static/images/emptyImg.png" mode="widthFix" />
      </view>
      <view class="dataBox" v-else>
         <u-collapse accordion :border="false">
            <u-collapse-item v-for="(item, index) in problemList" :key="index" :title="item.name">
               <u-cell class="problemCell" v-for="key in item.problems" :key="key.collectionId" isLink>
                  <template #title>
                     <view class="celltitle">
                        <u-tag class="tag" :text="key.value.questionType" size="mini" type="warning"></u-tag>
                        <rich-text :nodes="key.value.question | as_text"></rich-text>
                     </view>
                  </template>
               </u-cell>
            </u-collapse-item>
         </u-collapse>
      </view>
   </view>
</template>

<script>
import { postUserCollectionAPI } from "@/servers/ServersUser";
export default {
   data() {
      return {
         problemList: [],
      };
   },
   filters: {
      filters_problemsType(val) {
         switch (val) {
            case "radio":
               return "单选题";
            case "multiSelect":
               return "多选题";
            case "judgment":
               return "判断题";
         }
      },
      as_text(val) {
         let newVal = val.replace(/<img src='[\S]+' \/>/, " <i>图片</i> ");
         return newVal;
      },
   },
   created() {
      this.postUserCollection();
   },
   methods: {
      async postUserCollection() {
         let { code, data } = await postUserCollectionAPI({ valueType: "question" });
         if (code === 200) {
            let arr = [];
            let list = [];
            data.forEach(item => {
               arr.push(item.value.course);
            });
            arr = Array.from(new Set(arr));
            arr.forEach(item => {
               list.push({ name: item, problems: [] });
            });
            list.forEach(item => {
               data.forEach(key => {
                  if (key.value.course === item.name) item.problems.push(key);
               });
            });
            this.problemList = list;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.dataBox {
   width: 95vw;
   height: 100%;
   margin: auto;
   // overflow: auto;
   .u-collapse-item {
      box-shadow: 0 0 10rpx 1rpx rgba($color: #000000, $alpha: 0.1);
      border-radius: 15rpx;
      margin: 10rpx 0;
      overflow: hidden;
   }
}
.emptyState {
   width: 100vw;
   height: 100%;
   position: relative;
   image {
      display: block;
      width: 460rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
   }
}
.celltitle {
   display: flex;
   align-items: center;
   justify-content: flex-start;
   .tag {
      margin-right: 10rpx;
   }
}
</style>
