<template>
  <view class="voice-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="title">音色管理</text>
      <button class="add-btn" @click="handleAddVoice">
        <text class="iconfont icon-add"></text>
        <text>添加音色</text>
      </button>
    </view>

    <!-- 搜索和筛选 -->
    <view class="search-section">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索音色名称或ID"
          @input="handleSearch"
        />
      </view>
      <view class="filter-box">
        <picker
          mode="selector"
          :range="categoryOptions"
          :value="categoryIndex"
          @change="handleCategoryChange"
        >
          <view class="picker-item">
            <text>分类: {{ categoryOptions[categoryIndex] }}</text>
            <text class="iconfont icon-arrow-down"></text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 音色列表 -->
    <view class="voice-list">
      <view
        class="voice-item"
        v-for="voice in filteredVoices"
        :key="voice.id"
        @click="handleVoiceDetail(voice)"
      >
        <view class="voice-info">
          <view class="voice-header">
            <text class="voice-name">{{ voice.name }}</text>
            <text :class="['category-tag', voice.category]">{{ voice.categoryText }}</text>
          </view>
          <view class="voice-meta">
            <text class="voice-id">ID: {{ voice.id }}</text>
            <text class="voice-duration">时长: {{ voice.duration }}s</text>
          </view>
          <view class="voice-desc">{{ voice.description }}</view>
          <view class="voice-stats">
            <text class="stat-item">使用次数: {{ voice.useCount }}</text>
            <text class="stat-item">评分: {{ voice.rating }}</text>
            <text class="stat-item">更新时间: {{ voice.updateTime }}</text>
          </view>
        </view>
        <view class="voice-preview">
          <view class="waveform-container">
            <!-- 这里可以集成波形图组件 -->
            <view class="waveform-placeholder"></view>
          </view>
          <view class="preview-controls">
            <button class="control-btn play" @click.stop="handlePlayVoice(voice)">
              <text class="iconfont icon-play"></text>
            </button>
            <button class="control-btn stop" @click.stop="handleStopVoice(voice)">
              <text class="iconfont icon-stop"></text>
            </button>
          </view>
        </view>
        <view class="voice-actions">
          <button class="action-btn edit" @click.stop="handleEditVoice(voice)">
            <text class="iconfont icon-edit"></text>
          </button>
          <button class="action-btn delete" @click.stop="handleDeleteVoice(voice)">
            <text class="iconfont icon-delete"></text>
          </button>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="filteredVoices.length === 0">
      <text class="iconfont icon-empty"></text>
      <text>暂无音色数据</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// 搜索和筛选状态
const searchQuery = ref('');
const categoryOptions = ['全部', '男声', '女声', '童声', '特效音'];
const categoryIndex = ref(0);

// 模拟音色数据
const voices = reactive([
  {
    id: 'VOI001',
    name: '标准女声',
    category: 'female',
    categoryText: '女声',
    duration: 30,
    description: '清晰自然的标准女声音色，适合各类场景使用',
    useCount: 2000,
    rating: 4.8,
    updateTime: '2023-12-01',
    audioUrl: 'path/to/audio/file'
  },
  {
    id: 'VOI002',
    name: '磁性男声',
    category: 'male',
    categoryText: '男声',
    duration: 25,
    description: '低沉富有磁性的男声音色，适合解说和广告配音',
    useCount: 1500,
    rating: 4.6,
    updateTime: '2023-11-28',
    audioUrl: 'path/to/audio/file'
  }
]);

// 过滤后的音色列表
const filteredVoices = computed(() => {
  return voices.filter(voice => {
    const matchQuery = voice.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                      voice.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory = categoryIndex.value === 0 || 
                         voice.categoryText === categoryOptions[categoryIndex.value];
    return matchQuery && matchCategory;
  });
});

// 处理搜索输入
const handleSearch = () => {
  // 实际应用中可能需要调用API进行搜索
  console.log('搜索查询:', searchQuery.value);
};

// 处理分类筛选变化
const handleCategoryChange = (e) => {
  categoryIndex.value = e.detail.value;
};

// 处理添加音色
const handleAddVoice = () => {
  uni.navigateTo({
    url: '/pages/voice/add'
  });
};

// 处理音色详情
const handleVoiceDetail = (voice) => {
  uni.navigateTo({
    url: `/pages/voice/detail?id=${voice.id}`
  });
};

// 处理播放音色
const handlePlayVoice = (voice) => {
  // 实际应用中需要调用音频播放API
  console.log('播放音色:', voice.id);
};

// 处理停止播放
const handleStopVoice = (voice) => {
  // 实际应用中需要调用音频停止API
  console.log('停止播放:', voice.id);
};

// 处理编辑音色
const handleEditVoice = (voice) => {
  uni.navigateTo({
    url: `/pages/voice/edit?id=${voice.id}`
  });
};

// 处理删除音色
const handleDeleteVoice = (voice) => {
  uni.showModal({
    title: '确认删除',
    content: `是否确认删除音色"${voice.name}"？`,
    success: (res) => {
      if (res.confirm) {
        // 实际应用中需要调用API删除音色
        console.log('删除音色:', voice.id);
      }
    }
  });
};
</script>

<style lang="scss">
.voice-container {
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
      background-color: #E6A23C;
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

  .voice-list {
    .voice-item {
      background-color: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;

      .voice-info {
        margin-bottom: 20rpx;

        .voice-header {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;

          .voice-name {
            font-size: 32rpx;
            font-weight: 600;
            color: #333;
            margin-right: 20rpx;
          }

          .category-tag {
            padding: 4rpx 16rpx;
            border-radius: 20rpx;
            font-size: 24rpx;

            &.male {
              background-color: #4A90E2;
              color: #fff;
            }

            &.female {
              background-color: #E6A23C;
              color: #fff;
            }

            &.child {
              background-color: #67C23A;
              color: #fff;
            }

            &.effect {
              background-color: #909399;
              color: #fff;
            }
          }
        }

        .voice-meta {
          display: flex;
          gap: 20rpx;
          margin-bottom: 16rpx;
          font-size: 26rpx;
          color: #666;
        }

        .voice-desc {
          font-size: 26rpx;
          color: #999;
          line-height: 1.5;
          margin-bottom: 16rpx;
        }

        .voice-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 20rpx;

          .stat-item {
            font-size: 24rpx;
            color: #666;
          }
        }
      }

      .voice-preview {
        margin-bottom: 20rpx;

        .waveform-container {
          height: 80rpx;
          background-color: #f5f5f5;
          border-radius: 8rpx;
          overflow: hidden;
          margin-bottom: 16rpx;

          .waveform-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #E6A23C 0%, #F5A623 100%);
            opacity: 0.2;
          }
        }

        .preview-controls {
          display: flex;
          justify-content: center;
          gap: 20rpx;

          .control-btn {
            width: 80rpx;
            height: 80rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 40rpx;
            background-color: #E6A23C;
            color: #fff;

            .iconfont {
              font-size: 40rpx;
            }

            &.stop {
              background-color: #909399;
            }
          }
        }
      }

      .voice-actions {
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