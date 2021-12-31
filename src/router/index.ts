import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getToken } from '@/utils/cookie';
import store from '@/store';
/**
 * 重构后路由
 */
// import home from './modules/home';
// import news from './modules/news';
// import disease from './modules/disease';
// import gardens from './modules/gardens';
// import ai from './modules/ai';
// import system from './modules/system';

// 测试
import disease from './modules/disease';
import news from './modules/news';
import gardens from './modules/gardens';
import ai from './modules/ai';

// 登录
const login = () => import('@/views/login/index.vue');
// 后台管理布局
const layout = () => import('@/layout/index.vue');
// 测试
const test = () => import('@/views/test/index.vue');

// 后台管理
// admin/

// 1 首页
// home
const home = () => import('@/views/admin/home/index.vue');

// 2 新闻公告
// news/newsManagement 新闻管理
const newsManagement = () => import('@/views/admin/news/news/newsManagement/index.vue');
const newsManagementAddUpdate = () => import('@/views/admin/news/news/newsManagement/components/add-update.vue');
// news/typeManagement 新闻类别管理
const typeManagement = () => import('@/views/admin/news/news/typeManagement/index.vue');

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
const familyManagementFamilyAddUpdate = () => import('@/views/admin/gardens/plants/familyManagement/components/family/add-update.vue');
const familyManagementGenusAddUpdate = () => import('@/views/admin/gardens/plants/familyManagement/components/genus/add-update.vue');

// gardens/videoManagement 盆景养护视频
const videoManagement = () => import('@/views/admin/gardens/gardens/videoManagement/index.vue');
const videoManagementAddUpdate = () => import('@/views/admin/gardens/gardens/videoManagement/components/add-update.vue');

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

// recognition/trainingParamManagement AI系统配置
const trainingParamManagement = () => import('@/views/admin/recognition/config/trainingParamManagement/index.vue');

// 6 系统管理
// system/roleManagement
const roleManagement = () => import('@/views/admin/system/roleManagement/index.vue');

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
    meta: {
      breadcrumb: [
        {
          name: '新闻公告/新闻管理',
          path: '/admin/news/newsManagement'
        },
        {
          name: '新闻公告/新闻管理/新增',
          path: '/admin/news/newsManagement/add'
        },
        {
          name: '新闻公告/新闻管理/编辑',
          path: '/admin/news/newsManagement/update'
        },
        {
          name: '新闻公告/类型管理',
          path: '/admin/news/typeManagement'
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
          name: '园林花卉/科属管理/科类新增',
          path: '/admin/gardens/familyManagement/family/add'
        },
        {
          name: '园林花卉/科属管理/科类编辑',
          path: '/admin/gardens/familyManagement/family/update'
        },
        {
          name: '园林花卉/科属管理/属类新增',
          path: '/admin/gardens/familyManagement/genus/add'
        },
        {
          name: '园林花卉/科属管理/属类编辑',
          path: '/admin/gardens/familyManagement/genus/update'
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
        },
        {
          name: '系统管理/权限管理',
          path: '/admin/systemManagement/roleManagement'
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
        path: 'news/newsManagement',
        name: 'newsManagement',
        component: newsManagement
      },
      {
        path: 'news/newsManagement/add',
        name: 'newsManagementAdd',
        component: newsManagementAddUpdate
      },
      {
        path: 'news/newsManagement/update',
        name: 'newsManagementUpdate',
        component: newsManagementAddUpdate
      },
      {
        path: 'news/typeManagement',
        name: 'typeManagement',
        component: typeManagement
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
        path: 'gardens/familyManagement/family/add',
        name: 'familyManagementFamilyAdd',
        component: familyManagementFamilyAddUpdate
      },
      {
        path: 'gardens/familyManagement/family/update',
        name: 'familyManagementFamilyUpdate',
        component: familyManagementFamilyAddUpdate
      },
      {
        path: 'gardens/familyManagement/genus/add',
        name: 'familyManagementGenusAdd',
        component: familyManagementGenusAddUpdate
      },
      {
        path: 'gardens/familyManagement/genus/update',
        name: 'familyManagementGenusUpdate',
        component: familyManagementGenusAddUpdate
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
      },
      {
        path: 'recognition/trainingParamManagement',
        name: 'trainingParamManagement',
        component: trainingParamManagement
      },
      {
        path: 'system/roleManagement',
        name: 'roleManagement',
        component: roleManagement
      }
    ]
  }
];

/**
 * 重构后路由配置
 */
// routes.push(home, news, disease, gardens, ai, system);

// 测试
routes.push(news, disease, gardens, ai);

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
