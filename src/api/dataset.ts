import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface datasetParams extends searchByInfo {
  // id
  id?: number

  // 数据集名称
  name?: string

  // 数据集对应的id
  informationId?: number

  // 图片数量
  imgAmount?: number

  // 保存路径
  path?: string
}

export class datasetHttp {
  /**
   * 病害
   */

  // 新增病害数据集
  static createDiseaseDateset (params: datasetParams) {
    const { informationId } = params;
    return http({
      url: '/api/diseaseDs/create',
      method: 'post',
      params: { informationId }
    });
  }

  // 删除病害数据集
  static deleteDiseaseDataset (ids: number) {
    return http({
      url: `/api/diseaseDs/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 删除病害数据集图片
  static deleteDiseaseImageById (id: number) {
    return http({
      url: `/api/diseaseDs/deleteImgByIds/${id}`,
      method: 'delete'
    });
  }

  // 查询病害数据集
  static getDiseaseDataset (params: (datasetParams | null)) {
    return http({
      url: '/api/diseaseDs/search',
      method: 'get',
      params
    });
  }

  // 查询病害数据集所有图片
  static searchDiseaseDatasetImage (params: datasetParams) {
    const { id } = params;
    return http({
      url: `/api/diseaseDs/searchImgById/${id}`,
      method: 'get',
      params
    });
  }

  // 上传病害数据集图片
  static uploadDiseaseImg (id: number, body: Array<any>) {
    const fileImg = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: `/api/diseaseDs/uploadImgById/${id}`,
      method: 'post',
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }

  /**
   * 虫害
   */

  // 新增虫害数据集
  static createPestDateset (params: datasetParams) {
    const { informationId } = params;
    return http({
      url: '/api/pestDs/create',
      method: 'post',
      params: { informationId }
    });
  }

  // 删除虫害数据集
  static deletePest (ids: number) {
    return http({
      url: `/api/pestDs/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 删除虫害数据集图片
  static deletePestImageById (id: number) {
    return http({
      url: `/api/pestDs/deleteImgByIds/${id}`,
      method: 'delete'
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

  // 查询虫害数据集所有图片
  static searchPestDatasetImage (params: datasetParams) {
    const { id } = params;
    return http({
      url: `/api/pestDs/searchImgById/${id}`,
      method: 'get',
      params
    });
  }

  // 上传虫害数据集图片
  static uploadPestImg (id: number, body: Array<any>) {
    const fileImg = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: `/api/pestDs/uploadImgById/${id}`,
      method: 'post',
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }

  /**
   * 植物
   */

  // 新增植物数据集
  static createPlantsDateset (params: datasetParams) {
    const { informationId } = params;
    return http({
      url: '/api/plantsDs/create',
      method: 'post',
      params: { informationId }
    });
  }

  // 删除植物数据集
  static deletePlants (ids: number) {
    return http({
      url: `/api/plantsDs/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 删除植物数据集图片
  static deletePlantsImageById (id: number) {
    return http({
      url: `/api/plantsDs/deleteImgByIds/${id}`,
      method: 'delete'
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

  // 查询植物数据集所有图片
  static searchPlantsDatasetImage (params: datasetParams) {
    const { id } = params;
    return http({
      url: `/api/plantsDs/searchImgById/${id}`,
      method: 'get',
      params
    });
  }

  // 上传植物数据集图片
  static uploadPlantsImg (id: number, body: Array<any>) {
    const fileImg = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: `/api/plantsDs/uploadImgById/${id}`,
      method: 'post',
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }
}
