<template>
  <view class="search-page">
    <!-- 搜索栏 -->
    <view class="search-header">
      <at-search-bar
        :value="searchKeyword"
        :focus="true"
        placeholder="搜索房源"
        @change="handleSearchChange"
        @action-click="handleSearch"
      />
    </view>

    <!-- 搜索历史 -->
    <view class="search-history" v-if="!searchKeyword && searchHistory.length > 0">
      <view class="history-header">
        <text class="history-title">搜索历史</text>
        <text class="clear-history" @tap="clearHistory">清除</text>
      </view>
      <view class="history-list">
        <view
          class="history-item"
          v-for="(item, index) in searchHistory"
          :key="index"
          @tap="onHistoryItemClick(item)"
        >
          <text class="history-text">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view class="search-results" v-if="searchKeyword">
      <view class="result-count" v-if="searchResults.length > 0">
        找到 {{ searchResults.length }} 个相关房源
      </view>
      <view class="no-results" v-else-if="hasSearched">
        <text>暂无相关房源</text>
      </view>
      <view class="result-list">
        <view
          class="result-item"
          v-for="(item, index) in searchResults"
          :key="index"
          @tap="navigateToDetail(item.id)"
        >
          <image class="result-image" :src="item.image" mode="aspectFill" />
          <view class="result-info">
            <text class="result-title">{{ item.title }}</text>
            <view class="result-tags">
              <text class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">{{ tag }}</text>
            </view>
            <text class="result-price">¥{{ item.price }}/晚</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 搜索关键词
const searchKeyword = ref('');
// 搜索历史
const searchHistory = ref<string[]>([]);
// 搜索结果
const searchResults = ref<any[]>([]);
// 是否已经搜索过
const hasSearched = ref(false);

// 模拟的房源数据
const mockHouses = [
  {
    id: 1,
    title: '温馨海景大床房',
    image: 'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
    tags: ['海景', '大床', '独立卫浴'],
    price: 288
  },
  {
    id: 2,
    title: '豪华双床套房',
    image: 'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
    tags: ['双床', '套房', '市中心'],
    price: 366
  },
];

// 处理搜索框输入变化
const handleSearchChange = (value: string) => {
  searchKeyword.value = value;
};

// 执行搜索
const handleSearch = () => {
  if (!searchKeyword.value.trim()) return;
  
  // 添加到搜索历史
  if (!searchHistory.value.includes(searchKeyword.value)) {
    searchHistory.value.unshift(searchKeyword.value);
    // 最多保存10条历史记录
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop();
    }
    // 保存到本地存储
    Taro.setStorageSync('searchHistory', searchHistory.value);
  }

  // 模拟搜索结果
  searchResults.value = mockHouses.filter(house =>
    house.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    house.tags.some(tag => tag.toLowerCase().includes(searchKeyword.value.toLowerCase()))
  );
  hasSearched.value = true;
};

// 点击历史记录项
const onHistoryItemClick = (keyword: string) => {
  searchKeyword.value = keyword;
  handleSearch();
};

// 清除搜索历史
const clearHistory = () => {
  searchHistory.value = [];
  Taro.removeStorageSync('searchHistory');
};

// 跳转到详情页
const navigateToDetail = (id: number) => {
  Taro.navigateTo({
    url: `/pages/detail/index?id=${id}`
  });
};

// 组件挂载时从本地存储获取搜索历史
onMounted(() => {
  const history = Taro.getStorageSync('searchHistory');
  if (history) {
    searchHistory.value = history;
  }
});
</script>

<style>
.search-page {
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

.search-history {
  background-color: #fff;
  margin-top: 8px;
  padding: 16px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.history-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.clear-history {
  color: #999;
  font-size: 14px;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-item {
  background-color: #f5f5f5;
  padding: 6px 12px;
  border-radius: 16px;
}

.history-text {
  font-size: 14px;
  color: #666;
}

.search-results {
  padding: 16px;
}

.result-count {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.no-results {
  text-align: center;
  padding: 32px 0;
  color: #999;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.result-info {
  padding: 12px;
}

.result-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.result-tags {
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

.result-price {
  color: #ff4d4f;
  font-size: 18px;
  font-weight: bold;
}
</style>