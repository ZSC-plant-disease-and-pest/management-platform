/**
 * 表格头部按键接口
 */
export interface topButtonInterface {
  [index: number]: {
    // 按键名称
    name: string
    // 按键样式
    type: string
    // 按键图标
    icon: string
    // 按键标签
    label: string
  }
}

/**
 * 表格操作栏按键接口
 */
export interface tableButtonInterface {
  [index: number]: {
    // 按键名称
    name: string
    // 按键图标
    icon: string
    // 按键颜色
    color: string
    // 按键标签
    label: string
  }
}

/**
 * 表格头部接口
 */
export interface tableColumnInterface {
  [index: number]: {
    // 表格头部属性
    prop: string
    // 表格头部标签
    label: string
    // 表格头部宽度
    width: string
    // 表格是否需要自定义字段
    alias?: boolean
    // 自定义字段的函数
    getAlias?: {
      (data: string): string
    }
  }
}
