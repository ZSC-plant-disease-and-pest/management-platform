import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

const home: RouteRecordRaw = {
  name: 'admin',
  component: Layout,
  path: '/admin',
  meta: {
    title: '首页'
  },
  children: [
    {
      name: 'home',
      path: 'home',
      component: () => import('@/views/admin/home/index.vue')
    }
  ]
};

export default home;
