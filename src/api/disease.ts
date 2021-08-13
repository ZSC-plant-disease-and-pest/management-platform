import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface diseaseParams extends searchByInfo {
  // id
  id?: number

  // 病害名称
  name?: string

  // 概述
  overview?: string

  // 危害部位
  damagedParts?: string

  // 危害表现
  description?: string

  // 发病规律
  regularity?: string

  // 发病季节
  seasons?: string

  // 分布地域
  regions?: string

  // 治理建议
  suggestion?: string
}

export class diseaseHttp {
  // 创建病害
  static createDisease (params: diseaseParams) {
    return http({
      url: '/api/disease/create',
      method: 'post',
      data: params
    });
  }

  // 删除病害
  static deleteDisease (ids: number) {
    return http({
      url: `/api/disease/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部病害
  static searchDisease (params: (diseaseParams | null)) {
    return http({
      url: '/api/disease/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询病害
  static searchDiseaseById (id: number) {
    return http({
      url: `/api/disease/search/${id}`,
      method: 'get'
    });
  }

  // 修改病害 (允许修改:)
  static updateDisease (params: diseaseParams) {
    const { id } = params;
    return http({
      url: `/api/disease/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
