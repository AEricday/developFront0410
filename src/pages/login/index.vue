<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <text class="title">欢迎登录</text>
    </view>
    
    <view class="login-form">
      <view class="input-group">
        <text class="label">账号</text>
        <view class="input-box">
          <text class="iconfont icon-user"></text>
          <input 
            type="text" 
            v-model="formData.username" 
            placeholder="请输入账号"
            @input="validateForm"
          />
        </view>
        <text class="error-tip" v-if="errors.username">{{ errors.username }}</text>
      </view>
      
      <view class="input-group">
        <text class="label">密码</text>
        <view class="input-box">
          <text class="iconfont icon-lock"></text>
          <input 
            type="password" 
            v-model="formData.password" 
            placeholder="请输入密码"
            @input="validateForm"
          />
        </view>
        <text class="error-tip" v-if="errors.password">{{ errors.password }}</text>
      </view>
      
      <button 
        class="login-btn" 
        @click="handleLogin" 
        :disabled="!isFormValid || loading"
        :loading="loading"
      >
        {{ loading ? '登录中...' : '登 录' }}
      </button>
      
      <view class="actions">
        <text class="action-link" @click="goToRegister">注册账号</text>
        <text class="divider">|</text>
        <text class="action-link" @click="forgotPassword">忘记密码？</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { login } from '@/api/auth';

// 使用api/auth.js中的login函数，不需要baseUrl
const loading = ref(false);
const isFormValid = ref(false);

const formData = reactive({
  username: '',
  password: ''
});

const errors = reactive({
  username: '',
  password: ''
});

// 表单验证
const validateForm = () => {
  errors.username = !formData.username ? '请输入账号' : '';
  errors.password = !formData.password ? '请输入密码' : '';
  
  isFormValid.value = !errors.username && !errors.password &&
    formData.username && formData.password;
};

// 登录处理
const handleLogin = async () => {
  if (!isFormValid.value) return;
  
  loading.value = true;
  try {
    // 使用api/auth.js中的login函数
    const response = await login({
      username: formData.username,
      password: formData.password
    });
    
    if (response.code === 200) {
      uni.setStorageSync('token', response.token);
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        });
      }, 1500);
    } else {
      uni.showToast({
        title: response.message || '登录失败',
        icon: 'none'
      });
    }
  } catch (error) {
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

// 忘记密码
const forgotPassword = () => {
  uni.showToast({
    title: '该功能暂未开放',
    icon: 'none'
  });
};

// 跳转注册页面
const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/register/index'
  });
};

// 页面加载
onLoad(() => {
  // 初始化页面
  console.log('登录页面加载完成');
});
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  padding: 60rpx 40rpx;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;
  
  .logo {
    width: 160rpx;
    height: 160rpx;
    margin-bottom: 30rpx;
    border-radius: 40rpx;
  }
  
  .title {
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
  }
}

.login-form {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.input-group {
  margin-bottom: 30rpx;
  
  .label {
    display: block;
    margin-bottom: 16rpx;
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
  }
  
  .input-box {
    position: relative;
    display: flex;
    align-items: center;
    
    .iconfont {
      position: absolute;
      left: 24rpx;
      color: #666;
      font-size: 36rpx;
    }
    
    input {
      width: 100%;
      height: 88rpx;
      padding: 0 24rpx 0 80rpx;
      border: 2rpx solid #e5e7eb;
      border-radius: 16rpx;
      font-size: 28rpx;
      background-color: #fff;
      transition: all 0.3s;
      
      &:focus {
        border-color: #4A90E2;
        box-shadow: 0 0 0 2rpx rgba(74, 144, 226, 0.1);
      }
    }
  }
  
  .error-tip {
    font-size: 24rpx;
    color: #ff4d4f;
    margin-top: 8rpx;
  }
}

.login-btn {
  width: 100%;
  height: 88rpx;
  margin-top: 40rpx;
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  border: none;
  border-radius: 44rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  box-shadow: 0 8rpx 16rpx rgba(74, 144, 226, 0.2);
  transition: all 0.3s;
  
  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 4rpx 8rpx rgba(74, 144, 226, 0.2);
  }
  
  &[disabled] {
    opacity: 0.6;
    background: linear-gradient(135deg, #a0c5eb, #8ab1d9);
  }
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;
  
  .action-link {
    font-size: 28rpx;
    color: #4A90E2;
    
    &:active {
      opacity: 0.8;
    }
  }
  
  .divider {
    margin: 0 20rpx;
    color: #e5e7eb;
  }
}
</style>