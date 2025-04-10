import axios from 'axios';
import { useUserStore } from '../stores/user';
import axiosRetry from 'axios-retry';

// 创建axios实例，增加超时时间到30秒
const request = axios.create({
  baseURL: 'http://localhost:3000/xiaozhi',
  timeout: 30000, // 增加超时时间到30秒
  headers: {
    'Content-Type': 'application/json'
  }
});

// 配置请求重试机制
axiosRetry(request, {
  retries: 3, // 最大重试次数
  retryDelay: (retryCount) => {
    return retryCount * 1000; // 重试延迟，第一次1秒，第二次2秒，第三次3秒
  },
  retryCondition: (error) => {
    // 仅在网络错误、超时错误或5xx错误时重试
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           error.code === 'ECONNABORTED' || 
           (error.response && error.response.status >= 500);
  }
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = uni.getStorageSync('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      // 处理业务错误
      if (res.code === 401) {
        // token过期，清除token并跳转登录页
        uni.removeStorageSync('token');
        uni.removeStorageSync('userInfo');
        uni.reLaunch({
          url: '/pages/login/index'
        });
      }
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    return res;
  },
  error => {
    // 处理请求错误
    let errorMessage = '网络错误，请重试';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时，请检查网络连接';
      console.error('请求超时详情:', error);
    } else if (error.response) {
      // 根据状态码定制错误信息
      switch (error.response.status) {
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        default:
          errorMessage = `请求失败(${error.response.status})`;
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      errorMessage = '服务器无响应，请稍后重试';
    }
    
    // 显示错误提示
    uni.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 2000
    });
    
    return Promise.reject(error);
  }
);

export default request;