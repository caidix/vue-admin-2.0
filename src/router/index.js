import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "default",
    component: Layout,
    children: [
      {
        path: "/",
        component: (resolve) => require(["@/views/Home.vue"], resolve),
        name: "Home",
        meta: { title: "主页", icon: "el-icon-s-home", noCache: true },
      },
    ],
  },
  {
    path: "/about",
    name: "About1",
    component: Layout,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "",
        component: (resolve) => require(["@/views/About.vue"], resolve),
        name: "About",
        meta: { title: "关于", icon: "el-icon-s-home", noCache: true },
      },
    ],
  },
];
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior,
});

export default router;
