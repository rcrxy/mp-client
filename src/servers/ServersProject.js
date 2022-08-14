import { get, post } from "@/uitls/axios.js";

/**获取课程目录 */
export function getProjectMenuAPI() {
   return get("/api/getProjectMenu");
}

// 获取课程详情
export function getProjectVideos_API(params) {
   return get("/api/project/videos", params);
}

// 获取用户已拥有课程列表
export function getUsersProject_API() {
   return get("/api/project/userProject")
}