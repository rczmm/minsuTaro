<template>

  <view class="my-view">

    <at-button type="primary" size="normal" @click="console.log('点击了按钮！')">
      一键登录
    </at-button>

    <view class="order-list">
      <text class="order-title">我的订单</text>
      <text class="order-desc">全部订单></text>
      <at-grid :column-num="4" :data="[
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
      }
    ]" />

      <view class="special-order">
        <text class="special-title">美宿套餐订单</text>
        <text class="sign">></text>
      </view>

      <at-grid :column-num="4" :data="[
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '免押入住'
      }, {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '学生特权'
      }, {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '常用入住人'
      }, {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '特权卡卷'
      }, {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '问题咨询'
      }, {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '意见反馈'
      },
    ]" />

      <at-button>我要当房东赚钱</at-button>


    </view>
  </view>

</template>
<style>
.my-view {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.order-list {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
}

.order-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.order-desc {
  font-size: 14px;
  color: #999;
  float: right;
}

.special-order {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #eee;
  margin-top: 16px;
}

.special-title {
  font-size: 16px;
  color: #333;
}

.sign {
  color: #999;
}
</style>


<script setup lang="ts">
import './my.css';
</script>
