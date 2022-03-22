import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getToken } from '@/utils/cookie';
import store from '@/store';

import home from './modules/home';
import news from './modules/news';
import disease from './modules/disease';
import gardens from './modules/gardens';
import ai from './modules/ai';
import system from './modules/system';

// 登录
const login = () => import('@/views/login/index.vue');
// 后台管理布局
const layout = () => import('@/layout/index.vue');
// 测试
const test = () => import('@/views/test/index.vue');

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
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/home',
    component: layout,
    children: []
  }
];

routes.push(home, news, disease, gardens, ai, system);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    if (getToken() && store.getters['user/getStatus']) {
      next();
    } else {
      store.dispatch('user/getUserInfo')
        .then(() => {
          next();
        })
        .catch(() => {
          next('/login');
          ElMessage.warning('请先登录');
        });
    }
  }
});

export default router;
