import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

const system: RouteRecordRaw = {
  name: 'system',
  component: Layout,
  path: '/admin',
  meta: {
    title: '系统管理'
  },
  children: [
    {
      name: 'role-data',
      path: 'role-data',
      component: () => import('@/views/admin/system/role-data/index.vue'),
      meta: {
        title: '角色信息管理'
      }
    },
    {
      name: 'role-data-page',
      path: 'role-data-page/:id',
      component: () => import('@/views/admin/system/role-data/components/data-page.vue'),
      meta: {
        title: '角色信息详情'
      }
    },
    {
      name: 'user-data',
      path: 'user-data/:id',
      component: () => import('@/views/admin/system/user-data/index.vue'),
      meta: {
        title: '用户信息管理'
      }
    }
  ]
};

export default system;
