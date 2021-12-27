<template>
   <view class="mainBox">
      <u-icon class="backIcon" name="arrow-left"></u-icon>
      <video id="videoBox" class="videoBox" :src="videoUrl" @fullscreenchange="fullscreenchange" vslide-gesture controls enable-play-gesture></video>
      <view class="menu" :style="`height:${menuHeight}px`">
         <u-collapse>
            <u-collapse-item v-for="(item, index) in options" :key="index" :title="item.name">
               <u-cell v-for="(key, i) in item.videos" :key="i" :title="key.name" :border="false" clickable @click="changeUrl()">
                  <template #value>
                     <u-icon :name="index < 2 ? 'play-right' : 'lock'"></u-icon>
                  </template>
               </u-cell>
            </u-collapse-item>
         </u-collapse>
      </view>
   </view>
</template>

<script>
import options from "@/static/json/ProjectMenu.json";
export default {
   data() {
      return {
         videoHeight: 0,
         menuHeight: 0,
         activeNames: "",
         options,
         videoUrl: "http://video.jsskdx.com/dianlixitongzidonghua/第一章.电路模型与电路定律1.1电路模型、电路变量及参考方向.mp4",
      };
   },
   onLoad(info) {
      uni.setNavigationBarTitle({
         title: info.name,
      });
   },
   mounted() {
      this.setVideoHeight();
   },
   methods: {
      leftClick() {
         uni.navigateBack();
      },
      fullscreenchange({ detail: { direction } }) {
         return direction;
      },
      changeUrl() {},
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
   flex-flow: column nowrap;
   align-items: center;
   justify-content: space-between;
   box-sizing: border-box;
   position: relative;
   .backIcon {
      position: absolute;
      top: 45px;
      left: 50rpx;
      z-index: 2021;
      color: #ffffff;
   }
   .videoBox {
      width: 100%;
      flex-shrink: 0;
   }
   .menu {
      width: 100%;
      flex: 1;
      overflow-y: scroll;
   }
}
</style>
