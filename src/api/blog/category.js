import http from "@/utils/http.js";

const addCategories = (data, config = {}) => {
  return http.request({
    url: "/admin/categories",
    method: "post",
    data,
  });
};

const editCategories = (id, data, config = {}) => {
  return http.request({
    url: `/admin/categories/${id}`,
    method: "put",
    data,
    config
  });
};

const getCategories = (params, config = {}) => {
  return http.request({
    url: "/admin/categories",
    method: "get",
    params,
  });
};

const delCategories = (id, config = {}) => {
  return http.request({
    url: `/admin/categories/${id}`,
    method: "delete",
    config
  });
};

export default {
  getCategories,
  addCategories,
  editCategories,
  delCategories
};
