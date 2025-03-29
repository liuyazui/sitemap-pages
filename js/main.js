/**
 * Cursor文档网站主JavaScript文件
 * 版本：1.0.0
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 初始化主题
  initTheme();
  
  // 初始化导航
  initNavigation();
  
  // 初始化搜索
  initSearch();
  
  // 初始化代码高亮
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
});

/**
 * 初始化主题设置
 */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // 从localStorage获取主题设置，如果没有则使用系统偏好
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // 应用主题
  applyTheme(currentTheme);
  
  // 主题切换监听器
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
  
  // 监听系统主题变化
  prefersDarkScheme.addEventListener('change', function(e) {
    // 如果用户没有明确设置主题，则跟随系统
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    }
  });
}

/**
 * 应用指定主题
 * @param {string} theme - 主题名称 ('light' 或 'dark')
 */
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  
  // 更新主题切换按钮图标
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
    
    // 更新按钮提示文本
    const tooltip = themeToggle.querySelector('.tooltip-text');
    if (tooltip) {
      tooltip.textContent = theme === 'dark' 
        ? '切换到亮色主题' 
        : '切换到暗色主题';
    }
  }
}

/**
 * 初始化导航功能
 */
function initNavigation() {
  // 设置当前页面的导航项为激活状态
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-links a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath) || 
        (linkPath === 'index.html' && currentPath.endsWith('/'))) {
      link.classList.add('active');
    }
  });
  
  // 移动端菜单切换
  const menuToggle = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('.navbar-links');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
    
    // 点击链接后关闭菜单
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
  
  // 点击页面其他位置关闭菜单
  document.addEventListener('click', function(event) {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 初始化搜索功能
 */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  
  if (!searchInput || !searchResults) return;
  
  // 搜索数据 - 在实际项目中，这可以是从服务器加载或预编译的数据
  let searchData = [];
  
  // 简单示例：从当前页面的标题获取搜索数据
  document.querySelectorAll('h1, h2, h3').forEach(heading => {
    if (heading.id) {
      searchData.push({
        title: heading.textContent,
        url: `#${heading.id}`,
        content: heading.nextElementSibling ? heading.nextElementSibling.textContent : ''
      });
    }
  });
  
  // 在实际项目中，可以从外部JSON文件加载搜索数据
  // fetch('search-data.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     searchData = data;
  //   });
  
  // 搜索输入监听
  searchInput.addEventListener('input', debounce(function(e) {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      searchResults.innerHTML = '';
      searchResults.classList.remove('show');
      return;
    }
    
    // 执行搜索
    const results = searchData.filter(item => {
      return item.title.toLowerCase().includes(query) || 
             item.content.toLowerCase().includes(query);
    }).slice(0, 10); // 限制结果数量
    
    // 显示结果
    if (results.length > 0) {
      searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" data-url="${result.url}">
          <div>${highlight(result.title, query)}</div>
          <div class="search-result-content">${highlight(truncate(result.content, 100), query)}</div>
        </div>
      `).join('');
      
      searchResults.classList.add('show');
      
      // 为搜索结果添加点击事件
      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', function() {
          window.location.href = this.getAttribute('data-url');
          searchResults.classList.remove('show');
        });
      });
    } else {
      searchResults.innerHTML = '<div class="search-result-item">没有找到匹配结果</div>';
      searchResults.classList.add('show');
    }
  }, 300));
  
  // 点击外部区域关闭搜索结果
  document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
      searchResults.classList.remove('show');
    }
  });
  
  // 按ESC键关闭搜索结果
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      searchResults.classList.remove('show');
    }
  });
}

/**
 * 在文本中高亮显示查询词
 * @param {string} text - 原始文本
 * @param {string} query - 查询词
 * @returns {string} 高亮后的HTML
 */
function highlight(text, query) {
  if (!text) return '';
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * 转义正则表达式特殊字符
 * @param {string} string - 要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 截断文本
 * @param {string} text - 原始文本
 * @param {number} length - 最大长度
 * @returns {string} 截断后的文本
 */
function truncate(text, length) {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖处理后的函数
 */
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * 添加平滑滚动到锚点
 */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // 考虑固定导航栏的高度
          behavior: 'smooth'
        });
        
        // 更新URL但不滚动（因为我们已经手动滚动）
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}); 