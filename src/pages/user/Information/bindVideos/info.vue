<template>
   <view class="mainBox">
      <u-collapse :value="active" :border="false">
         <u-collapse-item title="学生信息" name="学生信息">
            <u-cell v-for="(item, index) in infoOptions" :key="index" :title="item.title" :value="item.value"></u-cell>
         </u-collapse-item>
         <u-collapse-item title="报考信息" name="报考信息">
            <u-cell v-for="(item, index) in majorOptions" :key="index" :title="item.title" :value="item.value"></u-cell>
         </u-collapse-item>
      </u-collapse>
      <u-cell-group title="可绑定课程">
         <u-collapse :value="active" :border="false">
            <u-collapse-item v-for="(item, index) in courseOptions" :key="index" :title="item.name" :name="item.name">
               <u-cell title="课程代码" :value="item.code"></u-cell>
            </u-collapse-item>
         </u-collapse>
      </u-cell-group>

      <u-button @click="submit" :loading="loading" :disabled="loading" type="success" :text="buttonText"></u-button>
   </view>
</template>

<script>
import { learningLogout_API, learningApplyingMajor_API, learningCourseList_API, learningGetVideoInfo_API, queryHaveVideos_API, learningQueryStudentInfo_API, bindVideos_API } from "@/servers/ServersUser";

export default {
   data() {
      return {
         active: [],
         token: "",
         baseUrl: "",
         studentId: "",
         studentInfo: {},
         majorOptions: [],
         infoOptions: [],
         courseOptions: [],
         loading: true,
         buttonText: "正在读取数据...",
      };
   },
   onLoad({ baseUrl, token }) {
      this.token = token;
      this.baseUrl = baseUrl;
      this.getCoureList(token);
   },
   onShow() {},
   methods: {
      // 获取并处理课程列表
      async getCoureList(token) {
         this.buttonText = "正在读取数据...";
         try {
            // 获取报考信息
            this.majorOptions = (await this.learningApplyingMajor(token)) || [];

            // 获取学生信息
            this.infoOptions = (await this.learningQueryStudentInfo()) || [];

            // 获取课程列表
            this.courseOptions = (await this.learningCourseList()) || [];

            this.loading = false;
            this.buttonText = "绑定课程";
         } catch (error) {
            uni.showToast({ icon: "none", title: "获取信息失败，请重试" });
            setTimeout(() => {
               uni.navigateBack();
            }, 1500);
            console.log("error", error);
         }
      },

      // 获取报考信息
      async learningApplyingMajor(token) {
         let options = [];
         const { code, data } = await learningApplyingMajor_API(this.baseUrl, token);
         if (code === 200) {
            data.forEach(item => {
               if (item.state === "IN_SCHOOL") {
                  this.studentId = item.studentId;
                  const productConnection = item.productConnectionName.split(">");

                  options = [
                     { title: "报考信息", value: productConnection[0] },
                     { title: "所属城市", value: productConnection[1] },
                     { title: "报考大学", value: productConnection[2] },
                     { title: "报考层次", value: productConnection[3] },
                     { title: "专业类别", value: productConnection[4] },
                     { title: "专业名称", value: productConnection[5] },
                     { title: "学生状态", value: this.flitersStatus(item.state) },
                  ];
               }
            });
            return options;
         } else {
            throw "获取信息失败，请重试";
         }
      },

      flitersStatus(str) {
         switch (str) {
            case "UNREGISTERED":
               return "未注册/代缴费";
            case "IN_SCHOOL":
               return "在读";
            case "TO_GRADUATE":
               return "可申请毕业";
            case "GRADUATED":
               return "已毕业";
            case "SUSPENSION_SCHOOLING":
               return "休学";
            case "DROP_OUT":
               return "退学";
            case "TRANSFER_SCHOOL":
               return "转学";
         }
      },

      async learningQueryStudentInfo() {
         const { code, data } = await learningQueryStudentInfo_API(this.baseUrl, { studentId: this.studentId }, this.token);
         if (code === 200) {
            this.studentInfo = data;
            return [
               { title: "学生姓名", value: data.studentName },
               { title: "身份证号", value: data.card.substr(0, 5) + "****" + data.card.substr(-4) },
               { title: "联系电话", value: data.phone },
               { title: "班主任", value: data.masterName },
               { title: "班主任电话", value: data.masterPhone },
            ];
         } else {
            throw "获取信息失败，请重试";
         }
      },

      // 获取课程列表
      async learningCourseList() {
         let courseList = [];
         const { code: courseCode, data: courseData } = await learningCourseList_API(this.baseUrl, { studentId: this.studentId }, this.token);
         if (courseCode === 200) {
            courseList = courseData.list || [];
         } else {
            throw "error";
         }
         this.buttonText = "正在读取课程信息...";
         // 根据课程列表获取第一方课程信息
         let selfVideos = [];
         let index = 0;
         while (index < courseList.length) {
            if (courseList[index].selfVideo) {
               const { code, data } = await learningGetVideoInfo_API(this.baseUrl, { code: courseList[index].selfVideo }, this.token);
               if (code === 200) selfVideos.push(data);
            }
            index++;
         }

         // 仅返回当前数据库中课程名称相同的课程
         const courses = selfVideos.map(item => item.name);
         const { code: hCode, data: hData } = await queryHaveVideos_API({ courses });
         if (hCode === 200) {
            const haveVideos = hData.courses;
            selfVideos = selfVideos.filter(item => haveVideos.includes(item.name));
         }

         return selfVideos;
      },

      // 提交
      submit() {
         const that = this;
         this.loading = true;
         try {
            uni.showModal({
               title: "提示",
               content: "确认将此学习中心账号绑定至当前账号？",
               success: async function (res) {
                  if (res.confirm) {
                     const courses = that.courseOptions.map(item => item.name);
                     const sendData = {
                        account: that.studentInfo.card,
                        courses,
                     };

                     const { code } = await bindVideos_API(sendData);

                     that.loading = false;
                     if (code === 200) {
                        uni.showToast({ icon: "none", title: "绑定成功" });
                        setTimeout(() => {
                           uni.navigateBack({ delta: 2 });
                        }, 1500);
                     } else {
                        uni.showToast({ icon: "none", title: "绑定失败，请检查网络后重试" });
                     }
                  } else if (res.cancel) {
                     that.loading = false;
                     uni.showToast({ icon: "none", title: "用户已取消" });
                  }
               },
            });
         } catch (error) {
            this.loading = false;
            uni.showToast({ icon: "none", title: "绑定失败，请检查网络后重试" });
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.u-button {
   width: 90vw;
   margin: 50rpx auto 0;
}
</style>
