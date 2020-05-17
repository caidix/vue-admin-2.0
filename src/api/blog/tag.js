import http from "@/utils/http.js";

const addTag = (data, config = {}) => {
  return http.request({
    url: "/admin/tags",
    method: "post",
    data,
  });
};

const editTag = (id, data, config = {}) => {
  return http.request({
    url: `/admin/tags/${id}`,
    method: "put",
    data,
    config
  });
};

const getTag = (params, config = {}) => {
  return http.request({
    url: "/admin/tags",
    method: "get",
    params,
  });
};

const delTag = (id, config = {}) => {
  return http.request({
    url: `/admin/tags/${id}`,
    method: "delete",
    config
  });
};

export default {
  getTag,
  addTag,
  editTag,
  delTag,
};
