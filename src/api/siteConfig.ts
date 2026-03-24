/**
 * 网站配置 API 调用
 */

import { contactInfo } from '../config/contact'

export interface SiteConfig {
  contact: {
    whatsapp: string
    email: string
    emailSupport: string
  }
  workHours: {
    cn: string
    en: string
  }
  responseTime: {
    cn: string
    en: string
  }
  social: {
    wechat: string
    instagram: string
    facebook: string
  }
  version: string
  lastUpdated: string
}

export interface SiteConfigResponse {
  success: boolean
  data: SiteConfig
  timestamp: string
}

/**
 * 获取网站配置信息
 * 优先从 API 获取，失败则使用本地配置
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const response = await fetch('/api/site-config')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: SiteConfigResponse = await response.json()
    
    if (result.success) {
      return result.data
    } else {
      throw new Error('API returned unsuccessful response')
    }
  } catch (error) {
    console.warn('Failed to fetch site config from API, using local config:', error)
    
    // API 失败时返回本地配置
    return {
      contact: {
        whatsapp: contactInfo.whatsapp,
        email: contactInfo.email,
        emailSupport: contactInfo.emailSupport,
      },
      workHours: {
        cn: '周一至周日 9:00-18:00 (北京时间)',
        en: 'Mon-Sun 9:00-18:00 (Beijing Time)',
      },
      responseTime: {
        cn: '24 小时内回复',
        en: 'Reply within 24 hours',
      },
      social: {
        wechat: 'ChinaWellnessResidency',
        instagram: '@chinawellnessresidency',
        facebook: 'ChinaWellnessResidency',
      },
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
    }
  }
}

/**
 * 获取 WhatsApp 号码
 */
export async function getWhatsappNumber(): Promise<string> {
  const config = await getSiteConfig()
  return config.contact.whatsapp
}

/**
 * 获取联系邮箱
 */
export async function getContactEmail(): Promise<string> {
  const config = await getSiteConfig()
  return config.contact.email
}

/**
 * 获取 WhatsApp 链接（可直接点击跳转）
 */
export function getWhatsappLink(): string {
  const number = contactInfo.whatsapp.replace(/[^0-9]/g, '')
  return `https://wa.me/${number}`
}

/**
 * 获取邮箱链接
 */
export function getEmailLink(): string {
  return `mailto:${contactInfo.email}`
}
