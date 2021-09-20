import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface pestParams extends searchByInfo {
  // id
  id?: number

  // 病害名称
  name?: string

  // 概述,变色、坏死、腐烂、萎蔫、畸形五大类型
  overview?: Array<string>

  // 危害部位
  damagedParts?: Array<string>

  // 影响植物
  affectedPlants?: string

  // 形态特征
  appearance?: string

  // 危害表现
  description?: string

  // 发病规律
  regularity?: string

  // 发病季节
  seasons?: string

  // 分布地域
  regions?: string

  // 治理建议
  suggestion?: string
}

export class pestHttp {
  // 创建虫害
  static createPest (params: pestParams) {
    return http({
      url: '/api/pestInfo/create',
      method: 'post',
      data: params
    });
  }

  // 删除虫害
  static deletePest (ids: number) {
    return http({
      url: `/api/pestInfo/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询虫害
  static searchPest (params: (pestParams | null)) {
    return http({
      url: '/api/pestInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询虫害
  static searchPestById (id: number) {
    return http({
      url: `/api/pestInfo/search/${id}`,
      method: 'get'
    });
  }

  // 虫害信息图片展示
  static searchPestImg (name: string) {
    return http({
      url: `/api/pestInfo/searchImg/${name}`,
      method: 'get'
    });
  }

  // 通过名称查看虫害详情
  static searchPestByName (name: string) {
    return http({
      url: `/api/pestInfo/search/${name}`,
      method: 'get'
    });
  }

  // 修改虫害
  static updatePest (params: pestParams) {
    const { id } = params;
    return http({
      url: `/api/pestInfo/update/${id}`,
      method: 'put',
      data: params
    });
  }

  // 上传虫害图集
  static uploadImg (params: pestParams, body: Array<any>) {
    const fileImg = new FormData();
    const { name } = params;
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: '/api/pestInfo/uploadImg',
      method: 'post',
      params: { name },
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }
}
