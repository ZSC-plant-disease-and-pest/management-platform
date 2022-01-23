import { searchInterface } from '@/components/common/BasicSearch/search';
import { topButtonInterface, tableButtonInterface, tableColumnInterface } from '@/components/common/BasicTable/table';
import { pageInterface } from '@/components/common/BasicPage/page';

export const searchList: searchInterface = [
  { name: 'name', placeholder: '视频名称', value: '' }
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
  { prop: 'name', label: '植物名称', width: 'auto' },
  { prop: 'scientificName', label: '植物学名', width: 'auto' },
  { prop: 'nickname', label: '植物别名', width: 'auto' },
  { prop: 'family', label: '植物科类', width: 'auto' },
  { prop: 'genus', label: '植物属类', width: 'auto' }
];

export const pageList: pageInterface = { total: 0, page: 1, size: 10 };
