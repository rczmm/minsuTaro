<template>
  <view class="house-list-page">
    <!-- 搜索栏 -->
    <view class="search-header">
      <at-search-bar
        :value="searchKeyword"
        placeholder="搜索房源"
        @change="handleSearchChange"
        @action-click="handleSearch"
      />
    </view>

    <!-- 分类标题 -->
    <view class="category-header">
      <text class="category-title">{{ categoryTitle }}</text>
      <text class="result-count">找到 {{ houseList.length }} 个房源</text>
    </view>

    <!-- 筛选条件 -->
    <view class="filter-bar">
      <view class="filter-item" @tap="toggleSortOptions">
        <text>{{ currentSort.label }}</text>
        <text class="arrow-down">▼</text>
      </view>
      <view class="filter-item" @tap="togglePriceFilter">
        <text>价格</text>
        <text class="arrow-down">▼</text>
      </view>
      <view class="filter-item" @tap="toggleMoreFilter">
        <text>更多筛选</text>
        <text class="arrow-down">▼</text>
      </view>
    </view>

    <!-- 排序选项弹出层 -->
    <at-float-layout :isOpened="showSortOptions" @close="showSortOptions = false">
      <view class="option-list">
        <view 
          v-for="(option, index) in sortOptions" 
          :key="index"
          class="option-item"
          :class="{ active: currentSort.value === option.value }"
          @tap="selectSortOption(option)"
        >
          <text>{{ option.label }}</text>
          <text v-if="currentSort.value === option.value" class="check-icon">✓</text>
        </view>
      </view>
    </at-float-layout>

    <!-- 房源列表 -->
    <view class="house-list" v-if="houseList.length > 0">
      <view 
        class="house-item" 
        v-for="(item, index) in houseList" 
        :key="index"
        @tap="navigateToDetail(item.id)"
      >
        <image class="house-image" :src="item.image" mode="aspectFill" />
        <view class="house-info">
          <text class="house-title">{{ item.name }}</text>
          <view class="house-tags">
            <text class="tag">{{ item.type || '整套公寓' }}</text>
            <text class="tag">{{ item.roomNum }}室·{{ item.personNum }}人</text>
          </view>
          <view class="house-bottom">
            <text class="house-price">¥{{ item.price }}/晚</text>
            <text class="house-rate">{{ item.rate }}分</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 无数据提示 -->
    <view class="empty-state" v-else>
      <text>暂无相关房源</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const categoryId = ref(router?.params?.categoryId || '');
const categoryTitle = ref(router?.params?.title || '房源列表');

// 搜索关键词
const searchKeyword = ref('');

// 排序相关
const showSortOptions = ref(false);
const sortOptions = [
  { label: '推荐排序', value: 'recommend' },
  { label: '价格从低到高', value: 'price_asc' },
  { label: '价格从高到低', value: 'price_desc' },
  { label: '评分从高到低', value: 'rate_desc' },
];
const currentSort = ref(sortOptions[0]);

// 筛选相关
const toggleSortOptions = () => {
  showSortOptions.value = true;
};

const togglePriceFilter = () => {
  // 实现价格筛选逻辑
  Taro.showToast({
    title: '价格筛选功能开发中',
    icon: 'none'
  });
};

const toggleMoreFilter = () => {
  // 实现更多筛选逻辑
  Taro.showToast({
    title: '更多筛选功能开发中',
    icon: 'none'
  });
};

const selectSortOption = (option) => {
  currentSort.value = option;
  showSortOptions.value = false;
  sortHouseList();
};

// 房源数据
const houseList = ref([
  {
    id: 1,
    image: 'https://i0.hdslb.com/bfs/archive/5b2776042addc6b14f73e507b874555bfac1fefc.jpg',
    name: '全海景高品质大床房（马赛）',
    type: '整套公寓',
    price: 399.0,
    personNum: 2,
    roomNum: 1,
    rate: 4.9
  },
  {
    id: 2,
    image: 'https://i0.hdslb.com/bfs/archive/20ae10e2927b1f14b6ce3b2e71fb626ac06cb477.jpg',
    name: '市中心豪华套房',
    type: '整套公寓',
    price: 599.0,
    personNum: 4,
    roomNum: 2,
    rate: 4.8
  },
  {
    id: 3,
    image: 'https://i0.hdslb.com/bfs/archive/fa1e0a8cc8d4df6fd4962ae3e151591386272d5f.jpg',
    name: '温馨海景双床房',
    type: '独立房间',
    price: 299.0,
    personNum: 2,
    roomNum: 1,
    rate: 4.7
  },
  {
    id: 4,
    image: 'https://i0.hdslb.com/bfs/archive/620970d0cbf19fde8246ad19eaa8142867ff573c.jpg',
    name: '山景度假别墅',
    type: '整套别墅',
    price: 899.0,
    personNum: 6,
    roomNum: 3,
    rate: 5.0
  }
]);

// 处理搜索框输入变化
const handleSearchChange = (value: string) => {
  searchKeyword.value = value;
};

// 执行搜索
const handleSearch = () => {
  if (!searchKeyword.value.trim()) return;
  
  // 模拟搜索结果
  const filteredList = originalHouseList.value.filter(house =>
    house.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
  
  houseList.value = filteredList;
};

// 保存原始列表用于搜索和筛选
const originalHouseList = ref([...houseList.value]);

// 排序房源列表
const sortHouseList = () => {
  const sortedList = [...houseList.value];
  
  switch (currentSort.value.value) {
    case 'price_asc':
      sortedList.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      sortedList.sort((a, b) => b.price - a.price);
      break;
    case 'rate_desc':
      sortedList.sort((a, b) => b.rate - a.rate);
      break;
    default:
      // 推荐排序，保持原顺序
      break;
  }
  
  houseList.value = sortedList;
};

// 跳转到详情页
const navigateToDetail = (id: number) => {
  Taro.navigateTo({
    url: `/pages/detail/index?id=${id}`
  });
};

// 根据分类ID筛选房源
const filterByCategory = () => {
  // 这里应该根据实际的分类ID进行筛选
  // 目前使用模拟数据，实际项目中应该从API获取数据
  console.log('根据分类筛选:', categoryId.value);
  
  // 模拟不同分类的筛选结果
  if (categoryId.value) {
    // 实际项目中应该调用API获取对应分类的房源
    // 这里仅做演示
  }
};

onMounted(() => {
  // 初始化时根据分类ID筛选房源
  filterByCategory();
});
</script>

<style>
.house-list-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.search-header {
  background-color: #fff;
  padding: 8px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.category-header {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.result-count {
  font-size: 14px;
  color: #666;
}

.filter-bar {
  display: flex;
  background-color: #fff;
  padding: 12px 16px;
  margin-bottom: 8px;
}

.filter-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #333;
}

.arrow-down {
  font-size: 12px;
  color: #999;
}

.option-list {
  padding: 16px;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.option-item.active {
  color: #1890ff;
}

.check-icon {
  color: #1890ff;
}

.house-list {
  padding: 8px;
}

.house-item {
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.house-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.house-info {
  padding: 12px;
}

.house-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.house-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.tag {
  background-color: #f5f5f5;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.house-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.house-price {
  color: #ff4d4f;
  font-size: 18px;
  font-weight: bold;
}

.house-rate {
  background-color: #1890ff;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.empty-state {
  text-align: center;
  padding: 32px 0;
  color: #999;
}
</style>