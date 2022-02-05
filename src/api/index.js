import request from "../utils/index";
export const getList = (params) => {
  return request({ method: "GET", url: "/api/projectList", params });
};
export const search = (params) => {
  return request({ method: "GET", url: "/api/search", params });
};
export const add = (params) => {
  return request({
    method: "GET",
    url: "/api/backend/itemCategory/selectItemCategoryByParentId",
    params,
  });
};
