import { ref } from 'vue'

export const currentLang = ref<'zh' | 'en'>('zh')

export function toggleLanguage() {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
}
