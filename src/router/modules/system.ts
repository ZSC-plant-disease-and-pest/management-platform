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
    }
  ]
};

export default system;
