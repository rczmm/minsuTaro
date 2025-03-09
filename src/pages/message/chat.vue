<template>
  <view class="chat-page">
    <!-- 顶部房东信息 -->
    <view class="landlord-info">
      <image class="landlord-avatar" src="https://example.com/avatar1.jpg" />
      <view class="landlord-details">
        <text class="landlord-name">房东: 张三</text>
        <text class="response-time">平均响应时间: 5分钟</text>
      </view>
    </view>

    <!-- 聊天内容区域 -->
    <scroll-view class="chat-content" scroll-y scroll-into-view="msg-bottom">
      <view class="message-list">
        <view v-for="(msg, index) in messages" :key="index" 
              :class="['message-item', msg.isLandlord ? 'landlord' : 'user']">
          <image class="avatar" :src="msg.avatar" />
          <view class="message-bubble">
            <text>{{ msg.content }}</text>
          </view>
        </view>
        <view id="msg-bottom" style="height: 10px;"></view>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="input-area">
      <input class="message-input" v-model="newMessage" placeholder="请输入消息..." confirm-type="send" @confirm="sendMessage" />
      <at-button type="primary" size="small" class="send-btn" @click="sendMessage">发送</at-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';

// 获取路由参数
const router = Taro.getCurrentInstance().router;
const houseId = ref(router?.params?.houseId || '1');
const houseTitle = ref(decodeURIComponent(router?.params?.houseTitle || '全海景高品质大床房（马赛）'));

// 消息列表
const messages = ref([
  {
    id: 1,
    content: '您好，我是这套房源的房东，有什么可以帮您的吗？',
    isLandlord: true,
    avatar: 'https://example.com/avatar1.jpg',
    time: '10:00'
  },
  {
    id: 2,
    content: '您好，我想咨询一下这套房源的入住时间和退房时间',
    isLandlord: false,
    avatar: 'https://example.com/avatar2.jpg',
    time: '10:05'
  },
  {
    id: 3,
    content: '入住时间是下午2点后，退房时间是中午12点前。如果您有特殊需求，可以提前告诉我们，我们会尽量安排。',
    isLandlord: true,
    avatar: 'https://example.com/avatar1.jpg',
    time: '10:07'
  }
]);

// 新消息输入
const newMessage = ref('');

// 发送消息
const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  // 添加用户消息
  messages.value.push({
    id: messages.value.length + 1,
    content: newMessage.value,
    isLandlord: false,
    avatar: 'https://example.com/avatar2.jpg',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  });
  
  // 清空输入框
  newMessage.value = '';
  
  // 模拟房东回复
  setTimeout(() => {
    messages.value.push({
      id: messages.value.length + 1,
      content: '好的，我已收到您的消息，有任何问题随时联系我。',
      isLandlord: true,
      avatar: 'https://example.com/avatar1.jpg',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    });
  }, 1000);
};

onMounted(() => {
  // 设置导航栏标题
  Taro.setNavigationBarTitle({
    title: `与房东的聊天`
  });
});
</script>

<style>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.landlord-info {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.landlord-avatar {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
}

.landlord-details {
  display: flex;
  flex-direction: column;
}

.landlord-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.response-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.chat-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.message-list {
  display: flex;
  flex-direction: column;
}

.message-item {
  display: flex;
  margin-bottom: 16px;
  max-width: 80%;
}

.message-item.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-item.landlord {
  align-self: flex-start;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 0 8px;
}

.message-bubble {
  padding: 12px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-item.user .message-bubble {
  background-color: #007AFF;
  color: #fff;
}

.input-area {
  display: flex;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.message-input {
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border-radius: 20px;
  background-color: #f0f0f0;
  margin-right: 8px;
}

.send-btn {
  width: 80px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>