<template>

  <view class="my-view">

    <at-button type="primary" size="normal" @click="console.log('点击了按钮！')">
      一键登录
    </at-button>

    <view class="order-list">
      <text class="order-title">我的订单</text>
      <text class="order-desc" @tap="navigateToOrder">全部订单></text>
      <view class="order-grid">
        <view class="grid-item" @tap="navigateToOrder('pending')">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" />
          <text class="grid-text">待付款</text>
        </view>
        <view class="grid-item" @tap="navigateToOrder('confirmed')">
          <image class="grid-icon" src="https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png" />
          <text class="grid-text">待确认</text>
        </view>
        <view class="grid-item" @tap="navigateToOrder('completed')">
          <image class="grid-icon" src="https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png" />
          <text class="grid-text">已完成</text>
        </view>
        <view class="grid-item" @tap="navigateToOrder('cancelled')">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" />
          <text class="grid-text">已取消</text>
        </view>
      </view>

      <view class="special-order" @tap="navigateToOrder">
        <text class="special-title">美宿套餐订单</text>
        <text class="sign">></text>
      </view>

      <view class="service-grid">
        <view class="grid-item">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" />
          <text class="grid-text">免押入住</text>
        </view>
        <view class="grid-item">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" />
          <text class="grid-text">学生特权</text>
        </view>
        <view class="grid-item">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" />
          <text class="grid-text">常用入住人</text>
        </view>
        <view class="grid-item">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" />
          <text class="grid-text">特权卡卷</text>
        </view>
        <view class="grid-item">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" />
          <text class="grid-text">问题咨询</text>
        </view>
        <view class="grid-item">
          <image class="grid-icon" src="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" />
          <text class="grid-text">意见反馈</text>
        </view>
      </view>

      <at-button>我要当房东赚钱</at-button>


    </view>
  </view>

</template>
<style>
.my-view {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.order-list {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
}

.order-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.order-desc {
  font-size: 14px;
  color: #999;
  float: right;
  cursor: pointer;
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #eee;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  cursor: pointer;
}

.grid-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 8px;
}

.grid-text {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.special-order {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #eee;
  margin-top: 16px;
  cursor: pointer;
}

.special-title {
  font-size: 16px;
  color: #333;
}

.sign {
  color: #999;
}
</style>


<script setup lang="ts">
import './my.css';
import Taro from '@tarojs/taro';

// 跳转到订单页面
const navigateToOrder = (status?: string) => {
  let url = '/pages/order/index';
  if (status) {
    url += `?status=${status}`;
  }
  Taro.navigateTo({
    url
  });
};
</script>
