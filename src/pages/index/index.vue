<template>
  <view class="container">
    <uni-scroll-view scroll-y class="scroll-view">
      <uni-list>
        <uni-list-item 
          v-for="(item, index) in modules"
          :key="index"
          :title="item.name"
          :thumb="item.icon"
          clickable
          @click="navigateTo(item.path)"
        />
      </uni-list>
    </uni-scroll-view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';

const modules = reactive([
  { name: '代理管理', icon: '/static/images/agent.png', path: '/pages/agent/index' },
  { name: '设备管理', icon: '/static/images/device.png', path: '/pages/device/index' },
  { name: '模型管理', icon: '/static/images/model.png', path: '/pages/model/index' },
  { name: '数据统计', icon: '/static/images/stats.png', path: '/pages/stats/index' },
  { name: '系统设置', icon: '/static/images/system.png', path: '/pages/system/index' },
  { name: '用户中心', icon: '/static/images/user.png', path: '/pages/user/index' },
  { name: '音色管理', icon: '/static/images/voice.png', path: '/pages/voice/index' }
]);

const navigateTo = (path) => {
  uni.navigateTo({
    url: path
  });
};
</script>

<script>
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
