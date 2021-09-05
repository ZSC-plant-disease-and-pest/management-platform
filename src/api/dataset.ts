import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface datasetParams extends searchByInfo {
  // id
  id?: number

  // 数据集名称
  name?: string

  // 修改数据集名称的新名称
  newName?: string

  // 数据集类型。病/虫/植，0病害，1虫害，2植物
  type?: number

  // 图片数量
  pictureAccount?: number

  // 保存路径
  path?: string

  // 植物数据集：科类
  family?: string

  // 植物数据集：属类
  genus?: string
}

export class datasetHttp {
  // 创建病害数据集
  static createDiseaseDataset (params: datasetParams) {
    return http({
      url: '/api/diseaseDs/create',
      method: 'post',
      data: params
    });
  }

  // 查询病害数据集
  static searchDiseaseDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/diseaseDs/search',
      method: 'get',
      params
    });
  }

  // 修改病害数据集
  static updateDiseaseDataset (params: datasetParams) {
    return http({
      url: '/api/diseaseDs/update',
      method: 'put',
      data: params
    });
  }

  // 创建虫害数据集
  static createPestDataset (params: datasetParams) {
    return http({
      url: '/api/pestDs/create',
      method: 'post',
      data: params
    });
  }

  // 查询虫害数据集
  static searchPestDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/pestDs/search',
      method: 'get',
      params
    });
  }

  // 修改虫害数据集
  static updatePestDataset (params: datasetParams) {
    return http({
      url: '/api/pestDs/update',
      method: 'put',
      data: params
    });
  }

  // 创建植物数据集
  static createPlantsDataset (params: datasetParams) {
    return http({
      url: '/api/plantsDs/create',
      method: 'post',
      data: params
    });
  }

  // 查询植物数据集
  static searchPlantsDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/plantsDs/search',
      method: 'get',
      params
    });
  }

  // 修改植物数据集
  static updatePlantsDataset (params: datasetParams) {
    return http({
      url: '/api/plantsDs/update',
      method: 'put',
      data: params
    });
  }
}
