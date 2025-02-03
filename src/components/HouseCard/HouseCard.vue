<template>
  <view class="room-list">
    <view class="room-view" v-for="(data,index) in dataList" :key="index">
      <image class="room-img"
             :src="data.image" alt="11"></image>
      <text>{{ data.name }}</text>
      <view class="desc-view">
        <text class="price-text">
          $ {{ data.price }}
        </text>
        <text class="spec-text">
          {{ data.roomNum }}室·{{ data.personNum }}人
        </text>
        <text class="rate-text">
          <at-rate :max="1"/>
          {{ data.rate }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import './index.css'

defineProps({
  dataList: {
    type: Array,
    default: () => []
  }
})

</script>
