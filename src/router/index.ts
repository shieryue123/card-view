import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("../pages/login/index.vue")
  },
  {
    path: "/",
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'index',
        component: () => import("../pages/home/index.vue"),
        meta: {
          title: '首页',
          icon: 'HomeFilled'
        }
      },
      {
        path: '/short',
        name: 'short',
        component: () => import("../pages/short/index.vue"),
        meta: {
          title: '短网址',
          icon: 'Link'
        }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const breadList:any = []
router.beforeEach((to, _from, next) => {
  const show = breadList.filter((item: { fullPath: string }) => item.fullPath === to.fullPath)
  if (!show.length && to.fullPath !== '/' && to.fullPath !== '/login') {
    breadList.push(to)
    localStorage.setItem('breadList', JSON.stringify(breadList))
  }
  next()
})
export default router