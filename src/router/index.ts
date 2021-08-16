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
          name: '病虫害数据库/植物虫害管理',
          path: '/admin/disease/pestManagement'
        },
        {
          name: '园林花卉/植物管理',
          path: '/admin/gardens/plantsManagement'
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
          name: 'AI 智能识别/虫害图像数据集管理',
          path: '/admin/recognition/pestImageManagement'
        },
        {
          name: 'AI 智能识别/植物图像数据集管理',
          path: '/admin/recognition/plantsImageManagement'
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
        component: newManagement,
        meta: {
          title: '新闻管理'
        }
      },
      {
        path: 'disease/diseaseManagement',
        name: 'diseaseManagement',
        component: diseaseManagement,
        meta: {
          title: '植物病害管理'
        }
      },
      {
        path: 'disease/pestManagement',
        name: 'pestManagement',
        component: pestManagement,
        meta: {
          title: '植物虫害管理'
        }
      },
      {
        path: 'gardens/plantsManagement',
        name: 'plantsManagement',
        component: plantsManagement,
        meta: {
          title: '植物管理'
        }
      },
      {
        path: 'gardens/familyManagement',
        name: 'familyManagement',
        component: familyManagement,
        meta: {
          title: '科属管理'
        }
      },
      {
        path: 'gardens/videoManagement',
        name: 'videoManagement',
        component: videoManagement,
        meta: {
          title: '盆景养护视频'
        }
      },
      {
        path: 'recognition/diseaseImageManagement',
        name: 'diseaseImageManagement',
        component: diseaseImageManagement,
        meta: {
          title: '病害图像数据集管理'
        }
      },
      {
        path: 'recognition/pestImageManagement',
        name: 'pestImageManagement',
        component: pestImageManagement,
        meta: {
          title: '虫害图像数据集管理'
        }
      },
      {
        path: 'recognition/plantsImageManagement',
        name: 'plantsImageManagement',
        component: plantsImageManagement,
        meta: {
          title: '植物图像数据集管理'
        }
      },
      {
        path: 'recognition/imagesTaggingManagement',
        name: 'imagesTaggingManagement',
        component: imagesTaggingManagement,
        meta: {
          title: '图片标注管理'
        }
      },
      {
        path: 'recognition/trainingModelManagement',
        name: 'trainingModelManagement',
        component: trainingModelManagement,
        meta: {
          title: '训练模型管理'
        }
      },
      {
        path: 'recognition/trainingParamManagement',
        name: 'trainingParamManagement',
        component: trainingParamManagement,
        meta: {
          title: '训练参数配置'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
