/**
 * 联系方式配置
 * 
 * 集中管理所有联系方式，避免分散在各处
 * 修改此处即可全局更新
 */

export const contactInfo = {
  // WhatsApp 号码（含国家代码）
  whatsapp: '+86-150-1037-2389',
  
  // 电子邮箱
  email: 'iyyzhou13@gmail.com',
  
  // 备用邮箱
  emailSupport: 'support@chinawellnessresidency.com',
  
  // 工作时间
  workHours: {
    cn: '周一至周日 9:00-18:00 (北京时间)',
    en: 'Mon-Sun 9:00-18:00 (Beijing Time)'
  },
  
  // 响应时间承诺
  responseTime: {
    cn: '24 小时内回复',
    en: 'Reply within 24 hours'
  },
} as const

// WhatsApp 链接（可直接点击跳转）
export const whatsappLink = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`

// 邮箱链接
export const emailLink = `mailto:${contactInfo.email}`
