# 🎨 全球驻留权益网站设计优化方案

## 📋 项目信息

**项目名称**：中国全球健康驻留权益网络官方网站  
**技术栈**：Vue 3 + TypeScript + Vite  
**设计风格**：参考 Six Senses (https://www.sixsenses.com/zh/)  
**开发者**：Sophie (索菲)  
**开始时间**：2026-03-14  

---

## 🎯 设计目标

### 1. 风格定位

**Six Senses 设计特点**：
- ✅ 极简奢华风格
- ✅ 全屏沉浸式体验
- ✅ 隐藏式菜单导航
- ✅ 优雅平滑动画
- ✅ 自然色调（绿、金、米色）
- ✅ 高质量摄影图片
- ✅ 精致的排版设计

**避免**：
- ❌ emoji 图标
- ❌ 简单 SVG 图标
- ❌ AI 生成的廉价感
- ❌ 过于复杂的布局

---

### 2. 颜色方案

**Six Senses 风格配色**：

```css
:root {
  /* 主色调 - 自然绿 */
  --primary: #1a4a3e;      /* Deep teal -  wellness */
  --primary-light: #2d6a5a;
  --primary-dark: #0f2e26;
  
  /* 辅助色 - 奢华金 */
  --secondary: #c9a962;    /* Gold - luxury */
  --secondary-light: #d4b978;
  --secondary-dark: #b8954a;
  
  /* 强调色 - 柔和鼠尾草 */
  --accent: #7d9f8f;       /* Soft sage */
  --accent-light: #94b0a2;
  --accent-dark: #668576;
  
  /* 中性色 - 温暖沙色 */
  --sand: #f5f1e8;         /* Warm sand - 背景 */
  --sand-light: #f9f7f2;
  --sand-dark: #e8e0d0;
  
  /* 石材色 - 中性灰 */
  --stone: #8b8680;        /* Neutral stone - 文字 */
  --stone-light: #a39f9a;
  --stone-dark: #6b6863;
  
  /* 纯黑纯白 */
  --black: #1a1a1a;
  --white: #ffffff;
}
```

---

### 3. 字体方案

**推荐字体组合**：

```css
/* 标题字体 - 优雅衬线体 */
font-family: 'Playfair Display', 'Noto Serif SC', serif;

/* 正文字体 - 现代无衬线体 */
font-family: 'Lato', 'Noto Sans SC', sans-serif;

/* 代码字体 */
font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
```

**字体大小层级**：

```css
/* 桌面端 */
h1 { font-size: 3.5rem; line-height: 1.2; }  /* 56px */
h2 { font-size: 2.5rem; line-height: 1.3; }  /* 40px */
h3 { font-size: 1.75rem; line-height: 1.4; } /* 28px */
h4 { font-size: 1.25rem; line-height: 1.5; } /* 20px */
p  { font-size: 1rem; line-height: 1.7; }    /* 16px */
small { font-size: 0.875rem; }               /* 14px */
```

---

### 4. 图片使用规范

**图片类型**：

| 位置 | 类型 | 尺寸 | 说明 |
|------|------|------|------|
| **首页 Banner** | 全屏背景图 | 1920x1080 | 高质量摄影，自然风景 |
| **服务展示** | 卡片图片 | 800x600 | 机构实拍，专业摄影 |
| **图标替代** | 精致图标 | 64x64 | 使用专业图标库 |
| **背景纹理** | 抽象图案 | 1920x1080 | 低透明度，增加质感 |

**图片来源建议**：
- Unsplash (免费高质量)
- Pexels (免费高质量)
- Adobe Stock (付费，更专业)
- 机构提供的实拍照片

**禁止**：
- ❌ 卡通风格图片
- ❌ 低分辨率图片
- ❌ 有明显水印的图片
- ❌ AI 生成的不真实图片

---

### 5. 动画效果

**Six Senses 风格动画**：

```css
/* 平滑淡入 */
.fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 视差滚动 */
.parallax {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

/* 悬停效果 - 优雅放大 */
.hover-elegant {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-elegant:hover {
  transform: scale(1.02);
}

/* 导航菜单 - 平滑展开 */
.menu-expand {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**动画原则**：
- ✅ 缓慢优雅（0.3-0.8 秒）
- ✅ 使用缓动函数（cubic-bezier）
- ✅ 避免夸张效果
- ✅ 保持一致性

---

## 📱 响应式设计

### 断点设置

```css
/* 移动端 */
@media (max-width: 768px) {
  /* 字体缩小 */
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  
  /* 布局调整 */
  .grid { grid-template-columns: 1fr; }
  
  /* 导航折叠 */
  .nav-menu { display: none; }
  .mobile-menu { display: block; }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 🎯 页面优化清单

### 1. 首页 (Home.vue)

**优化项**：
- [ ] 全屏 Banner 替换为高质量图片
- [ ] 导航菜单改为隐藏式（汉堡菜单）
- [ ] 添加平滑滚动动画
- [ ] 优化字体层级
- [ ] 统一颜色方案

**文案**：✅ 保护不变

---

### 2. 驻留权益 (Benefits.vue)

**优化项**：
- [ ] 使用图标代替 emoji
- [ ] 优化卡片布局
- [ ] 添加悬停效果
- [ ] 统一配色

**文案**：✅ 保护不变

---

### 3. 会员计划 (Membership.vue)

**优化项**：
- [ ] 优化价格卡片设计
- [ ] 使用专业图标
- [ ] 添加对比表格
- [ ] 优化按钮样式

**文案**：✅ 保护不变

---

### 4. 合作伙伴 (Partners.vue / About.vue)

**优化项**：
- [ ] 优化 Logo 展示
- [ ] 使用网格布局
- [ ] 添加机构分类
- [ ] 优化图片质量

**文案**：✅ 保护不变

---

### 5. 预约咨询 (Contact.vue)

**优化项**：
- [ ] 优化表单设计
- [ ] 添加服务分类选择
- [ ] 优化提交按钮
- [ ] 添加成功提示动画

**功能**：
- 服务提供者入口
- 国际客户入口
- 四大类服务选择

---

## 🚀 开发步骤

### 阶段 1：基础样式优化（今天）

1. **创建全局样式文件**
   ```bash
   src/assets/styles/six-senses-theme.css
   ```

2. **定义颜色变量**
   ```bash
   src/assets/styles/variables.css
   ```

3. **替换字体**
   ```bash
   更新 index.html 和 main.css
   ```

4. **优化导航组件**
   ```bash
   修改 Header.vue
   ```

---

### 阶段 2：页面优化（明天）

1. **首页优化**
   - 替换 Banner 图片
   - 优化动画效果

2. **驻留权益页面**
   - 替换图标
   - 优化卡片

3. **会员计划页面**
   - 优化价格卡片
   - 统一样式

4. **合作伙伴页面**
   - 优化 Logo 展示
   - 添加分类

---

### 阶段 3：功能完善（后天）

1. **预约咨询表单**
   - 添加服务分类
   - 优化用户体验

2. **响应式测试**
   - 手机端测试
   - 平板端测试
   - 桌面端测试

3. **性能优化**
   - 图片懒加载
   - 代码分割
   - 缓存优化

---

## 📊 验收标准

### 设计验收

- [ ] 风格接近 Six Senses
- [ ] 无 emoji 图标
- [ ] 颜色统一协调
- [ ] 动画流畅优雅
- [ ] 字体层级清晰

### 功能验收

- [ ] 响应式正常
- [ ] 表单可提交
- [ ] 导航正常
- [ ] 无控制台错误

### 性能验收

- [ ] 首屏加载 < 3 秒
- [ ] 图片懒加载
- [ ] 无内存泄漏
- [ ] Lighthouse 评分 > 90

---

## 🎩 Sophie 的承诺

**先生，我保证**：

1. ✅ **设计风格** - 严格参考 Six Senses
2. ✅ **去除 AI 感** - 使用专业图片和图标
3. ✅ **文案保护** - 4 个页面文案不变
4. ✅ **响应式** - 手机、平板、电脑都完美
5. ✅ **高质量** - 像专业团队设计的效果

**预计完成时间**：2-3 天

---

**创建时间**: 2026-03-14  
**版本**: v1.0  
**开发者**: Sophie (索菲) 💻
