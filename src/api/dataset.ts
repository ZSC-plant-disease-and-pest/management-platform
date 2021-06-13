import http from '@/utils/http';

export interface datasetParams {
  // 上传的图片
  file?: any

  // 数据集类型(train, validate, test)
  type?: string

  // 删除或创建的数据集名称
  name?: string

  // 数据集名称
  dataset?: string

  // 删除的数据名称
  filename?: string
}

export class datasetHttp {
  // 上传图片到数据集
  static uploadImg (params: datasetParams) {
    const { dataset, type, file } = params;
    return http({
      url: 'dataset/upload',
      method: 'post',
      params: {
        dataset,
        type
      },
      data: {
        file
      }
    });
  }

  // 删除数据
  static deleteData (params: datasetParams) {
    return http({
      url: '/dataset/delete_data',
      method: 'post',
      params
    });
  }

  // 创建数据集
  static createDataset (params: datasetParams) {
    return http({
      url: '/dataset/create_dataset',
      method: 'post',
      params
    });
  }

  // 删除数据集
  static deleteDataset (params: datasetParams) {
    return http({
      url: '/dataset/delete_dataset',
      method: 'post',
      params
    });
  }
}
