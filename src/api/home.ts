import http from '@/utils/http';

export class homeHttp {
  static getHomeStats () {
    return http({
      url: '/api/index/stats',
      method: 'get'
    });
  }
}
