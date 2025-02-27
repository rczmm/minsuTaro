import Taro from '@tarojs/taro';
import { ref } from 'vue';

// 用户信息接口定义
interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  token: string;
}

// 初始化用户信息
const userInfo = ref<UserInfo | null>(null);
const isLogin = ref(false);

// 从本地存储加载用户信息
const loadUserInfo = () => {
  try {
    const storedUserInfo = Taro.getStorageSync('userInfo');
    if (storedUserInfo) {
      userInfo.value = JSON.parse(storedUserInfo);
      isLogin.value = true;
    }
  } catch (error) {
    console.error('加载用户信息失败:', error);
  }
};

// 保存用户信息到本地存储
const saveUserInfo = (info: UserInfo) => {
  try {
    userInfo.value = info;
    isLogin.value = true;
    Taro.setStorageSync('userInfo', JSON.stringify(info));
  } catch (error) {
    console.error('保存用户信息失败:', error);
  }
};

// 清除用户信息
const clearUserInfo = () => {
  try {
    userInfo.value = null;
    isLogin.value = false;
    Taro.removeStorageSync('userInfo');
  } catch (error) {
    console.error('清除用户信息失败:', error);
  }
};

// 初始化时加载用户信息
loadUserInfo();

export {
  userInfo,
  isLogin,
  saveUserInfo,
  clearUserInfo,
};