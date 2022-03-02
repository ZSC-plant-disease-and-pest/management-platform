import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
// import router from '@/router';
import { getToken, removeToken } from '@/utils/cookie';

const service = axios.create({
  timeout: 15000
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 200) {
      return response;
    }
    return Promise.reject(response);
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export default function request (reqData: any): any {
  return new Promise((resolve, reject) => {
    const { ...tempData } = reqData;
    tempData.timeoutErrorMessage = 'Network Error';

    if (tempData.headers === undefined) {
      tempData.headers = {};
    }
    if (getToken()) {
      tempData.headers.authorization = `Bearer ${getToken()}`;
    }

    console.log('send request: %o', tempData.url, tempData.method, tempData);

    service.request(tempData)
      .then((response) => {
        console.log('correct response: %o', tempData.url, tempData.method, response);
        resolve(response.data.data);
      })
      .catch((err) => {
        console.log('error response: %o', err);
        let result = '';
        if (err.message === 'Network Error') {
          result = '请求超时';
        } else if (err && err.status) {
          switch (err.status) {
            case 401:
              result = '登录状态失效，请重新登录';
              removeToken();
              break;
            case 404:
              result = '找不到目标资源';
              break;
            default:
              if (err.data.msg) {
                result = `错误提示: ${err.data.msg}`;
              } else {
                result = `错误状态码: ${err.data.code}`;
              }
              break;
          }
        } else {
          result = err;
        }
        reject(result);
        // console.log(result);
        ElMessage.error(result);
      });
  });
}
