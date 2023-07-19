import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../pages/home/index.vue")
  },
  {
    path: "/login",
    component: () => import("../pages/login/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router