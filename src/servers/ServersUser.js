import { get, post } from "@/uitls/axios.js";

/**注销账号 */
export function postSignOutAccountAPI() {
   return post("/user/cancelAccount");
}

/**修改用户信息 */
export function postSetUserInfoAPI(params) {
   return post("/user/modify", params);
}

/**获取用户地址 */
export function getAddressListAPI() {
   return get("/address/list");
}

/**添加地址 */
export function postaddAddressAPI(params) {
   return post("/address/add", params);
}
