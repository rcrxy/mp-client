<template>
   <view>
      <van-tabs v-model="tabIndex" swipeable animated sticky color="#00CBA1">
         <van-tab title="课程">
            <van-cell-group inset v-for="(item, index) in projectList" :key="index">
               <van-cell title="" label-class="label">
                  <template #label>
                     <view class="left">
                        <image :src="require('../../static/images/projectBack2.png')" alt="" />
                        <text>{{ item.name }}</text>
                     </view>
                     <view class="right">
                        <text>{{ item.name2 }}</text>
                        <text>讲师：{{ item.teacher }}</text>
                     </view>
                  </template>
               </van-cell>
            </van-cell-group>
         </van-tab>
         <van-tab title="题目">
            <van-collapse v-model="activeName" accordion>
               <van-collapse-item v-for="(item, index) in problemList" :key="index" :title="item.name" :name="item.name">
                  <van-cell v-for="(key, index) in item.problems" :key="index" :title="key.type | filters_problemsType" is-link center>
                     <template #label>
                        <em>{{ key.content }}</em>
                     </template>
                  </van-cell>
               </van-collapse-item>
            </van-collapse>
         </van-tab>
      </van-tabs>
   </view>
</template>

<script>
export default {
   data: () => ({
      tabIndex: 0,
      activeName: "",
      projectList: [
         { name: "语文", name2: "大学语文(一)", teacher: "您老师" },
         { name: "数学", name2: "大学数学(二)", teacher: "您老师" },
         { name: "英语", name2: "大学英语", teacher: "您老师" },
         { name: "政治", name2: "政治地理", teacher: "您老师" },
         { name: "护理", name2: "护理学", teacher: "您老师" },
      ],
      problemList: [
         {
            name: "大学语文",
            problems: [
               { type: "radio", content: "这是一个单选题" },
               { type: "multiSelect", content: "这是一个多选题" },
               { type: "judgment", content: "这是一个判断题" },
            ],
         },
         {
            name: "专升本数学",
            problems: [
               { type: "radio", content: "这是一个单选题" },
               { type: "multiSelect", content: "这是一个多选题" },
               { type: "judgment", content: "这是一个判断题" },
            ],
         },
      ],
   }),
   filters: {
      filters_problemsType(val) {
         switch (val) {
            case "radio":
               return "单选题";
               break;
            case "multiSelect":
               return "多选题";
               break;
            case "judgment":
               return "判断题";
               break;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.van-cell-group {
   margin: 0.5rem 0.75rem;
   .label {
      display: flex;
      align-items: stretch;
      .left {
         width: 8.5rem;
         position: relative;
         image {
            width: 100%;
            vertical-align: top;
         }
         text {
            color: #fff;
            font-size: 1.35rem;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(1rem, -50%);
         }
      }
      .right {
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         justify-content: space-between;
         margin-left: 0.75rem;
         box-sizing: border-box;
         padding: 0.5rem 0;
         text {
            color: #000;
            font-size: 1.2rem;
         }
      }
   }
}
</style>
