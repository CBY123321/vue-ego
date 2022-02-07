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
export const goodsAdd = (params) => {
  return request({
    method: "GET",
    url: "/api/backend/item/insertTbItem",
    params,
  });
};
export const goodsDelete = (params) => {
  return request({
    method: "GET",
    url: "/api/backend/item/deleteItemById",
    params,
  });
};
export const goodsEdit = (params) => {
  return request({
    method: "GET",
    url: "/api/backend/item/updateTbItem",
    params,
  });
};
export const login = (data) => {
  return request({
    method: "POST",
    url: "/api/login",
    data,
  });
};
