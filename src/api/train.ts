import http from '@/utils/http';

export interface trainParams {
  // 训练集名称
  train_set?: string

  // 验证集名称
  val_set?: string

  // 测试集名称
  test_set?: string

  // 训练任务的 id
  task_id?: string
}

export class trainHttp {
  // 查看所有训练任务 s
  static checkAllTasks () {
    return http({
      url: '/api/train/all_tasks',
      method: 'get'
    });
  }

  // 创建一个新的训练任务
  static createNewTasks (params: trainParams) {
    return http({
      url: '/api/train/new_task',
      method: 'post',
      params
    });
  }

  // 查询指定 task_id 训练任务的状态
  // -1: 不存在, 0: 训练中, 1: 完成, 2: 训练错误
  static checkTaskStatus (params: trainParams) {
    return http({
      url: '/api/train/status',
      method: 'get',
      params
    });
  }

  // 删除指定 task_id 训练的结果
  static deleteTaskResult (params: trainParams) {
    return http({
      url: '/api/train/delete_task_result',
      method: 'delete',
      params
    });
  }

  // 使用指定 task_id 训练的结果来更新现在运行的模型
  static updateModel (params: trainParams) {
    return http({
      url: '/api/train/update_model',
      method: 'put',
      params
    });
  }
}
