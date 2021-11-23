import { get, post } from "@/uitls/axios.js";

/**获取课程目录 */
export function getProjectMenuAPI() {
   return get("/api/getProjectMenu");
}
