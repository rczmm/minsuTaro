# 民宿预订小程序

基于 Taro + Vue3 开发的跨平台民宿预订小程序，支持微信小程序等多端平台。

## 技术栈

- Taro 3.x
- Vue 3.x
- TypeScript
- Vite

## 功能特性

- 民宿列表展示和搜索
- 民宿详情页面
- 收藏功能
- 消息中心
- 个人中心

## 项目结构

```
├── config                 # 项目配置文件
├── src                    # 源代码
│   ├── assert            # 静态资源
│   ├── components        # 公共组件
│   ├── pages             # 页面组件
│   └── static            # 静态文件
├── types                 # TypeScript 类型定义
└── package.json          # 项目依赖
```

## 开发环境

```bash
# 安装依赖
yarn install

# 开发模式运行
yarn dev:weapp

# 打包
yarn build:weapp
```

## 环境配置

在 `.env.development` 和 `.env.production` 文件中配置对应环境的小程序 AppID。

## 代码规范

项目使用 ESLint + EditorConfig 进行代码规范控制，确保代码风格统一。

## 注意事项

1. 开发前请确保已安装微信开发者工具
2. 首次运行需要在微信开发者工具中填入正确的 AppID
3. 建议使用 yarn 作为包管理工具