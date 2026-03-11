import { ref } from 'vue'

export const currentLang = ref<'zh' | 'en'>('zh')

// 从 localStorage 恢复语言偏好
const savedLang = localStorage.getItem('preferredLanguage') as 'zh' | 'en' | null
if (savedLang) {
  currentLang.value = savedLang
}

export function toggleLanguage() {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('preferredLanguage', currentLang.value)
}
