import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from '@/utils/auth'
import Vue from "vue";
const errorMsg = (message) => {
  return Message({
    message: message,
    type: "error",
    duration: 2000,
  });
};
const http = axios.create({
  // baseURL: process.env.VUE_ADMIN_API_URL|| '/api',
  baseURL: process.env.API_URL || "http://localhost:3004",
  timeout: 5000,
  // withCredentials: true,
  header: { "Access-Control-Allow-Origin": "*" },
});
http.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getToken();
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (res) => {
    // 根据业务修改
    return res;
  },
  (error) => {
    let { message } = error;
    const { status, data } = error.response;
    console.log("err" + error); // for debug
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "后端接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      if (data && data.message) {
        message = data.message
      } else {
        message = "后端接口" + message.substr(message.length - 3) + "异常";
      }
    }
    errorMsg(message || "未知错误");
    return Promise.reject(error);
  }
);
export default http;
Vue.prototype.$http = http;
