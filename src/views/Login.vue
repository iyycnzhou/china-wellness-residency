<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { currentLang } from '../composables/useLanguage'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isSubmitting = ref(false)

// 错误信息
const fieldErrors = ref<{
  email?: string
  password?: string
  general?: string
}>({})

// 验证表单
function validateForm(): boolean {
  fieldErrors.value = {}
  
  if (!email.value.trim()) {
    fieldErrors.value.email = currentLang.value === 'zh' ? '请输入邮箱' : 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    fieldErrors.value.email = currentLang.value === 'zh' ? '邮箱格式不正确' : 'Invalid email format'
  }
  
  if (!password.value) {
    fieldErrors.value.password = currentLang.value === 'zh' ? '请输入密码' : 'Password is required'
  }
  
  return Object.keys(fieldErrors.value).length === 0
}

// 提交登录
async function handleSubmit() {
  if (!validateForm()) return
  
  isSubmitting.value = true
  fieldErrors.value.general = undefined
  
  const success = await userStore.login(email.value, password.value)
  isSubmitting.value = false
  
  if (success) {
    router.push('/')
  } else {
    fieldErrors.value.general = userStore.error || (currentLang.value === 'zh' ? '登录失败' : 'Login failed')
  }
}

// 跳转注册
function goRegister() {
  router.push('/register')
}
</script>

