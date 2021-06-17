import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const login = () => import('@/views/login/index.vue');
const layout = () => import('@/layout/index.vue');
const test = () => import('@/views/management/test/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/test',
    component: layout,
    children: [
      {
        path: 'test',
        name: 'test',
        component: test
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
