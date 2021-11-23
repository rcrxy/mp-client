import { get, post } from "@/uitls/axios.js";

/**获取专业类别 */
export function getProfessionalClassificationAPI() {
   return get("/major/list");
}
/**获取类别列表 */
export function getProfessionalListAPI(params) {
   return get("/api/professionalList", params);
}
