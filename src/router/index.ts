import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 登录
const login = () => import('@/views/login/index.vue');
// 后台管理布局
const layout = () => import('@/layout/index.vue');

// 后台管理
// admin/

// 1 首页
// home
const home = () => import('@/views/admin/home/index.vue');

// 2 新闻公告
// new/newManagement 新闻管理
const newManagement = () => import('@/views/admin/new/new/newManagement/index.vue');

// 3 病虫害数据库
// disease/diseaseManagement 植物病害管理
const diseaseManagement = () => import('@/views/admin/disease/disease/diseaseManagement/index.vue');
const diseaseManagementAddUpdate = () => import('@/views/admin/disease/disease/diseaseManagement/components/add-update.vue');
// disease/pestManagement 植物虫害管理
const pestManagement = () => import('@/views/admin/disease/pest/pestManagement/index.vue');
const pestManagementAddUpdate = () => import('@/views/admin/disease/pest/pestManagement/components/add-update.vue');

// 4 园林花卉
// gardens/plantsManagement 植物管理
const plantsManagement = () => import('@/views/admin/gardens/plants/plantsManagement/index.vue');
const plantsManagementAddUpdate = () => import('@/views/admin/gardens/plants/plantsManagement/components/add-update.vue');
// gardens/familyManagement 科属管理
const familyManagement = () => import('@/views/admin/gardens/plants/familyManagement/index.vue');

// gardens/videoManagement 盆景养护视频
const videoManagement = () => import('@/views/admin/gardens/gardens/videoManagement/index.vue');
const videoManagementAddUpdate = () => import('@/views/admin/gardens/gardens/videoManagement/components/add-update.vue');

// 5 AI 智能识别
// recognition/diseaseImageManagement 病害图像数据集管理
const diseaseImageManagement = () => import('@/views/admin/recognition/images/diseaseImageManagement/index.vue');
const diseaseImageManagementAddUpdate = () => import('@/views/admin/recognition/images/diseaseImageManagement/components/add-update.vue');
// recognition/pestImageManagement 病害图像数据集管理
const pestImageManagement = () => import('@/views/admin/recognition/images/pestImageManagement/index.vue');
const pestImageManagementAddUpdate = () => import('@/views/admin/recognition/images/pestImageManagement/components/add-update.vue');
// recognition/plantsImageManagement 病害图像数据集管理
const plantsImageManagement = () => import('@/views/admin/recognition/images/plantsImageManagement/index.vue');
const plantsImageManagementAddUpdate = () => import('@/views/admin/recognition/images/plantsImageManagement/components/add-update.vue');

// recognition/imagesTaggingManagement 病害图像数据集管理
const imagesTaggingManagement = () => import('@/views/admin/recognition/dataset/imagesTaggingManagement/index.vue');

// recognition/trainingModelManagement 病害图像数据集管理
const trainingModelManagement = () => import('@/views/admin/recognition/model/trainingModelManagement/index.vue');

// recognition/trainingParamManagement 病害图像数据集管理
const trainingParamManagement = () => import('@/views/admin/recognition/config/trainingParamManagement/index.vue');

