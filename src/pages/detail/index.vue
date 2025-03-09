<template>

  <view class="detail-page-container ">

    <swiper class='swiper-card' indicatorColor='#999' indicatorActiveColor='#333' current="current" :duration="500"
      :interval="5000" :circular="false" :autoplay="true" :indicatorDots="true">
      <swiper-item v-for="(item, idx) in images" :key="idx">
        <image :src="item" class="details-slide-image" />
      </swiper-item>
    </swiper>

    <view class="desc-card">
      <text class="house-title">全海景高品质大床房（马赛）</text>
      <view class="house-features">
        <text class="feature-item">整套公寓</text>
        <text class="feature-item">1室1厅</text>
        <text class="feature-item">可住2人</text>
      </view>
      <view class="house-description">
        <text>位于马赛市中心的海景公寓，步行可达老港口和主要景点。房间配备高品质大床和独立卫浴，配有厨房可以自己烹饪美食。阳台正对大海，可以欣赏无敌海景。</text>
      </view>
    </view>


    <view class="house-card">
      <image class="house-card-img"
        src="https://i0.hdslb.com/bfs/archive/e2b8290c0d28855decb1e05b45d098689deb07e6.jpg@336w_190h_1c_!web-video-rcmd-cover.avif">
      </image>
      <view class="details">
        <text class="details-title">全海景高品质大床房（马赛）</text>
        <view class="tag-list">
          <view class="tag">
            5.0
          </view>
          <view class="tag">
            可做饭
          </view>
        </view>
        <view class="price-and-button">
          <text class="price">￥880起</text>
          <view class="button-group">
            <at-button type="secondary" size="small" @click="handleContactLandlord">联系房东</at-button>
            <at-button type="primary" size="small" @click="handleBooking">立即预订</at-button>
          </view>
        </view>
      </view>
    </view>

    <!-- 设施服务 -->
    <view class="facility-card">
      <view class="card-title">设施服务</view>
      <view class="facility-list">
        <view class="facility-item" v-for="(item, index) in facilities" :key="index">
          <text class="iconfont" :class="item.icon"></text>
          <text class="facility-name">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 房客点评 -->
    <view class="review-card">
      <view class="card-title">房客点评</view>
      <view class="review-stats">
        <text class="rating">4.9</text>
        <text class="total-reviews">共 126 条点评</text>
      </view>
      <view class="review-list">
        <view class="review-item" v-for="(review, index) in reviews" :key="index">
          <view class="reviewer-info">
            <image class="avatar" :src="review.avatar"></image>
            <view class="reviewer-detail">
              <text class="reviewer-name">{{ review.name }}</text>
              <text class="review-date">{{ review.date }}</text>
            </view>
          </view>
          <text class="review-content">{{ review.content }}</text>
        </view>
      </view>
    </view>

    <!-- 房源特色 -->
    <view class="features-card">
      <view class="card-title">房源特色</view>
      <view class="features-list">
        <view class="feature-item" v-for="(feature, index) in features" :key="index">
          <text class="feature-title">{{ feature.title }}</text>
          <text class="feature-desc">{{ feature.description }}</text>
        </view>
      </view>
    </view>

    <!-- 预订须知 -->
    <view class="booking-notice-card">
      <view class="card-title">预订须知</view>
      <view class="notice-list">
        <view class="notice-item" v-for="(notice, index) in bookingNotices" :key="index">
          <text class="notice-title">{{ notice.title }}</text>
          <text class="notice-content">{{ notice.content }}</text>
        </view>
      </view>
    </view>

    <!-- 同类好房 -->
    <view class="similar-houses-card">
      <view class="card-title">同类好房</view>
      <scroll-view scroll-x class="similar-houses-scroll">
        <view class="similar-house-list">
          <view class="similar-house-item" v-for="(house, index) in similarHouses" :key="index"
            @tap="navigateToHouse(house.id)">
            <image class="house-image" :src="house.image" mode="aspectFill"></image>
            <text class="house-name">{{ house.name }}</text>
            <text class="house-price">¥{{ house.price }}起</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部预订栏 -->
    <view class="bottom-bar">
      <view class="price-info">
        <text class="price">¥880</text>
        <text class="price-unit">起/晚</text>
      </view>
      <view class="bottom-buttons">
        <button class="collect-btn" :class="{ 'collected': isCollected }" @tap="toggleCollect">
          <text class="collect-icon">{{ isCollected ? '♥' : '♡' }}</text>
          <text>{{ isCollected ? '已收藏' : '收藏' }}</text>
        </button>
        <at-button type="secondary" @click="handleContactLandlord">联系房东</at-button>
        <at-button type="primary" @click="handleBooking">立即预订</at-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import './index.css'
