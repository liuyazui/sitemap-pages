# 用户流程与项目结构

## 用户旅程

### 首次访问用户

1. 用户访问主页（index.html）
2. 浏览网站介绍和主要功能概述
3. 通过导航菜单选择感兴趣的文档页面
4. 阅读相关内容，了解Cursor的功能和使用方法
5. 可选择主题切换按钮调整阅读体验

### 寻找特定信息的用户

1. 用户访问主页或任意文档页面
2. 使用导航菜单快速定位到相关页面
3. 通过搜索功能查找特定关键词
4. 在搜索结果中找到并访问相关内容
5. 获取所需信息后，可通过相关链接继续探索

### Cursor用户

1. 通过Cursor内置文档功能访问帮助文档
2. 直接跳转到相关页面获取信息
3. 了解Cursor的功能和使用技巧
4. 应用所学知识到实际工作中

## 数据流程

由于是纯静态网站，主要数据流程包括：

1. 客户端请求HTML、CSS、JavaScript和图片资源
2. 服务器返回请求的静态资源
3. 浏览器渲染页面并执行JavaScript
4. 客户端搜索功能在用户浏览器中执行，无需服务器交互
5. 主题切换等设置可通过localStorage存储在用户浏览器中

## 项目文件结构

```
sitemap-pages/
├── index.html                 # 主页
├── sitemap.xml                # 站点地图
├── css/
│   ├── style.css              # 主样式文件
│   └── prism.css              # 代码高亮样式
├── js/
│   ├── main.js                # 主JS文件
│   ├── search.js              # 搜索功能
│   └── prism.js               # 代码高亮JS
├── images/                    # 图片资源
│   ├── logo.png               # 网站logo
│   ├── cursor-interface.png   # Cursor界面截图
│   └── icons/                 # 图标文件
├── pages/
│   ├── getting-started.html   # 入门指南
│   ├── features.html          # 功能特性
│   ├── shortcuts.html         # 快捷键参考
│   └── faq.html               # 常见问题
└── project_doc/               # 项目文档
    ├── overview.md            # 项目概述
    ├── requirements.md        # 需求与功能
    ├── tech-specs.md          # 技术规格
    ├── user-structure.md      # 用户流程与项目结构
    └── timeline.md            # 项目时间线与进度
```

## 页面组织

- **index.html**: 网站入口，提供概述和主要导航
- **pages/getting-started.html**: Cursor的基本介绍和入门指南
- **pages/features.html**: 详细介绍Cursor的主要功能和特性
- **pages/shortcuts.html**: Cursor常用快捷键列表和使用说明
- **pages/faq.html**: 常见问题解答

每个页面都包含一致的头部（带导航菜单）和底部（带版权信息和相关链接），确保用户体验的一致性和导航的便捷性。 