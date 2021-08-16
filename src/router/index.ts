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

// disease/pestManagement 植物虫害管理
const pestManagement = () => import('@/views/admin/disease/pest/pestManagement/index.vue');

// 4 园林花卉
// gardens/plantsManagement 植物管理
const plantsManagement = () => import('@/views/admin/gardens/plants/plantsManagement/index.vue');
// gardens/familyManagement 科属管理
const familyManagement = () => import('@/views/admin/gardens/plants/familyManagement/index.vue');

// gardens/videoManagement 盆景养护视频
const videoManagement = () => import('@/views/admin/gardens/gardens/videoManagement/index.vue');

// 5 AI 智能识别
// recognition/diseaseImageManagement 病害图像数据集管理
const diseaseImageManagement = () => import('@/views/admin/recognition/images/diseaseImageManagement/index.vue');
// recognition/pestImageManagement 病害图像数据集管理
const pestImageManagement = () => import('@/views/admin/recognition/images/pestImageManagement/index.vue');
// recognition/plantsImageManagement 病害图像数据集管理
const plantsImageManagement = () => import('@/views/admin/recognition/images/plantsImageManagement/index.vue');

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
        path: 'disease/pestManagement',
        name: 'pestManagement',
        component: pestManagement
      },
      {
        path: 'gardens/plantsManagement',
        name: 'plantsManagement',
        component: plantsManagement
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
      // {
      //   path: 'home',
      //   name: 'home',
      //   component: home
      // },
      // {
      //   path: 'classificationManagement',
      //   name: 'classificationManagement',
      //   component: classificationManagement
      // },
      // // 植物资料
      // {
      //   path: 'plantsData',
      //   name: 'plantsData',
      //   component: plantsData
      // },
      // {
      //   path: 'plantsData/add',
      //   name: 'plantsDataAdd',
      //   component: plantsDataAddUpdate,
      //   meta: {
      //     type: 'add'
      //   }
      // },
      // {
      //   path: 'plantsData/update',
      //   name: 'plantsDataUpdate',
      //   component: plantsDataAddUpdate,
      //   meta: {
      //     type: 'update'
      //   }
      // },
      // // 病害管理
      // {
      //   path: 'diseaseManagement',
      //   name: 'diseaseManagement',
      //   component: diseaseManagement
      // },
      // {
      //   path: 'diseaseManagement/add',
      //   name: 'diseaseManagementAdd',
      //   component: diseaseManagementAddUpdate,
      //   meta: {
      //     type: 'add'
      //   }
      // },
      // {
      //   path: 'diseaseManagement/update',
      //   name: 'diseaseManagementUpdate',
      //   component: diseaseManagementAddUpdate,
      //   meta: {
      //     type: 'update'
      //   }
      // },
      // // 虫害管理
      // {
      //   path: 'pestManagement',
      //   name: 'pestManagement',
      //   component: pestManagement
      // },
      // {
      //   path: 'pestManagement/add',
      //   name: 'pestManagementAdd',
      //   component: pestManagementAddUpdate,
      //   meta: {
      //     type: 'add'
      //   }
      // },
      // {
      //   path: 'pestManagement/update',
      //   name: 'pestManagementUpdate',
      //   component: pestManagementAddUpdate,
      //   meta: {
      //     type: 'update'
      //   }
      // },
      // {
      //   path: 'protectiveMeasures',
      //   name: 'protectiveMeasures',
      //   component: protectiveMeasures
      // },
      // // 数据集信息管理
      // {
      //   path: 'dataSetInfo',
      //   name: 'dataSetInfo',
      //   component: dataSetInfo
      // },
      // {
      //   path: 'dataSetInfo/add',
      //   name: 'dataSetInfoAdd',
      //   component: dataSetInfoAddUpdate,
      //   meta: {
      //     type: 'add'
      //   }
      // },
      // {
      //   path: 'dataSetInfo/update',
      //   name: 'dataSetInfoUpdate',
      //   component: dataSetInfoAddUpdate,
      //   meta: {
      //     type: 'update'
      //   }
      // },
      // // 标签集管理
      // {
      //   path: 'labelSet',
      //   name: 'labelSet',
      //   component: labelSet
      // },
      // {
      //   path: 'labelSet/add',
      //   name: 'labelSetAdd',
      //   component: labelSetAddUpdate,
      //   meta: {
      //     type: 'add'
      //   }
      // },
      // {
      //   path: 'labelSet/update',
      //   name: 'labelSetUpdate',
      //   component: labelSetAddUpdate,
      //   meta: {
      //     type: 'update'
      //   }
      // },
      // {
      //   path: 'pictureManagement',
      //   name: 'pictureManagement',
      //   component: pictureManagement
      // },
      // {
      //   path: 'pictureManagement/add',
      //   name: 'pictureManagementAdd',
      //   component: pictureAddUpdate
      // },
      // {
      //   path: 'pictureManagement/update',
      //   name: 'pictureManagementUpdate',
      //   component: pictureAddUpdate
      // },
      // {
      //   path: 'pictureTagging',
      //   name: 'pictureTagging',
      //   component: pictureTagging
      // },
      // {
      //   path: 'versionManagement',
      //   name: 'versionManagement',
      //   component: versionManagement
      // },
      // {
      //   path: 'test',
      //   name: 'test',
      //   component: test
      // }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
