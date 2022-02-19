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
            /**跳转 */
            mix_jumpUrl(url, query, shield) {
               shield = shield || false;
               if (shield) {
                  uni.showToast({ title: "当前板块正在开发中", icon: "none" });
               } else {
                  let tabList = ["pages/home/home", "/pages/project/project", "pages/practice/practice", "pages/user/user"];
                  if (tabList.indexOf(url) !== -1) {
                     uni.switchTab({ url });
                  } else {
                     uni.navigateTo({ url: url + (query ? `?${qs.stringify(query)}` : "") });
                  }
               }
            },
         },
      });
   },
};
