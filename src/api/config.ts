import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface configParams extends searchByInfo {
  // id
  id?: number

  // python版本
  pythonVersion?: string

  // 深度学习框架
  learningFramework?: string

  // 训练数据目录
  dataDirectory?: string

  // CPU信息
  cpu?: string

  // gpu信息
  gpu?: string

  // 内存
  memory?: string

  // 硬盘
  hdd?: string

  // 操作系统
  operatingSystem?: string
}

export class configHttp {
  // 获取服务器配置
  static getServerConfig () {
    return http({
      url: '/api/AISystem/config',
      method: 'get'
    });
  }
}
