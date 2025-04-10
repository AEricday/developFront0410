<template>
  <view class="system-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="title">系统管理</text>
      <button class="refresh-btn" @click="handleRefresh">
        <text class="iconfont icon-refresh"></text>
        <text>刷新</text>
      </button>
    </view>

    <!-- 系统状态概览 -->
    <view class="status-overview">
      <view class="status-card" v-for="status in systemStatus" :key="status.key">
        <text class="status-value">{{ status.value }}</text>
        <text class="status-label">{{ status.label }}</text>
      </view>
    </view>

    <!-- 配置面板 -->
    <view class="config-panel">
      <view class="panel-header">
        <text class="panel-title">系统配置</text>
        <button class="save-btn" @click="handleSaveConfig">
          <text class="iconfont icon-save"></text>
          <text>保存</text>
        </button>
      </view>
      
      <!-- 基础配置 -->
      <view class="config-section">
        <text class="section-title">基础配置</text>
        <view class="config-form">
          <view class="form-item">
            <text class="label">系统名称</text>
            <input type="text" v-model="config.systemName" placeholder="请输入系统名称" />
          </view>
          <view class="form-item">
            <text class="label">API地址</text>
            <input type="text" v-model="config.apiUrl" placeholder="请输入API地址" />
          </view>
          <view class="form-item">
            <text class="label">最大并发数</text>
            <input type="number" v-model="config.maxConcurrency" placeholder="请输入最大并发数" />
          </view>
        </view>
      </view>

      <!-- 性能配置 -->
      <view class="config-section">
        <text class="section-title">性能配置</text>
        <view class="config-form">
          <view class="form-item">
            <text class="label">缓存大小(MB)</text>
            <input type="number" v-model="config.cacheSize" placeholder="请输入缓存大小" />
          </view>
          <view class="form-item">
            <text class="label">超时时间(秒)</text>
            <input type="number" v-model="config.timeout" placeholder="请输入超时时间" />
          </view>
          <view class="form-item">
            <text class="label">日志级别</text>
            <picker
              mode="selector"
              :range="logLevels"
              :value="logLevelIndex"
              @change="handleLogLevelChange"
            >
              <view class="picker-value">
                {{ logLevels[logLevelIndex] }}
                <text class="iconfont icon-arrow-down"></text>
              </view>
            </picker>
          </view>
        </view>
      </view>

      <!-- 安全配置 -->
      <view class="config-section">
        <text class="section-title">安全配置</text>
        <view class="config-form">
          <view class="form-item">
            <text class="label">密码有效期(天)</text>
            <input type="number" v-model="config.passwordExpiry" placeholder="请输入密码有效期" />
          </view>
          <view class="form-item">
            <text class="label">会话超时(分钟)</text>
            <input type="number" v-model="config.sessionTimeout" placeholder="请输入会话超时时间" />
          </view>
          <view class="form-item switch-item">
            <text class="label">启用双因素认证</text>
            <switch :checked="config.enable2FA" @change="handle2FAChange" color="#909399" />
          </view>
        </view>
      </view>
    </view>

    <!-- 系统日志 -->
    <view class="log-panel">
      <view class="panel-header">
        <text class="panel-title">系统日志</text>
        <button class="export-btn" @click="handleExportLogs">
          <text class="iconfont icon-download"></text>
          <text>导出</text>
        </button>
      </view>
      <view class="log-list">
        <view class="log-item" v-for="log in systemLogs" :key="log.id">
          <text :class="['log-level', log.level]">{{ log.level }}</text>
          <text class="log-time">{{ log.time }}</text>
          <text class="log-message">{{ log.message }}</text>
        </view>
      </view>
      <view class="load-more" @click="handleLoadMoreLogs">
        <text>加载更多</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 系统状态数据
const systemStatus = reactive([
  { key: 'cpu', label: 'CPU使用率', value: '45%' },
  { key: 'memory', label: '内存使用率', value: '60%' },
  { key: 'disk', label: '磁盘使用率', value: '75%' },
  { key: 'network', label: '网络延迟', value: '20ms' }
]);

// 系统配置
const config = reactive({
  systemName: '智能语音助手系统',
  apiUrl: 'http://localhost:8002/api',
  maxConcurrency: 100,
  cacheSize: 1024,
  timeout: 30,
  logLevel: 'INFO',
  passwordExpiry: 90,
  sessionTimeout: 30,
  enable2FA: false
});

// 日志级别选项
const logLevels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
const logLevelIndex = ref(1);

// 系统日志数据
const systemLogs = reactive([
  {
    id: 1,
    level: 'INFO',
    time: '2023-12-01 10:00:00',
    message: '系统启动成功'
  },
  {
    id: 2,
    level: 'WARN',
    time: '2023-12-01 10:05:00',
    message: '检测到CPU使用率过高'
  },
  {
    id: 3,
    level: 'ERROR',
    time: '2023-12-01 10:10:00',
    message: '数据库连接失败'
  }
]);

