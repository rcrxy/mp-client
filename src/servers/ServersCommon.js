import { get, post } from "@/uitls/axios.js";

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
 * @param {string} params.smsCode 验证码
 * @param {string} params.smsId   smsId
 * @param {string} params.mobile  手机号码
 */
export function postSmsLoginAPI(params) {
   return post("/user/smsLogin", params);
}

/**获取用户信息 */
export function getUserInfoAPI() {
   return get("/user/info");
}

/**获取科目列表 */
export function postCourseListAPI() {
   return post("/course/get");
}
