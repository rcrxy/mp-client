<template>
   <view>
      <u-collapse>
         <u-collapse-item v-for="(item, index) in options" :key="index" :title="item.name">
            <u-cell v-for="(key, i) in item.videos" :key="i" :title="key.name" :border="false" clickable>
               <template #value>
                  <u-icon :name="index < 2 ? 'play-right' : 'lock'"></u-icon>
               </template>
            </u-cell>
         </u-collapse-item>
      </u-collapse>
   </view>
</template>

<script>
import options from "@/static/json/ProjectMenu.json";
export default {
   data: () => ({
      activeNames: "",
      options,
   }),
   watch: {},
   created() {},
   methods: {},
};
</script>

<style lang="scss" scoped></style>
