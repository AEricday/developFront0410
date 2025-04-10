import request from './request';

// 用户登录
export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  });
}

// 用户注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  });
}

// 刷新Token
export function refreshToken(refreshToken) {
  return request({
    url: '/api/auth/refresh',
    method: 'post',
    data: { refreshToken }
  });
}

// 获取验证码
export function getCaptcha() {
  return request({
    url: '/api/auth/captcha',
    method: 'get'
  });
}