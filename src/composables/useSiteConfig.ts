/**
 * 站点配置 Composable
 * 
 * 从 API 获取站点配置，包括联系方式等
 * 支持缓存，避免重复请求
 */

import { ref, readonly } from 'vue'

interface SiteConfig {
  contact: {
    whatsapp: string
    whatsappLink: string
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

// 缓存配置，避免重复请求
let cachedConfig: SiteConfig | null = null
let fetchPromise: Promise<SiteConfig> | null = null

/**
 * 获取站点配置
 */
export async function useSiteConfig() {
  // 如果已缓存，直接返回
  if (cachedConfig) {
    return cachedConfig
  }

  // 如果正在请求中，返回同一个 Promise（避免重复请求）
  if (fetchPromise) {
    return fetchPromise
  }

  // 发起请求
  fetchPromise = fetch('/api/site-config')
    .then(res => res.json())
    .then(data => {
      if (data.success && data.data) {
        cachedConfig = data.data
        return cachedConfig as SiteConfig
      }
      throw new Error('Failed to fetch site config')
    })
    .catch(err => {
      console.error('Failed to fetch site config:', err)
      // 返回默认配置
      const defaultConfig: SiteConfig = {
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
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      cachedConfig = defaultConfig
      return defaultConfig
    })
    .finally(() => {
      fetchPromise = null
    })

  return fetchPromise
}

/**
 * 获取 WhatsApp 电话号码
 */
export async function getWhatsAppNumber(): Promise<string> {
  const config = await useSiteConfig()
  return config.contact.whatsapp
}

/**
 * 获取 WhatsApp 链接
 */
export async function getWhatsAppLink(): Promise<string> {
  const config = await useSiteConfig()
  return config.contact.whatsappLink
}

/**
 * 获取联系邮箱
 */
export async function getContactEmail(): Promise<string> {
  const config = await useSiteConfig()
  return config.contact.email
}

/**
 * 清除缓存（用于强制刷新）
 */
export function clearSiteConfigCache() {
  cachedConfig = null
  fetchPromise = null
}