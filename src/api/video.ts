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
      url: `/api/video/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 查询视频
  static getVideo (params: (videoParams | null)) {
    return http({
      url: '/api/video/search',
      method: 'get',
      params
    });
  }

  // 根据视频类型查询视频
  static getVideoByType (label: string) {
    return http({
      url: `/api/video/searchByLabel/${label}`,
      method: 'get'
    });
  }

  // 根据 ID 查询视频
  static getVideoById (id: number) {
    return http({
      url: `/api/video/searchById/${id}`,
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

  // 修改视频信息 只允许修改 name plants label
  static updateVideo (params: videoParams) {
    const { id } = params;
    return http({
      url: `/api/video/updateById/${id}`,
      method: 'put',
      data: params
    });
  }
}
