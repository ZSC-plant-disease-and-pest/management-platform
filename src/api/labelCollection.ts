import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface labelCollectionParams extends searchByInfo {
  // id
  id?: number

  // 标签集名称
  name?: string

  // 标签库 id
  labelDbId?: string

  // 包含的标签 id
  labelsList?: Array<number>
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
  static deleteLabelCollection (ids: number) {
    return http({
      url: `/api/labelcollection/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部标签集
  static searchLabelCollection (params: (labelCollectionParams | null)) {
    return http({
      url: '/api/labelcollection/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询标签集
  static searchLabelCollectionById (id: number) {
    return http({
      url: `/api/labelcollection/search/${id}`,
      method: 'get'
    });
  }

  // 修改标签集 (允许修改:名称, 所含标签)
  static updateLabelCollection (params: labelCollectionParams) {
    const { id } = params;
    return http({
      url: `/api/labelcollection/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
