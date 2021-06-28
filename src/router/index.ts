import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const login = () => import('@/views/login/index.vue');
const layout = () => import('@/layout/index.vue');
const test = () => import('@/views/management/test/index.vue');
const plantDiseasesAndInsectPests = () => import('@/views/management/info/plantDiseasesAndInsectPests/index.vue');
const plantInsectPests = () => import('@/views/management/info/plantInsectPests/index.vue');
const plantDiseases = () => import('@/views/management/info/plantDiseases/index.vue');
const plantImages = () => import('@/views/management/info/plantImages/index.vue');
const plantsInfo = () => import('@/views/management/info/plantsInfo/index.vue');

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
        path: 'info/plantDiseasesAndInsectPests',
        name: 'plantDiseasesAndInsectPests',
        component: plantDiseasesAndInsectPests
      },
      {
        path: 'info/plantInsectPests',
        name: 'plantInsectPests',
        component: plantInsectPests
      },
      {
        path: 'info/plantDiseases',
        name: 'plantDiseases',
        component: plantDiseases
      },
      {
        path: 'info/plantImages',
        name: 'plantImages',
        component: plantImages
      },
      {
        path: 'info/plantsInfo',
        name: 'plantsInfo',
        component: plantsInfo
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
