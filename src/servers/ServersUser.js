import { get, post } from "@/uitls/axios.js";

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
