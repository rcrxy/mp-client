import qs from "qs";

export default {
   install(Vue) {
      Vue.mixin({
         data() {
            return {
               mix_monileExp: new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/),
            };
         },
         methods: {
            mix_jumpUrl(url, query) {
               let tabList = ["pages/home/HomeIndex", "/pages/project/ProjectIndex", "pages/practice/PracticeIndex", "pages/user/UserIndex"];
               if (tabList.indexOf(url) !== -1) {
                  uni.switchTab({ url });
               } else {
                  uni.navigateTo({ url: url + (query ? `?${qs.stringify(query)}` : "") });
               }
            },
         },
      });
   },
};
