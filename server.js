/**
 * China Wellness Residency - 主服务器
 * 整合前端静态服务 + API 服务
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 初始化数据库
const { initDB } = require('./api/db');
initDB();

// 导入路由
const authRoutes = require('./api/auth');
const usersRoutes = require('./api/users');
const applicationsRoutes = require('./api/applications');
const membershipsRoutes = require('./api/memberships');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API 密钥验证中间件
const API_KEY = process.env.API_SECRET_KEY || 'medlink-prod-key-2026';
const authenticateRequest = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (req.path.startsWith('/api/') && !req.path.includes('/api/health')) {
    if (!apiKey || apiKey !== API_KEY) {
      return res.status(401).json({ success: false, message: '未授权访问' });
    }
  }
  next();
};

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/memberships', membershipsRoutes);

// 站点配置 API
app.get('/api/site-config', (req, res) => {
  res.json({
    success: true,
    data: {
      contact: {
        whatsapp: '+86-150-1037-2389',
        whatsappLink: 'https://wa.me/8615010372389',
        email: 'iyyzhou13@gmail.com',
        emailSupport: 'support@chinawellnessresidency.com'
      },
      workHours: {
        cn: '周一至周日 9:00-18:00 (北京时间)',
        en: 'Mon-Sun 9:00-18:00 (Beijing Time)'
      },
      responseTime: {
        cn: '24 小时内回复',
        en: 'Reply within 24 hours'
      },
      social: {
        wechat: 'ChinaWellnessResidency',
        instagram: '@chinawellnessresidency',
        facebook: 'ChinaWellnessResidency'
      },
      version: '2.0.0',
      lastUpdated: new Date().toISOString().split('T')[0]
    }
  });
});

// 联系表单 API
app.post('/api/contact', (req, res) => {
  const { name, phone, email, message, preferredDate, serviceType } = req.body;
  
  console.log('联系表单提交:', { name, phone, email, message, preferredDate, serviceType });
  
  // 这里可以添加邮件发送逻辑
  // 或存储到数据库
  
  res.json({
    success: true,
    message: '您的预约申请已提交成功，我们会尽快与您联系！'
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA 回退路由 - 所有非 API 路由返回 index.html
app.get('/{*splat}', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.status(404).json({ success: false, message: 'API 路由不存在' });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  China Wellness Residency API Server       ║
║  端口: ${PORT}                                  ║
║  环境: ${process.env.NODE_ENV || 'development'}                          ║
╚════════════════════════════════════════════╝

API 端点:
  - POST /api/auth/register   用户注册
  - POST /api/auth/login      用户登录
  - GET  /api/auth/profile    获取用户信息
  - GET  /api/users           用户列表
  - GET  /api/applications    预约申请列表
  - POST /api/applications    提交预约申请
  - GET  /api/memberships     会员列表
  - POST /api/memberships     申请会员
  - GET  /api/site-config     站点配置
  - POST /api/contact         联系表单
  `);
});

module.exports = app;