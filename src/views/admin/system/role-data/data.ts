import { searchInterface } from '@/components/common/BasicSearch/search';
import { topButtonInterface, tableButtonInterface, tableColumnInterface } from '@/components/common/BasicTable/table';
import { pageInterface } from '@/components/common/BasicPage/page';

export const searchList: searchInterface = [
  { name: 'name', placeholder: '用户名', value: '' }
];

export const topButtonList: topButtonInterface = [
  { name: 'delete', type: 'danger', icon: 'el-icon-delete', label: '删除' },
  { name: 'add', type: 'success', icon: 'el-icon-plus', label: '添加用户' }
];

export const tableButtonList: tableButtonInterface = [
  { name: 'edit', icon: 'el-icon-edit', color: 'rgb(65, 209, 204)', label: '编辑' },
  { name: 'change', icon: 'el-icon-key', color: 'rgb(63, 186, 246)', label: '修改密码' }
];

export const tableColumnList: tableColumnInterface = [
  { prop: 'id', label: '序号', width: '75px' },
  { prop: 'name', label: '用户名', width: 'auto' },
  { prop: 'username', label: '登录名', width: 'auto' },
  { prop: 'mobile', label: '手机号', width: 'auto' },
  { prop: 'e_mail', label: '邮箱', width: 'auto' },
  {
    prop: 'state',
    label: '用户状态',
    width: 'auto',
    alias: true,
    getAlias (state: any) {
      return state === 1 ? '正常' : '禁用';
    }
  },
  {
    prop: 'role',
    label: '用户角色',
    width: 'auto',
    alias: true,
    getAlias (role: string) {
      return role === 'root' ? '超级管理员' : '管理员';
    }
  }
];

export const pageList: pageInterface = { total: 0, page: 1, size: 10 };
