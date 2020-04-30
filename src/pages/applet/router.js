import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from "@/components/layout";

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/modules/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/modules/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/applet/Home'),
      meta: { title: 'Dashboard', icon: 'el-icon-platform-eleme' }
    }]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/applet/About'),
      meta: { title: 'Dashboard', icon: 'el-icon-platform-eleme' }
    }]
  },
  {
    path: '/classic',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '每日一句',
      component: () => import('@/pages/applet/Classic'),
      meta: { title: '每日一句', icon: 'el-icon-platform-eleme' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
