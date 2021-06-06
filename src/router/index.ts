import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Login = () => import('@/views/login/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   meta: {
  //     icon: 'home',
  //     title: '首页',
  //     otherSetting: true
  //   },
  //   component: Home
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
