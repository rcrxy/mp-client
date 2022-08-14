import { get, post, uniRequest } from "@/uitls/axios.js";

/**注销账号 */
export function postSignOutAccountAPI() {
   return post("/user/cancelAccount");
}

/**修改用户信息 */
export function postSetUserInfoAPI(params) {
   return post("/user/modify", params);
}

/** 修改密码 */
export function postModifyPasswordAPI(params) {
   return post("/user/modifyPassword", params);
}

/**获取用户地址 */
export function getAddressListAPI() {
   return get("/address/list");
}

/**添加地址 */
export function postaddAddressAPI(params) {
   return post("/address/add", params);
}

/**修改地址 */
export function postEditAddressAPI(params) {
   return post("/address/modify", params);
}

/**删除地址
 * @param {Object} params
 * @param {Number | String} params.id
 */
export function postdeleteAddressAPI(params) {
   return post("/address/delete", params);
}

/**获取用户收藏
 * @param {object} params
 * @param {String} params.valueType - 收藏类型[question]
 */
export function postUserCollectionAPI(params) {
   return post("/collection/get", params);
}

/** 获取七牛云token */
export function getQTokenAPI() {
   return post("/upload/getToken", { "bucket": "app-pic-2022-6-13" })
}

// 学习中心-登录
export function learningLogin_API(baseUrl, params) {
   return post(`${baseUrl}/api/student/idNoLogin`, params);
}

// 学习中心-退出登录
export function learningLogout_API(baseUrl) {
   return get(`${baseUrl}/api/outLogin`);
}

// 学习中心-获取学生信息
export function learningQueryStudentInfo_API(baseUrl, data, token) {
   return get(`${baseUrl}/api/learningCenter/queryStudentInfo`, data, {
      headers: { token: token }
   })
}

// 学习中心-获取报考信息
export function learningApplyingMajor_API(baseUrl, token) {
   return get(`${baseUrl}/api/learningCenter/getApplyingMajor`, null, {
      headers: { token: token }
   })
}

// 学习中心-获取课程列表
export function learningCourseList_API(baseUrl, data, token) {
   return post(`${baseUrl}/api/answer/query/course/list`, data, {
      headers: {
         token: token
      }
   })
}

// 学习中心-获取视频详情
export function learningGetVideoInfo_API(baseUrl, data, token) {
   return get(`${baseUrl}/api/video/detail`, data, {
      headers: {
         token: token
      }
   })
}

// 检测学习中心账号绑定状态
export function detectBindingStatus_API(params) {
   return get("/api/project/isBind", params);
}

// 查询是否存在课程
export function queryHaveVideos_API(params) {
   return post("/api/project/haveVideos", params);
}

// 绑定课程
export function bindVideos_API(params) {
   return post("/api/project/bindVideo", params);
}