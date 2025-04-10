import request from './request';

// 获取模型列表
export function getModelList(params) {
  return request({
    url: '/api/models',
    method: 'get',
    params
  });
}

// 上传模型
export function uploadModel(data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return request({
    url: '/api/models',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  });
}

// 删除模型
export function deleteModel(id) {
  return request({
    url: `/api/models/${id}`,
    method: 'delete'
  });
}