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
  // 新增植物信息与对应数据集
  static createPlants (params: plantsParams, body: Array<any>) {
    const data = new FormData();
    for (const item in body) {
      if (body[item].raw) {
        data.append('img', body[item].raw);
      }
    }
    const JSONParams = JSON.stringify(params);
    data.append('plantsVO', new Blob([JSONParams], { type: 'application/json' }));
    return http({
      url: '/api/plantsInfo/create',
      method: 'post',
      data
    });
  }

  // 删除植物信息
  static deletePlants (ids: string) {
    return http({
      url: `/api/plantsInfo/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 分页查询植物信息
  static searchPlants (params: (plantsParams | null)) {
    return http({
      url: '/api/plantsInfo/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查看植物详情
  static searchPlantsById (id: number) {
    return http({
      url: `/api/plantsInfo/searchById/${id}`,
      method: 'get'
    });
  }

  // 通过名称查看植物详情
  static searchDiseaseByName (name: string) {
    return http({
      url: `/api/plantsInfo/searchByName/${name}`,
      method: 'get'
    });
  }

  // 植物信息图片展示
  static searchPlantsImgByName (params: plantsParams) {
    const { id } = params;
    return http({
      url: `/api/plantsInfo/searchImgByName/${id}`,
      method: 'get',
      params
    });
  }

  // 修改植物与对应数据集信息
  static updatePlants (params: plantsParams) {
    const { id } = params;
    return http({
      url: `/api/plantsInfo/updateById/${id}`,
      method: 'put',
      data: params
    });
  }
}
