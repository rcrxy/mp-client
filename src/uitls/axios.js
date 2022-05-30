import axios from "axios";

// 根据环境修改baseURL
const baseURL = (() => {
   const { VUE_APP_PLATFORM } = process.env;
   if (VUE_APP_PLATFORM === "app-plus") {
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
});

/** 添加请求拦截器 **/
instance.interceptors.request.use(
   config => {
      config.headers["token"] = uni.getStorageSync("token") || "";
      // config.headers["Content-Type"] = "application/json;charset=utf-8";
      return config;
   },
   error => {
      // 对请求错误做些什么
      return Promise.reject(error);
   }
);

/** 添加响应拦截器  **/
instance.interceptors.response.use(
   response => {
      if (response.data.code !== 200) {
         const { data } = response;
         if (data.resultCode === "403") {
            uni.showModal({
               content: "登录失效，请重新登录",
               showCancel: false,
               success: res => {
                  uni.navigateTo({ url: "/pages/common/Login" });
               },
            });
         }
      }
      return Promise.resolve(response.data);
   },
   error => {
      if (error.response) {
         return Promise.reject(error);
      } else {
         console.log("请求超时, 请刷新重试");
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
