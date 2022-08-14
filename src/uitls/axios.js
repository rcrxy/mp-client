import axios from "axios";
import axiosAdapterUniapp from "axios-adapter-uniapp";

// 根据环境修改baseURL
const baseURL = (() => {
   const { VUE_APP_PLATFORM, NODE_ENV } = process.env;
   if (NODE_ENV === "development" && VUE_APP_PLATFORM === "app-plus") {
      return "http://192.168.2.254:23099";
   } else if (VUE_APP_PLATFORM === "app-plus") {
      return "http://www.njjcjykj.cn:23099";
   } else {
      return "/api";
   }
})();

// create an axios instance
const instance = axios.create({
   baseURL, // url = base url + request url
   // withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
   timeout: 10000, // request timeout
   // crossDomain: true,
   adapter: axiosAdapterUniapp,
});

/** 添加请求拦截器 **/
instance.interceptors.request.use(
   config => {
      const { url } = config;
      const urlReg = /^(http|https)/;

      if (!url.includes("stu.jsskdx")) config.headers["token"] = uni.getStorageSync("token") || "";
      detectionNetwork();

      if (urlReg.test(url)) {
         config.baseURL = "";
         return config;
      } else {
         return config;
      }
   },
   error => {
      return Promise.reject(error);
   }
);

var globalIsLogin = [];

/** 添加响应拦截器  **/
instance.interceptors.response.use(
   response => {
      const { status, data } = response

      if (status === 200) {
         if (data.code === 401) {
            if (globalIsLogin.length === 0) {
               globalIsLogin.push(true);
               uni.showModal({
                  content: "登录验证失败，请重新登录",
                  showCancel: false,
                  success: res => {
                     uni.navigateTo({ url: "/pages/common/Login" });
                     globalIsLogin.unshift();
                  },
               });
            }
         }
         if (Object.keys(data).includes("msg")) {
            data.data = data.body;
            data.message = data.msg;
         }

         return Promise.resolve(response.data);
      } else {
         return Promise.resolve({ code: 500, data: null, message: "请求失败" })
      }
   },
   error => {
      if (error.response) {
         const { status } = error.response;
         if (status === 500) {
            uni.showToast({
               icon: "none",
               title: "网络错误，请重启应用或检查网络",
            });
         }
         return Promise.reject(error);
      } else {
         return Promise.reject(new Error("请求超时, 请刷新重试"));
      }
   }
);

axios.defaults.adapter = function (config) {
   return new Promise((resolve, reject) => {
      var settle = require("axios/lib/core/settle");
      var buildURL = require("axios/lib/helpers/buildURL");
      uni.request({
         method: config.method.toUpperCase(),
         url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
         header: config.headers,
         data: config.data,
         dataType: config.dataType,
         responseType: config.responseType,
         sslVerify: config.sslVerify,
         complete: function complete(response) {
            response = {
               data: response.data,
               status: response.statusCode,
               errMsg: response.errMsg,
               header: response.header,
               config: config,
            };

            settle(resolve, reject, response);
         },
      });
   });
};

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
   return new Promise((resolve, reject) => {
      instance({
         method: "get",
         url,
         params,
         ...config,
      })
         .then(response => {
            resolve(response);
         })
         .catch(error => {
            reject(error);
         });
   });
};

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
   return new Promise((resolve, reject) => {
      instance({
         method: "post",
         url,
         data,
         ...config,
      })
         .then(response => {
            resolve(response);
         })
         .catch(error => {
            reject(error);
         });
   });
};

// 检查网络状态
function detectionNetwork() {
   uni.getNetworkType({
      success: ({ networkType }) => {
         if (networkType === "none") {
            uni.showToast({ icon: "none", title: "网络连接失败，请检查网络!" });
         } else {
            uni.hideToast()
         }
      }
   })
}