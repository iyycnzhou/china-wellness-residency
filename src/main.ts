import './assets/main.css'
import './assets/styles/six-senses-theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化用户状态（从 localStorage 恢复登录状态）
const userStore = useUserStore()
userStore.init()

app.mount('#app')
