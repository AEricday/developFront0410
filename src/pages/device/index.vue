<template>
  <view class="device-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="title">设备管理</text>
      <button class="add-btn" @click="handleAddDevice">
        <text class="iconfont icon-add"></text>
        <text>添加设备</text>
      </button>
    </view>

    <!-- 搜索和筛选 -->
    <view class="search-section">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索设备名称或ID"
          @input="handleSearch"
        />
      </view>
      <view class="filter-box">
        <picker
          mode="selector"
          :range="statusOptions"
          :value="statusIndex"
          @change="handleStatusChange"
        >
          <view class="picker-item">
            <text>状态: {{ statusOptions[statusIndex] }}</text>
            <text class="iconfont icon-arrow-down"></text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 设备列表 -->
    <view class="device-list">
      <view
        class="device-item"
        v-for="device in filteredDevices"
        :key="device.id"
        @click="handleDeviceDetail(device)"
      >
        <view class="device-info">
          <view class="device-header">
            <text class="device-name">{{ device.name }}</text>
            <text :class="['status-tag', device.status]">{{ device.statusText }}</text>
          </view>
          <view class="device-meta">
            <text class="device-id">ID: {{ device.id }}</text>
            <text class="device-type">类型: {{ device.type }}</text>
          </view>
          <view class="device-desc">{{ device.description }}</view>
        </view>
        <view class="device-actions">
          <button class="action-btn edit" @click.stop="handleEditDevice(device)">
            <text class="iconfont icon-edit"></text>
          </button>
          <button class="action-btn delete" @click.stop="handleDeleteDevice(device)">
            <text class="iconfont icon-delete"></text>
          </button>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="filteredDevices.length === 0">
      <text class="iconfont icon-empty"></text>
      <text>暂无设备数据</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// 搜索和筛选状态
const searchQuery = ref('');
const statusOptions = ['全部', '在线', '离线', '维护中'];
const statusIndex = ref(0);

// 模拟设备数据
const devices = reactive([
  {
    id: 'DEV001',
    name: '智能音箱A1',
    type: '音频设备',
    status: 'online',
    statusText: '在线',
    description: '高品质智能音箱，支持语音控制和音乐播放'
  },
  {
    id: 'DEV002',
    name: '语音助手B2',
    type: '智能助手',
    status: 'offline',
    statusText: '离线',
    description: '智能语音助手，提供日常生活服务'
  }
]);

// 过滤后的设备列表
const filteredDevices = computed(() => {
  return devices.filter(device => {
    const matchQuery = device.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                      device.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = statusIndex.value === 0 || 
                       device.statusText === statusOptions[statusIndex.value];
    return matchQuery && matchStatus;
  });
});

// 处理搜索输入
const handleSearch = () => {
  // 实际应用中可能需要调用API进行搜索
  console.log('搜索查询:', searchQuery.value);
};

// 处理状态筛选变化
const handleStatusChange = (e) => {
  statusIndex.value = e.detail.value;
};

// 处理添加设备
const handleAddDevice = () => {
  uni.navigateTo({
    url: '/pages/device/add'
  });
};

// 处理设备详情
const handleDeviceDetail = (device) => {
  uni.navigateTo({
    url: `/pages/device/detail?id=${device.id}`
  });
};

// 处理编辑设备
const handleEditDevice = (device) => {
  uni.navigateTo({
    url: `/pages/device/edit?id=${device.id}`
  });
};

// 处理删除设备
const handleDeleteDevice = (device) => {
  uni.showModal({
    title: '确认删除',
    content: `是否确认删除设备"${device.name}"？`,
    success: (res) => {
      if (res.confirm) {
        // 实际应用中需要调用API删除设备
        console.log('删除设备:', device.id);
      }
    }
  });
};
</script>

<style lang="scss">
.device-container {
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

    .add-btn {
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

  .search-section {
    display: flex;
    gap: 20rpx;
    margin-bottom: 30rpx;

    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 20rpx;
      border-radius: 16rpx;

      .iconfont {
        color: #999;
        margin-right: 10rpx;
      }

      input {
        flex: 1;
        font-size: 28rpx;
      }
    }

    .filter-box {
      .picker-item {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 20rpx 30rpx;
        border-radius: 16rpx;
        font-size: 28rpx;

        .iconfont {
          margin-left: 10rpx;
          color: #999;
        }
      }
    }
  }

  .device-list {
    .device-item {
      background-color: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .device-info {
        flex: 1;

        .device-header {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;

          .device-name {
            font-size: 32rpx;
            font-weight: 600;
            color: #333;
            margin-right: 20rpx;
          }

          .status-tag {
            padding: 4rpx 16rpx;
            border-radius: 20rpx;
            font-size: 24rpx;

            &.online {
              background-color: #67C23A;
              color: #fff;
            }

            &.offline {
              background-color: #909399;
              color: #fff;
            }

            &.maintenance {
              background-color: #E6A23C;
              color: #fff;
            }
          }
        }

        .device-meta {
          display: flex;
          gap: 20rpx;
          margin-bottom: 16rpx;
          font-size: 26rpx;
          color: #666;
        }

        .device-desc {
          font-size: 26rpx;
          color: #999;
          line-height: 1.5;
        }
      }

      .device-actions {
        display: flex;
        gap: 16rpx;

        .action-btn {
          width: 64rpx;
          height: 64rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 32rpx;

          &.edit {
            background-color: #4A90E2;
            color: #fff;
          }

          &.delete {
            background-color: #F56C6C;
            color: #fff;
          }

          .iconfont {
            font-size: 36rpx;
          }
        }
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
    color: #999;

    .iconfont {
      font-size: 96rpx;
      margin-bottom: 20rpx;
    }
  }
}
</style>