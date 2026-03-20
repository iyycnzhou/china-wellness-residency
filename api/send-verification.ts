import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

// 阿里云邮件推送配置
const ALIYUN_ACCESS_KEY_ID = process.env.ALIYUN_ACCESS_KEY_ID
const ALIYUN_ACCESS_KEY_SECRET = process.env.ALIYUN_ACCESS_KEY_SECRET
const ALIYUN_REGION = 'cn-hangzhou' // 或其他区域
const ALIYUN_ACCOUNT_NAME = process.env.ALIYUN_ACCOUNT_NAME // 发信地址

// 验证码存储
const verificationCodes = new Map<string, { code: string; expires: number }>()

// 生成 6 位验证码
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// 阿里云 API 签名
function generateSignature(params: Record<string, string>, secret: string): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
  
  const stringToSign = `POST&${encodeURIComponent('/')}&${encodeURIComponent(sortedParams)}`
  
  const hmac = crypto.createHmac('sha1', secret + '&')
  hmac.update(stringToSign)
  return hmac.digest('base64')
}

// 发送邮件
async function sendEmail(to: string, subject: string, htmlContent: string) {
  const timestamp = new Date().toISOString().replace(/\.\d{3}/, '')
  
  const params: Record<string, string> = {
    Action: 'SingleSendMail',
    AccountName: ALIYUN_ACCOUNT_NAME!,
    AddressType: '1',
    ReplyToAddress: 'false',
    ToAddress: to,
    Subject: subject,
    HtmlBody: htmlContent,
    Version: '2017-06-22',
    Format: 'JSON',
    AccessKeyId: ALIYUN_ACCESS_KEY_ID!,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: timestamp,
    SignatureVersion: '1.0',
    SignatureNonce: crypto.randomUUID(),
    RegionId: ALIYUN_REGION,
  }
  
  // 生成签名
  const signature = generateSignature(params, ALIYUN_ACCESS_KEY_SECRET!)
  params.Signature = signature
  
  // 发送请求
  const url = `https://dm.${ALIYUN_REGION}.aliyuncs.com/`
  const body = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  
  return response.json()
}

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

  const { email, phone } = req.body

  // 验证输入
  if (!email && !phone) {
    return res.status(400).json({ error: 'Email or phone is required' })
  }

  // 生成验证码
  const code = generateCode()
  const target = email || phone
  const expires = Date.now() + 10 * 60 * 1000 // 10 分钟有效期

  // 存储验证码
  verificationCodes.set(target, { code, expires })

  // 发送邮件
  if (email) {
    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2C5F6E; margin: 0;">China Wellness Residency</h1>
            <p style="color: #C9A962; margin: 10px 0 0;">中国康养驻留</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 40px 30px; text-align: center;">
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              您的验证码是 / Your verification code is:
            </p>
            <div style="background: linear-gradient(135deg, #2C5F6E 0%, #3a7a8c 100%); color: white; font-size: 36px; font-weight: bold; letter-spacing: 10px; padding: 25px 50px; border-radius: 12px; display: inline-block; box-shadow: 0 8px 24px rgba(44, 95, 110, 0.25);">
              ${code}
            </div>
            <p style="color: #999; font-size: 14px; margin-top: 25px;">
              验证码 10 分钟内有效 / Code expires in 10 minutes
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
            <p>如果您没有请求此验证码，请忽略此邮件。</p>
            <p style="margin-top: 10px;">If you didn't request this code, please ignore this email.</p>
            <p style="margin-top: 15px;">© 2024 China Wellness Residency. All rights reserved.</p>
          </div>
        </div>
      `

      const result = await sendEmail(
        email,
        '验证码 - China Wellness Residency',
        htmlContent
      )

      if (result.Code) {
        console.error('Aliyun API error:', result)
        return res.status(500).json({ error: 'Failed to send email', details: result.Message })
      }

      return res.status(200).json({ 
        success: true, 
        message: '验证码已发送到您的邮箱' 
      })
    } catch (error) {
      console.error('Send email error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }
  }

  // 手机号（需要开通短信服务）
  if (phone) {
    return res.status(400).json({ 
      error: 'SMS service not configured. Please use email.' 
    })
  }
}