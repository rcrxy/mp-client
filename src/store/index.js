import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      token: uni.getStorageSync("token") || "",
      userInfo: uni.getStorageSync("userInfo") || {},
      questions: uni.getStorageSync("questions") || {},
      collection: uni.getStorageSync("collection") || [],
      problemList: uni.getStorageSync("problemList") || [],
      push: uni.getStorageSync("push") || false,
      province: uni.getStorageSync("province") || "",
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
      setCollection(state, val) {
         state.collection = val;
         uni.setStorageSync("collection", val)
      },
      setProblemList(state, val) {
         state.problemList = val;
         uni.setStorageSync("problemList", val)
      },
      setPush(state, val) {
         state.push = val;
         uni.setStorageSync("push", val);
      },
      setProvince(state, val) {
         state.province = val;
         uni.setStorageSync("province", val);
      }
   },
});
