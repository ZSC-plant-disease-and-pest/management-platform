import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const login = () => import('@/views/login/index.vue');
const layout = () => import('@/layout/index.vue');

const test = () => import('@/views/management/test/index.vue');

// 0 用户管理
const home = () => import('@/views/admin/home/index.vue');

// 1 系统管理

// 1.1 用户管理
// 1.2 系统用户
// 1.3 系统角色

// 2 植物数据库
// 2.1 植物分类管理
const classificationManagement = () => import('@/views/admin/plant-database/classification-management/index.vue');
// 2.2 植物资料
const plantData = () => import('@/views/admin/plant-database/plant-data/index.vue');

// 3 病虫害数据库
// 3.1 病害管理
const diseaseManagement = () => import('@/views/admin/pest-database/disease-management/index.vue');
// 3.2 虫害管理
const pestManagement = () => import('@/views/admin/pest-database/pest-management/index.vue');
const pestManagementAddUpdate = () => import('@/views/admin/pest-database/pest-management/components/add-update.vue');
// 3.3 病虫害防护措施
const protectiveMeasures = () => import('@/views/admin/pest-database/protective-measures/index.vue');

// 4 数据集管理
// 4.1 数据集信息管理
const dataSetInfo = () => import('@/views/admin/data-set-management/data-set-info/index.vue');
const dataSetInfoAddUpdate = () => import('@/views/admin/data-set-management/data-set-info/components/add-update.vue');
// 4.2 标签集管理
const labelSet = () => import('@/views/admin/data-set-management/label-set/index.vue');
const labelSetAddUpdate = () => import('@/views/admin/data-set-management/label-set/components/add-update.vue');

// 5 数据采集和标注
// 5.1 图片管理
const pictureManagement = () => import('@/views/admin/data-collect-tagging/picture-management/index.vue');
const pictureAddUpdate = () => import('@/views/admin/data-collect-tagging/picture-management/components/add-update.vue');
// 5.2 图片标注
const pictureTagging = () => import('@/views/admin/data-collect-tagging/picture-tagging/index.vue');

// 6 模型管理
// 6.1 版本管理
const versionManagement = () => import('@/views/admin/model-management/version/index.vue');

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
        path: 'classificationManagement',
        name: 'classificationManagement',
        component: classificationManagement
      },
      {
        path: 'plantData',
        name: 'plantData',
        component: plantData
      },
      {
        path: 'diseaseManagement',
        name: 'diseaseManagement',
        component: diseaseManagement
      },
      {
        path: 'pestManagement',
        name: 'pestManagement',
        component: pestManagement
      },
      {
        path: 'pestManagement/add',
        name: 'pestManagementAdd',
        component: pestManagementAddUpdate,
        meta: {
          type: 'add'
        }
      },
      {
        path: 'pestManagement/update',
        name: 'pestManagementUpdate',
        component: pestManagementAddUpdate,
        meta: {
          type: 'update'
        }
      },
      {
        path: 'protectiveMeasures',
        name: 'protectiveMeasures',
        component: protectiveMeasures
      },
      {
        path: 'dataSetInfo',
        name: 'dataSetInfo',
        component: dataSetInfo
      },
      {
        path: 'dataSetInfo/add',
        name: 'dataSetInfoAdd',
        component: dataSetInfoAddUpdate,
        meta: {
          type: 'add'
        }
      },
      {
        path: 'dataSetInfo/update',
        name: 'dataSetInfoUpdate',
        component: dataSetInfoAddUpdate,
        meta: {
          type: 'update'
        }
      },
      {
        path: 'labelSet',
        name: 'labelSet',
        component: labelSet
      },
      {
        path: 'labelSet/add',
        name: 'labelSetAdd',
        component: labelSetAddUpdate,
        meta: {
          type: 'add'
        }
      },
      {
        path: 'labelSet/update',
        name: 'labelSetUpdate',
        component: labelSetAddUpdate,
        meta: {
          type: 'update'
        }
      },
      {
        path: 'pictureManagement',
        name: 'pictureManagement',
        component: pictureManagement
      },
      {
        path: 'pictureManagement/add',
        name: 'pictureManagementAdd',
        component: pictureAddUpdate
      },
      {
        path: 'pictureManagement/update',
        name: 'pictureManagementUpdate',
        component: pictureAddUpdate
      },
      {
        path: 'pictureTagging',
        name: 'pictureTagging',
        component: pictureTagging
      },
      {
        path: 'versionManagement',
        name: 'versionManagement',
        component: versionManagement
      },
      {
        path: 'test',
        name: 'test',
        component: test
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
