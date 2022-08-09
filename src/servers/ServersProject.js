import { get, post } from "@/uitls/axios.js";

/**获取课程目录 */
export function getProjectMenuAPI() {
   return get("/api/getProjectMenu");
}

// 获取课程详情
export function getProjectVideos_API(params) {
   return get("/api/project/videos", params);
}
