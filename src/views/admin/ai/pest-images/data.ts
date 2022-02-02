import { searchInterface } from '@/components/common/BasicSearch/search';
import { topButtonInterface, tableButtonInterface, tableColumnInterface } from '@/components/common/BasicTable/table';
import { pageInterface } from '@/components/common/BasicPage/page';
import Monent from 'moment';

export const searchList: searchInterface = [
  { name: 'name', placeholder: '虫害名称', value: '' }
];

export const topButtonList: topButtonInterface = [
  { name: 'delete', type: 'danger', icon: 'el-icon-delete', label: '删除' },
  { name: 'add', type: 'success', icon: 'el-icon-plus', label: '添加' }
];

export const tableButtonList: tableButtonInterface = [
  { name: 'dataset', icon: 'el-icon-postcard', color: 'rgb(100, 194, 100)', label: '查看数据集' },
  { name: 'view', icon: 'el-icon-view', color: 'rgb(63, 186, 246)', label: '虫害详情' }
];

export const tableColumnList: tableColumnInterface = [
  { prop: 'id', label: '序号', width: '75px' },
  { prop: 'name', label: '虫害名称', width: 'auto' },
  { prop: 'imgAmount', label: '图片数量', width: 'auto' },
  { prop: 'creator', label: '创建人', width: 'auto' },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 'auto',
    alias: true,
    getAlias (createTime: any) {
      return Monent(createTime).format('YYYY-MM-DD  hh:mm:ss');
    }
  }
];

export const pageList: pageInterface = { total: 0, page: 1, size: 10 };
