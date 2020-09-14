import http from "@/utils/http.js";
export const getTourists = (config = {}) => {
  return http.request({
    url: "/tourist/list",
    method: "get",
  });
};
