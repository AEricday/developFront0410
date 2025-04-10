<template>
  <view class="stats-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="title">数据统计</text>
      <view class="date-picker">
        <picker
          mode="date"
          :value="dateRange.start"
          @change="handleStartDateChange"
        >
          <text>{{ dateRange.start }}</text>
        </picker>
        <text class="separator">至</text>
        <picker
          mode="date"
          :value="dateRange.end"
          @change="handleEndDateChange"
        >
          <text>{{ dateRange.end }}</text>
        </picker>
      </view>
    </view>

    <!-- 数据概览 -->
    <view class="stats-overview">
      <view class="stat-card" v-for="stat in overviewStats" :key="stat.key">
        <text class="stat-value">{{ stat.value }}</text>
        <text class="stat-label">{{ stat.label }}</text>
        <text :class="['stat-trend', stat.trend]">{{ stat.trendValue }}</text>
      </view>
    </view>

    <!-- 图表区域 -->
    <view class="charts-section">
      <!-- 使用趋势图 -->
      <view class="chart-card">
        <view class="chart-header">
          <text class="chart-title">使用趋势</text>
          <view class="chart-legend">
            <view class="legend-item" v-for="item in usageLegend" :key="item.key">
              <view class="legend-color" :style="{ backgroundColor: item.color }"></view>
              <text>{{ item.label }}</text>
            </view>
          </view>
        </view>
        <view class="chart-container">
          <!-- 实际应用中需要集成图表组件 -->
          <view class="chart-placeholder">
            <text>使用趋势图表</text>
          </view>
        </view>
      </view>

      <!-- 分布统计图 -->
      <view class="chart-card">
        <view class="chart-header">
          <text class="chart-title">类型分布</text>
          <picker
            mode="selector"
            :range="distributionTypes"
            :value="distributionTypeIndex"
            @change="handleDistributionTypeChange"
          >
            <view class="type-selector">
              <text>{{ distributionTypes[distributionTypeIndex] }}</text>
              <text class="iconfont icon-arrow-down"></text>
            </view>
          </picker>
        </view>
        <view class="chart-container">
          <!-- 实际应用中需要集成图表组件 -->
          <view class="chart-placeholder">
            <text>分布统计图表</text>
          </view>
        </view>
      </view>

      <!-- 性能指标图 -->
      <view class="chart-card">
        <view class="chart-header">
          <text class="chart-title">性能指标</text>
          <view class="metric-tabs">
            <text
              v-for="(tab, index) in metricTabs"
              :key="index"
              :class="['tab-item', { active: currentMetricTab === index }]"
              @click="handleMetricTabChange(index)"
            >{{ tab }}</text>
          </view>
        </view>
        <view class="chart-container">
          <!-- 实际应用中需要集成图表组件 -->
          <view class="chart-placeholder">
            <text>性能指标图表</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 详细数据表格 -->
    <view class="data-table">
      <view class="table-header">
        <text class="table-title">详细数据</text>
        <button class="export-btn" @click="handleExportData">
          <text class="iconfont icon-download"></text>
          <text>导出</text>
        </button>
      </view>
      <view class="table-content">
        <view class="table-row header">
          <text v-for="col in tableColumns" :key="col.key">{{ col.label }}</text>
        </view>
        <view class="table-row" v-for="row in tableData" :key="row.id">
          <text v-for="col in tableColumns" :key="col.key">{{ row[col.key] }}</text>
        </view>
      </view>
      <view class="table-footer">
        <text>共 {{ totalRecords }} 条记录</text>
        <view class="pagination">
          <text
            class="page-btn"
            :class="{ disabled: currentPage === 1 }"
            @click="handlePageChange(currentPage - 1)"
          >上一页</text>
          <text class="page-number">{{ currentPage }} / {{ totalPages }}</text>
          <text
            class="page-btn"
            :class="{ disabled: currentPage === totalPages }"
            @click="handlePageChange(currentPage + 1)"
          >下一页</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 日期范围
const dateRange = reactive({
  start: '2023-11-01',
  end: '2023-12-01'
});

// 概览统计数据
const overviewStats = reactive([
  {
    key: 'totalUsers',
    label: '总用户数',
    value: '1,234',
    trend: 'up',
    trendValue: '+12.5%'
  },
  {
    key: 'activeUsers',
    label: '活跃用户',
    value: '856',
    trend: 'up',
    trendValue: '+8.3%'
  },
  {
    key: 'totalTasks',
    label: '任务总数',
    value: '5,678',
    trend: 'up',
    trendValue: '+15.2%'
  },
  {
    key: 'avgResponse',
    label: '平均响应时间',
    value: '180ms',
    trend: 'down',
    trendValue: '-5.8%'
  }
]);

// 使用趋势图例
const usageLegend = [
  { key: 'users', label: '用户数', color: '#4A90E2' },
  { key: 'tasks', label: '任务数', color: '#67C23A' },
  { key: 'time', label: '响应时间', color: '#E6A23C' }
];

