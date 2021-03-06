import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/components/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/modules/login"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/modules/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "主页",
        component: () => import("@/pages/index/Home"),
        meta: { title: "主页", icon: "el-icon-s-home" },
      },
    ],
  },
  {
    path: "/category",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "categoryList",
        component: () => import("@/pages/index/Category"),
        meta: { title: "分类列表", icon: "el-icon-tickets" },
      },
    ],
    meta: { title: "分类管理", icon: "el-icon-document-copy" },
  },
  {
    path: "/tag",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "tagList",
        component: () => import("@/pages/index/Tag"),
        meta: { title: "标签列表", icon: "el-icon-collection-tag" },
      },
    ],
    meta: { title: "标签管理", icon: "el-icon-collection-tag" },
  },
  {
    path: '/gather',
    redirect: '/index',
    component: Layout,
    children: [{
      path: 'index',
      component: resolve => require(['@/pages/index/Gather'], resolve),
      name: 'gather',
      meta: { title: '归档列表', icon: 'el-icon-s-finance' }
    }],
    meta: { title: '文档集合管理', icon: 'el-icon-s-finance' }
  },
  {
    path: '/article',
    redirect: '/list',
    component: Layout,
    children: [{
      path: 'list',
      component: resolve => require(['@/pages/index/Article'], resolve),
      name: 'articleList',
      meta: { title: '文章列表', noCache: true }
    }, {
      path: 'edit',
      component: resolve => require(['@/pages/index/Article/edit'], resolve),
      name: 'articleAdd',
      meta: { title: '添加文章', noCache: true }
    }, {
      path: 'edit/:id',
      component: resolve => require(['@/pages/index/Article/edit'], resolve),
      name: 'articleEdit',
      props: true,
      hidden: true,
      meta: { title: '文章编辑', }
    }],
    meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
  },
  {
    path: '/user',
    redirect: '/list',
    component: Layout,
    children: [{
      path: 'list',
      component: resolve => require(['@/pages/index/User'], resolve),
      name: 'userList',
      meta: { title: '用户列表', icon: 'el-icon-s-management', noCache: true }
    }],
    meta: { title: '用户管理', icon: 'el-icon-user', noCache: true }
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
