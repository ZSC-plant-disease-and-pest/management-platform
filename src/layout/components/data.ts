const headerMenuList: Array<any> = [
  {
    index: 'home',
    icon: 'el-icon-s-home',
    title: '首页'
  },
  {
    index: 'news',
    icon: 'el-icon-news',
    title: '新闻公告'
  },
  {
    index: 'disease',
    icon: 'el-icon-s-data',
    title: '病虫害数据库'
  },
  {
    index: 'gardens',
    icon: 'el-icon-sunny',
    title: '园林花卉'
  },
  {
    index: 'ai',
    icon: 'el-icon-search',
    title: 'AI 智能识别'
  },
  {
    index: 'system',
    icon: 'el-icon-set-up',
    title: '系统管理'
  }
];

const headerMenuItemList: any = {
  home: {
    meta: [],
    path: '/admin/home'
  },
  news: {
    meta: [
      {
        name: 'news',
        icon: 'el-icon-postcard',
        label: '新闻公告',
        list: [
          { name: 'news-articles', label: '新闻管理' },
          { name: 'news-type', label: '类型管理' }
        ]
      }
    ],
    path: '/admin/news-articles'
  },
  disease: {
    meta: [
      {
        name: 'disease',
        icon: 'el-icon-first-aid-kit',
        label: '病害数据库',
        list: [
          { name: 'disease-data', label: '植物病害管理' }
        ]
      },
      {
        name: 'pest',
        icon: 'el-icon-soccer',
        label: '虫害数据库',
        list: [
          { name: 'pest-data', label: '植物虫害管理' }
        ]
      }
    ],
    path: '/admin/disease-data'
  },
  gardens: {
    meta: [
      {
        name: 'plants',
        icon: 'el-icon-cherry',
        label: '植物数据集',
        list: [
          { name: 'plants-data', label: '植物管理' },
          { name: 'plants-family', label: '科属管理' }
        ]
      },
      {
        name: 'gardens',
        icon: 'el-icon-video-camera',
        label: '园林植物护养',
        list: [
          { name: 'bonsai-video', label: '盆景养护视频' }
        ]
      }
    ],
    path: '/admin/plants-data'
  },
  ai: {
    meta: [
      {
        name: 'images',
        icon: 'el-icon-picture',
        label: 'AI 图像数据集',
        list: [
          { name: 'disease-images', label: '病害图像数据集管理' },
          { name: 'pest-images', label: '虫害图像数据集管理' },
          { name: 'plant-images', label: '植物图像数据集管理' }
        ]
      },
      {
        name: 'dataset',
        icon: 'el-icon-price-tag',
        label: '数据集标注',
        list: [
          { name: 'tagging-images', label: '图片标注管理' }
        ]
      },
      {
        name: 'model',
        icon: 'el-icon-menu',
        label: '机器学习模型训练',
        list: [
          { name: 'training-model', label: '训练模型管理' }
        ]
      },
      {
        name: 'config',
        icon: 'el-icon-s-tools',
        label: 'AI 系统配置',
        list: [
          { name: 'training-params', label: '训练参数配置' }
        ]
      }
    ],
    path: '/admin/disease-images'
  },
  system: {
    meta: [
      {
        name: 'system',
        icon: 'el-icon-setting',
        label: '系统管理',
        list: [
          { name: 'role-data', label: '角色管理' }
        ]
      }
    ],
    path: '/admin/role-data'
  }
};

export { headerMenuList, headerMenuItemList };
