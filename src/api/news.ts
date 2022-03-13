import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface newsParams extends searchByInfo {
  // id
  id?: number

  // 新闻作者
  author?: string

  // 新闻标题
  title?: string

  // 新闻类型ID
  newsTypeId?: number

  // 新闻类型名称
  newTypeName?: string

  // 新闻简介
  description?: string

  // 新闻内容
  content?: string

  // 新闻是否为发布状态
  publishedOrNot?: boolean

  // 新闻图片名称
  imgName?: string
}

export class newsHttp {
  // 上传新闻图片
  static uploadNewsImage (params: newsParams, body: any) {
    const fileImg = new FormData();
    fileImg.append('editormd-image-file', body);
    const { imgName } = params;
    return http({
      url: `/api/news/file/${imgName}`,
      method: 'post',
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }

  // 删除新闻图片
  static deleteNewsImage (pictureUrl: string) {
    return http({
      url: '/api/news/deletePictureByUrl',
      method: 'delete',
      params: pictureUrl
    });
  }

  // 查询新闻图片 url
  static getImage (params: (newsParams | null)) {
    return http({
      url: '/api/news/findAllPicture',
      method: 'get',
      params
    });
  }

  // 创建新闻
  static addNews (params: newsParams) {
    return http({
      url: '/api/news/create',
      method: 'post',
      data: params
    });
  }

  // 删除新闻
  static deleteNews (ids: number) {
    return http({
      url: `/api/news/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询全部新闻
  static getNews (params: (newsParams | null)) {
    return http({
      url: '/api/news/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询新闻
  static getNewsById (id: number) {
    return http({
      url: `/api/news/search/${id}`,
      method: 'get'
    });
  }

  // 修改新闻
  static updateNews (params: newsParams) {
    const { id } = params;
    return http({
      url: `/api/news/update/${id}`,
      method: 'put',
      data: params
    });
  }
}
