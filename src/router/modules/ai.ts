import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

const ai: RouteRecordRaw = {
  name: 'ai',
  component: Layout,
  path: '/admin',
  meta: {
    title: 'AI 智能识别'
  },
  children: [
    {
      name: 'disease-images',
      path: 'disease-images',
      component: () => import('@/views/admin/ai/disease-images/index.vue'),
      meta: {
        title: '病害图像数据集'
      }
    },
    {
      name: 'pest-images',
      path: 'pest-images',
      component: () => import('@/views/admin/ai/pest-images/index.vue'),
      meta: {
        title: '虫害图像数据集'
      }
    },
    {
      name: 'plant-images',
      path: 'plant-images',
      component: () => import('@/views/admin/ai/plant-images/index.vue'),
      meta: {
        title: '植物图像数据集'
      }
    },
    {
      name: 'dataset-data',
      path: 'dataset-data/:type/:id',
      component: () => import('@/views/admin/ai/dataset-data/index.vue'),
      meta: {
        title: '数据集详情'
      }
    },
    {
      name: 'tagging-images',
      path: 'tagging-images',
      component: () => import('@/views/admin/ai/tagging-images/index.vue'),
      meta: {
        title: '图片标注管理'
      }
    },
    {
      name: 'training-model',
      path: 'training-model',
      component: () => import('@/views/admin/ai/training-model/index.vue'),
      meta: {
        title: '训练模型管理'
      }
    },
    {
      name: 'training-model-page',
      path: 'training-model-page/:id',
      component: () => import('@/views/admin/ai/training-model/components/data-page.vue'),
      meta: {
        title: '训练模型详情'
      }
    },
    {
      name: 'training-params',
      path: 'training-params',
      component: () => import('@/views/admin/ai/training-params/index.vue'),
      meta: {
        title: '训练模型参数'
      }
    }
  ]
};

export default ai;
