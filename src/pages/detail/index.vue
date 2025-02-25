<template>

  <view class="page-container">

    <swiper
      class='swiper-card'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      current="current"
      :duration="500"
      :interval="5000"
      :circular="false"
      :autoplay="true"
      :indicatorDots="true">
      <swiper-item v-for="(item, idx) in [
        'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
        'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
      ]" :key="idx">
        <image :src="item" class="slide-image"/>
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
             src="https://i0.hdslb.com/bfs/archive/e2b8290c0d28855decb1e05b45d098689deb07e6.jpg@336w_190h_1c_!web-video-rcmd-cover.avif"></image>
      <view class="details">
        <text>全海景高品质大床房（马赛）</text>
        <view class="tag-list">
          <view class="tag">
            <text>5.0</text>
          </view>
          <view class="tag">
            <text>可做饭</text>
          </view>
        </view>
        <view class="price-and-button">
          <text class="price">￥880起</text>
          <at-button type="primary" size="small">立即预订</at-button>
        </view>
      </view>
    </view>


  </view>


</template>

<script setup lang="ts">
import './index.css'


</script>
