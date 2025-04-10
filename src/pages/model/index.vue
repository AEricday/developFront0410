<template>
  <view class="model-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="title">模型管理</text>
      <button class="add-btn" @click="handleAddModel">
        <text class="iconfont icon-add"></text>
        <text>添加模型</text>
      </button>
    </view>

    <!-- 搜索和筛选 -->
    <view class="search-section">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索模型名称或ID"
          @input="handleSearch"
        />
      </view>
      <view class="filter-box">
        <picker
          mode="selector"
          :range="typeOptions"
          :value="typeIndex"
          @change="handleTypeChange"
        >
          <view class="picker-item">
            <text>类型: {{ typeOptions[typeIndex] }}</text>
            <text class="iconfont icon-arrow-down"></text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 模型列表 -->
    <view class="model-list">
      <view
        class="model-item"
        v-for="model in filteredModels"
        :key="model.id"
        @click="handleModelDetail(model)"
      >
        <view class="model-info">
          <view class="model-header">
            <text class="model-name">{{ model.name }}</text>
            <text :class="['type-tag', model.type]">{{ model.typeText }}</text>
          </view>
          <view class="model-meta">
            <text class="model-id">ID: {{ model.id }}</text>
            <text class="model-version">版本: {{ model.version }}</text>
          </view>
          <view class="model-desc">{{ model.description }}</view>
          <view class="model-stats">
            <text class="stat-item">训练次数: {{ model.trainCount }}</text>
            <text class="stat-item">使用次数: {{ model.useCount }}</text>
            <text class="stat-item">更新时间: {{ model.updateTime }}</text>
          </view>
        </view>
        <view class="model-actions">
          <button class="action-btn train" @click.stop="handleTrainModel(model)">
            <text class="iconfont icon-train"></text>
          </button>
          <button class="action-btn edit" @click.stop="handleEditModel(model)">
            <text class="iconfont icon-edit"></text>
          </button>
          <button class="action-btn delete" @click.stop="handleDeleteModel(model)">
            <text class="iconfont icon-delete"></text>
          </button>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="filteredModels.length === 0">
      <text class="iconfont icon-empty"></text>
      <text>暂无模型数据</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// 搜索和筛选状态
const searchQuery = ref('');
const typeOptions = ['全部', '对话模型', '语音模型', '图像模型'];
const typeIndex = ref(0);

// 模拟模型数据
const models = reactive([
  {
    id: 'MOD001',
    name: 'GPT中文对话模型',
    type: 'chat',
    typeText: '对话模型',
    version: '1.0.0',
    description: '基于GPT架构的中文对话模型，支持多轮对话和知识问答',
    trainCount: 50,
    useCount: 1000,
    updateTime: '2023-12-01'
  },
  {
    id: 'MOD002',
    name: '中文语音识别模型',
    type: 'voice',
    typeText: '语音模型',
    version: '2.1.0',
    description: '专门针对中文语音识别优化的深度学习模型',
    trainCount: 30,
    useCount: 800,
    updateTime: '2023-11-28'
  }
]);

// 过滤后的模型列表
const filteredModels = computed(() => {
  return models.filter(model => {
    const matchQuery = model.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                      model.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchType = typeIndex.value === 0 || 
                     model.typeText === typeOptions[typeIndex.value];
    return matchQuery && matchType;
  });
});

// 处理搜索输入
const handleSearch = () => {
  // 实际应用中可能需要调用API进行搜索
  console.log('搜索查询:', searchQuery.value);
};

// 处理类型筛选变化
const handleTypeChange = (e) => {
  typeIndex.value = e.detail.value;
};

// 处理添加模型
const handleAddModel = () => {
  uni.navigateTo({
    url: '/pages/model/add'
  });
};

// 处理模型详情
const handleModelDetail = (model) => {
  uni.navigateTo({
    url: `/pages/model/detail?id=${model.id}`
  });
};

// 处理训练模型
const handleTrainModel = (model) => {
  uni.navigateTo({
    url: `/pages/model/train?id=${model.id}`
  });
};

// 处理编辑模型
const handleEditModel = (model) => {
  uni.navigateTo({
    url: `/pages/model/edit?id=${model.id}`
  });
};

// 处理删除模型
const handleDeleteModel = (model) => {
  uni.showModal({
    title: '确认删除',
    content: `是否确认删除模型"${model.name}"？`,
    success: (res) => {
      if (res.confirm) {
        // 实际应用中需要调用API删除模型
        console.log('删除模型:', model.id);
      }
    }
  });
};
</script>

<style lang="scss">
.model-container {
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

  .model-list {
    .model-item {
      background-color: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;

      .model-info {
        .model-header {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;

          .model-name {
            font-size: 32rpx;
            font-weight: 600;
            color: #333;
            margin-right: 20rpx;
          }

          .type-tag {
            padding: 4rpx 16rpx;
            border-radius: 20rpx;
            font-size: 24rpx;

            &.chat {
              background-color: #67C23A;
              color: #fff;
            }

            &.voice {
              background-color: #E6A23C;
              color: #fff;
            }

            &.image {
              background-color: #4A90E2;
              color: #fff;
            }
          }
        }

        .model-meta {
          display: flex;
          gap: 20rpx;
          margin-bottom: 16rpx;
          font-size: 26rpx;
          color: #666;
        }

        .model-desc {
          font-size: 26rpx;
          color: #999;
          line-height: 1.5;
          margin-bottom: 16rpx;
        }

        .model-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 20rpx;

          .stat-item {
            font-size: 24rpx;
            color: #666;
          }
        }
      }

      .model-actions {
        display: flex;
        justify-content: flex-end;
        gap: 16rpx;
        margin-top: 20rpx;

        .action-btn {
          width: 64rpx;
          height: 64rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 32rpx;

          &.train {
            background-color: #67C23A;
            color: #fff;
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