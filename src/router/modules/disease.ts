import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

const disease: RouteRecordRaw = {
  name: 'disease',
  component: Layout,
  path: '/admin',
  meta: {
    title: '病虫害数据库'
  },
  children: [
    {
      name: 'disease-data',
      path: 'disease-data',
      component: () => import('@/views/admin/disease/disease-data/index.vue'),
      meta: {
        title: '植物病害管理'
      }
    },
    {
      name: 'disease-data-page',
      path: 'disease-data-page/:id',
      component: () => import('@/views/admin/disease/disease-data/components/data-page.vue'),
      meta: {
        title: '植物病害详情'
      }
    },
    {
      name: 'pest-data',
      path: 'pest-data',
      component: () => import('@/views/admin/disease/pest-data/index.vue'),
      meta: {
        title: '植物虫害管理'
      }
    },
    {
      name: 'pest-data-page',
      path: 'pest-data-page/:id',
      component: () => import('@/views/admin/disease/pest-data/components/data-page.vue'),
      meta: {
        title: '植物虫害详情'
      }
    }
  ]
};

export default disease;
