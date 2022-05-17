<template>
   <view class="menuBox">
      <u-collapse>
         <u-collapse-item v-for="(item, index) in options" :key="index" :title="item.name">
            <!-- <u-cell v-for="(key, i) in item.videos" :key="i" :title="key.name" :border="false" clickable @click="mix_jumpUrl('/pages/project/PlayVideo', info)"> -->
            <u-cell v-for="(key, i) in item.videos" :key="i" :title="key.name" :border="false">
               <!-- <template #value>
                  <u-icon :name="index < 2 ? 'play-right' : 'lock'"></u-icon>
               </template> -->
            </u-cell>
         </u-collapse-item>
      </u-collapse>
   </view>
</template>

<script>
import options from "@/static/json/ProjectMenu.json";
export default {
   props: ["info"],
   data() {
      return {
         activeNames: "",
         options,
      };
   },
   watch: {},
   created() {},
   methods: {
      jumpUrl() {
         uni.navigateTo({
            url: "http://video.jsskdx.com/dianlixitongzidonghua/第一章.电路模型与电路定律1.1电路模型、电路变量及参考方向.mp4",
         });
      },
   },
};
</script>

<style lang="scss" scoped>
.menuBox {
   padding-bottom: 60px;
}
</style>
