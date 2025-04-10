# 前后端接口对接规范

## 通用说明
### 请求格式
- Content-Type: application/json
- 认证接口需在Header中添加：Authorization: Bearer <token>

## 用户认证

### 登录接口
```
POST /api/auth/login

请求参数：
{
  "username": "string",  // 用户名
  "password": "string"   // 密码
}

成功响应：
{
  "code": 200,
  "data": {
    "token": "string",
    "refreshToken": "string",
    "expiresIn": 86400
  }
}
```

### 注册接口
```
POST /user/register

请求参数：
{
  "username": "string",  // 用户名
  "password": "string"   // 密码
}

成功响应：
{
  "code": 201,
  "message": "用户注册成功"
}
```

## 错误码说明
| 状态码 | 说明               |
|--------|--------------------|
| 400    | 参数校验失败       |
| 401    | 身份认证失败       |
| 500    | 服务器内部错误     |