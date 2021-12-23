import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface taggingParams extends searchByInfo {
  // id
  id?: number

  // 图片 Id
  imgId?: number

  // 数据集类型
  datasetType?: number

  // 数据集 Id
  datasetId?: number
}

export class taggingHttp {
  // 标注未被标注的图片
  static taggingImage (params: taggingParams) {
    return http({
      url: '/api/mark/markImg',
      method: 'post',
      params
    });
  }

  // 根据数据集类型查询待标注图片
  static getTaggingImages (params: taggingParams) {
    const { datasetType } = params;
    return http({
      url: `/api/mark/searchByType/${datasetType}`,
      method: 'get',
      params
    });
  }

  // 上传图片。一次只能上传一张
  static uploadImage (params: taggingParams, body: Array<any>) {
    const fileImg = new FormData();
    fileImg.append('img', body[0].raw);
    return http({
      url: '/api/mark/uploadImg',
      method: 'post',
      params,
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }
}
