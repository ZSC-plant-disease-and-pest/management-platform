import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface plantsParams extends searchByInfo {
  // id
  id?: number

  // 植物名称
  name?: string

  // 学名
  scientificName?: string

  // 别名
  nickname?: string

  // 科
  family?: string

  // 属
  genus?: string

  // 园林植物分类
  plantsClassify?: {
    // 植物功能性状
    function?: string

    // 植物观赏特性
    enjoy?: string

    // 园林植物分类
    garden?: string

    // 木本植物性状
    woody?: string

    // 草本植物性状
    herbaceous?: string
  }

  // 外貌形态
  appearance?: string

  // 习性
  behaviour?: string

  // 用途
  usages?: string

  // 地域分布
  regions?: string

  // 繁殖方式
  reproduceMethod?: string

  // 栽培方式
  cultureMethod?: string
}

export class plantsHttp {
  // 创建植物信息
  static createPlants (params: plantsParams) {
    return http({
      url: '/api/plantsInfo/create',
      method: 'post',
      data: params
    });
  }

  // 删除植物信息
  static deletePlants (ids: string) {
    return http({
      url: `/api/plantsInfo/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询植物
  static searchPlants (params: (plantsParams | null)) {
    return http({
      url: '/api/plantsInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 Id 查询植物
  static searchPlantsById (id: number) {
    return http({
      url: `/api/plantsInfo/search/${id}`,
      method: 'get'
    });
  }

  // 植物信息图片展示
  static searchPlantsImg (name: string) {
    return http({
      url: `/api/plantsInfo/searchImg/${name}`,
      method: 'get'
    });
  }

  // 通过名称查看植物详情
  static searchDiseaseByName (name: string) {
    return http({
      url: `/api/plantsInfo/search/${name}`,
      method: 'get'
    });
  }

  // 修改植物
  static updatePlants (params: plantsParams) {
    const { id } = params;
    return http({
      url: `/api/plantsInfo/update/${id}`,
      method: 'put',
      data: params
    });
  }

  // 上传植物图集
  static uploadImg (params: plantsParams, body: Array<any>) {
    const fileImg = new FormData();
    const { name } = params;
    for (const item in body) {
      if (body[item].raw) {
        fileImg.append('img', body[item].raw);
      }
    }
    // fileImg.append('img', body[0].raw);
    return http({
      url: '/api/plantsInfo/uploadImg',
      method: 'post',
      params: { name },
      data: fileImg,
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }
}
