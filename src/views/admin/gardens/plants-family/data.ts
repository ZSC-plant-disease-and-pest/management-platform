import { searchInterface } from '@/components/common/BasicSearch/search';
import { topButtonInterface, tableButtonInterface, tableColumnInterface } from '@/components/common/BasicTable/table';
import { pageInterface } from '@/components/common/BasicPage/page';

export const familySearchList: searchInterface = [
  { name: 'name', placeholder: '科类名称', value: '' }
];

export const genusSearchList: searchInterface = [
  { name: 'name', placeholder: '属类名称', value: '' }
];

export const familyTopButtonList: topButtonInterface = [
  { name: 'delete', type: 'danger', icon: 'el-icon-delete', label: '删除' },
  { name: 'add', type: 'success', icon: 'el-icon-plus', label: '添加' }
];

export const genusTopButtonList: topButtonInterface = [
  { name: 'delete', type: 'danger', icon: 'el-icon-delete', label: '删除' },
  { name: 'add', type: 'success', icon: 'el-icon-plus', label: '添加' }
];

export const familyTableButtonList: tableButtonInterface = [
  { name: 'check', icon: 'el-icon-search', color: 'rgb(255,165,0)', label: '查看科类' },
  { name: 'view', icon: 'el-icon-view', color: 'rgb(63, 186, 246)', label: '详情' },
  { name: 'edit', icon: 'el-icon-delete', color: 'rgb(65, 209, 204)', label: '编辑' }
];

export const genusTableButtonList: tableButtonInterface = [
  { name: 'view', icon: 'el-icon-view', color: 'rgb(63, 186, 246)', label: '详情' },
  { name: 'edit', icon: 'el-icon-delete', color: 'rgb(65, 209, 204)', label: '编辑' }
];

export const familyTableColumnList: tableColumnInterface = [
  { prop: 'id', label: '序号', width: '75px' },
  { prop: 'name', label: '科类名称', width: 'auto' },
  { prop: 'scientificName', label: '拉丁学名', width: '200px' }
];

export const genusTableColumnList: tableColumnInterface = [
  { prop: 'id', label: '序号', width: '75px' },
  { prop: 'name', label: '科类名称', width: 'auto' },
  { prop: 'family', label: '所属科类', width: 'auto' },
  { prop: 'scientificName', label: '拉丁学名', width: '200px' }
];

export const familyPageList: pageInterface = { total: 0, page: 1, size: 9 };

export const genusPageList: pageInterface = { total: 0, page: 1, size: 9 };
