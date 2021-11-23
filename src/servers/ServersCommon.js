import { get, post } from "@/uitls/axios.js";

/**账号密码登录 */
export function postAccountLoginAPI(parmas) {
   return post("/user/login", parmas);
}

/**获取用户信息 */
export function getUserInfoAPI() {
   return get("/user/info");
}
