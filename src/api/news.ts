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
  newTypeId?: number

  // 新闻内容
  content?: string

  // 新闻图片名称
  imgName?: string

  // 查询新闻图片的年(为空则全部图片)
  year?: number

  // 查询新闻图片的月(为空则全年)
  month?: number
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
  static searchImage (params: (newsParams | null)) {
    return http({
      url: '/api/news/findAllPicture',
      method: 'get',
      params
    });
  }

  // 创建新闻
  static createNews (params: newsParams) {
    return http({
      url: '/api/news/addArticle',
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
  static searchNews (params: (newsParams | null)) {
    return http({
      url: '/api/news/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询新闻
  static searchNewsById (id: number) {
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