<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="leaf leaf-1"></div>
      <div class="leaf leaf-2"></div>
      <div class="gradient-overlay"></div>
    </div>
    
    <div class="login-container">
      <!-- 左侧品牌展示 -->
      <div class="brand-section">
        <div class="brand-content">
          <div class="brand-logo">
            <span class="logo-icon">🌿</span>
            <span class="logo-text">康养驻留</span>
          </div>
          
          <h2 class="brand-title">
            {{ currentLang === 'zh' ? '欢迎回来' : 'Welcome Back' }}
          </h2>
          
          <p class="brand-desc">
            {{ currentLang === 'zh' 
              ? '登录您的账户，探索专属健康驻留权益，开启身心焕新之旅' 
              : 'Sign in to explore your exclusive wellness residency benefits and start your rejuvenation journey' 
            }}
          </p>
          
          <div class="brand-features">
            <div class="feature-item">
              <span class="feature-icon">🏨</span>
              <span class="feature-text">{{ currentLang === 'zh' ? '全国优质基地' : 'Premium Resorts' }}</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💆</span>
              <span class="feature-text">{{ currentLang === 'zh' ? '专属健康服务' : 'Health Services' }}</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✨</span>
              <span class="feature-text">{{ currentLang === 'zh' ? '会员专享权益' : 'Member Benefits' }}</span>
            </div>
          </div>
        </div>
        
        <!-- 装饰图案 -->
        <div class="brand-pattern"></div>
      </div>
      
      <!-- 右侧表单 -->
      <div class="form-section">
        <div class="form-wrapper">
          <!-- 返回首页 -->
          <router-link to="/" class="back-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {{ currentLang === 'zh' ? '返回首页' : 'Back' }}
          </router-link>
          
          <!-- 表单标题 -->
          <div class="form-header">
            <h1>{{ currentLang === 'zh' ? '登录账户' : 'Sign In' }}</h1>
            <p>{{ currentLang === 'zh' ? '输入您的账户信息' : 'Enter your credentials' }}</p>
          </div>
          
          <!-- 表单 -->
          <form class="login-form" @submit.prevent="handleSubmit">
            <!-- 通用错误 -->
            <transition name="fade">
              <div v-if="fieldErrors.general" class="error-banner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ fieldErrors.general }}
              </div>
            </transition>
            
            <!-- 邮箱 -->
            <div class="form-group">
              <label for="email">
                <span class="label-text">{{ currentLang === 'zh' ? '邮箱地址' : 'Email Address' }}</span>
                <span class="label-required">*</span>
              </label>
              <div class="input-wrapper">
                <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  :placeholder="currentLang === 'zh' ? '请输入您的邮箱' : 'Enter your email'"
                  :class="{ 'has-error': fieldErrors.email, 'has-value': email }"
                  autocomplete="email"
                />
              </div>
              <transition name="fade">
                <span v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</span>
              </transition>
            </div>
            
            <!-- 密码 -->
            <div class="form-group">
              <label for="password">
                <span class="label-text">{{ currentLang === 'zh' ? '登录密码' : 'Password' }}</span>
                <span class="label-required">*</span>
              </label>
              <div class="input-wrapper">
                <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="currentLang === 'zh' ? '请输入密码' : 'Enter your password'"
                  :class="{ 'has-error': fieldErrors.password, 'has-value': password }"
                  autocomplete="current-password"
                />
                <button type="button" class="toggle-visibility" @click="showPassword = !showPassword">
                  <svg v-if="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <transition name="fade">
                <span v-if="fieldErrors.password" class="field-error">{{ fieldErrors.password }}</span>
              </transition>
            </div>
            
            <!-- 忘记密码 -->
            <div class="form-actions-top">
              <router-link to="/forgot-password" class="forgot-link">
                {{ currentLang === 'zh' ? '忘记密码？' : 'Forgot password?' }}
              </router-link>
            </div>
            
            <!-- 登录按钮 -->
            <button type="submit" class="btn-primary btn-full" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading-spinner"></span>
              <span>{{ isSubmitting ? (currentLang === 'zh' ? '登录中...' : 'Signing in...') : (currentLang === 'zh' ? '登录' : 'Sign In') }}</span>
            </button>
          </form>
          
          <!-- 底部注册链接 -->
          <div class="form-footer">
            <span>{{ currentLang === 'zh' ? '还没有账户？' : "Don't have an account?" }}</span>
            <button type="button" class="link-btn" @click="goRegister">
              {{ currentLang === 'zh' ? '立即注册' : 'Create account' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面基础 */
.login-page {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7f3 0%, #e8ebe4 100%);
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.leaf {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(ellipse at center, rgba(26, 77, 46, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 20s ease-in-out infinite;
}

.leaf-1 {
  top: -100px;
  right: 10%;
  animation-delay: 0s;
}

.leaf-2 {
  bottom: 10%;
  left: -100px;
  animation-delay: -7s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(5deg); }
  66% { transform: translate(-20px, 20px) rotate(-5deg); }
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(45, 106, 79, 0.05) 0%, transparent 50%);
}

/* 主容器 */
.login-container {
  display: flex;
  width: 100%;
  max-width: 950px;
  min-height: 600px;
  margin: 2rem;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.08),
    0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
}

/* 左侧品牌区 */
.brand-section {
  flex: 0 0 400px;
  background: linear-gradient(165deg, #1a4d2e 0%, #2d6a4f 50%, #40916c 100%);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.brand-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  letter-spacing: 0.05em;
}

.brand-title {
  font-size: 2rem;
  font-weight: 400;
  color: white;
  line-height: 1.4;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.brand-desc {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 300px;
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.feature-icon {
  font-size: 1.25rem;
}

.feature-text {
  font-size: 0.875rem;
  color: white;
  font-weight: 500;
}

.brand-pattern {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

/* 右侧表单区 */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  background: white;
}

.form-wrapper {
  width: 100%;
  max-width: 360px;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #78716c;
  text-decoration: none;
  font-size: 0.8125rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-home:hover {
  color: #1a4d2e;
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h1 {
  font-size: 1.625rem;
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 0.375rem;
  letter-spacing: -0.01em;
}

.form-header p {
  font-size: 0.875rem;
  color: #78716c;
}

/* 表单 */
.login-form {
  position: relative;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group > label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.label-text {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #44403c;
}

.label-required {
  color: #dc2626;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a8a29e;
  transition: color 0.2s;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1.5px solid #e7e5e4;
  border-radius: 12px;
  font-size: 0.9375rem;
  color: #1c1917;
  background: #fafaf9;
  transition: all 0.2s;
}

.input-wrapper input::placeholder {
  color: #a8a29e;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #1a4d2e;
  background: white;
  box-shadow: 0 0 0 4px rgba(26, 77, 46, 0.08);
}

.input-wrapper input:focus ~ .input-icon {
  color: #1a4d2e;
}

.input-wrapper input.has-error {
  border-color: #dc2626;
  background: #fef2f2;
}

.toggle-visibility {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #a8a29e;
  padding: 0.25rem;
  transition: color 0.2s;
}

.toggle-visibility:hover {
  color: #1a4d2e;
}

.field-error {
  display: block;
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.375rem;
  padding-left: 0.25rem;
}

.form-actions-top {
  text-align: right;
  margin-bottom: 1.25rem;
}

.forgot-link {
  color: #78716c;
  font-size: 0.8125rem;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #1a4d2e;
}

/* 按钮 */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9375rem 1.5rem;
  background: linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(26, 77, 46, 0.25);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-full {
  width: 100%;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误提示 */
.error-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 0.8125rem;
  margin-bottom: 1.25rem;
}

/* 底部 */
.form-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f5f5f4;
  text-align: center;
  font-size: 0.8125rem;
  color: #78716c;
}

.link-btn {
  background: none;
  border: none;
  color: #1a4d2e;
  font-weight: 600;
  cursor: pointer;
  margin-left: 0.25rem;
  transition: opacity 0.2s;
}

.link-btn:hover {
  opacity: 0.8;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    max-width: 500px;
    min-height: auto;
  }
  
  .brand-section {
    flex: 0 0 auto;
    padding: 2rem;
  }
  
  .brand-title {
    font-size: 1.5rem;
  }
  
  .brand-desc {
    margin-bottom: 1.5rem;
  }
  
  .brand-features {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .feature-item {
    flex: 1;
    min-width: 140px;
  }
  
  .form-section {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 1rem;
  }
  
  .login-container {
    margin: 0;
    border-radius: 16px;
  }
  
  .brand-section {
    padding: 1.5rem;
  }
  
  .brand-features {
    flex-direction: column;
  }
  
  .form-section {
    padding: 1.5rem;
  }
}
</style>