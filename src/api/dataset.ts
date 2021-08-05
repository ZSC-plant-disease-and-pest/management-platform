import http from '@/utils/http';

export interface datasetParams {
  // id
  id?: number

  // 标签集 Id
  labelCollection?: number

  // 名称
  name?: string
}

export class datasetHttp {
  // 创建数据集
  static createDataset (params: datasetParams) {
    return http({
      url: '/api/dataset/create',
      method: 'post',
      body: params
    });
  }

  // 删除数据集
  static deleteDataset (id: number) {
    return http({
      url: `/api/dataset/delete/${id}`,
      method: 'delete'
    });
  }

  // 查询全部数据集
  static SearchDataset (params: datasetParams) {
    return http({
      url: '/api/dataset/search',
      method: 'get',
      params
    });
  }

  // 修改数据集
  static UpdateDataset (params: datasetParams, id: number) {
    return http({
      url: `/api/dataset/update/${id}`,
      method: 'put',
      body: params
    });
  }
}
