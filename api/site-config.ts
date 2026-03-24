/**
 * 网站配置 API
 * 返回网站联系方式、工作时间等配置信息
 */

import { VercelRequest, VercelResponse } from '@vercel/node'

// 允许 CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
}

// API Key 验证（可选）
// 如果设置了 API_KEY 环境变量，则要求请求头包含 X-API-Key
function validateApiKey(request: VercelRequest): boolean {
  const apiKey = process.env.SITE_CONFIG_API_KEY
  
  // 如果没有设置环境变量，则不验证（允许公开访问）
  if (!apiKey) {
    return true
  }
  
  // 如果设置了，则验证请求头
  const providedKey = request.headers['x-api-key']
  return providedKey === apiKey
}

// 网站配置数据
const siteConfig = {
  // 联系方式
  contact: {
    // WhatsApp 号码（含国家代码）
    whatsapp: '+86-138-0000-8888',
    
    // 主联系邮箱
    email: 'contact@chinawellnessresidency.com',
    
    // 客服邮箱
    emailSupport: 'support@chinawellnessresidency.com',
  },
  
  // 工作时间
  workHours: {
    cn: '周一至周日 9:00-18:00 (北京时间)',
    en: 'Mon-Sun 9:00-18:00 (Beijing Time)',
  },
  
  // 响应时间承诺
  responseTime: {
    cn: '24 小时内回复',
    en: 'Reply within 24 hours',
  },
  
  // 社交媒体
  social: {
    wechat: 'ChinaWellnessResidency',
    instagram: '@chinawellnessresidency',
    facebook: 'ChinaWellnessResidency',
  },
  
  // 版本信息
  version: '1.0.0',
  lastUpdated: '2026-03-24',
}

export default function handler(request: VercelRequest, response: VercelResponse) {
  // 处理 OPTIONS 预检请求
  if (request.method === 'OPTIONS') {
    return response.status(200).json({})
  }
  
  // 只允许 GET 请求
  if (request.method !== 'GET') {
    return response.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are allowed' 
    })
  }
  
  // API Key 验证
  if (!validateApiKey(request)) {
    return response.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing API key'
    })
  }
  
  // 返回配置信息
  return response.status(200).json({
    success: true,
    data: siteConfig,
    timestamp: new Date().toISOString(),
  })
}
