import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface genusParams extends searchByInfo {
  // id
  id?: number

  // 属类名称
  name?: string

  // 拉丁学名
  scientificName?: string

  // 所属科类
  family?: string

  // 简介
  introduction?: string
}

export class genusHttp {
  // 新增属类
  static createGenus (params: genusParams) {
    return http({
      url: '/api/genusInfo/create',
      method: 'post',
      data: params
    });
  }

  // 删除属类
  static deleteGenus (ids: number) {
    return http({
      url: `/api/genusInfo/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 分页查询属类信息
  static searchGenus (params: (genusParams | null)) {
    return http({
      url: '/api/genusInfo/search',
      method: 'get',
      params
    });
  }

  // 分页查询属类信息
  static getGenus (params: (genusParams | null)) {
    return http({
      url: '/api/genusInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查看属类详情
  static searchGenusById (id: number) {
    return http({
      url: `/api/genusInfo/searchById/${id}`,
      method: 'get'
    });
  }

  // 修改属类信息
  static updateGenus (params: genusParams) {
    const { id } = params;
    return http({
      url: `/api/genusInfo/updateById/${id}`,
      method: 'put',
      data: params
    });
  }
}
