import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from '@/utils/cookie';
import getStatusMessage from './getStatusMessage';

// 创建 axios 对象
const service = axios.create({
  timeout: 15000
});

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

// 响应拦截：200为正常响应，其他为异常响应
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

// 全局处理响应
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
        const result = getStatusMessage(err);
        ElMessage.error(result);
        reject(result);
      });
  });
}
