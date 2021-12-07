import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

const gardens: RouteRecordRaw = {
  name: 'gardens',
  component: Layout,
  path: '/admin',
  meta: {
    title: '园林花卉'
  },
  children: [
    {
      name: 'plants-data',
      path: 'plants-data',
      component: () => import('@/views/admin/gardens/plants-data/index.vue'),
      meta: {
        title: '植物管理'
      }
    },
    {
      name: 'plants-data-page',
      path: 'plants-data-page/:id',
      component: () => import('@/views/admin/gardens/plants-data/components/data-page.vue'),
      meta: {
        title: '植物详情'
      }
    },
    {
      name: 'plants-family',
      path: 'plants-family',
      component: () => import('@/views/admin/gardens/plants-family/index.vue'),
      meta: {
        title: '科属管理'
      }
    }
    // {
    //   name: 'bonsai-video',
    //   path: 'bonsai-video',
    //   component: () => import('@/views/admin/gardens/bonsai-video/index.vue'),
    //   meta: {
    //     title: '盆景养护视频'
    //   }
    // },
    // {
    //   name: 'bonsai-video-page',
    //   path: 'bonsai-video-page/:id',
    //   component: () => import('@/views/admin/gardens/bonsai-video/components/data-page.vue'),
    //   meta: {
    //     title: '盆景养护视频详情'
    //   }
    // }
  ]
};

export default gardens;
