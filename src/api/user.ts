import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface userParams extends searchByInfo {
  // id
  id?: number

  // 名称
  name?: string

  // 账户
  username?: string

  // 密码
  password?: string

  // 手机号码
  mobile?: string

  // 邮箱
  e_mail?: string

  // 权限
  role?: string

  // 状态 1正常 0禁用
  state?: number
}

export class userHttp {
  // 删除用户信息
  static deleteUser (ids: string) {
    return http({
      url: `/api/user/delete/${ids}`,
      method: 'delete'
    });
  }

  // 分页查询用户信息
  static getUser (params: (userParams | null)) {
    return http({
      url: '/api/user/search',
      method: 'get',
      params
    });
  }

  // 通过ID查询用户详情
  static getUserById (id: number) {
    return http({
      url: `/api/user/search/${id}`,
      method: 'get'
    });
  }

  // 修改个人信息
  static updateUser (params: userParams) {
    const { id } = params;
    return http({
      url: `/api/user/update/${id}`,
      method: 'post',
      data: params
    });
  }
}
