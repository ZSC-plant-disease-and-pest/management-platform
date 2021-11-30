import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');

const news: RouteRecordRaw = {
  name: 'news',
  component: Layout,
  path: '/admin',
  meta: {
    title: '新闻公告'
  },
  children: [
    {
      name: 'news-articles',
      path: 'news-articles',
      component: () => import('@/views/admin/news/news-articles/index.vue'),
      meta: {
        title: '新闻文章管理'
      }
    },
    {
      name: 'news-articles-page',
      path: 'news-articles-page/:id',
      component: () => import('@/views/admin/news/news-articles/components/data-page.vue'),
      meta: {
        title: '新闻文章详情'
      }
    },
    {
      name: 'news-type',
      path: 'news-type',
      component: () => import('@/views/admin/news/news-type/index.vue'),
      meta: {
        title: '新闻类型管理'
      }
    }
  ]
};

export default news;
