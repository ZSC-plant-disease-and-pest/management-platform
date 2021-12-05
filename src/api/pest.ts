import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface pestParams extends searchByInfo {
  // id
  id?: number

  // 虫害名称
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
  // 新增虫害信息与对应数据集
  static createPest (params: pestParams, body: Array<any>) {
    const data = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        data.append('img', body[item].raw);
      }
    }
    const JSONParams = JSON.stringify(params);
    data.append('pestVO', new Blob([JSONParams], { type: 'application/json' }));
    return http({
      url: '/api/pestInfo/create',
      method: 'post',
      data
    });
  }

  // 删除虫害信息
  static deletePest (ids: number) {
    return http({
      url: `/api/pestInfo/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 分页查询虫害信息
  static getPest (params: (pestParams | null)) {
    return http({
      url: '/api/pestInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查看虫害详情
  static searchPestById (id: number) {
    return http({
      url: `/api/pestInfo/searchById/${id}`,
      method: 'get'
    });
  }

  // 通过名称查看虫害详情
  static searchPestByName (name: string) {
    return http({
      url: `/api/pestInfo/searchByName/${name}`,
      method: 'get'
    });
  }

  // 虫害信息图片展示
  static searchPestImgById (params: pestParams) {
    const { id } = params;
    return http({
      url: `/api/pestInfo/searchImgById/${id}`,
      method: 'get',
      params
    });
  }

  // 修改虫害与对应数据集信息
  static updatePest (params: pestParams) {
    const { id } = params;
    const data = new FormData();
    const JSONParams = JSON.stringify(params);
    data.append('pestVO', new Blob([JSONParams], { type: 'application/json' }));
    return http({
      url: `/api/pestInfo/updateById/${id}`,
      method: 'put',
      data
    });
  }

  /**
   * 重构代码
   */
  // 新增病害信息与对应数据集
  static addPest (params: pestParams, body: Array<any>) {
    const data = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        data.append('img', body[item].raw);
      }
    }
    const JSONParams = JSON.stringify(params);
    data.append('pestVO', new Blob([JSONParams], { type: 'application/json' }));
    return http({
      url: '/api/pestInfo/create',
      method: 'post',
      data
    });
  }

  // 通过 ID 查看病害详情
  static getPestById (id: number) {
    return http({
      url: `/api/pestInfo/searchById/${id}`,
      method: 'get'
    });
  }
}
