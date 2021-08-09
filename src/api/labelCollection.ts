import http from '@/utils/http';

export interface labelCollectionParams {
  // id
  id?: number

  // 名称
  name?: string
}

export class labelCollectionHttp {
  // 创建标签集
  static createLabelCollection (params: labelCollectionParams) {
    return http({
      url: '/api/labelcollection/create',
      method: 'post',
      data: params
    });
  }

  // 删除标签集
  static deleteLabelCollection (id: number) {
    return http({
      url: `/api/labelcollection/delete/${id}`,
      method: 'delete'
    });
  }

  // 查询全部标签集
  static searchLabelCollection (params: (labelCollectionParams | null)) {
    return http({
      url: '/api/labelcollection/search',
      method: 'get'
    });
  }

  // 通过 ID 查询数据集
  static searchLabelCollectionById (id: number) {
    return http({
      url: `/api/labelcollection/search/${id}`,
      method: 'get'
    });
  }

  // 修改标签集
  static updateLabelCollection (params: labelCollectionParams) {
    const { id } = params;
    return http({
      url: `/api/labelcollection/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