import Taro from '@tarojs/taro';
import { ref, onMounted } from 'vue';

// 房源ID，实际应从路由参数获取
const houseId = ref(1);

// 收藏状态
const isCollected = ref(false);

// 生命周期钩子
onMounted(() => {
  checkCollectStatus();
});

// 检查收藏状态
const checkCollectStatus = () => {
  const storedCollects = Taro.getStorageSync('collectList');
  if (storedCollects) {
    const collectList = JSON.parse(storedCollects);
    isCollected.value = collectList.some(item => item.id === houseId.value);
  }
};

// 切换收藏状态
const toggleCollect = () => {
  // 获取当前收藏列表
  let collectList = [];
  const storedCollects = Taro.getStorageSync('collectList');
  if (storedCollects) {
    collectList = JSON.parse(storedCollects);
  }

  if (isCollected.value) {
    // 取消收藏
    collectList = collectList.filter(item => item.id !== houseId.value);
    Taro.showToast({
      title: '已取消收藏',
      icon: 'success'
    });
  } else {
    // 添加收藏
    collectList.push({
      id: houseId.value,
      title: '全海景高品质大床房（马赛）',
      type: '整套公寓 · 1室1厅 · 可住2人',
      image: images.value[0],
      price: 880
    });
    Taro.showToast({
      title: '收藏成功',
      icon: 'success'
    });
  }

  // 更新存储和状态
  Taro.setStorageSync('collectList', JSON.stringify(collectList));
  isCollected.value = !isCollected.value;
};

const images = ref([
  'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
  'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
]);

const facilities = ref([
  { icon: 'icon-wifi', name: '免费WiFi' },
  { icon: 'icon-air-conditioner', name: '空调' },
  { icon: 'icon-washer', name: '洗衣机' },
  { icon: 'icon-kitchen', name: '厨房' },
  { icon: 'icon-tv', name: '电视' },
  { icon: 'icon-parking', name: '停车位' },
]);

const reviews = ref([
  {
    avatar: 'https://example.com/avatar1.jpg',
    name: '张三',
    date: '2023-12-01',
    content: '房间很干净，视野很好，设施齐全，房东很热情。'
  },
  {
    avatar: 'https://example.com/avatar2.jpg',
    name: '李四',
    date: '2023-11-28',
    content: '位置很好，周边配套设施齐全，性价比很高。'
  }
]);

const features = ref([
  {
    title: '绝佳位置',
    description: '位于市中心，步行可达主要景点'
  },
  {
    title: '无敌海景',
    description: '阳台直面大海，视野开阔'
  },
  {
    title: '便利设施',
    description: '配备完整厨房和洗衣设备'
  }
]);

const bookingNotices = ref([
  {
    title: '入住须知',
    content: '入住时间 14:00后，退房时间 12:00前'
  },
  {
    title: '清洁费',
    content: '每次入住收取清洁费100元'
  },
  {
    title: '押金',
    content: '入住时需缴纳500元押金，退房后无损坏将全额退还'
  }
]);

const similarHouses = ref([
  {
    id: 1,
    image: 'https://example.com/house1.jpg',
    name: '海景豪华套房',
    price: 980
  },
  {
    id: 2,
    image: 'https://example.com/house2.jpg',
    name: '市中心精品公寓',
    price: 780
  },
  {
    id: 3,
    image: 'https://example.com/house3.jpg',
    name: '轻奢海景房',
    price: 880
  }
]);

const navigateToHouse = (id: number) => {
  Taro.navigateTo({
    url: `/pages/detail/index?id=${id}`
  });
};

// 处理联系房东按钮点击
const handleContactLandlord = () => {
  // 检查用户是否登录
  const isLoggedIn = Taro.getStorageSync('userInfo');

  if (!isLoggedIn && false) {
    Taro.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }

  // 跳转到聊天页面，并传递房源信息
  Taro.navigateTo({
    url: '/pages/message/chat?houseId=1&houseTitle=' + encodeURIComponent('全海景高品质大床房（马赛）')
  });
};

// 处理预订按钮点击
const handleBooking = () => {
  // 检查用户是否登录
  const isLoggedIn = Taro.getStorageSync('userInfo');

  if (!isLoggedIn && false) {
    Taro.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }

  // 跳转到预订确认页面，并传递房源信息
  Taro.navigateTo({
    url: '/pages/booking/index?title=全海景高品质大床房（马赛）&price=880&type=整套公寓&capacity=2&image=' + encodeURIComponent('https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180')
  });
};
</script>
