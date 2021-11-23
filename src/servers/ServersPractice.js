import { get, post } from "@/uitls/axios.js";

/**获取试题科目列表 */
export function getSubjectPracticeAPI() {
   return get("/api/subjectPractice");
}
