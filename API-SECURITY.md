# API 安全说明

## 🔐 当前安全状态

### `/api/site-config` 接口

**敏感级别：** 🟢 **低**（公开信息）

**暴露数据：**
- ✅ WhatsApp 号码（公开联系方式）
- ✅ 邮箱地址（公开联系方式）
- ✅ 工作时间（公开信息）
- ✅ 社交媒体账号（公开信息）

**结论：** 这些本来就是网站要公开的联系方式，**无需保护**。

---

## 🛡️ API Key 验证（可选）

### 默认配置：**不验证**（公开访问）

```env
# .env 文件留空或不设置
SITE_CONFIG_API_KEY=
```

**适用场景：**
- 联系方式本来就是公开的
- 前端需要直接调用
- 无需保护

---

### 启用验证：**需要 API Key**

```env
# .env 文件设置密钥
SITE_CONFIG_API_KEY=your-secret-key-123456
```

**前端调用方式：**
```typescript
const response = await fetch('/api/site-config', {
  headers: {
    'X-API-Key': 'your-secret-key-123456'
  }
})
```

**适用场景：**
- 防止 API 被滥用
- 限制访问来源
- 需要审计追踪

---

## 🔧 Vercel 环境变量配置

### 方法 1：Vercel Dashboard（推荐）

1. 进入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择项目 → **Settings** → **Environment Variables**
3. 点击 **Add Environment Variable**
4. 添加：
   - Name: `SITE_CONFIG_API_KEY`
   - Value: （留空=公开，或填写密钥=验证）
5. 选择环境：**Production** / **Preview** / **Development**
6. 点击 **Save**

### 方法 2：Vercel CLI

```bash
# 设置环境变量（留空=公开）
vercel env add SITE_CONFIG_API_KEY

# 或者设置具体值
vercel env add SITE_CONFIG_API_KEY your-secret-key-123456
```

---

## 📊 安全对比

| 配置 | 优点 | 缺点 | 推荐场景 |
|------|------|------|---------|
| **不设置 API Key**（默认） | - 简单<br>- 前端直接调用<br>- 无需管理密钥 | - 任何人都可以调用 | 公开联系方式 ✅ |
| **设置 API Key** | - 防止滥用<br>- 可追踪来源<br>- 可限制访问 | - 前端需要管理密钥<br>- 增加复杂度 | 敏感数据/付费 API |

---

## 🎯 建议

### 对于 `/api/site-config`

**✅ 推荐：不设置 API Key（公开访问）**

**理由：**
1. 数据本来就是公开的（网站页脚、Contact 页面都显示）
2. 没有敏感信息（密码、密钥、用户数据）
3. 没有写操作（只读 GET）
4. 没有付费资源消耗

### 对于其他 API（未来）

**⚠️ 需要 API Key 的场景：**
- 用户数据接口
- 付费服务接口
- 写操作（POST/PUT/DELETE）
- 敏感配置（数据库连接、第三方密钥）

---

## 📝 最佳实践

### 1. 环境变量管理

```bash
# ✅ 不要将 .env 提交到 Git
echo ".env" >> .gitignore

# ✅ 使用 .env.example 提供模板
cp .env.example .env
```

### 2. 前端密钥保护

```typescript
// ❌ 错误：硬编码密钥
const apiKey = 'secret-key-123'

// ✅ 正确：使用环境变量
const apiKey = import.meta.env.VITE_API_KEY
```

### 3. CORS 配置

```typescript
// 当前配置：允许所有来源（开发阶段）
'Access-Control-Allow-Origin': '*'

// 生产环境建议：限制域名
'Access-Control-Allow-Origin': 'https://chinawellnessresidency.com'
```

---

## 🔍 检查清单

- [x] API 不包含敏感数据
- [x] API 只有读操作（GET）
- [x] 环境变量已添加到 .gitignore
- [x] 提供 .env.example 模板
- [ ] 生产环境限制 CORS 来源
- [ ] 添加 API 调用频率限制（可选）

---

_创建时间：2026-03-24_
