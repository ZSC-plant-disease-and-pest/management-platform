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
 * 表格自定义列接口
 */
export interface customTableInterface {
  [index: number]: {
    name?: string

    type?: string

    icon?: string

    label?: string

    width?: string
  }
}
