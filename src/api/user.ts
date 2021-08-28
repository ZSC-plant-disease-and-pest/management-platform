import http from '@/utils/http';

export interface userParams {
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
  status?: string

  // 状态;是否被禁用
  state?: number
}

export class userHttp {
  // 注册
  static createUser (params: userParams) {
    return http({
      url: '/api/user/create',
      method: 'post',
      data: params
    });
  }
  // 登录
  static loginUser (params: userParams) {
    const { username, password } = params;
    return http({
      url: `/api/user/login/${username}/${password}`,
      method: 'post'
    });
  }
  // 注销
  static logoutUser () {
    return http({
      url: '/api/user/logout',
      method: 'post'
    });
  }
  // 更新个人信息(id, username 不可更改)
  static updateUser (params: userParams) {
    const { id, username } = params;
    return http({
      url: `/api/user/update/${id}/${username}`,
      method: 'post'
    });
  }
}
