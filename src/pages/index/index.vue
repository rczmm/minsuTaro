<template>
  <view class="page-container">
    <!-- 标题栏 -->
    <view class="header">
      <text class="title">小猪民宿</text>
    </view>

    <view class="card">

      <!-- 当前位置 -->
      <view class="location">
        <picker mode="region" @change="onChange">
          <view class="picker">
            所在城市:{{ selectorChecked }}
          </view>
        </picker>
      </view>

      <!-- 日期选择 -->
      <view class="date-picker">

        <view @tap="showDate =  true">
          {{ startDate }}- {{ night }}晚- {{ endDate }}
        </view>

        <AtFloatLayout
          :is-opened="showDate"
          @close="showDate = false"
        >
          <at-calendar
            :min-date="nowDate"
            isMultiSelect
            isVertical
            :current-date="selectDate"
            :onSelectDate="onSelectDate"
          >
          </at-calendar>

          <at-button :disabled="disableButton" @click="sureDate">确定</at-button>

        </AtFloatLayout>

        <view @tap="showFloatLayout">
          {{ personNum }}/{{ bedNum }}
        </view>

        <AtFloatLayout
          is-opened
          v-if="show"
          @close="handleClose"
        >
          <view>
            <text>宜居人数</text>
            <at-tag
              :active="item+'人' == personNum"
              v-for="item in [1,2,3,4,5,6]"
              @click="onClickTag(item,0)"
            >
              {{ item }}人
            </at-tag>
            <text>床铺数量</text>
            <at-tag
              :active="item+'床' == bedNum"
              v-for="item in [1,2,3,4,5,6]"
              @click="onClickTag(item,1)"
            >
              {{ item }}床
            </at-tag>
          </view>

          <at-button @click="removeSelect">清空</at-button>
          <at-button @click="handleClose">确定</at-button>

        </AtFloatLayout>

      </view>

      <AtSearchBar
        :value="value1"
        @change="onChange.bind(this, 'value1')"
        @action-click="onActionClick"
      />


      <!-- 搜索关键词 -->
      <view class="tags">
        <at-flex>
          <at-flex-item>
            <at-tag class="tag-item" type="primary" size="small">远洋大古里</at-tag>
          </at-flex-item>
          <at-flex-item>
            <at-tag class="tag-item" type="primary" size="small">宽窄巷子</at-tag>
          </at-flex-item>
          <at-flex-item>
            <at-tag class="tag-item" type="primary" size="small">天府广场</at-tag>
          </at-flex-item>
          <at-flex-item>
            <at-tag class="tag-item" type="primary" size="small">成都东站</at-tag>
          </at-flex-item>
        </at-flex>
      </view>

      <!-- 搜索框 -->
      <at-button class="search-btn" type="primary" plain>搜索民宿</at-button>

    </view>

    <AtGrid :data="[
    {
      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      value: '领取中心'
    },
    {
      image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
      value: '找折扣'
    },
    {
      image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
      value: '领会员'
    },
    {
      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
      value: '新品首发'
    },
    {
      image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
      value: '领京豆'
    }
  ]" :column-num="5"
    />

    <swiper
      class='test-h'
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

    <at-tabs
      :current="current"
      scroll
      :tabList="tabList"
      @click="handleClick">
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

    <at-divider></at-divider>

    <at-flex
      isAuto
      isWrap
      wrap="wrap"
    >
      <at-flex-item v-for="item in items" :key="item.id">
        <view class="card-recommend">
          <image
            :src="item.image"
            @tap="navToDetail(item.id)"
            class="card-recommend-img"/>
          <view class="card-recommend-content">
            <view class="card-recommend-title">
              <text>【成都】远洋大古里</text>
            </view>
          </view>


        </view>
      </at-flex-item>
    </at-flex>


  </view>
</template>

<script setup lang="ts">

import './index.css';
import {computed, ref} from "vue";
import Taro from "@tarojs/taro";
import HouseCard from "../../components/HouseCard/HouseCard.vue";

const houseList = ref([
  {
    id: 1,
    image: 'https://i2.hdslb.com/bfs/archive/a899ef440c277f9f5fe8cee0ef9e4ef4f5c8fddb.jpg@336w_190h_1c_!web-video-rcmd-cover.avif',
    name: 'wenxinxiaojia1',
    price: 399.0,
    personNum: 1,
    roomNum: 1,
    rate: 4.9
  }, {
    id: 2,
    image: 'https://i2.hdslb.com/bfs/archive/60ed6883fd909708bdb805421c4a06638d5dcba5.jpg@336w_190h_1c_!web-video-rcmd-cover.avif',
    name: 'wenxinxiaojia2',
    price: 399.0,
    personNum: 1,
    roomNum: 1,
    rate: 4.9
  }, {
    id: 3,
    image: 'https://i2.hdslb.com/bfs/archive/60ed6883fd909708bdb805421c4a06638d5dcba5.jpg@336w_190h_1c_!web-video-rcmd-cover.avif',
    name: 'wenxinxiaojia2',
    price: 399.0,
    personNum: 1,
    roomNum: 1,
    rate: 4.9
  }, {
    id: 4,
    image: 'https://i2.hdslb.com/bfs/archive/60ed6883fd909708bdb805421c4a06638d5dcba5.jpg@336w_190h_1c_!web-video-rcmd-cover.avif',
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
    image: 'https://i0.hdslb.com/bfs/archive/23b854b245e72e64123e59ee616fbc251b8bd948.jpg@672w_378h_1c_!web-home-common-cover.avif',
    title: '领取中心',
    price: 399.0
  }, {
    id: 2,
    image: 'https://i0.hdslb.com/bfs/archive/23b854b245e72e64123e59ee616fbc251b8bd948.jpg@672w_378h_1c_!web-home-common-cover.avif',
    title: '领取中心',
    price: 399.0
  }, {
    id: 3,
    image: 'https://i0.hdslb.com/bfs/archive/23b854b245e72e64123e59ee616fbc251b8bd948.jpg@672w_378h_1c_!web-home-common-cover.avif',
    title: '领取中心',
    price: 399.0
  }, {
    id: 4,
    image: 'https://i0.hdslb.com/bfs/archive/23b854b245e72e64123e59ee616fbc251b8bd948.jpg@672w_378h_1c_!web-home-common-cover.avif',
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
  {title: '标签页一'},
  {title: '标签页二'},
  {title: '标签页三'},
  {title: '标签页四'}
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

