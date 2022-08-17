import { get, post } from "@/uitls/axios.js";
import axios from "axios";

/**账号密码登录 */
export function postAccountLoginAPI(parmas) {
   return post("/user/login", parmas);
}

/**发送短信
 * @param {object} params
 * @param {string} params.mobile  手机号码
 */
export function postSmsSendAPI(params) {
   return post("/sms/send", params);
}

/**短信登录
 * @param {object} params
 * @param {string} params.code   验证码
 * @param {string} params.smsId  smsId
 * @param {string} params.mobile 手机号码
 * @param {string} params.source 来源
 */
export function smgLogin_API(params) {
   return post("/api/user/smgLogin", params);
}

/**获取用户信息 */
export function getUserInfoAPI() {
   return get("/user/info");
}


/** 地理信息逆编码 */
export function addressInverseCodingAPI(params) {
   return get("http://api.tianditu.gov.cn/geocoder", params)
}

// 获取课程层次和类别
export function getLevelAndCategory_API(params) {
   return get("/api/course/getLevelAndCategory", params);
}