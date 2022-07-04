import { get, post } from "@/uitls/axios.js";

/** 获取课程层次 */
export function getCourseLevel_API() {
   return get("/api/course/getLevel");
}

/** 获取课程类别 */
export function getCourseCategory_API(params) {
   return get("/api/course/getCategory", params);
}

/**获取科目列表 */
export function postCourseListAPI(params) {
   return post("/api/course/get", params);
}

/**获取题目列表
 * @param {Object} params
 * @param {String} params.course - 科目名称
 */
export function postQuestionsListAPI(params) {
   return post("/question/get", params);
}

/**收藏题目
 * @param {Object} params
 * @param {String} params.valueId - id
 * @param {String} params.valueType - 收藏类型{题目: question}
 */
export function postAddCollectionAPI(params) {
   return post("/collection/add", params);
}

/**删除收藏
 * @param {Object} params
 * @param {String} params.collectionId
 */
export function postCancelCollectionAPI(params) {
   return post("/collection/cancel", params);
}
