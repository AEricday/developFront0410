import request from './request';

// 获取系统配置
export function getSystemConfig() {
  return request({
    url: '/api/system/config',
    method: 'get'
  });
}

// 更新系统配置
export function updateSystemConfig(data) {
  return request({
    url: '/api/system/config',
    method: 'put',
    data
  });
}