import http from '@/utils/http';

export interface labelCollectionParams {
  // id
  id?: number

  // 名称
  name?: string
}

export class labelCollectionHttp {
  // 创建标签集
  static createlabelCollection (params: labelCollectionParams) {
    return http({
      url: '/api/labelcollection/create',
      method: 'post',
      body: params
    });
  }

  // 删除标签集
  static deletelabelCollection (id: number) {
    return http({
      url: `/api/labelcollection/delete/${id}`,
      method: 'delete'
    });
  }

  // 查询全部标签集
  static SearchlabelCollection (params: labelCollectionParams) {
    return http({
      url: '/api/labelcollection/search',
      method: 'get',
      params
    });
  }

  // 修改标签集
  static UpdatelabelCollection (params: labelCollectionParams, id: number) {
    return http({
      url: `/api/labelcollection/update/${id}`,
      method: 'put',
      body: params
    });
  }
}
