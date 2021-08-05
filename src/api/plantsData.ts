import http from '@/utils/http';

export interface plantsDataParams {
  // id
  id?: number

  // 名称
  name?: string

  // 外貌形态
  appearance?: string

  // 习性
  behaviour?: string

  // 常见种类
  commonSpecies?: string

  // 栽培方式
  cultureMethod?: string

  // 科
  family?: string

  // 属
  genus?: string

  // 别名
  nickname?: string

  // 地域分布
  regions?: string

  // 繁殖方式
  reproduceMethod?: string

  // 同属植物
  sameGenus?: string

  // 学名
  scientificName?: string

  // 用途
  usage?: string
}

export class plantsDataHttp {
  // 创建植物信息
  static createDataset (params: plantsDataParams) {
    return http({
      url: '/api/plantsData/create',
      method: 'post',
      body: params
    });
  }

  // 删除植物信息
  static deleteDataset (id: number) {
    return http({
      url: `/api/plantsData/delete/${id}`,
      method: 'delete'
    });
  }

  // 查询全部植物信息
  static SearchDataset (params: plantsDataParams) {
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
  static UpdateDataset (params: plantsDataParams, id: number) {
    return http({
      url: `/api/plantsData/update/${id}`,
      method: 'put',
      body: params
    });
  }
}
