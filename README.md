# China Wellness Residency Benefits Network

中国全球健康驻留权益网络官方网站

## 🛠️ 技术栈

- **Frontend**: Vue 3 + TypeScript + Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Custom CSS (Six Senses inspired)
- **Backend**: MySQL 8.0+
- **Language**: 中英文双语

## 📁 项目结构

```
china-wellness-residency/
├── database/
│   └── schema.sql              # 数据库表结构
├── src/
│   ├── assets/
│   │   ├── images/             # 图片资源（需添加）
│   │   └── main.css            # 全局样式
│   ├── components/
│   │   ├── Header.vue          # 头部导航（隐藏式菜单）
│   │   └── Footer.vue          # 页脚
│   ├── router/
│   │   └── index.ts            # 路由配置
│   ├── views/
│   │   ├── Home.vue            # 首页
│   │   ├── Philosophy.vue      # 生命哲学
│   │   ├── Benefits.vue        # 驻留权益
│   │   ├── Membership.vue      # 会员计划
│   │   ├── Destinations.vue    # 康养资源
│   │   ├── Contact.vue         # 预约咨询
│   │   └── About.vue           # 关于我们
│   ├── App.vue
│   └── main.ts
├── IMAGES_REQUIREMENTS.md      # 图片需求清单
└── README.md
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🗄️ 数据库设置

### 1. 创建数据库

```sql
CREATE DATABASE wellness_residency CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 导入表结构

```bash
mysql -u root -p wellness_residency < database/schema.sql
```

### 3. 验证表结构

```sql
USE wellness_residency;
SHOW TABLES;
```

## 📄 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页 |
| `/philosophy` | Philosophy | 生命哲学 |
| `/benefits` | Benefits | 驻留权益 |
| `/membership` | Membership | 会员计划 |
| `/destinations` | Destinations | 康养资源 |
| `/contact` | Contact | 预约咨询 |
| `/about` | About | 关于我们 |

## 🎨 设计规范

### 颜色

- **Primary**: `#1a4a3e` (Deep teal -  wellness)
- **Secondary**: `#c9a962` (Gold - luxury)
- **Accent**: `#7d9f8f` (Soft sage)
- **Sand**: `#f5f1e8` (Warm sand)
- **Stone**: `#8b8680` (Neutral stone)

### 字体

- **Primary**: Playfair Display (标题)
- **Secondary**: Lato (正文)

### 风格参考

- **设计灵感**: https://www.sixsenses.com
- **特点**: 极简奢华、全屏沉浸、隐藏式导航、优雅动画

## 📸 图片资源

详见 [`IMAGES_REQUIREMENTS.md`](./IMAGES_REQUIREMENTS.md)

所有图片请放置到 `src/assets/images/` 目录。

当前使用占位符显示，添加图片后需替换对应代码。

## 🌐 双语支持

网站支持中英文切换，当前通过 `currentLang` 状态管理。后续可集成 `vue-i18n` 实现更完善的多语言支持。

## 📱 响应式设计

网站已适配移动端、平板和桌面设备：

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 下一步开发

### 待完成功能

- [ ] 用户认证系统（登录/注册）
- [ ] 会员后台 Dashboard
- [ ] 预约表单后端 API 集成
- [ ] 多语言完整支持（vue-i18n）
- [ ] 图片资源添加和优化
- [ ] 视频背景实现
- [ ] SEO 优化
- [ ] 性能优化（图片懒加载、代码分割）

### API 接口规划

- `POST /api/consultations` - 提交预约咨询
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/memberships` - 获取会员计划
- `GET /api/destinations` - 获取康养目的地
- `GET /api/user/entitlements` - 获取用户权益

## 📝 数据库表

- `users` - 用户表
- `membership_entitlements` - 会员权益配置
- `wellness_destinations` - 康养目的地
- `medical_partners` - 合作医疗机构
- `consultations` - 预约咨询
- `health_records` - 健康档案
- `residency_stays` - 驻留记录
- `system_settings` - 系统配置

## 📞 联系方式

- **Email**: concierge@chinawellnessresidency.com
- **Phone**: +86-XXX-XXXX-XXXX

---

© 2026 China Wellness Residency Benefits Network. All rights reserved.
