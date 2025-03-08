<template>
  <view class="booking-page">
    <!-- 房源信息 -->
    <view class="house-info">
      <image class="house-image"
             src="https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180"
             mode="aspectFill"/>
      <view class="info-content">
        <text class="house-title">全海景高品质大床房（马赛）</text>
        <text class="house-type">整套公寓 · 1室1厅 · 可住2人</text>
      </view>
    </view>

    <!-- 入住信息 -->
    <view class="booking-info">
      <view class="info-item" @tap="showDatePicker = true; isSelectingCheckIn = true">
        <view class="item-label">入住时间</view>
        <view class="item-value">
          <text>{{ checkInDate || '请选择入住时间' }}</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="info-item" @tap="showDatePicker = true; isSelectingCheckIn = false">
        <view class="item-label">离店时间</view>
        <view class="item-value">
          <text>{{ checkOutDate || '请选择离店时间' }}</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="info-item" @tap="showGuestPicker = true">
        <view class="item-label">入住人数</view>
        <view class="item-value">
          <text>{{ guestCount }}人</text>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- 价格信息 -->
    <view class="price-info">
      <view class="price-item">
        <text>房费</text>
        <text>￥880 × {{ nights }}晚</text>
      </view>
      <view class="price-item total">
        <text>总价</text>
        <text class="total-price">￥{{ totalPrice }}</text>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-bar">
      <view class="price-display">
        <text class="label">总价</text>
        <text class="amount">￥{{ totalPrice }}</text>
      </view>
      <at-button type="primary" class="submit-btn" @click="handleSubmit">提交订单</at-button>
    </view>

    <!-- 日期选择器 -->
    <at-float-layout :isOpened="showDatePicker" @close="showDatePicker = false">
      <at-calendar
        :currentDate="selectedDate"
        @selectDate="onSelectDate"
      />
      <view class="picker-buttons">
        <at-button @click="showDatePicker = false">取消</at-button>
        <at-button type="primary" @click="confirmDateSelection">确定</at-button>
      </view>
    </at-float-layout>

    <!-- 人数选择器 -->
    <at-float-layout :isOpened="showGuestPicker" @close="showGuestPicker = false">
      <view class="guest-picker">
        <view class="picker-header">选择入住人数</view>
        <view class="picker-content">
          <at-button
            v-for="num in 6"
            :key="num"
            :type="guestCount === num ? 'primary' : ''"
            @click="selectGuestCount(num)"
          >
            {{ num }}人
          </at-button>
        </view>
      </view>
    </at-float-layout>
  </view>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const title = ref(router?.params?.title || '全海景高品质大床房（马赛）');
const price = ref(Number(router?.params?.price) || 880);
const type = ref(router?.params?.type || '整套公寓');
const capacity = ref(Number(router?.params?.capacity) || 2);
const image = ref(decodeURIComponent(router?.params?.image || ''));


// 状态管理
const showDatePicker = ref(false);
const showGuestPicker = ref(false);
const checkInDate = ref('');
const checkOutDate = ref('');
// 设置当前日期为默认值
const today = new Date();
const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
const selectedDate = ref(formattedToday);
const isSelectingCheckIn = ref(true); // 标记当前是否在选择入住日期
const guestCount = ref(2);

// 计算属性
const nights = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 1;
  const start = new Date(checkInDate.value);
  const end = new Date(checkOutDate.value);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
});

const totalPrice = computed(() => {
  return 880 * nights.value;
});

// 方法
const onSelectDate = (date: any) => {
  console.log('选择的日期原始值:', date);
  try {
    let year: number, month: number, day: number;
    let dateObj: Date;
    
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'object' && date.start) {
      // 处理日期选择器返回的对象格式 {start: "YYYY-MM-DD", end: "YYYY-MM-DD"}
      dateObj = new Date(date.start);
    } else if (typeof date === 'string') {
      // 尝试解析字符串日期
      const dateParts = date.split('-');
      if (dateParts.length === 3) {
        [year, month, day] = dateParts.map(Number);
        dateObj = new Date(year, month - 1, day);
      } else {
        // 尝试直接创建日期对象
        dateObj = new Date(date);
      }
    } else if (date && typeof date === 'object' && 'value' in date) {
      // 处理可能是{value: xxx}格式的对象
      return onSelectDate(date.value);
    } else {
      throw new Error('Invalid date type');
    }

    // 验证日期对象是否有效
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    // 提取年月日
    year = dateObj.getFullYear();
    month = dateObj.getMonth() + 1;
    day = dateObj.getDate();

    console.log('转换后的日期对象:', dateObj);
    selectedDate.value = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log('格式化后的日期字符串:', selectedDate.value);
  } catch (error) {
    console.error('日期处理错误:', error);
    Taro.showToast({
      title: '日期格式错误',
      icon: 'none',
      duration: 2000
    });
  }
};

const confirmDateSelection = () => {
  console.log('确认选择时的selectedDate值:', selectedDate.value);
  if (selectedDate.value) {
    if (isSelectingCheckIn.value) {
      console.log('设置入住日期');
      checkInDate.value = selectedDate.value;
      isSelectingCheckIn.value = false;
      // 提示用户选择离店日期
      Taro.showToast({
        title: '请选择离店日期',
        icon: 'none'
      });
      // 不关闭日期选择器，继续选择离店日期
    } else {
      // 设置离店日期
      const checkIn = new Date(checkInDate.value);
      const checkOut = new Date(selectedDate.value);
      console.log('入住日期:', checkIn);
      console.log('离店日期:', checkOut);
      // 确保离店日期晚于入住日期
      if (checkOut <= checkIn) {
        Taro.showToast({
          title: '离店日期必须晚于入住日期',
          icon: 'none'
        });
        return;
      }

      checkOutDate.value = selectedDate.value;
      showDatePicker.value = false;
      isSelectingCheckIn.value = true; // 重置为选择入住日期状态
    }
  } else {
    Taro.showToast({
      title: isSelectingCheckIn.value ? '请选择入住日期' : '请选择离店日期',
      icon: 'none'
    });
  }
};

const selectGuestCount = (num: number) => {
  guestCount.value = num;
  showGuestPicker.value = false;
};

const handleSubmit = () => {
  if (!checkInDate.value || !checkOutDate.value) {
    Taro.showToast({
      title: '请选择入住时间',
      icon: 'none'
    });
    return;
  }

  // 这里可以添加提交订单的逻辑
  Taro.showToast({
    title: '订单提交成功',
    icon: 'success'
  });

  // 延迟跳转到订单页面
  setTimeout(() => {
    Taro.navigateTo({
      url: '/pages/order/index'
    });
  }, 1500);
};
</script>

<style>
.booking-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120px;
}

.house-info {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 8px;
}

.house-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.house-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.house-type {
  font-size: 14px;
  color: #666;
}

.booking-info {
  background-color: #fff;
  margin-bottom: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.item-label {
  font-size: 16px;
  color: #333;
}

.item-value {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.arrow {
  color: #999;
}

.price-info {
  background-color: #fff;
  padding: 16px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.total {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.total-price {
  color: #ff4d4f;
  font-size: 18px;
  font-weight: bold;
}

.submit-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.price-display {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.price-display .label {
  font-size: 12px;
  color: #999;
}

.price-display .amount {
  color: #ff4d4f;
  font-size: 20px;
  font-weight: bold;
}

.submit-btn {
  align-self: flex-end;
}

.picker-buttons {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #eee;
}

.guest-picker {
  padding: 16px;
}

.picker-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
}

.picker-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0 16px;
}
</style>
