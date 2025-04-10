<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style>
/* 引入图标字体 */
@font-face {
  font-family: 'iconfont';
  src: url('/static/fonts/iconfont.ttf') format('truetype');
}

.iconfont {
  font-family: 'iconfont';
}

/* 定义图标 */
.icon-user:before {
  content: '\e7ae'; /* 用户图标的Unicode */
}
.icon-lock:before {
  content: '\e709'; /* 锁图标的Unicode */
}
.icon-wechat:before {
  content: '\e637'; /* 微信图标的Unicode */
}
.icon-qq:before {
  content: '\e614'; /* QQ图标的Unicode */
}
.icon-weibo:before {
  content: '\e66b'; /* 微博图标的Unicode */
}

/* 全局样式 */
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
