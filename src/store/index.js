import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      token: uni.getStorageSync("token") || "",
      province: uni.getStorageSync("province") || "江",
      userInfo: uni.getStorageSync("userInfo") || {},
   },
   mutations: {
      setToken(state, val) {
         uni.setStorageSync("token", val);
      },
      setUserInfo(state, val) {
         uni.setStorageSync("userInfo", val);
      },
      setUserProvince(state, val) {
         uni.setStorageSync("province", val);
      },
   },
   getters: {},
   actions: {},
});
