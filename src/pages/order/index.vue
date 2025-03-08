<template>
  <view class="order-page">
    <!-- 订单列表 -->
    <view class="order-list" v-if="orderList.length > 0">
      <view class="order-item" v-for="order in orderList" :key="order.id">
        <view class="house-info">
          <image class="house-image" :src="order.houseImage" mode="aspectFill" />
          <view class="info-content">
            <text class="house-title">{{ order.houseTitle }}</text>
            <text class="house-type">{{ order.houseType }}</text>
          </view>
        </view>

        <view class="order-info">
          <view class="info-row">
            <text class="label">入住时间</text>
            <text class="value">{{ order.checkInDate }}</text>
          </view>
          <view class="info-row">
            <text class="label">离店时间</text>
            <text class="value">{{ order.checkOutDate }}</text>
          </view>
          <view class="info-row">
            <text class="label">入住人数</text>
            <text class="value">{{ order.guestCount }}人</text>
          </view>
        </view>

        <view class="order-footer">
          <view class="price-info">
            <text class="total-label">总价</text>
            <text class="total-price">￥{{ order.totalPrice }}</text>
          </view>
          <view class="status-tag" :class="order.status">{{ getStatusText(order.status) }}</view>
        </view>

        <view class="order-actions">
          <at-button v-if="order.status === 'pending'" type="primary" size="small" @click="handlePayment(order.id)">立即支付</at-button>
          <at-button v-if="order.status === 'confirmed'" type="secondary" size="small" @click="handleCancel(order.id)">取消订单</at-button>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <text class="empty-text">暂无订单</text>
      <text class="empty-subtext">去发现心仪的房源吧</text>
      <at-button type="primary" @click="navigateToHome">去首页</at-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Taro from '@tarojs/taro';

// 订单列表数据
const orderList = ref([
  {
    id: 1,
    houseTitle: '全海景高品质大床房（马赛）',
    houseType: '整套公寓 · 1室1厅 · 可住2人',
    houseImage: 'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
    checkInDate: '2024-03-15',
    checkOutDate: '2024-03-17',
    guestCount: 2,
    totalPrice: 1760,
    status: 'pending' // pending, confirmed, completed, cancelled
  }
]);

// 获取状态文本
const getStatusText = (status: string) => {
  const statusMap = {
    pending: '待支付',
    confirmed: '已确认',
    completed: '已完成',
    cancelled: '已取消'
  };
  return statusMap[status] || status;
};

// 处理支付
const handlePayment = (orderId: number) => {
  // 这里添加支付逻辑
  Taro.showToast({
    title: '正在跳转支付...',
    icon: 'loading'
  });
};

// 处理取消订单
const handleCancel = (orderId: number) => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消该订单吗？',
    success: function (res) {
      if (res.confirm) {
        // 这里添加取消订单的逻辑
        Taro.showToast({
          title: '订单已取消',
          icon: 'success'
        });
      }
    }
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
.order-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.house-info {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.house-image {
  width: 120px;
  height: 80px;
  border-radius: 4px;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.house-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.house-type {
  font-size: 14px;
  color: #666;
}

.order-info {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.label {
  color: #666;
  font-size: 14px;
}

.value {
  color: #333;
  font-size: 14px;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.total-label {
  font-size: 14px;
  color: #666;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  color: #ff4d4f;
}

.status-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.pending {
  background-color: #fff7e6;
  color: #fa8c16;
}

.status-tag.confirmed {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-tag.completed {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-tag.cancelled {
  background-color: #f5f5f5;
  color: #999;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  text-align: center;
}

.empty-text {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
}

.empty-subtext {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}
</style>