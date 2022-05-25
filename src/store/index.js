import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      token: uni.getStorageSync("token") || "",
      province: uni.getStorageSync("province") || "江",
      userInfo: uni.getStorageSync("userInfo") || {},
      questions: uni.getStorageSync("questions") || {},
   },
   mutations: {
      setToken(state, val) {
         state.token = val;
         uni.setStorageSync("token", val);
      },
      setUserInfo(state, val) {
         state.userInfo = val;
         uni.setStorageSync("userInfo", val);
      },
      setQuestions(state, val) {
         state.questions = val;
         uni.setStorageSync("questions", val)
      },
      setUserProvince(state, val) {
         uni.setStorageSync("province", val);
      },

   },
   getters: {},
   actions: {},
});
