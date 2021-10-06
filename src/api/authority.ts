import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface authorityParams extends searchByInfo {
  // id
  id?: number
  // 用户名
  name?: string
}

export class authorityHttp {
  // 新增权限
  static createAuthority (params: authorityParams) {
    return http({
      url: '/api/authority/create',
      method: 'post',
      data: params
    });
  }

  // 删除权限
  static deleteAuthority (ids: number) {
    return http({
      url: `/api/authority/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询所有权限
  static searchAuthority (params: (authorityParams | null)) {
    return http({
      url: '/api/authority/search',
      method: 'get',
      params
    });
  }

  // 修改权限
  static updateAuthority (params: authorityParams) {
    const { id } = params;
    return http({
      url: `/api/authority/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
