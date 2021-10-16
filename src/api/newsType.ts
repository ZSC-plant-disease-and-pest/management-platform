import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface newsTypeParams extends searchByInfo {
  // id
  id?: number

  // 新闻类型名称
  name?: string
}

export class newsTypeHttp {
  // 创建新闻类型
  static createNewsType (params: newsTypeParams) {
    return http({
      url: '/api/news/newType/create',
      method: 'post',
      data: params
    });
  }

  // 删除新闻类型
  static deleteNewsType (ids: number) {
    return http({
      url: `/api/news/newType/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部新闻类型
  static searchNewsType (params: (newsTypeParams | null)) {
    return http({
      url: '/api/news/newType/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查看新闻类别
  static searchNewsTypeById (id: number) {
    return http({
      url: `/api/news/newType/search/${id}`,
      method: 'get'
    });
  }

  // 修改新闻类型
  static updateNewsType (params: newsTypeParams) {
    const { id } = params;
    return http({
      url: `/api/news/newType/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
