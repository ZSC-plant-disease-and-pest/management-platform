import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface plantsParams extends searchByInfo {
  // id
  id?: number

  // 植物名称
  name?: string

  // 学名
  scientificName?: string

  // 别名
  nickname?: string

  // 科
  family?: string

  // 属
  genus?: string

  // 园林植物分类
  plantsClassify?: {
    // 植物功能性状
    function?: string

    // 植物观赏特性
    enjoy?: string

    // 园林植物分类
    garden?: string

    // 木本植物性状
    woody?: string

    // 草本植物性状
    herbaceous?: string
  }

  // 外貌形态
  appearance?: string

  // 习性
  behaviour?: string

  // 用途
  usages?: string

  // 地域分布
  regions?: string

  // 繁殖方式
  reproduceMethod?: string

  // 栽培方式
  cultureMethod?: string
}

export class plantsHttp {
  // 创建植物信息
  static createPlants (params: plantsParams) {
    return http({
      url: '/api/plants/create',
      method: 'post',
      data: params
    });
  }

  // 删除植物信息
  static deletePlants (ids: string) {
    return http({
      url: `/api/plants/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部植物信息
  static searchPlants (params: (plantsParams | null)) {
    return http({
      url: '/api/plants/search',
      method: 'get',
      params
    });
  }

  // 通过 Id 查询植物信息
  static searchPlantsById (id: number) {
    return http({
      url: `/api/plants/search/${id}`,
      method: 'get'
    });
  }

  // 修改植物信息
  static updatePlants (params: plantsParams) {
    const { id } = params;
    return http({
      url: `/api/plants/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
