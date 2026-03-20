import { ref } from 'vue'

// 城市名称映射（中文 → 英文）
export const cityNameMap: Record<string, string> = {
  '北京': 'Beijing',
  '上海': 'Shanghai',
  '广州': 'Guangzhou',
  '深圳': 'Shenzhen',
  '成都': 'Chengdu',
  '杭州': 'Hangzhou',
  '三亚': 'Sanya',
  '大理': 'Dali',
  '黄山': 'Huangshan',
  '莫干山': 'Moganshan',
  '珠海': 'Zhuhai',
  '南京': 'Nanjing',
  '合肥': 'Hefei',
  '南昌': 'Nanchang',
  '福州': 'Fuzhou',
  '厦门': 'Xiamen',
  '西安': "Xi'an",
  '丽江': 'Lijiang',
  '青岛': 'Qingdao',
}

// 获取城市名称（根据当前语言）
export function getCityName(city: string, lang?: 'zh' | 'en'): string {
  if (lang === 'zh' || (!lang && currentLang.value === 'zh')) {
    return city
  }
  return cityNameMap[city] || city
}

// 获取城市名称列表（根据当前语言）
export function getCityNames(cities: string[], lang?: 'zh' | 'en'): string {
  return cities.map(city => getCityName(city, lang)).join(' | ')
}

export const currentLang = ref<'zh' | 'en'>('zh')

// 从 localStorage 恢复语言偏好，否则检测浏览器语言
const savedLang = localStorage.getItem('preferredLanguage') as 'zh' | 'en' | null
if (savedLang) {
  currentLang.value = savedLang
} else {
  // 检测浏览器语言
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) {
    currentLang.value = 'zh'
  } else {
    currentLang.value = 'en'
  }
}

export function toggleLanguage() {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('preferredLanguage', currentLang.value)
}
