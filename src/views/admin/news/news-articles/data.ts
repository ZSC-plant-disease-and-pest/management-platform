import { searchInterface } from '@/components/common/BasicSearch/search';
import { topButtonInterface, tableButtonInterface, tableColumnInterface } from '@/components/common/BasicTable/table';
import { pageInterface } from '@/components/common/BasicPage/page';

export const searchList: searchInterface = [
  { name: 'title', placeholder: '新闻标题', value: '' },
  { name: 'author', placeholder: '新闻作者', value: '' }
];

export const topButtonList: topButtonInterface = [
  { name: 'delete', type: 'danger', icon: 'el-icon-delete', label: '删除' },
  { name: 'add', type: 'success', icon: 'el-icon-plus', label: '添加' }
];

export const tableButtonList: tableButtonInterface = [
  { name: 'view', icon: 'el-icon-view', color: 'rgb(63, 186, 246)', label: '详情' },
  { name: 'edit', icon: 'el-icon-delete', color: 'rgb(65, 209, 204)', label: '编辑' }
];

export const tableColumnList: tableColumnInterface = [
  { prop: 'id', label: '序号', width: '75px' },
  { prop: 'title', label: '新闻标题', width: 'auto' },
  { prop: 'author', label: '新闻作者', width: 'auto' },
  { prop: 'newsType', label: '新闻类型', width: 'auto' },
  {
    prop: 'publishedOrNot',
    label: '新闻状态',
    width: 'auto',
    alias: true,
    getAlias (publishedOrNot: any) {
      return publishedOrNot ? '发布中' : '未发布';
    }
  }
];

export const pageList: pageInterface = { total: 0, page: 1, size: 10 };

export const newsTypeTableColumnList: tableColumnInterface = [
  { prop: 'name', label: '新闻类型', width: 'auto' }
];
