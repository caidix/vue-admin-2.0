import Vue from "vue";
import App from "./App.vue";
import "normalize.css";
import ElementUI from "element-ui";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
