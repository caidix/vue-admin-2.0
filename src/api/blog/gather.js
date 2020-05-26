import http from "@/utils/http.js";

const addGather = (data, config = {}) => {
  return http.request({
    url: "/admin/gather",
    method: "post",
    data,
  });
};

const editGather = (id, data, config = {}) => {
  return http.request({
    url: `/admin/gather/${id}`,
    method: "put",
    data,
    config
  });
};

const getGather = (params, config = {}) => {
  return http.request({
    url: "/admin/gather",
    method: "get",
    params,
  });
};

const delGather = (id, config = {}) => {
  return http.request({
    url: `/admin/gather/${id}`,
    method: "delete",
    config
  });
};

export default {
  getGather,
  addGather,
  editGather,
  delGather
};
