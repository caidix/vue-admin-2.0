import axios from "axios";
import { Message, Loading } from "element-ui";
import store from "@/store";
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
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  withCredentials: true,
  header: { "Access-Control-Allow-Origin": "*" },
});
let loadingInstance;
http.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = store.getters.token;
    }
    loadingInstance = Loading.service();
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
    if (loadingInstance) {
      loadingInstance.close();
    }
    return res;
  },
  (error) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    let { message } = error;
    console.log("err" + error); // for debug
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    if (message.includes("timeout")) {
      message = "后端接口请求超时";
    }
    if (message.includes("Request failed with status code")) {
      message = "后端接口" + message.substr(message.length - 3) + "异常";
    }
    errorMsg(message || "未知错误");
    return Promise.reject(error);
  }
);
export default http;
Vue.prototype.$http = http;
