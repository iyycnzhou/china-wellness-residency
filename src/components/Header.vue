<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { currentLang, toggleLanguage } from '../composables/useLanguage'

const router = useRouter()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// 用户状态（模拟）
const isLoggedIn = ref(false)
const userName = ref('')

// 切换菜单
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto'
}

// 关闭菜单
const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = 'auto'
}

// 导航菜单
const menuItems = [
  { name: '首页', nameEn: 'Home', path: '/' },
  { name: '驻留权益', nameEn: 'Residency Benefits', path: '/benefits' },
  { name: '会员计划', nameEn: 'Membership Programs', path: '/membership' },
  { name: '服务网络', nameEn: 'Service Network', path: '/destinations' },
  { name: '预约咨询', nameEn: 'Book a Consultation', path: '/contact' },
  { name: '关于我们', nameEn: 'About Us', path: '/about' },
]

// 滚动监听
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
}

// 获取当前语言的菜单文本
const getMenuText = (item: typeof menuItems[0]) => {
  return currentLang.value === 'zh' ? item.name : item.nameEn
}
</script>

<template>
  <header :class="['header', { scrolled: isScrolled, 'menu-open': isMenuOpen }]">
    <!-- 顶部栏 -->
    <div class="header-bar">
      <div class="header-left">
        <button class="menu-btn" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="menu-text">{{ currentLang === 'zh' ? '菜单' : 'Menu' }}</span>
        </button>
      </div>
      
      <div class="header-center">
        <router-link to="/" class="logo" @click="closeMenu">
          <img src="/logo-icon.svg" alt="Logo" class="logo-icon">
          <span v-show="currentLang === 'zh'" class="logo-cn">中国全球健康驻留权益网络</span>
          <span v-show="currentLang === 'en'" class="logo-en">China Wellness Residency Benefits Network</span>
        </router-link>
      </div>
      
      <div class="header-right">
        <button class="lang-btn" @click="toggleLanguage">
          {{ currentLang === 'zh' ? 'EN' : '中文' }}
        </button>
        
        <template v-if="isLoggedIn">
          <div class="user-menu">
            <span class="user-name">{{ userName }}</span>
            <button class="user-btn" @click="isLoggedIn = false">
              {{ currentLang === 'zh' ? '登出' : 'Logout' }}
            </button>
          </div>
        </template>
        <template v-else>
          <div class="auth-buttons">
            <button class="auth-btn" @click="router.push('/login')">
              {{ currentLang === 'zh' ? '登录' : 'Login' }}
            </button>
            <button class="auth-btn primary" @click="router.push('/register')">
              {{ currentLang === 'zh' ? '注册' : 'Register' }}
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- 侧边菜单 -->
    <transition name="menu-slide">
      <div v-if="isMenuOpen" class="menu-sidebar" @click.self="closeMenu">
        <nav class="menu-nav">
          <ul class="menu-list">
            <li 
              v-for="(item, index) in menuItems" 
              :key="item.path"
              class="menu-item"
              :style="{ animationDelay: `${index * 0.08}s` }"
            >
              <router-link :to="item.path" @click="closeMenu">
                <span class="menu-item-text">{{ getMenuText(item) }}</span>
              </router-link>
            </li>
          </ul>
          
          <div class="menu-footer">
            <div class="contact-info">
              <p>concierge@chinawellnessresidency.com</p>
              <p>+86-XXX-XXXX-XXXX</p>
            </div>
            <div class="social-links">
              <a href="#" aria-label="WeChat">WeChat</a>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </nav>
      </div>
    </transition>
    
    <!-- 遮罩层 -->
    <transition name="menu-backdrop-fade">
      <div v-if="isMenuOpen" class="menu-backdrop" @click="closeMenu"></div>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header.scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2.5rem;
  background-color: transparent;
  transition: all 0.3s ease;
}

.header.scrolled .header-bar {
  padding: 1rem 2.5rem;
}

/* 左侧菜单按钮 */
.header-left {
  flex: 1;
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.2s ease;
}

.menu-btn:hover {
  opacity: 0.7;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-black);
  transition: all 0.3s ease;
}

.header.scrolled .hamburger span {
  background-color: var(--color-black);
}

.menu-text {
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-black);
}

/* 中间 Logo */
.header-center {
  flex: 2;
  text-align: center;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-black);
}

.logo-icon {
  width: 42px;
  height: 42px;
  object-fit: contain;
  flex-shrink: 0;
}

.logo-cn {
  display: block;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  font-weight: 400;
  line-height: 1.3;
}

.logo-en {
  display: block;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-stone);
  line-height: 1.3;
}

/* 右侧用户区 */
.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.lang-btn {
  background: none;
  border: 1px solid var(--color-stone);
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-btn:hover {
  border-color: var(--color-black);
}

.auth-buttons {
  display: flex;
  gap: 0.75rem;
}

.auth-btn {
  background: none;
  border: 1px solid var(--color-stone);
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.auth-btn:hover {
  border-color: var(--color-black);
  background-color: var(--color-black);
  color: var(--color-white);
}

.auth-btn.primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.auth-btn.primary:hover {
  background-color: transparent;
  color: var(--color-primary);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-size: 0.875rem;
  color: var(--color-stone);
}

.user-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  color: var(--color-stone);
  transition: color 0.2s ease;
}

.user-btn:hover {
  color: var(--color-black);
}

/* 侧边菜单 */
.menu-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  max-width: 85vw;
  height: 100vh;
  background-color: var(--color-white);
  z-index: 1001;
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-slide-enter-from {
  transform: translateX(-100%);
}

.menu-slide-leave-to {
  transform: translateX(-100%);
}

/* 遮罩层 */
.menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.menu-backdrop-fade-enter-active,
.menu-backdrop-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-backdrop-fade-enter-from,
.menu-backdrop-fade-leave-to {
  opacity: 0;
}

.menu-nav {
  padding: 4rem 2.5rem 2rem;
}

.menu-list {
  list-style: none;
  margin-bottom: 3rem;
}

.menu-item {
  margin: 1.25rem 0;
  opacity: 0;
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-item a {
  display: block;
  text-decoration: none;
  color: var(--color-black);
  transition: color 0.3s ease;
  padding: 0.75rem 0;
}

.menu-item a:hover {
  color: var(--color-secondary);
}

.menu-item-text {
  display: block;
  font-size: 1.5rem;
  font-family: var(--font-primary);
  font-weight: 400;
}

.menu-footer {
  border-top: 1px solid var(--color-sand);
  padding-top: 2rem;
}

.contact-info {
  margin-bottom: 1.5rem;
}

.contact-info p {
  font-size: 0.8125rem;
  color: var(--color-stone);
  margin: 0.35rem 0;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-links a {
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-stone);
  transition: color 0.2s ease;
}

.social-links a:hover {
  color: var(--color-black);
}

/* Responsive */
@media (max-width: 768px) {
  .header-bar {
    padding: 1rem 1.5rem;
  }
  
  .logo-icon {
    width: 36px;
    height: 36px;
  }
  
  .logo-cn {
    display: none;
  }
  
  .logo-en {
    display: none;
  }
  
  .auth-buttons {
    display: none;
  }
}
</style>
