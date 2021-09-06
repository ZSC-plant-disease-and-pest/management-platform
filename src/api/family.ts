import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface familyParams extends searchByInfo {
  // id
  id?: number

  // 科类名称
  name?: string

  // 简介
  introduction?: string

  // 形态特征
  appearance?: string

  // 分布地域
  regions?: string

  // 生长环境
  environment?: string
}

export class familyHttp {
  // 创建科类
  static createFamily (params: familyParams) {
    return http({
      url: '/api/familyInfo/create',
      method: 'post',
      data: params
    });
  }

  // 删除科类
  static deleteFamily (ids: number) {
    return http({
      url: `/api/familyInfo/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部科类
  static searchFamily (params: (familyParams | null)) {
    return http({
      url: '/api/familyInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询科类
  static searchFamilyById (id: number) {
    return http({
      url: `/api/familyInfo/search/${id}`,
      method: 'get'
    });
  }

  // 修改科类
  static updateFamily (params: familyParams) {
    const { id } = params;
    return http({
      url: `/api/familyInfo/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
