import { searchInterface } from '@/components/common/BasicSearch/search';
import { topButtonInterface, tableButtonInterface, tableColumnInterface } from '@/components/common/BasicTable/table';
import { pageInterface } from '@/components/common/BasicPage/page';

export const searchList: searchInterface = [
  { name: 'name', placeholder: '模型名称', value: '' }
];

export const topButtonList: topButtonInterface = [
  { name: 'delete', type: 'danger', icon: 'el-icon-delete', label: '删除' },
  { name: 'add', type: 'success', icon: 'el-icon-plus', label: '添加模型' },
  { name: 'deploy', type: 'primary', icon: 'el-icon-refresh', label: '一键部署模型' },
  { name: 'train', type: 'warning', icon: 'el-icon-open', label: '开始训练' }
];

export const tableButtonList: tableButtonInterface = [
  { name: 'view', icon: 'el-icon-view', color: 'rgb(63, 186, 246)', label: '详情' },
  { name: 'edit', icon: 'el-icon-delete', color: 'rgb(65, 209, 204)', label: '编辑' }
];

export const tableColumnList: tableColumnInterface = [
  { prop: 'id', label: '序号', width: '75px' },
  { prop: 'name', label: '模型名称', width: 'auto' },
  { prop: 'recognizeAmount', label: '训练模型识别数量', width: 'auto' },
  { prop: 'recognizeType', label: '训练模型类型', width: 'auto' },
  { prop: 'outputPath', label: '输出路径', width: 'auto' },
  { prop: 'status', label: '状态', width: 'auto' }
];

export const pageList: pageInterface = { total: 0, page: 1, size: 10 };
