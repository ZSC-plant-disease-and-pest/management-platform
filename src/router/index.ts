import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const login = () => import('@/views/login/index.vue');
const layout = () => import('@/layout/index.vue');

const test = () => import('@/views/management/test/index.vue');

const appear = () => import('@/views/management/info/appear/index.vue');
const disease = () => import('@/views/management/info/disease/index.vue');
const pest = () => import('@/views/management/info/pest/index.vue');
const species = () => import('@/views/management/info/species/index.vue');
const picture = () => import('@/views/management/info/picture/index.vue');

const tag = () => import('@/views/management/label/tag/index.vue');
const collection = () => import('@/views/management/label/collection/index.vue');
const library = () => import('@/views/management/label/library/index.vue');

const version = () => import('@/views/management/model/version/index.vue');

const info = () => import('@/views/management/dataset/info/index.vue');

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
      },
      {
        path: 'info/appear',
        name: 'appear',
        component: appear
      },
      {
        path: 'info/disease',
        name: 'disease',
        component: disease
      },
      {
        path: 'info/pest',
        name: 'pest',
        component: pest
      },
      {
        path: 'info/species',
        name: 'species',
        component: species
      },
      {
        path: 'info/picture',
        name: 'picture',
        component: picture
      },
      {
        path: 'label/tag',
        name: 'tag',
        component: tag
      },
      {
        path: 'label/collection',
        name: 'collection',
        component: collection
      },
      {
        path: 'label/library',
        name: 'library',
        component: library
      },
      {
        path: 'dataset/info',
        name: 'info',
        component: info
      },
      {
        path: 'model/version',
        name: 'version',
        component: version
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
