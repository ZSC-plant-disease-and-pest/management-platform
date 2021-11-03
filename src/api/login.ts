import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface loginParams extends searchByInfo {
  // id
  id?: number

  // 用户名
  username?: string

  // 用户名称
  name?: string

  // 用户密码
  password?: string

  // 用户角色
  role?: string

  // 用户状态 0：可用 1：不可用
  state?: number

  // 手机号
  mobile?: string

  // 邮箱
  e_mail?: string

  // 登录秘钥
  token?: string

  // 刷新秘钥
  refToken?: string
}

export class loginHttp {
  // 注册
  static createUser (params: loginParams) {
    return http({
      url: '/api/login/create',
      method: 'post',
      data: params
    });
  }

  // 登录
  static login (params: loginParams) {
    const { username, password } = params;
    return http({
      url: `/api/login/login/${username}/${password}`,
      method: 'post'
    });
  }

  // 注销
  static logout () {
    return http({
      url: '/api/login/logout',
      method: 'post'
    });
  }
}
