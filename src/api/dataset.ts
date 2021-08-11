import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface datasetParams extends searchByInfo {
  // id
  id?: number

  // 名称
  name?: string

  // 标签集 Id
  labelCollection?: number

  // 路径
  path?: string
}

export class datasetHttp {
  // 创建数据集
  static createDataset (params: datasetParams) {
    return http({
      url: '/api/dataset/create',
      method: 'post',
      data: params
    });
  }

  // 删除数据集
  static deleteDataset (ids: string) {
    return http({
      url: `/api/dataset/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部数据集
  static searchDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/dataset/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询数据集
  static searchDatasetById (id: number) {
    return http({
      url: `/api/dataset/search/${id}`,
      method: 'get'
    });
  }

  // 修改数据集 (允许修改:名称, 标签集 id)
  static updateDataset (params: datasetParams) {
    const { id } = params;
    return http({
      url: `/api/dataset/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
