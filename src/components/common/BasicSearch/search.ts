/**
 * 搜索框接口
 */
export interface searchInterface {
  [index: number]: {
    // 搜索框名称
    name: string
    // 搜索框值
    value: string
    // 搜索框字符
    placeholder: string
  }
}
