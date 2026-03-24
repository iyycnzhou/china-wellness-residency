/**
 * API 调用示例 - 带 API Key 验证
 */

// 从环境变量获取 API Key（Vite 项目）
const API_KEY = import.meta.env.VITE_API_KEY || ''

/**
 * 发送验证码（需要 API Key）
 */
export async function sendVerification(phone: string) {
  const response = await fetch('/api/send-verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,  // ← 添加 API Key
    },
    body: JSON.stringify({ phone }),
  })
  
  if (response.status === 401) {
    throw new Error('API Key 验证失败')
  }
  
  return await response.json()
}

/**
 * 验证验证码（需要 API Key）
 */
export async function verifyCode(phone: string, code: string) {
  const response = await fetch('/api/verify-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,  // ← 添加 API Key
    },
    body: JSON.stringify({ phone, code }),
  })
  
  if (response.status === 401) {
    throw new Error('API Key 验证失败')
  }
  
  return await response.json()
}

/**
 * 获取网站配置（可选 API Key）
 */
export async function getSiteConfig() {
  const response = await fetch('/api/site-config', {
    headers: {
      'X-API-Key': API_KEY,  // ← 可选，如果设置了 SITE_CONFIG_API_KEY
    },
  })
  
  return await response.json()
}
