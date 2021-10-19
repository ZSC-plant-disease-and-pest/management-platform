export interface searchByInfo {
  // 第几页
  page?: number

  // 每页的数量
  size?: number

  // 排序规则
  sort?: string

  // 创建时间
  createTime?: Date

  // 修改时间
  updateTime?: Date
}
