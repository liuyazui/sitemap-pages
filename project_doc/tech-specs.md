# 技术规格

## 技术栈

### 前端技术

- **HTML5**：使用语义化标签构建文档结构
- **CSS3**：使用现代CSS特性和Flexbox/Grid布局
- **JavaScript (ES6+)**：实现客户端交互功能
- **Prism.js**：代码语法高亮
- **Font Awesome**：图标库

### 开发工具

- **Git/GitHub**：版本控制和项目托管
- **GitHub Pages**：网站部署和托管
- **VS Code/Cursor**：代码编辑器

## 开发方法

采用渐进增强的开发方法，确保基本功能在无JavaScript环境下也能工作，并通过JavaScript增强用户体验。

## 编码标准

### HTML 规范

- 使用HTML5文档类型
- 使用语义化标签（如 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`）
- 确保适当的ARIA属性和无障碍支持
- 使用UTF-8字符编码

### CSS 规范

- 使用CSS变量定义主题颜色和尺寸
- 采用BEM命名约定
- 使用媒体查询实现响应式设计
- 分离布局、组件和主题样式

### JavaScript 规范

- 使用ES6+语法
- 采用模块化结构
- 使用事件委托优化事件处理
- 确保错误处理和降级方案

## 文件结构

```
/
├── index.html              # 主页
├── sitemap.xml             # 站点地图
├── css/
│   ├── style.css           # 主样式文件
│   └── prism.css           # 代码高亮样式
├── js/
│   ├── main.js             # 主JS文件
│   └── prism.js            # 代码高亮JS
├── images/                 # 图片资源
└── pages/
    ├── getting-started.html # 入门指南
    ├── features.html        # 功能特性
    ├── shortcuts.html       # 快捷键参考
    └── faq.html             # 常见问题
```

## sitemap.xml 规范

遵循 [sitemaps.org](https://www.sitemaps.org/protocol.html) 的协议规范：

- 包含XML声明和命名空间
- 每个URL必须包含 `<loc>` 元素
- 可选包含 `<lastmod>`, `<changefreq>`, `<priority>` 元素
- 使用UTF-8编码
- 文件大小不超过50MB，URL数量不超过50,000个 