import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface videoParams extends searchByInfo {
  // id
  id?: number

  // 视频
  video?: any

  // 视频名称
  name?: string

  // 视频类型
  label?: string

  // 视频中植物名称
  plants?: string

  // 视频信息
  videoInfo?: any
}

export class videoHttp {
  // 删除视频
  static deleteVideo (ids: number) {
    return http({
      url: `/api/video/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询视频
  static getVideo (params: (videoParams | null)) {
    return http({
      url: '/api/video/manage',
      method: 'get',
      params
    });
  }

  // 根据视频类型查询视频
  static getVideoByType (params: videoParams) {
    return http({
      url: '/api/video/search-type',
      method: 'get',
      params
    });
  }

  // 根据 ID 查询视频
  static getVideoById (id: number) {
    return http({
      url: `/api/video/search/${id}`,
      method: 'get'
    });
  }

  // 上传视频
  static uploadVideo (params: videoParams, body: any) {
    const data = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        data.append('video', body[item].raw);
      }
    }
    const JSONParams = JSON.stringify(params);
    data.append('videoInfo', new Blob([JSONParams], { type: 'application/json' }));
    return http({
      url: '/api/video/upload',
      method: 'post',
      data
    });
  }
}
