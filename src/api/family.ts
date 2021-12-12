import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface familyParams extends searchByInfo {
  // id
  id?: number

  // 科类名称
  name?: string

  // 拉丁学名
  scientificName?: string

  // 简介
  introduction?: string
}

export class familyHttp {
  // 新增科类
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
      url: `/api/familyInfo/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 分页查询科类信息
  static searchFamily (params: (familyParams | null)) {
    return http({
      url: '/api/familyInfo/search',
      method: 'get',
      params
    });
  }

  // 分页查询科类信息
  static getFamily (params: (familyParams | null)) {
    return http({
      url: '/api/familyInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查看科类详情
  static searchFamilyById (id: number) {
    return http({
      url: `/api/familyInfo/searchById/${id}`,
      method: 'get'
    });
  }

  // 修改科类信息
  static updateFamily (params: familyParams) {
    const { id } = params;
    return http({
      url: `/api/familyInfo/updateById/${id}`,
      method: 'put',
      data: params
    });
  }
}
