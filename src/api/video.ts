import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface videoParams extends searchByInfo {
  // id
  id?: number

  // 视频标题
  videoInfo?: string

  // 视频类型
  type?: string
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
  static searchVideo (params: (videoParams | null)) {
    return http({
      url: '/api/video/manage',
      method: 'get',
      params
    });
  }

  // 根据视频类型查询视频
  static searchVideoByType (params: videoParams) {
    return http({
      url: '/api/video/search-type',
      method: 'get',
      params
    });
  }

  // 根据 ID 查询视频
  static searchVideoById (id: number) {
    return http({
      url: `/api/video/search/${id}`,
      method: 'get'
    });
  }

  // 上传视频
  static uploadVideo (params: videoParams, body: any) {
    const fileVideo = new FormData();
    const { videoInfo } = params;
    fileVideo.append('video', body.raw);
    return http({
      url: '/api/video/upload',
      method: 'post',
      params: { videoInfo },
      data: fileVideo,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }
}
