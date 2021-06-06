import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { Message } from 'element-ui'
// import router from '@/router';
// import { getToken, removeInfo, removeToken } from "@/utils/cookie"

const service = axios.create({
  baseURL: '',
  timeout: 10000
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // set token of the headers
    // if (getToken()) {
    //   config.headers['X-Access-Token'] = getToken()
    // }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    }
    return Promise.reject(response);
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export default function request(reqData: any) {
  return new Promise((resolve, reject) => {
    let tempData = reqData;
    tempData.timeoutErrorMessage = 'Network Error';

    // set default request headers
    if (tempData.headers === undefined) {
      tempData.headers = {}
    }

    console.log('send request: %o', tempData.url, tempData.method, tempData);

    service.request(tempData)
      .then((response) => {
        console.log('correct response: %o', tempData.url, tempData.method, response);
        resolve(response.data);
      })
      .catch((err) => {
        console.error('error response: %o', tempData.url, tempData.method, err.response.status, err.message);
        let result = '';
        if (err.message === 'Network Error') {
          result = '请求超时';
        } else if (err && err.response.status) {
          switch (err.response.status) {
            case 401:
              result = '登录状态失效，请重新登录';
              // removeToken();
              // removeInfo();

              // jump to login page
              // router.push('/login');
              break;
            case 404:
              result = '找不到目标资源';
              break;
            default:
              result = `错误状态码: ${err.response.status}`;
              break;
          }
        } else {
          result = err;
        }
        console.log(result);
        // reject(result);
        // Message.error(result);
      });
  });
}
