<template>
  <view class="register-container">
    <view class="register-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <text class="title">用户注册</text>
    </view>
    
    <view class="register-form">
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
      
      <view class="input-group">
        <text class="label">确认密码</text>
        <view class="input-box">
          <text class="iconfont icon-lock"></text>
          <input 
            type="password" 
            v-model="formData.confirmPassword" 
            placeholder="请再次输入密码"
            @input="validateForm"
          />
        </view>
        <text class="error-tip" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</text>
      </view>
      
      <button 
        class="register-btn" 
        @click="handleRegister"
        :disabled="!isFormValid || loading"
        :loading="loading"
      >
        {{ loading ? '注册中...' : '注 册' }}
      </button>
      
      <view class="actions">
        <text class="action-link" @click="goToLogin">已有账号？去登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { register } from '@/api/auth';

const loading = ref(false);
const isFormValid = ref(false);

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

// 表单验证
const validateForm = () => {
  errors.username = !formData.username ? '请输入账号' : '';
  errors.password = !formData.password ? '请输入密码' : '';
  errors.confirmPassword = !formData.confirmPassword ? '请再次输入密码' :
    formData.password !== formData.confirmPassword ? '两次输入的密码不一致' : '';
  
  isFormValid.value = !errors.username && !errors.password && 
    !errors.confirmPassword &&
    formData.username && formData.password && 
    formData.confirmPassword;
};

// 注册处理
const handleRegister = async () => {
  if (!isFormValid.value) return;
  
  loading.value = true;
  try {
    // 打印请求数据，便于调试
    console.log('注册请求数据:', {
      username: formData.username,
      password: formData.password
    });
    
    const response = await register({
      username: formData.username,
      password: formData.password
    });
    
    // 打印响应数据，便于调试
    console.log('注册响应数据:', response);
    
    if (response.code === 200) {
      uni.showToast({
        title: '注册成功',
        icon: 'success'
      });
      setTimeout(() => {
        goToLogin();
      }, 1500);
    } else {
      uni.showToast({
        title: response.message || '注册失败',
        icon: 'none'
      });
    }
  } catch (error) {
    // 打印详细错误信息，便于调试
    console.error('注册错误详情:', error);
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  });
};

// 刷新验证码
const refreshCaptcha = () => {
  // 这里可以调用获取验证码的API
  // 例如：getCaptcha().then(res => { ... })
  console.log('刷新验证码');
};

// 页面加载
onLoad(() => {
  // 初始化页面
  refreshCaptcha(); // 初始加载验证码
});
</script>

<style lang="scss">
.register-container {
  min-height: 100vh;
  padding: 60rpx 40rpx;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.register-header {
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

.register-form {
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

.register-btn {
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
    color: #4A90E2;
    font-size: 28rpx;
  }
}
</style>