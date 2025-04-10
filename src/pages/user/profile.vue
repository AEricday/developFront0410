<template>
  <view class="profile-container">
    <!-- 顶部设置按钮 -->
    <view class="settings-icon">
      <uni-icons type="gear" size="24"></uni-icons>
    </view>
    
    <!-- 用户信息区域 -->
    <view class="user-info">
      <view class="avatar-container">
        <image class="avatar" src="/static/images/avatar.jpg" mode="aspectFill"></image>
      </view>
      <view class="username">高速不超速</view>
      <view class="user-id">豆号: 991969468</view>
      <button class="edit-profile-btn">编辑个人资料</button>
    </view>
    
    <!-- 标签页导航 -->
    <view class="tab-nav">
      <view class="tab-item" :class="{ active: activeTab === 'works' }" @click="activeTab = 'works'">
        作品
      </view>
      <view class="tab-item" :class="{ active: activeTab === 'private' }" @click="activeTab = 'private'">
        私密 <uni-icons type="locked" size="16"></uni-icons>
      </view>
      <view class="tab-item" :class="{ active: activeTab === 'ai' }" @click="activeTab = 'ai'">
        智能体
      </view>
      <view class="tab-item" :class="{ active: activeTab === 'favorites' }" @click="activeTab = 'favorites'">
        收藏
      </view>
    </view>
    
    <!-- 作品展示区域 -->
    <view class="works-container" v-if="activeTab === 'works'">
      <view class="work-item" v-for="(item, index) in worksList" :key="index">
        <image :src="item.image" mode="aspectFill"></image>
        <text class="work-count" v-if="item.count">{{item.count}}</text>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <view class="bottom-nav">
      <view class="nav-item">
        <uni-icons type="chat" size="24"></uni-icons>
        <view class="badge" v-if="unreadMessages > 0">{{unreadMessages}}</view>
        <text>对话</text>
      </view>
      <view class="nav-item">
        <uni-icons type="search" size="24"></uni-icons>
        <text>发现</text>
      </view>
      <view class="nav-item">
        <uni-icons type="plusempty" size="30"></uni-icons>
        <text>创作</text>
      </view>
      <view class="nav-item">
        <uni-icons type="heart" size="24"></uni-icons>
        <text>通知</text>
      </view>
      <view class="nav-item active">
        <uni-icons type="person" size="24"></uni-icons>
        <text>我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'works',
      unreadMessages: 11,
      worksList: [
        { image: '/static/images/work1.jpg' },
        { image: '/static/images/work2.jpg', count: 4 },
        { image: '/static/images/work3.jpg' },
        { image: '/static/images/work4.jpg', count: 2 }
      ]
    }
  }
}
</script>

<style lang="scss">
.profile-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  position: relative;
}

.settings-icon {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  z-index: 10;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
}

.avatar-container {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.avatar {
  width: 100%;
  height: 100%;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.user-id {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 30rpx;
}

.edit-profile-btn {
  background-color: #f5f5f5;
  color: #333;
  font-size: 28rpx;
  padding: 10rpx 60rpx;
  border-radius: 30rpx;
  border: none;
}

.tab-nav {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-item.active {
  color: #000;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #000;
}

.works-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx;
}

.work-item {
  width: calc(33.33% - 10rpx);
  height: 240rpx;
  margin: 5rpx;
  position: relative;
  overflow: hidden;
}

.work-item image {
  width: 100%;
  height: 100%;
}

.work-count {
  position: absolute;
  right: 10rpx;
  bottom: 10rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24rpx;
  padding: 4rpx 10rpx;
  border-radius: 12rpx;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #eee;
  padding: 10rpx 0;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #666;
  position: relative;
}

.nav-item.active {
  color: #000;
}

.badge {
  position: absolute;
  top: -5rpx;
  right: 50%;
  margin-right: -25rpx;
  background-color: #ff5252;
  color: #fff;
  font-size: 20rpx;
  min-width: 32rpx;
  height: 32rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6rpx;
}
</style>