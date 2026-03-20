import type { VercelRequest, VercelResponse } from '@vercel/node'

// 验证码存储（与 send-verification 共享，生产环境应使用 Redis）
const verificationCodes = new Map<string, { code: string; expires: number }>()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, phone, code } = req.body

  // 验证输入
  if (!email && !phone) {
    return res.status(400).json({ error: 'Email or phone is required' })
  }

  if (!code) {
    return res.status(400).json({ error: 'Verification code is required' })
  }

  const target = email || phone
  const stored = verificationCodes.get(target)

  // 检查验证码是否存在
  if (!stored) {
    return res.status(400).json({ 
      success: false, 
      error: 'Verification code not found or expired' 
    })
  }

  // 检查是否过期
  if (Date.now() > stored.expires) {
    verificationCodes.delete(target)
    return res.status(400).json({ 
      success: false, 
      error: 'Verification code has expired' 
    })
  }

  // 验证码匹配
  if (stored.code !== code) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid verification code' 
    })
  }

  // 验证成功，删除验证码
  verificationCodes.delete(target)

  return res.status(200).json({ 
    success: true, 
    message: 'Verification successful' 
  })
}