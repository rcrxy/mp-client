<template>
   <view class="mainBox">
      <video id="videoBox" class="videoBox" :src="videoUrl" @fullscreenchange="fullscreenchange" vslide-gesture controls enable-play-gesture></video>
   </view>
</template>

<script>
export default {
   data() {
      return {
         videoHeight: 0,
         menuHeight: 0,
         activeNames: "",
         options: [],
         videoUrl: "",
      };
   },
   onLoad(info) {
      console.log("info", info);
      uni.setNavigationBarTitle({ title: info.project_name });
      this.videoUrl = info.url;
   },
   mounted() {
      this.setVideoHeight();
   },
   methods: {
      fullscreenchange({ detail: { direction } }) {
         return direction;
      },
      setVideoHeight() {
         let query = uni.createSelectorQuery().in(this);
         query
            .select(".videoBox")
            .boundingClientRect(data => {
               this.videoHeight = (data.width / 16) * 9;
            })
            .exec();
         query
            .select(".mainBox")
            .boundingClientRect(data => {
               this.menuHeight = data.height - this.videoHeight;
            })
            .exec();
      },
   },
};
</script>

<style lang="scss" scoped>
.mainBox {
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #333333;
   position: relative;
   .videoBox {
      width: 100%;
      flex-shrink: 0;
   }
}
</style>
