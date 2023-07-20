import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
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
          title: '首页'
        }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router