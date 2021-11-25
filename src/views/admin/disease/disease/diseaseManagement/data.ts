import { searchInterface } from '@/components/common/BasicSearch/search';
import { topButtonInterface, tableButtonInterface, tableColumnInterface } from '@/components/common/BasicTable/table';
import { pageInterface } from '@/components/common/BasicPage/page';

export const searchList: searchInterface = [
  { name: 'name', placeholder: '病害名称', value: '' }
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
  { prop: 'name', label: '病害名称', width: 'auto' },
  { prop: 'overview', label: '植物表现', width: 'auto' },
  { prop: 'damagedParts', label: '危害部位', width: 'auto' }
];

export const pageList: pageInterface = {
  total: 0,
  page: 1,
  size: 10
};
