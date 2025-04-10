import request from './request';

// 获取音色列表
export function getVoiceList(params) {
  return request({
    url: '/api/voices',
    method: 'get',
    params
  });
}

// 添加音色
export function addVoice(data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return request({
    url: '/api/voices',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  });
}

// 删除音色
export function deleteVoice(id) {
  return request({
    url: `/api/voices/${id}`,
    method: 'delete'
  });
}