<template>
  <view class="collect-page">
    <view class="page-header">
      <text class="page-title">我的收藏</text>
    </view>

    <!-- 收藏列表 -->
    <view class="collect-list" v-if="collectList.length > 0">
      <view class="collect-item" v-for="item in collectList" :key="item.id" @tap="navigateToDetail(item.id)">
        <image class="house-image" :src="item.image" mode="aspectFill" />
        <view class="item-content">
          <text class="house-title">{{ item.title }}</text>
          <text class="house-type">{{ item.type }}</text>
          <view class="price-row">
            <text class="price">¥{{ item.price }}起</text>
            <button class="remove-btn" @tap.stop="removeFromCollect(item.id)">取消收藏</button>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <text class="empty-text">暂无收藏</text>
      <text class="empty-subtext">去发现心仪的房源吧</text>
      <button class="navigate-btn" @tap="navigateToHome">去首页</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 收藏列表数据
const collectList = ref([
  // 示例数据，实际应从本地存储或API获取
  {
    id: 1,
    title: '全海景高品质大床房（马赛）',
    type: '整套公寓 · 1室1厅 · 可住2人',
    image: 'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
    price: 880
  },
  {
    id: 2,
    title: '豪华双床套房',
    type: '酒店式公寓 · 2室1厅 · 可住4人',
    image: 'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
    price: 980
  }
]);

// 生命周期钩子
onMounted(() => {
  loadCollectList();
});

// 加载收藏列表
const loadCollectList = () => {
  const storedCollects = Taro.getStorageSync('collectList');
  if (storedCollects) {
    collectList.value = JSON.parse(storedCollects);
  }
};

// 从收藏中移除
const removeFromCollect = (id: number) => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消收藏吗？',
    success: function (res) {
      if (res.confirm) {
        // 从列表中移除
        collectList.value = collectList.value.filter(item => item.id !== id);
        // 更新存储
        Taro.setStorageSync('collectList', JSON.stringify(collectList.value));
        Taro.showToast({
          title: '已取消收藏',
          icon: 'success'
        });
      }
    }
  });
};

// 跳转到详情页
const navigateToDetail = (id: number) => {
  Taro.navigateTo({
    url: `/pages/detail/index?id=${id}`
  });
};

// 跳转到首页
const navigateToHome = () => {
  Taro.switchTab({
    url: '/pages/index/index'
  });
};
</script>

<style>
.collect-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.page-header {
  padding: 20px 16px;
  background-color: #fff;
  margin-bottom: 10px;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.collect-list {
  padding: 0 16px;
}

.collect-item {
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.house-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.item-content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.house-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.house-type {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  color: #ff4d4f;
  font-weight: bold;
}

.remove-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff4d4f);
  color: white;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
  transition: all 0.3s ease;
}

.remove-btn:active {
  transform: scale(0.95);
  box-shadow: 0 1px 2px rgba(255, 77, 79, 0.2);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 8px;
}

.empty-subtext {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}

.navigate-btn {
  background: linear-gradient(135deg, #36cfc9, #1890ff);
  color: white;
  font-size: 16px;
  padding: 10px 24px;
  border-radius: 24px;
  border: none;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
  transition: all 0.3s ease;
}

.navigate-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}
</style>