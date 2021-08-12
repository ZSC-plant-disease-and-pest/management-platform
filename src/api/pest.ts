import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface pestParams extends searchByInfo {
  // id
  id?: number

  // 虫害名称
  name?: string

  // 概述
  overview?: string

  // 形态特征
  appearance?: string

  // 危害部位
  damaged_parts?: string

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

export class pestHttp {
  // 创建虫害
  static createPest (params: pestParams) {
    return http({
      url: '/api/pest/create',
      method: 'post',
      data: params
    });
  }

  // 删除虫害
  static deletePest (ids: number) {
    return http({
      url: `/api/pest/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部虫害
  static searchPest (params: (pestParams | null)) {
    return http({
      url: '/api/pest/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询虫害
  static searchPestById (id: number) {
    return http({
      url: `/api/pest/search/${id}`,
      method: 'get'
    });
  }

  // 修改虫害 (允许修改:)
  static updatePest (params: pestParams) {
    const { id } = params;
    return http({
      url: `/api/pest/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
