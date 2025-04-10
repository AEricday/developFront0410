<template>
  <view class="agent-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="title">代理管理</text>
      <button class="add-btn" @click="handleAddAgent">
        <text class="iconfont icon-add"></text>
        <text>添加代理</text>
      </button>
    </view>

    <!-- 搜索和筛选 -->
    <view class="search-section">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索代理名称或ID"
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

    <!-- 代理列表 -->
    <view class="agent-list">
      <view
        class="agent-item"
        v-for="agent in filteredAgents"
        :key="agent.id"
        @click="handleAgentDetail(agent)"
      >
        <view class="agent-info">
          <view class="agent-header">
            <text class="agent-name">{{ agent.name }}</text>
            <text :class="['status-tag', agent.status]">{{ agent.statusText }}</text>
          </view>
          <view class="agent-meta">
            <text class="agent-id">ID: {{ agent.id }}</text>
            <text class="agent-type">类型: {{ agent.type }}</text>
          </view>
          <view class="agent-desc">{{ agent.description }}</view>
          <view class="agent-stats">
            <text class="stat-item">处理任务: {{ agent.taskCount }}</text>
            <text class="stat-item">成功率: {{ agent.successRate }}%</text>
            <text class="stat-item">响应时间: {{ agent.responseTime }}ms</text>
            <text class="stat-item">更新时间: {{ agent.updateTime }}</text>
          </view>
        </view>
        <view class="agent-config">
          <view class="config-item">
            <text class="label">并发数</text>
            <input
              type="number"
              v-model="agent.concurrency"
              @blur="handleConfigUpdate(agent, 'concurrency')"
            />
          </view>
          <view class="config-item">
            <text class="label">超时(秒)</text>
            <input
              type="number"
              v-model="agent.timeout"
              @blur="handleConfigUpdate(agent, 'timeout')"
            />
          </view>
          <view class="config-item">
            <text class="label">重试次数</text>
            <input
              type="number"
              v-model="agent.retryCount"
              @blur="handleConfigUpdate(agent, 'retryCount')"
            />
          </view>
        </view>
        <view class="agent-actions">
          <button 
            :class="['action-btn', 'toggle', agent.status === 'running' ? 'stop' : 'start']"
            @click.stop="handleToggleAgent(agent)"
          >
            <text class="iconfont" :class="agent.status === 'running' ? 'icon-stop' : 'icon-play'"></text>
          </button>
          <button class="action-btn edit" @click.stop="handleEditAgent(agent)">
            <text class="iconfont icon-edit"></text>
          </button>
          <button class="action-btn delete" @click.stop="handleDeleteAgent(agent)">
            <text class="iconfont icon-delete"></text>
          </button>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="filteredAgents.length === 0">
      <text class="iconfont icon-empty"></text>
      <text>暂无代理数据</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// 搜索和筛选状态
const searchQuery = ref('');
const statusOptions = ['全部', '运行中', '已停止', '异常'];
const statusIndex = ref(0);

// 模拟代理数据
const agents = reactive([
  {
    id: 'AGT001',
    name: '对话代理A',
    type: '对话处理',
    status: 'running',
    statusText: '运行中',
    description: '处理用户对话请求的智能代理',
    taskCount: 5000,
    successRate: 98.5,
    responseTime: 150,
    updateTime: '2023-12-01',
    concurrency: 10,
    timeout: 30,
    retryCount: 3
  },
  {
    id: 'AGT002',
    name: '语音合成代理',
    type: '语音处理',
    status: 'stopped',
    statusText: '已停止',
    description: '将文本转换为语音的处理代理',
    taskCount: 3000,
    successRate: 99.0,
    responseTime: 200,
    updateTime: '2023-11-28',
    concurrency: 5,
    timeout: 60,
    retryCount: 2
  }
]);

// 过滤后的代理列表
const filteredAgents = computed(() => {
  return agents.filter(agent => {
    const matchQuery = agent.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                      agent.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = statusIndex.value === 0 || 
                       agent.statusText === statusOptions[statusIndex.value];
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

// 处理添加代理
const handleAddAgent = () => {
  uni.navigateTo({
    url: '/pages/agent/add'
  });
};

// 处理代理详情
const handleAgentDetail = (agent) => {
  uni.navigateTo({
    url: `/pages/agent/detail?id=${agent.id}`
  });
};

// 处理配置更新
const handleConfigUpdate = (agent, field) => {
  // 实际应用中需要调用API更新配置
  console.log('更新配置:', agent.id, field, agent[field]);
};

// 处理代理开关
const handleToggleAgent = (agent) => {
  const action = agent.status === 'running' ? '停止' : '启动';
  uni.showModal({
    title: '确认操作',
    content: `是否确认${action}代理"${agent.name}"？`,
    success: (res) => {
      if (res.confirm) {
        // 实际应用中需要调用API切换代理状态
        agent.status = agent.status === 'running' ? 'stopped' : 'running';
        agent.statusText = agent.status === 'running' ? '运行中' : '已停止';
        console.log(`${action}代理:`, agent.id);
      }
    }
  });
};

// 处理编辑代理
const handleEditAgent = (agent) => {
  uni.navigateTo({
    url: `/pages/agent/edit?id=${agent.id}`
  });
};

// 处理删除代理
const handleDeleteAgent = (agent) => {
  uni.showModal({
    title: '确认删除',
    content: `是否确认删除代理"${agent.name}"？`,
    success: (res) => {
      if (res.confirm) {
        // 实际应用中需要调用API删除代理
        console.log('删除代理:', agent.id);
      }
    }
  });
};
</script>

<style lang="scss">
.agent-container {
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
      background-color: #F56C6C;
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

  .agent-list {
    .agent-item {
      background-color: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;

      .agent-info {
        margin-bottom: 20rpx;

        .agent-header {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;

          .agent-name {
            font-size: 32rpx;
            font-weight: 600;
            color: #333;
            margin-right: 20rpx;
          }

          .status-tag {
            padding: 4rpx 16rpx;
            border-radius: 20rpx;
            font-size: 24rpx;

            &.running {
              background-color: #67C23A;
              color: #fff;
            }

            &.stopped {
              background-color: #909399;
              color: #fff;
            }

            &.error {
              background-color: #F56C6C;
              color: #fff;
            }
          }
        }

        .agent-meta {
          display: flex;
          gap: 20rpx;
          margin-bottom: 16rpx;
          font-size: 26rpx;
          color: #666;
        }

        .agent-desc {
          font-size: 26rpx;
          color: #999;
          line-height: 1.5;
          margin-bottom: 16rpx;
        }

        .agent-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 20rpx;

          .stat-item {
            font-size: 24rpx;
            color: #666;
          }
        }
      }

      .agent-config {
        display: flex;
        gap: 20rpx;
        margin-bottom: 20rpx;
        padding: 20rpx;
        background-color: #f8f9fa;
        border-radius: 12rpx;

        .config-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8rpx;

          .label {
            font-size: 24rpx;
            color: #666;
          }

          input {
            height: 60rpx;
            padding: 0 16rpx;
            background-color: #fff;
            border-radius: 8rpx;
            font-size: 28rpx;
            text-align: center;
          }
        }
      }

      .agent-actions {
        display: flex;
        justify-content: flex-end;
        gap: 16rpx;

        .action-btn {
          width: 64rpx;
          height: 64rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 32rpx;

          &.toggle {
            &.start {
              background-color: #67C23A;
              color: #fff;
            }

            &.stop {
              background-color: #909399;
              color: #fff;
            }
          }

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