// 6 系统管理

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
    redirect: '/admin/home',
    component: layout,
    meta: {
      breadcrumb: [
        {
          name: '新闻公告/新闻管理',
          path: '/admin/new/newManagement'
        },
        {
          name: '病虫害数据库/植物病害管理',
          path: '/admin/disease/diseaseManagement'
        },
        {
          name: '病虫害数据库/植物病害管理/新增',
          path: '/admin/disease/diseaseManagement/add'
        },
        {
          name: '病虫害数据库/植物病害管理/编辑',
          path: '/admin/disease/diseaseManagement/update'
        },
        {
          name: '病虫害数据库/植物虫害管理',
          path: '/admin/disease/pestManagement'
        },
        {
          name: '病虫害数据库/植物虫害管理/新增',
          path: '/admin/disease/pestManagement/add'
        },
        {
          name: '病虫害数据库/植物虫害管理/编辑',
          path: '/admin/disease/pestManagement/update'
        },
        {
          name: '园林花卉/植物管理',
          path: '/admin/gardens/plantsManagement'
        },
        {
          name: '园林花卉/植物管理/新增',
          path: '/admin/gardens/plantsManagement/add'
        },
        {
          name: '园林花卉/植物管理/编辑',
          path: '/admin/gardens/plantsManagement/update'
        },
        {
          name: '园林花卉/科属管理',
          path: '/admin/gardens/familyManagement'
        },
        {
          name: '园林花卉/盆景养护视频',
          path: '/admin/gardens/videoManagement'
        },
        {
          name: 'AI 智能识别/病害图像数据集管理',
          path: '/admin/recognition/diseaseImageManagement'
        },
        {
          name: 'AI 智能识别/病害图像数据集管理/新增',
          path: '/admin/recognition/diseaseImageManagement/add'
        },
        {
          name: 'AI 智能识别/病害图像数据集管理/编辑',
          path: '/admin/recognition/diseaseImageManagement/update'
        },
        {
          name: 'AI 智能识别/虫害图像数据集管理',
          path: '/admin/recognition/pestImageManagement'
        },
        {
          name: 'AI 智能识别/虫害图像数据集管理/新增',
          path: '/admin/recognition/pestImageManagement/add'
        },
        {
          name: 'AI 智能识别/虫害图像数据集管理/编辑',
          path: '/admin/recognition/pestImageManagement/update'
        },
        {
          name: 'AI 智能识别/植物图像数据集管理',
          path: '/admin/recognition/plantsImageManagement'
        },
        {
          name: 'AI 智能识别/植物图像数据集管理/新增',
          path: '/admin/recognition/plantsImageManagement/add'
        },
        {
          name: 'AI 智能识别/植物图像数据集管理/编辑',
          path: '/admin/recognition/plantsImageManagement/update'
        },
        {
          name: 'AI 智能识别/图片标注管理',
          path: '/admin/recognition/imagesTaggingManagement'
        },
        {
          name: 'AI 智能识别/训练模型管理',
          path: '/admin/recognition/trainingModelManagement'
        },
        {
          name: 'AI 智能识别/训练参数配置',
          path: '/admin/recognition/trainingParamManagement'
        }
      ]
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: home
      },
      {
        path: 'new/newManagement',
        name: 'newManagement',
        component: newManagement
      },
      {
        path: 'disease/diseaseManagement',
        name: 'diseaseManagement',
        component: diseaseManagement
      },
      {
        path: 'disease/diseaseManagement/add',
        name: 'diseaseManagementAdd',
        component: diseaseManagementAddUpdate
      },
      {
        path: 'disease/diseaseManagement/update',
        name: 'diseaseManagementUpdate',
        component: diseaseManagementAddUpdate
      },
      {
        path: 'disease/pestManagement',
        name: 'pestManagement',
        component: pestManagement
      },
      {
        path: 'disease/pestManagement/add',
        name: 'pestManagementAdd',
        component: pestManagementAddUpdate
      },
      {
        path: 'disease/pestManagement/update',
        name: 'pestManagementUpdate',
        component: pestManagementAddUpdate
      },
      {
        path: 'gardens/plantsManagement',
        name: 'plantsManagement',
        component: plantsManagement
      },
      {
        path: 'gardens/plantsManagement/add',
        name: 'plantsManagementAdd',
        component: plantsManagementAddUpdate
      },
      {
        path: 'gardens/plantsManagement/update',
        name: 'plantsManagementUpdate',
        component: plantsManagementAddUpdate
      },
      {
        path: 'gardens/familyManagement',
        name: 'familyManagement',
        component: familyManagement
      },
      {
        path: 'gardens/videoManagement',
        name: 'videoManagement',
        component: videoManagement
      },
      {
        path: 'gardens/videoManagement/add',
        name: 'videoManagementAdd',
        component: videoManagementAddUpdate
      },
      {
        path: 'gardens/videoManagement/update',
        name: 'videoManagementUpdate',
        component: videoManagementAddUpdate
      },
      {
        path: 'recognition/diseaseImageManagement',
        name: 'diseaseImageManagement',
        component: diseaseImageManagement
      },
      {
        path: 'recognition/diseaseImageManagement/add',
        name: 'diseaseImageManagementAdd',
        component: diseaseImageManagementAddUpdate
      },
      {
        path: 'recognition/diseaseImageManagement/update',
        name: 'diseaseImageManagementUpdate',
        component: diseaseImageManagementAddUpdate
      },
      {
        path: 'recognition/pestImageManagement',
        name: 'pestImageManagement',
        component: pestImageManagement
      },
      {
        path: 'recognition/pestImageManagement/add',
        name: 'pestImageManagementAdd',
        component: pestImageManagementAddUpdate
      },
      {
        path: 'recognition/pestImageManagement/update',
        name: 'pestImageManagementUpdate',
        component: pestImageManagementAddUpdate
      },
      {
        path: 'recognition/plantsImageManagement',
        name: 'plantsImageManagement',
        component: plantsImageManagement
      },
      {
        path: 'recognition/plantsImageManagement/add',
        name: 'plantsImageManagementAdd',
        component: plantsImageManagementAddUpdate
      },
      {
        path: 'recognition/plantsImageManagement/update',
        name: 'plantsImageManagementUpdate',
        component: plantsImageManagementAddUpdate
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
        path: 'recognition/trainingParamManagement',
        name: 'trainingParamManagement',
        component: trainingParamManagement
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
