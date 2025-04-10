# API接口文档

## 目录
- [通用说明](#通用说明)
- [用户认证](#用户认证)
- [设备管理](#设备管理)
- [模型管理](#模型管理)
- [音色管理](#音色管理)
- [代理管理](#代理管理)
- [系统管理](#系统管理)

## 通用说明

### 基础URL
```
BASE_URL=https://cnknpkbhtcbk.sealoshzh.site/xiaozhi
```

### 请求格式
- Content-Type: application/json
- 需要认证的接口在Header中添加：Authorization: Bearer <token>

### 通用返回格式
```json
// 成功响应
{
  "code": 200,
  "message": "success",
  "data": {}
}

// 失败响应
{
  "code": 400,  // 错误码
  "message": "错误信息",
  "error": "详细错误说明"
}
```

### 错误码说明
- 200: 成功
- 400: 请求参数错误
- 401: 未认证或token过期
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误

## 用户认证

### 登录
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
  "message": "success",
  "data": {
    "token": "string",        // 访问令牌
    "refreshToken": "string", // 刷新令牌
    "expiresIn": 86400       // token有效期(秒)
  }
}
```

### 刷新Token
```
POST /api/auth/refresh

请求参数：
{
  "refreshToken": "string"  // 刷新令牌
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "string",        // 新的访问令牌
    "refreshToken": "string", // 新的刷新令牌
    "expiresIn": 86400       // token有效期(秒)
  }
}
```

### 获取验证码
```
GET /api/auth/captcha

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "captchaId": "string",  // 验证码ID
    "captchaUrl": "string"  // 验证码图片URL
  }
}
```

## 设备管理

### 获取设备列表
```
GET /api/devices

请求参数：
{
  "page": 1,      // 页码
  "limit": 10,    // 每页数量
  "status": 1     // 设备状态(可选)
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "items": [{
      "id": "string",
      "name": "string",
      "status": 1,
      "createTime": "2023-01-01T00:00:00Z"
    }]
  }
}
```

### 添加设备
```
POST /api/devices

请求参数：
{
  "name": "string",    // 设备名称
  "type": "string",    // 设备类型
  "location": "string" // 设备位置
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "name": "string",
    "type": "string",
    "location": "string",
    "createTime": "2023-01-01T00:00:00Z"
  }
}
```

### 更新设备
```
PUT /api/devices/:id

请求参数：
{
  "name": "string",    // 设备名称
  "type": "string",    // 设备类型
  "location": "string" // 设备位置
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "name": "string",
    "type": "string",
    "location": "string",
    "updateTime": "2023-01-01T00:00:00Z"
  }
}
```

### 删除设备
```
DELETE /api/devices/:id

成功响应：
{
  "code": 200,
  "message": "success"
}
```

## 模型管理

### 获取模型列表
```
GET /api/models

请求参数：
{
  "page": 1,      // 页码
  "limit": 10,    // 每页数量
  "type": "string" // 模型类型(可选)
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "items": [{
      "id": "string",
      "name": "string",
      "type": "string",
      "version": "string",
      "createTime": "2023-01-01T00:00:00Z"
    }]
  }
}
```

### 上传模型
```
POST /api/models

请求参数：
{
  "name": "string",     // 模型名称
  "type": "string",     // 模型类型
  "version": "string",  // 版本号
  "file": "binary"     // 模型文件
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "name": "string",
    "type": "string",
    "version": "string",
    "createTime": "2023-01-01T00:00:00Z"
  }
}
```

### 删除模型
```
DELETE /api/models/:id

成功响应：
{
  "code": 200,
  "message": "success"
}
```

## 音色管理

### 获取音色列表
```
GET /api/voices

请求参数：
{
  "page": 1,      // 页码
  "limit": 10,    // 每页数量
  "type": "string" // 音色类型(可选)
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "items": [{
      "id": "string",
      "name": "string",
      "type": "string",
      "description": "string",
      "createTime": "2023-01-01T00:00:00Z"
    }]
  }
}
```

### 添加音色
```
POST /api/voices

请求参数：
{
  "name": "string",        // 音色名称
  "type": "string",        // 音色类型
  "description": "string", // 音色描述
  "file": "binary"        // 音色文件
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "name": "string",
    "type": "string",
    "description": "string",
    "createTime": "2023-01-01T00:00:00Z"
  }
}
```

### 删除音色
```
DELETE /api/voices/:id

成功响应：
{
  "code": 200,
  "message": "success"
}
```

## 代理管理

### 获取代理列表
```
GET /api/agents

请求参数：
{
  "page": 1,      // 页码
  "limit": 10,    // 每页数量
  "status": 1     // 代理状态(可选)
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "items": [{
      "id": "string",
      "name": "string",
      "status": 1,
      "balance": 1000,
      "createTime": "2023-01-01T00:00:00Z"
    }]
  }
}
```

### 添加代理
```
POST /api/agents

请求参数：
{
  "name": "string",    // 代理名称
  "contact": "string", // 联系人
  "phone": "string",   // 联系电话
  "email": "string"    // 电子邮箱
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "name": "string",
    "contact": "string",
    "phone": "string",
    "email": "string",
    "createTime": "2023-01-01T00:00:00Z"
  }
}
```

### 更新代理信息
```
PUT /api/agents/:id

请求参数：
{
  "name": "string",    // 代理名称
  "contact": "string", // 联系人
  "phone": "string",   // 联系电话
  "email": "string"    // 电子邮箱
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "string",
    "name": "string",
    "contact": "string",
    "phone": "string",
    "email": "string",
    "updateTime": "2023-01-01T00:00:00Z"
  }
}
```

### 删除代理
```
DELETE /api/agents/:id

成功响应：
{
  "code": 200,
  "message": "success"
}
```

## 系统管理

### 获取系统配置
```
GET /api/system/config

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "siteName": "string",
    "siteUrl": "string",
    "adminEmail": "string",
    "maxUploadSize": 10485760
  }
}
```

### 更新系统配置
```
PUT /api/system/config

请求参数：
{
  "siteName": "string",    // 站点名称
  "siteUrl": "string",     // 站点URL
  "adminEmail": "string",  // 管理员邮箱
  "maxUploadSize": 10485760 // 最大上传大小(字节)
}

成功响应：
{
  "code": 200,
  "message": "success",
  "data": {
    "siteName": "string",
    "siteUrl": "string",
    "adminEmail": "string",
    "maxUploadSize": 10485760,
    "updateTime": "2023-01-01T00:00:00Z"
  }
}
```