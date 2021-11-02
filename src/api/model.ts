import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface modelParams extends searchByInfo {
  // id
  id?: number

  // 模型名字
  name?: string

  // 模型标识符
  identifier?: string

  // 用途说明
  introduction?: string

  // 识别类型 病害还是虫害，植物,可以多个,病害，虫害，园林植物
  recognizeType?: string

  // 识别数量
  recognizeAmount?: number

  // 算法来源
  algorithm?: string

  // 模型输出位置
  outputPath?: string

  // 状态
  status?: string

  // Python版本
  pythonVersion?: string

  // 深度学习框架
  frame?: string

  // 测试次数
  testCount?: number

  // 数据集列表
  datasetList?: Array<any>
}

export class modelHttp {
  // 新建训练模型
  static createModel (params: modelParams) {
    return http({
      url: '/api/model/create',
      method: 'post',
      body: params
    });
  }

  // 删除训练模型
  static deleteModel (ids: number) {
    return http({
      url: `/api/model/deleteByIds/${ids}`,
      method: 'delete'
    });
  }

  // 分页查询训练模型
  static searchModel (params: modelParams) {
    const { algorithm, name, status } = params;
    return http({
      url: '/api/model/search',
      method: 'get',
      params,
      body: {
        algorithm,
        name,
        status
      }
    });
  }

  // 通过ID查看训练模型
  static searchModelById (id: number) {
    return http({
      url: `/api/model/searchById/${id}`,
      method: 'get'
    });
  }

  // 通过名称查看模型详情
  static searchModelByName (name: string) {
    return http({
      url: `/api/model/searchByName/${name}`,
      method: 'get'
    });
  }

  // 更新未训练模型
  static updateModelById (params: modelParams) {
    const { id } = params;
    return http({
      url: `/api/model/updateById/${id}`,
      method: 'put',
      data: params
    });
  }
}