// 刷新系统状态
const handleRefresh = () => {
  // 实际应用中需要调用API获取最新系统状态
  console.log('刷新系统状态');
};

// 保存配置
const handleSaveConfig = () => {
  uni.showModal({
    title: '确认保存',
    content: '是否保存当前配置？保存后部分配置需要重启系统才能生效。',
    success: (res) => {
      if (res.confirm) {
        // 实际应用中需要调用API保存配置
        console.log('保存配置:', config);
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        });
      }
    }
  });
};

// 处理日志级别变化
const handleLogLevelChange = (e) => {
  logLevelIndex.value = e.detail.value;
  config.logLevel = logLevels[logLevelIndex.value];
};

// 处理双因素认证开关
const handle2FAChange = (e) => {
  config.enable2FA = e.detail.value;
};

// 导出日志
const handleExportLogs = () => {
  // 实际应用中需要调用API导出日志
  console.log('导出系统日志');
  uni.showToast({
    title: '开始导出日志',
    icon: 'success'
  });
};

// 加载更多日志
const handleLoadMoreLogs = () => {
  // 实际应用中需要调用API加载更多日志
  console.log('加载更多日志');
};
</script>

<style lang="scss">
.system-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 30rpx;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }

    .refresh-btn {
      display: flex;
      align-items: center;
      background-color: #909399;
      color: #fff;
      padding: 16rpx 30rpx;
      border-radius: 30rpx;
      font-size: 28rpx;

      .iconfont {
        margin-right: 10rpx;
        font-size: 32rpx;
      }
    }
  }

  .status-overview {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    margin-bottom: 30rpx;

    .status-card {
      background-color: #fff;
      padding: 30rpx;
      border-radius: 16rpx;
      text-align: center;

      .status-value {
        display: block;
        font-size: 40rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 10rpx;
      }

      .status-label {
        font-size: 26rpx;
        color: #666;
      }
    }
  }

  .config-panel {
    background-color: #fff;
    border-radius: 16rpx;
    margin-bottom: 30rpx;

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 2rpx solid #f5f5f5;

      .panel-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
      }

      .save-btn {
        display: flex;
        align-items: center;
        background-color: #67C23A;
        color: #fff;
        padding: 16rpx 30rpx;
        border-radius: 30rpx;
        font-size: 28rpx;

        .iconfont {
          margin-right: 10rpx;
          font-size: 32rpx;
        }
      }
    }

    .config-section {
      padding: 30rpx;
      border-bottom: 2rpx solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .section-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 20rpx;
      }

      .config-form {
        .form-item {
          display: flex;
          align-items: center;
          margin-bottom: 20rpx;

          &:last-child {
            margin-bottom: 0;
          }

          .label {
            width: 200rpx;
            font-size: 26rpx;
            color: #666;
          }

          input {
            flex: 1;
            height: 70rpx;
            padding: 0 20rpx;
            background-color: #f8f9fa;
            border-radius: 8rpx;
            font-size: 26rpx;
          }

          .picker-value {
            flex: 1;
            height: 70rpx;
            line-height: 70rpx;
            padding: 0 20rpx;
            background-color: #f8f9fa;
            border-radius: 8rpx;
            font-size: 26rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .iconfont {
              color: #999;
              font-size: 24rpx;
            }
          }

          &.switch-item {
            justify-content: space-between;
          }
        }
      }
    }
  }

  .log-panel {
    background-color: #fff;
    border-radius: 16rpx;

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 2rpx solid #f5f5f5;

      .panel-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
      }

      .export-btn {
        display: flex;
        align-items: center;
        background-color: #4A90E2;
        color: #fff;
        padding: 16rpx 30rpx;
        border-radius: 30rpx;
        font-size: 28rpx;

        .iconfont {
          margin-right: 10rpx;
          font-size: 32rpx;
        }
      }
    }

    .log-list {
      .log-item {
        display: flex;
        align-items: center;
        padding: 20rpx 30rpx;
        border-bottom: 2rpx solid #f5f5f5;

        .log-level {
          padding: 4rpx 16rpx;
          border-radius: 20rpx;
          font-size: 24rpx;
          margin-right: 20rpx;

          &.INFO {
            background-color: #67C23A;
            color: #fff;
          }

          &.WARN {
            background-color: #E6A23C;
            color: #fff;
          }

          &.ERROR {
            background-color: #F56C6C;
            color: #fff;
          }

          &.DEBUG {
            background-color: #909399;
            color: #fff;
          }
        }

        .log-time {
          font-size: 24rpx;
          color: #999;
          margin-right: 20rpx;
        }

        .log-message {
          flex: 1;
          font-size: 26rpx;
          color: #666;
        }
      }
    }

    .load-more {
      text-align: center;
      padding: 20rpx;
      color: #4A90E2;
      font-size: 28rpx;
    }
  }
}
</style>