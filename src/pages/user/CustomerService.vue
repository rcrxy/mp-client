<template>
   <view id="customerService">
      <view class="avatar">
         <van-image round width="6rem" height="6rem" :src="teacherInfo.imgUrl" @click="mixin_jumpUrl('/my/information')" />
         <text class="text name">{{ teacherInfo.name }}</text>
      </view>

      <van-cell :border="false">
         <template #title>
            <image src="" alt="" />
            <text>{{ `QQ号：${teacherInfo.qqNumber}` }}</text>
         </template>
         <template #default>
            <text>会话</text>
            <text class="copy">复制</text>
         </template>
      </van-cell>
      <van-cell :border="false">
         <template #title>
            <image src="" alt="" />
            <text>{{ `微信：${teacherInfo.weixin}` }}</text>
         </template>
         <template #default>
            <text class="copy">复制</text>
         </template>
      </van-cell>
      <van-cell :border="false">
         <template #title>
            <image src="" alt="" />
            <text>{{ `电话：${teacherInfo.phone}` }}</text>
         </template>
         <template #default>
            <text class="copy">点击拨打</text>
         </template>
      </van-cell>
   </view>
</template>

<script>
export default {
   data() {
      return {
         teacherInfo: {
            imgUrl: "",
            name: "",
            qqNumber: "",
            weixin: "",
            phone: "",
         },
      };
   },
   created() {
      this.getTeacherInfo();
   },
   methods: {
      getTeacherInfo() {
         this.teacherInfo.imgUrl = "https://img01.yzcdn.cn/vant/cat.jpeg";
         this.teacherInfo.name = "您老师";
         this.teacherInfo.qqNumber = "12135";
         this.teacherInfo.weixin = "134523";
         this.teacherInfo.phone = "123123123";
      },
   },
};
</script>

<style lang="scss" scoped>
#customerService {
   width: 100vw;
}

.avatar {
   width: 100%;
   height: 13rem;
   margin-bottom: 1rem;
   background-image: url(../../static/images/myBack.png);
   background-color: #fff;
   background-position: center center;
   background-size: 100% 100%;
   background-repeat: no-repeat;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   .van-image {
      margin: 0.5rem 0;
   }
   > text {
      font-size: 1.5rem;
   }
}

.van-cell__title {
   i {
      display: inline-block;
   }
}

.van-cell__value {
   .copy {
      color: #00cba1;
      margin-left: 1.5rem;
   }
}
</style>
