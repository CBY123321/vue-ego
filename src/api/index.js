import request from "../utils/index";
export const getList = (params) => {
  return request({ method: "GET", url: "/api/projectList", params });
};
