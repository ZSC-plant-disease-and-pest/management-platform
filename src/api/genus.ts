import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface familyParams extends searchByInfo {
  // id
  id?: number

  // 属类名称
  name?: string

  // 名字拼音
  pinyin?: string

  // 所属科类
  family?: string

  // 简介
  introduction?: string

  // 形态特征
  appearance?: string

  // 分布地域
  regions?: string

  // 常见植物
  plants?: string
}

export class familyHttp {
  // 创建属类
  static createFamily (params: familyParams) {
    return http({
      url: '/api/genusInfo/create',
      method: 'post',
      data: params
    });
  }

  // 删除属类
  static deleteFamily (ids: number) {
    return http({
      url: `/api/genusInfo/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部属类
  static searchFamily (params: (familyParams | null)) {
    return http({
      url: '/api/genusInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询属类
  static searchFamilyById (id: number) {
    return http({
      url: `/api/genusInfo/search/${id}`,
      method: 'get'
    });
  }

  // 修改属类
  static updateFamily (params: familyParams) {
    const { id } = params;
    return http({
      url: `/api/genusInfo/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
