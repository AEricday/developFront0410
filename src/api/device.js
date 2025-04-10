import request from './request';

// 获取设备列表
export function getDeviceList(params) {
  return request({
    url: '/api/devices',
    method: 'get',
    params
  });
}

// 添加设备
export function addDevice(data) {
  return request({
    url: '/api/devices',
    method: 'post',
    data
  });
}

// 更新设备
export function updateDevice(id, data) {
  return request({
    url: `/api/devices/${id}`,
    method: 'put',
    data
  });
}

// 删除设备
export function deleteDevice(id) {
  return request({
    url: `/api/devices/${id}`,
    method: 'delete'
  });
}