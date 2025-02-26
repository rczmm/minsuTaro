<template>
  <view class="index-page-container">
    <!-- 标题栏 -->
    <view class="header">
      <text class="title ">小猪民宿</text>
    </view>

    <view class="card">

      <!-- 当前位置 -->
      <view class="location">
        <picker mode="region" @change="onChange">
          <view class="picker linear-gradient-title">
            所在城市:{{ selectorChecked }}
          </view>
        </picker>
      </view>

      <!-- 日期选择 -->
      <view class="date-picker">

        <view @tap="showDate = true">
          {{ startDate }}- {{ night }}晚- {{ endDate }}
        </view>

        <AtFloatLayout :is-opened="showDate" @close="showDate = false" class="date-float-layout">
          <view class="float-layout-content">
            <at-calendar :min-date="nowDate" isMultiSelect isVertical :current-date="selectDate"
              :onSelectDate="onSelectDate">
            </at-calendar>

            <at-button :disabled="disableButton" @click="sureDate" class="confirm-btn">确定</at-button>
          </view>
        </AtFloatLayout>

        <view @tap="showFloatLayout" class="select-btn">
          {{ personNum }}/{{ bedNum }}
        </view>

        <AtFloatLayout :is-opened="show" @close="handleClose" class="person-float-layout">
          <view class="float-layout-content">
            <view class="select-section">
              <text class="select-title">宜居人数</text>
              <view class="tag-group">
                <at-tag :active="item + '人' == personNum" v-for="item in [1, 2, 3, 4, 5, 6]"
                  @click="onClickTag(item, 0)" class="select-tag">
                  {{ item }}人
                </at-tag>
              </view>
            </view>

            <view class="select-section">
              <text class="select-title">床铺数量</text>
              <view class="tag-group">
                <at-tag :active="item + '床' == bedNum" v-for="item in [1, 2, 3, 4, 5, 6]" @click="onClickTag(item, 1)"
                  class="select-tag">{{ item }}床
                </at-tag>
              </view>
            </view>
          </view>

          <view class="button-group">
            <at-button @click="removeSelect" class="clear-btn">清空</at-button>
            <at-button @click="handleClose" class="confirm-btn">确定</at-button>
          </view>
        </AtFloatLayout>

      </view>

      <AtSearchBar :value="value1" @change="onChange.bind(this, 'value1')" @action-click="onActionClick" />

      <!-- 搜索关键词 -->
      <view class="tag-list">
        <at-tag class="tag-item" type="primary" size="small">远洋大古里</at-tag>
        <at-tag class="tag-item" type="primary" size="small">宽窄巷子</at-tag>
        <at-tag class="tag-item" type="primary" size="small">天府广场</at-tag>
        <at-tag class="tag-item" type="primary" size="small">成都东站</at-tag>
      </view>
    </view>

    <view class="index-grid-view">
      <view class="grid-item">
        <text class="grid-icon iconfont icon-fangzi" style="font-size: 20px; color: #1890ff;"></text>
        <text class="grid-desc">酒店</text>
      </view>
      <view class="grid-item">
        <text class="grid-icon iconfont icon-fangzi1" style="font-size: 20px; color: #1890ff;"></text>
        <text class="grid-desc">酒店</text>
      </view>
      <view class="grid-item">
        <text class="grid-icon iconfont icon-fangzi2" style="font-size: 20px; color: #1890ff;"></text>
        <text class="grid-desc">酒店</text>
      </view>
      <view class="grid-item">
        <text class="grid-icon iconfont icon-fangzi3" style="font-size: 20px; color: #1890ff;"></text>
        <text class="grid-desc">酒店</text>
      </view>
      <view class="grid-item">
        <text class="grid-icon iconfont icon-fangzi4" style="font-size: 20px; color: #1890ff;"></text>
        <text class="grid-desc">酒店</text>
      </view>
    </view>


    <swiper class='swiper-view' indicatorColor='#999' indicatorActiveColor='#333' current="current" :duration="500"
      :interval="5000" :circular="false" :autoplay="true" :indicatorDots="true">
      <swiper-item v-for="(item, idx) in [
          'https://i2.hdslb.com/bfs/archive/a5f91b15528e443b2cb8a266a632607e82a800be.jpg',
          'https://i0.hdslb.com/bfs/archive/d199fe384aa0c65a5b0c6aefe9173f2f069aa090.jpg',
          'https://i0.hdslb.com/bfs/archive/c7c37a4712240e13cd66ba0c33f0e4a6a9304825.jpg',
          'https://i0.hdslb.com/bfs/archive/ba8505d876ffe3497cbfb8e0f2c335cc9c2b3cd3.jpg',
        ]" :key="idx">
        <image :src="item" class="slide-image" />
      </swiper-item>
    </swiper>

    <at-tabs :current="current" scroll :tabList="tabList" @click="handleClick" class="index-tabs">
      <at-tabs-pane :current="current" :index="0">
        <HouseCard :data-list="houseList"></HouseCard>
      </at-tabs-pane>
      <at-tabs-pane :current="current" :index="1">
        <HouseCard :data-list="houseList"></HouseCard>
      </at-tabs-pane>
      <at-tabs-pane :current="current" :index="2">
        <HouseCard :data-list="houseList"></HouseCard>
      </at-tabs-pane>
      <at-tabs-pane :current="current" :index="3">
        <HouseCard :data-list="houseList"></HouseCard>
      </at-tabs-pane>
    </at-tabs>

    <at-divider class="index-divider">
      <text>最新推荐</text>
    </at-divider>

    <view class="index-famous-list">
      <view v-for="item in items" :key="item.id" class="famous-item">
        <view class="card-recommend">
          <image :src="item.image" @tap="navToDetail(item.id)" class="card-recommend-img" />
          <view class="card-recommend-content">
            <view class="card-recommend-title">
              <text>【成都】远洋大古里</text>
            </view>
          </view>
        </view>
      </view>
    </view>


  </view>
