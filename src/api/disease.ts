import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface diseaseParams extends searchByInfo {
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

  // 病原，介绍致病真菌/细菌/病毒信息
  pathogen?: string

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

export class diseaseHttp {
  // 新增病害信息与对应数据集
  static createDisease (params: diseaseParams) {
    return http({
      url: '/api/diseaseInfo/create',
      method: 'post',
      data: params
    });
  }

  // 删除病害信息
  static deleteDisease (ids: number) {
    return http({
      url: `/api/diseaseInfo/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 分页查询病害信息
  static searchDisease (params: (diseaseParams | null)) {
    return http({
      url: '/api/diseaseInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查看病害详情
  static searchDiseaseById (id: number) {
    return http({
      url: `/api/diseaseInfo/searchById/${id}`,
      method: 'get'
    });
  }

  // 通过名称查看病害详情
  static searchDiseaseByName (name: string) {
    return http({
      url: `/api/diseaseInfo/searchByName/${name}`,
      method: 'get'
    });
  }

  // 病害信息图片展示
  static searchDiseaseImgByName (params: diseaseParams) {
    const { name } = params;
    return http({
      url: `/api/diseaseInfo/searchImgByName/${name}`,
      method: 'get',
      params
    });
  }

  // 修改病害与对应数据集信息
  static updateDisease (params: diseaseParams) {
    const { id } = params;
    return http({
      url: `/api/diseaseInfo/updateById/${id}`,
      method: 'put',
      data: params
    });
  }

  // 上传病害信息图片
  static uploadImg (params: diseaseParams, body: Array<any>) {
    const fileImg = new FormData();
    const { name } = params;
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: '/api/diseaseInfo/uploadImg',
      method: 'post',
      params: { name },
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }
}