// 分布类型选项
const distributionTypes = ['用户分布', '任务分布', '设备分布'];
const distributionTypeIndex = ref(0);

// 性能指标选项
const metricTabs = ['CPU使用率', '内存使用率', '网络流量'];
const currentMetricTab = ref(0);

// 表格配置
const tableColumns = [
  { key: 'date', label: '日期' },
  { key: 'users', label: '用户数' },
  { key: 'tasks', label: '任务数' },
  { key: 'success', label: '成功率' },
  { key: 'response', label: '响应时间' }
];

// 表格数据
const tableData = reactive([
  {
    id: 1,
    date: '2023-12-01',
    users: 100,
    tasks: 500,
    success: '98.5%',
    response: '175ms'
  },
  {
    id: 2,
    date: '2023-11-30',
    users: 95,
    tasks: 480,
    success: '97.8%',
    response: '182ms'
  }
]);

// 分页数据
const currentPage = ref(1);
const totalPages = ref(10);
const totalRecords = ref(98);

// 处理日期变化
const handleStartDateChange = (e) => {
  dateRange.start = e.detail.value;
  refreshData();
};

const handleEndDateChange = (e) => {
  dateRange.end = e.detail.value;
  refreshData();
};

// 处理分布类型变化
const handleDistributionTypeChange = (e) => {
  distributionTypeIndex.value = e.detail.value;
  refreshData();
};

// 处理性能指标切换
const handleMetricTabChange = (index) => {
  currentMetricTab.value = index;
  refreshData();
};

// 处理数据导出
const handleExportData = () => {
  // 实际应用中需要调用API导出数据
  console.log('导出数据');
  uni.showToast({
    title: '开始导出数据',
    icon: 'success'
  });
};

// 处理分页
const handlePageChange = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  refreshData();
};

// 刷新数据
const refreshData = () => {
  // 实际应用中需要调用API获取数据
  console.log('刷新数据', {
    dateRange,
    distributionType: distributionTypes[distributionTypeIndex.value],
    metricType: metricTabs[currentMetricTab.value],
    page: currentPage.value
  });
};
</script>

<style lang="scss">
.stats-container {
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

    .date-picker {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 16rpx 30rpx;
      border-radius: 30rpx;
      font-size: 28rpx;

      .separator {
        margin: 0 20rpx;
        color: #999;
      }
    }
  }

  .stats-overview {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    margin-bottom: 30rpx;

    .stat-card {
      background-color: #fff;
      padding: 30rpx;
      border-radius: 16rpx;

      .stat-value {
        display: block;
        font-size: 40rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 10rpx;
      }

      .stat-label {
        font-size: 26rpx;
        color: #666;
      }

      .stat-trend {
        display: block;
        font-size: 24rpx;
        margin-top: 10rpx;

        &.up {
          color: #67C23A;
        }

        &.down {
          color: #F56C6C;
        }
      }
    }
  }

  .charts-section {
    .chart-card {
      background-color: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;

      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .chart-title {
          font-size: 32rpx;
          font-weight: 600;
          color: #333;
        }

        .chart-legend {
          display: flex;
          gap: 20rpx;

          .legend-item {
            display: flex;
            align-items: center;
            font-size: 24rpx;
            color: #666;

            .legend-color {
              width: 20rpx;
              height: 20rpx;
              border-radius: 4rpx;
              margin-right: 8rpx;
            }
          }
        }

        .type-selector {
          display: flex;
          align-items: center;
          font-size: 28rpx;
          color: #666;

          .iconfont {
            margin-left: 10rpx;
            color: #999;
          }
        }

        .metric-tabs {
          display: flex;
          gap: 20rpx;

          .tab-item {
            padding: 8rpx 20rpx;
            border-radius: 20rpx;
            font-size: 26rpx;
            color: #666;
            background-color: #f5f5f5;

            &.active {
              color: #fff;
              background-color: #4A90E2;
            }
          }
        }
      }

      .chart-container {
        height: 400rpx;

        .chart-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f8f9fa;
          border-radius: 8rpx;
          color: #999;
          font-size: 28rpx;
        }
      }
    }
  }

  .data-table {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .table-title {
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

    .table-content {
      .table-row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        padding: 20rpx 0;
        font-size: 26rpx;
        border-bottom: 2rpx solid #f5f5f5;

        &.header {
          font-weight: 600;
          color: #333;
        }

        text {
          color: #666;
        }
      }
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      font-size: 26rpx;
      color: #999;

      .pagination {
        display: flex;
        align-items: center;
        gap: 20rpx;

        .page-btn {
          padding: 8rpx 20rpx;
          border-radius: 30rpx;
          background-color: #f5f5f5;
          color: #666;

          &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }

        .page-number {
          color: #333;
        }
      }
    }
  }
}
</style>