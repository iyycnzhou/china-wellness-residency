# 网站配置 API 使用指南

## 📍 API 端点

```
GET /api/site-config
```

---

## 📤 请求示例

```bash
curl https://your-domain.com/api/site-config
```

---

## 📥 响应示例

```json
{
  "success": true,
  "data": {
    "contact": {
      "whatsapp": "+86-138-0000-8888",
      "email": "contact@chinawellnessresidency.com",
      "emailSupport": "support@chinawellnessresidency.com"
    },
    "workHours": {
      "cn": "周一至周日 9:00-18:00 (北京时间)",
      "en": "Mon-Sun 9:00-18:00 (Beijing Time)"
    },
    "responseTime": {
      "cn": "24 小时内回复",
      "en": "Reply within 24 hours"
    },
    "social": {
      "wechat": "ChinaWellnessResidency",
      "instagram": "@chinawellnessresidency",
      "facebook": "ChinaWellnessResidency"
    },
    "version": "1.0.0",
    "lastUpdated": "2026-03-24"
  },
  "timestamp": "2026-03-24T13:00:00.000Z"
}
```

---

## 💻 前端使用方式

### 方式 1：Vue 组件中使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSiteConfig, getWhatsappLink, getEmailLink } from '@/api/siteConfig'

const siteConfig = ref<any>(null)

onMounted(async () => {
  siteConfig.value = await getSiteConfig()
})
</script>

<template>
  <div v-if="siteConfig">
    <!-- WhatsApp -->
    <a :href="getWhatsappLink()" target="_blank">
      {{ siteConfig.contact.whatsapp }}
    </a>
    
    <!-- 邮箱 -->
    <a :href="getEmailLink()">
      {{ siteConfig.contact.email }}
    </a>
    
    <!-- 工作时间 -->
    <p>{{ siteConfig.workHours.cn }}</p>
  </div>
</template>
```

### 方式 2：组合式 API

```typescript
import { getSiteConfig } from '@/api/siteConfig'

// 获取完整配置
const config = await getSiteConfig()
console.log(config.contact.whatsapp)
console.log(config.contact.email)

// 获取单项
const whatsapp = await getWhatsappNumber()
const email = await getContactEmail()
```

---

## 🔧 修改联系方式

### 方法 1：修改 API 文件（推荐）

编辑 `api/site-config.ts`：

```typescript
const siteConfig = {
  contact: {
    whatsapp: '+86-138-XXXX-XXXX',  // 改为实际号码
    email: 'your@email.com',        // 改为实际邮箱
  },
  // ...
}
```

### 方法 2：后台管理（待实现）

未来可以添加后台管理界面，动态修改配置。

---

## 📦 文件结构

```
china-wellness-residency/
├── api/
│   └── site-config.ts          # Vercel Serverless API
├── src/
│   ├── api/
│   │   └── siteConfig.ts       # 前端调用函数
│   └── config/
│       └── contact.ts          # 本地备用配置
├── API-SITE-CONFIG.md          # 本文档
└── CONTACT-CONFIG.md           # 联系方式配置指南
```

---

## 🛡️ 容错机制

API 调用失败时，会自动降级到本地配置（`src/config/contact.ts`），确保网站始终能显示联系方式。

```typescript
try {
  // 尝试从 API 获取
  const config = await getSiteConfig()
} catch (error) {
  // API 失败时使用本地配置
  console.warn('Using local config')
}
```

---

## 📝 待办事项

- [ ] 在 TheFooter.vue 中使用新 API
- [ ] 在 Contact.vue 中使用新 API
- [ ] 在 About.vue 中使用新 API
- [ ] 添加后台管理界面（可选）

---

_创建时间：2026-03-24_
