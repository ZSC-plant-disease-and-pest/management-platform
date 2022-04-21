
import { removeToken } from '@/utils/cookie';

export default function getStatusMessage (err: any): any {
  let res = '';
  if (err.message === 'Network Error') {
    res = '请求超时';
  } else if (err && err.status) {
    switch (err.status) {
      case 401:
        res = '登录状态失效，请重新登录';
        removeToken();
        break;
      case 404:
        res = '找不到目标资源';
        break;
      default:
        res = err.data.msg ? `错误提示: ${err.data.msg}` : `错误状态码: ${err.data.code}`;
        break;
    }
  } else {
    res = err;
  }
  return res;
}
