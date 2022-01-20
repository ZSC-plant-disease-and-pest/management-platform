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

// 5 AI 智能识别
// recognition/diseaseImageManagement 病害图像数据集管理
const diseaseImageManagement = () => import('@/views/admin/recognition/images/diseaseImageManagement/index.vue');
// recognition/pestImageManagement 病害图像数据集管理
const pestImageManagement = () => import('@/views/admin/recognition/images/pestImageManagement/index.vue');
// recognition/plantsImageManagement 病害图像数据集管理
const plantsImageManagement = () => import('@/views/admin/recognition/images/plantsImageManagement/index.vue');

// recognition/datasetDetail 病虫害图像数据集详情
const datasetDetail = () => import('@/views/admin/recognition/images/detail/index.vue');

// recognition/imagesTaggingManagement 图片标注管理
const imagesTaggingManagement = () => import('@/views/admin/recognition/tagging/taggingManagement/index.vue');

// recognition/trainingModelManagement 训练模型管理
const trainingModelManagement = () => import('@/views/admin/recognition/model/trainingModelManagement/index.vue');
// recognition/trainingModelManagement 训练模型详情
const trainingModelManagementAddUpdate = () => import('@/views/admin/recognition/model/trainingModelManagement/components/add-update.vue');

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
    children: [
      {
        path: 'recognition/diseaseImageManagement',
        name: 'diseaseImageManagement',
        component: diseaseImageManagement
      },
      {
        path: 'recognition/pestImageManagement',
        name: 'pestImageManagement',
        component: pestImageManagement
      },
      {
        path: 'recognition/plantsImageManagement',
        name: 'plantsImageManagement',
        component: plantsImageManagement
      },
      {
        path: 'recognition/datasetDetail/:type/:id',
        name: 'datasetDetail',
        component: datasetDetail
      },
      {
        path: 'recognition/imagesTaggingManagement',
        name: 'imagesTaggingManagement',
        component: imagesTaggingManagement
      },
      {
        path: 'recognition/trainingModelManagement',
        name: 'trainingModelManagement',
        component: trainingModelManagement
      },
      {
        path: 'recognition/trainingModelManagement/add',
        name: 'trainingModelManagementAdd',
        component: trainingModelManagementAddUpdate
      },
      {
        path: 'recognition/trainingModelManagement/update',
        name: 'trainingModelManagementUpdate',
        component: trainingModelManagementAddUpdate
      }
    ]
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
