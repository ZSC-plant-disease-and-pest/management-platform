import http from '@/utils/http';

export interface plantsDataParams {
  // id
  id?: number

  // 植物名称
  name?: string

  // 学名
 scientific_name?: string

  // 别名
  nickname?: string

  // 科
  family?: string

  // 属
  genus?: string

  // 园林植物分类
  plantsClassify?: {
    // 植物功能性状
    function?: number

    // 植物观赏特性
    enjoy?: number

    // 园林植物分类
    garden?: number

    // 木本植物性状
    woody?: number

    // 草本植物性状
    herbaceous?: number
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
  reproduce_method?: string

  // 栽培方式
  culture_method?: string
}

export class plantsDataHttp {
  // 创建植物信息
  static createDataset (params: plantsDataParams) {
    return http({
      url: '/api/plantsData/create',
      method: 'post',
      data: params
    });
  }

  // 删除植物信息
  static deleteDataset (ids: string) {
    return http({
      url: `/api/plantsData/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部植物信息
  static SearchDataset (params: (plantsDataParams | null)) {
    return http({
      url: '/api/plantsData/search',
      method: 'get',
      params
    });
  }

  // 通过 Id 查询植物信息
  static SearchDatasetById (id: number) {
    return http({
      url: `/api/plantsData/search/${id}`,
      method: 'get'
    });
  }

  // 修改植物信息
  static UpdateDataset (params: plantsDataParams) {
    const { id } = params;
    return http({
      url: `/api/plantsData/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
