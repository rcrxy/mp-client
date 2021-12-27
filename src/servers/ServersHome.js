import { get, post } from "@/uitls/axios.js";

/**获取专业类别 */
export function getProfessionalClassificationAPI() {
   return get("/major/list");
}
/**获取类别列表 */
export function getProfessionalListAPI(params) {
   return get("/api/professionalList", params);
}

/**获取新闻列表 */
export function getNewsAPI() {
   return get("/news/latest");
}

/**报名
 * @param {Object} params
 * @param {String} params.signName - 姓名
 * @param {String} params.mobile - 手机号码
 * @param {String} params.smsCode - 验证码
 * @param {String} params.province - 地区
 * @param {String} params.gradation - 层次
 * @param {String} params.college - 学校
 * @param {String} params.smsId - smsId
 */

export function postSignUpAPI(params) {
   return post("/exam/signUp", params);
}
