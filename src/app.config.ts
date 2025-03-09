export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/my',
    'pages/collect/collect',
    'pages/message/message',
    'pages/detail/index',
    'pages/search/index',
    'pages/booking/index',
    'pages/order/index',
    'pages/message/chat',
    'pages/house-list/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/collect/collect",
        "text": "收藏"
      },
      {
        "pagePath": "pages/message/message",
        "text": "消息"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的"
      }
    ]
  }
})
