import axios from 'taro-axios'
import Taro from '@tarojs/taro'
const configBaseUrl = 'http://localhost:8181';
// 创建axios实例
const Service = axios.create({
  timeout: 5000,
  baseURL: configBaseUrl,
})

// 请求拦截器
Service.interceptors.request.use(config => {
  let { headers } = config;
  headers = {...headers, 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
  config.headers = headers;
  let token=Taro.getStorageSync('token')||null;
    token && (request.headers.Authorization = 'Bearer ' + token)
    console.log(token)
  return config;
}, error => {
  console.log(error)
})

// 响应拦截器
Service.interceptors.response.use(response => {
  if(response.data.code == '200') {
    Taro.setStorage({
      key:"token",
      data:response.data.msg
    })
  }
  return response.data;
}, error => {
  const msg = error.Message !== undefined ? error.Message : '';
  return Promise.reject(error);
})

export default Service
