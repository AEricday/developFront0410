import request from './request';

// 获取代理列表
export function getAgentList(params) {
  return request({
    url: '/api/agents',
    method: 'get',
    params
  });
}

// 添加代理
export function addAgent(data) {
  return request({
    url: '/api/agents',
    method: 'post',
    data
  });
}

// 更新代理信息
export function updateAgent(id, data) {
  return request({
    url: `/api/agents/${id}`,
    method: 'put',
    data
  });
}

// 删除代理
export function deleteAgent(id) {
  return request({
    url: `/api/agents/${id}`,
    method: 'delete'
  });
}