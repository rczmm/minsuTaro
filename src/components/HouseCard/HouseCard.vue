<template>
  <view class="room-list">
    <view class="room-view" v-for="(data,index) in dataList" :key="index" @tap="navToDetail(data.id)">
      <image class="room-img" :src="data.image" alt="11"></image>
      <view class="desc-view">
        <view class="title-row">
          <text class="title-text">{{ data.name }}</text>
          <view class="rate-view">
            <text class="rate-text">{{ data.rate }}</text>
          </view>
        </view>
        <view class="info-row">
          <text class="price-text">$ {{ data.price }}</text>
          <text class="spec-text">{{ data.roomNum }}室·{{ data.personNum }}人</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import './index.css';
import Taro from '@tarojs/taro';

defineProps({
  dataList: {
    type: Array,
    default: () => []
  }
})

const navToDetail = (id: number) => {
  Taro.navigateTo({
    url: `/pages/detail/index?id=${id}`
  })
}

</script>