</template>

<script setup lang="ts">

import './index.css';
import { computed, ref } from "vue";
import Taro from "@tarojs/taro";
import HouseCard from "../../components/HouseCard/HouseCard.vue";

const value1 = ref('');

const onActionClick = () => {
  Taro.navigateTo({
    url: '/pages/search/index'
  });
  console.log('action clicked');
};

const houseList = ref([
  {
    id: 1,
    image: 'https://i0.hdslb.com/bfs/archive/5b2776042addc6b14f73e507b874555bfac1fefc.jpg',
    name: 'wenxinxiaojia1',
    price: 399.0,
    personNum: 1,
    roomNum: 1,
    rate: 4.9
  }, {
    id: 2,
    image: 'https://i0.hdslb.com/bfs/archive/20ae10e2927b1f14b6ce3b2e71fb626ac06cb477.jpg',
    name: 'wenxinxiaojia2',
    price: 399.0,
    personNum: 1,
    roomNum: 1,
    rate: 4.9
  }, {
    id: 3,
    image: 'https://i0.hdslb.com/bfs/archive/fa1e0a8cc8d4df6fd4962ae3e151591386272d5f.jpg',
    name: 'wenxinxiaojia2',
    price: 399.0,
    personNum: 1,
    roomNum: 1,
    rate: 4.9
  }, {
    id: 4,
    image: 'https://i0.hdslb.com/bfs/archive/620970d0cbf19fde8246ad19eaa8142867ff573c.jpg',
    name: 'wenxinxiaojia2',
    price: 399.0,
    personNum: 1,
    roomNum: 1,
    rate: 4.9
  }
])

const items = ref([
  {
    id: 1,
    image: 'https://i0.hdslb.com/bfs/archive/2ec1b1bb44c09adb46d309a458fa3bdf371183a4.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 2,
    image: 'https://i0.hdslb.com/bfs/archive/8bcb339ae9c70641dfb28ccc7003a85874f603eb.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 3,
    image: 'https://i0.hdslb.com/bfs/archive/95c4b5a5df40b7222b85feb06852dd5b81fd6455.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 4,
    image: 'https://i0.hdslb.com/bfs/archive/0c94f350447e486d7b7e77633dada50cbf7a24cc.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 5,
    image: 'https://i0.hdslb.com/bfs/archive/2c271b7d158edf3de749455b71c36915c73b4720.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 6,
    image: 'https://i0.hdslb.com/bfs/archive/1c5d7e4e9a99d61ce68015fb47bf0b9e44d04f57.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 7,
    image: 'https://i2.hdslb.com/bfs/archive/79fb09903ec292df2d3de59408d1539d6b27d24e.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 4,
    image: 'https://i0.hdslb.com/bfs/archive/8e92fe5360ac24228784e5921886710fa9e863aa.jpg',
    title: '领取中心',
    price: 399.0
  }, {
    id: 4,
    image: 'https://i0.hdslb.com/bfs/archive/eb21daf78c282a8df67adb2b48833eff84532a45.jpg',
    title: '领取中心',
    price: 399.0
  }
])

const navToDetail = (id: number) => {
  console.log(id);
  Taro.navigateTo({
    url: `/pages/detail/index?id=${id}`
  })
}

const selectorChecked = ref('成都市');

const current = ref(0);

const handleClick = (value: number) => {
  current.value = value;
};

const tabList = ref([
  { title: '高空城景' },
  { title: '庭院露台' },
  { title: '山水美宿' },
  { title: '异域风情' }
]);

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};

const formatDateStr = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

// 当前日期
const startDate = ref(formatDate(new Date()));
// 当前日期加一天
const endDate = ref(formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)));


const selectDate = ref({
  start: new Date().toLocaleDateString(),
  end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString(),
});

const onSelectDate = (e: any) => {
  selectDate.value = e.value;
  console.log(e.value);
  console.log(selectDate.value);

};

const sureDate = () => {
  showDate.value = false;
  startDate.value = formatDateStr(selectDate.value.start);
  endDate.value = formatDateStr(selectDate.value.end);
  night.value = Math.ceil((new Date(selectDate.value.end).getTime() - new Date(selectDate.value.start).getTime()) / (24 * 60 * 60 * 1000));
}

const disableButton = computed(() => {
  return !selectDate.value.start || !selectDate.value.end;
});

const show = ref(false);

const showDate = ref(false);

const nowDate = new Date().toLocaleDateString();

const personNum = ref("人数");

const bedNum = ref("床数");

const showFloatLayout = () => {
  show.value = true;
  console.log(show.value);
}

const handleClose = () => {
  show.value = false;
}

const onClickTag = (index: number, type: number) => {
  if (type == 0) {
    personNum.value = `${index}人`;
  } else if (type == 1) {
    bedNum.value = `${index}床`;
  }
}

const night = ref(1);

const onChange = (e: any) => {
  console.log(e.detail.value);
  selectorChecked.value = e.detail.value[2];
}

const removeSelect = () => {
  personNum.value = "人数";
  bedNum.value = "床数";
}

</script>
