<template>
  <view class="order-page">
    <!-- 订单状态筛选 -->
    <view class="order-tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        @tap="activeTab = tab.value"
      >
        {{ tab.label }}
      </view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list" v-if="filteredOrders.length > 0">
      <view class="order-item" v-for="order in filteredOrders" :key="order.id">
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
import { ref, computed } from 'vue';
import Taro from '@tarojs/taro';

// 订单状态筛选选项
const tabs = [
  { label: '全部', value: 'all' },
  { label: '待支付', value: 'pending' },
  { label: '已确认', value: 'confirmed' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' }
];

// 获取路由参数中的状态
const router = Taro.getCurrentInstance().router;
const statusParam = router?.params?.status;

// 当前选中的状态标签，如果URL中有状态参数则使用，否则默认为'all'
const activeTab = ref(statusParam && ['pending', 'confirmed', 'completed', 'cancelled'].includes(statusParam) ? statusParam : 'all');

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
  },
  {
    id: 2,
    houseTitle: '豪华双床套房',
    houseType: '酒店式公寓 · 2室1厅 · 可住4人',
    houseImage: 'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
    checkInDate: '2024-03-20',
    checkOutDate: '2024-03-22',
    guestCount: 3,
    totalPrice: 1098,
    status: 'confirmed'
  },
  {
    id: 3,
    houseTitle: '市中心精品单间',
    houseType: '独立房间 · 1室0厅 · 可住2人',
    houseImage: 'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
    checkInDate: '2024-02-10',
    checkOutDate: '2024-02-12',
    guestCount: 1,
    totalPrice: 596,
    status: 'completed'
  },
  {
    id: 4,
    houseTitle: '海边度假别墅',
    houseType: '整套别墅 · 3室2厅 · 可住6人',
    houseImage: 'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
    checkInDate: '2024-01-05',
    checkOutDate: '2024-01-10',
    guestCount: 5,
    totalPrice: 4980,
    status: 'cancelled'
  }
]);

// 根据选中的标签筛选订单
const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return orderList.value;
  }
  return orderList.value.filter(order => order.status === activeTab.value);
});

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
  
  // 模拟支付成功后更新订单状态
  setTimeout(() => {
    const orderIndex = orderList.value.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      orderList.value[orderIndex].status = 'confirmed';
      Taro.showToast({
        title: '支付成功',
        icon: 'success'
      });
    }
  }, 1500);
};

// 处理取消订单
const handleCancel = (orderId: number) => {
  Taro.showModal({
    title: '提示',
    content: '确定要取消该订单吗？',
    success: function (res) {
      if (res.confirm) {
        // 更新订单状态为已取消
        const orderIndex = orderList.value.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
          orderList.value[orderIndex].status = 'cancelled';
          Taro.showToast({
            title: '订单已取消',
            icon: 'success'
          });
        }
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

/* 订单状态筛选标签样式 */
.order-tabs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tab-item {
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
}

.tab-item.active {
  color: #1890ff;
  font-weight: bold;
  background-color: #e6f7ff;
}

.order-list {
  display: grid;
  grid-template-columns: 1fr;
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