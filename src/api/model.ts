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

  // 数据集类型 病害还是虫害，植物,可以多个,病害，虫害，园林植物
  dataSetType?: string

  // 分类数
  dataSetCount?: number

  // 算法来源
  algorithm?: string

  // 模型输出位置
  outPath?: string

  // 状态
  status?: string

  // Python版本
  pythonVersion?: string

  // 深度学习框架
  frame?: string
}

export class modelHttp {
  // 训练模型添加数据集
  static createDataset (params: modelParams) {
    return http({
      url: '/api/TrainingModel/addDataSet',
      method: 'post',
      params
    });
  }

  // 训练模型删除数据集
  static deleteDataset (params: modelParams) {
    return http({
      url: '/api/TrainingModel/deleteDataSet',
      method: 'delete',
      params
    });
  }

  // 初始化训练模型
  static initModel (id: number) {
    return http({
      url: `/api/TrainingModel/init/${id}`,
      method: 'post'
    });
  }

  // 同步训练模型
  static syncModel (id: number) {
    return http({
      url: `/api/TrainingModel/synchronization/${id}`,
      method: 'post'
    });
  }

  // 删除训练模型
  static deleteModel (ids: number) {
    return http({
      url: `/api/TrainingModel/delete/${ids}`,
      method: 'delete'
    });
  }

  // 查询训练模型
  static searchModel (params: modelParams) {
    return http({
      url: '/api/TrainingModel/search',
      method: 'get',
      params
    });
  }

  // 通过 ID 查询训练模型
  static searchModelById (id: number) {
    return http({
      url: `/api/TrainingModel/search/${id}`,
      method: 'get'
    });
  }
}
