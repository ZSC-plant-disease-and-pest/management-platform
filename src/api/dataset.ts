import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface datasetParams extends searchByInfo {
  // id
  id?: number

  // 数据集名称
  name?: string

  // 数据集类型。病/虫/植，0病害，1虫害，2植物
  type?: number

  // 图片数量
  pictureAccount?: number

  // 保存路径
  path?: string

  // 是否被假删除
  hasDeleted?: boolean
}

export class datasetHttp {
  // 病害数据集信息概览
  static searchDiseaseDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/diseaseDs/search',
      method: 'get',
      params
    });
  }

  // 根据 ID 查询病害数据集详情(多图片)
  static searchDiseaseDatasetById (params: datasetParams) {
    const { id } = params;
    return http({
      url: `/api/diseaseDs/searchById/${id}`,
      method: 'get',
      params
    });
  }

  // 上传病害数据集图片
  static uploadDiseaseImg (datasetId: number, body: Array<any>) {
    const fileImg = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: '/api/diseaseDs/uploadImg',
      method: 'post',
      params: { datasetId },
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }

  // 虫害数据集信息概览
  static searchPestDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/pestDs/search',
      method: 'get',
      params
    });
  }

  // 根据 ID 查询虫害数据集详情(多图片)
  static searchPestDatasetById (params: datasetParams) {
    const { id } = params;
    return http({
      url: `/api/pestDs/searchById/${id}`,
      method: 'get',
      params
    });
  }

  // 上传虫害数据集图片
  static uploadPestImg (datasetId: number, body: Array<any>) {
    const fileImg = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: '/api/pestDs/uploadImg',
      method: 'post',
      params: { datasetId },
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }

  // 植物数据集信息概览
  static searchPlantsDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/plantsDs/search',
      method: 'get',
      params
    });
  }

  // 根据 ID 查询植物数据集详情(多图片)
  static searchPlantsDatasetById (params: datasetParams) {
    const { id } = params;
    return http({
      url: `/api/plantsDs/searchById/${id}`,
      method: 'get',
      params
    });
  }

  // 上传植物数据集图片
  static uploadPlantsImg (datasetId: number, body: Array<any>) {
    const fileImg = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: '/api/plantsDs/uploadImg',
      method: 'post',
      params: { datasetId },
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }
}
