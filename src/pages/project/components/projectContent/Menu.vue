<template>
   <view class="menuBox">
      <u-collapse>
         <u-collapse-item v-for="(item, index) in options" :key="index" :title="item.name">
            <!-- <u-cell v-for="(key, i) in item.videos" :key="i" :title="key.name" :border="false" clickable @click="mix_jumpUrl('/pages/project/PlayVideo', info)"> -->
            <u-cell v-for="(key, i) in item.children" :key="i" :title="key.name" @click="playerVideo(key, index, i)" :border="false" clickable>
               <template #value>
                  <u-icon :name="index < 2 && i < 2 ? 'play-right' : 'lock'"></u-icon>
               </template>
            </u-cell>
         </u-collapse-item>
      </u-collapse>
   </view>
</template>

<script>
import { getProjectVideos_API } from "@/servers/ServersProject.js";
export default {
   props: ["info"],
   data() {
      return {
         activeNames: "",
         options: [],
      };
   },
   watch: {},
   created() {
      this.getProjectVideos();
   },
   methods: {
      async getProjectVideos() {
         try {
            const { code, data } = await getProjectVideos_API({ id: this.info.project_id });
            if (code === 200) {
               this.options = data.tree;
            }
         } catch (error) {
            console.log("error", error);
         }
      },
      playerVideo(info, index, i) {
         if (index < 2 && i < 2) {
            this.mix_jumpUrl("/pages/project/PlayVideo", info);
         } else {
            uni.showToast({ icon: "none", title: "该视频暂未开放" });
         }

         console.log("info", info);
      },
   },
};
</script>

<style lang="scss" scoped>
.menuBox {
   width: 100%;
   padding-bottom: 60px;
}
</style>
