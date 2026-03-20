<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { currentLang } from '../composables/useLanguage'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeTerms = ref(false)
const isSubmitting = ref(false)
const currentStep = ref(1) // 步骤：1-基本信息，2-设置密码

// 密码强度
const passwordStrength = computed(() => {
  const pwd = password.value
  if (!pwd) return { level: 0, text: '', color: '#e7e5e4', percent: 0 }
  
  let score = 0
  if (pwd.length >= 6) score++
  if (pwd.length >= 10) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  
  const levels = [
    { level: 1, text: currentLang.value === 'zh' ? '弱' : 'Weak', color: '#dc2626', percent: 25 },
    { level: 2, text: currentLang.value === 'zh' ? '一般' : 'Fair', color: '#f59e0b', percent: 50 },
    { level: 3, text: currentLang.value === 'zh' ? '良好' : 'Good', color: '#10b981', percent: 75 },
    { level: 4, text: currentLang.value === 'zh' ? '强' : 'Strong', color: '#059669', percent: 100 },
  ]
  
  const levelIndex = Math.min(Math.floor(score / 2), 3)
  return levels[levelIndex]
})

// 密码检查项
const passwordChecks = computed(() => [
  { 
    label: currentLang.value === 'zh' ? '至少6个字符' : 'At least 6 characters',
    valid: password.value.length >= 6 
  },
  { 
    label: currentLang.value === 'zh' ? '包含大写字母' : 'Contains uppercase letter',
    valid: /[A-Z]/.test(password.value) 
  },
  { 
    label: currentLang.value === 'zh' ? '包含小写字母' : 'Contains lowercase letter',
    valid: /[a-z]/.test(password.value) 
  },
  { 
    label: currentLang.value === 'zh' ? '包含数字' : 'Contains number',
    valid: /[0-9]/.test(password.value) 
  },
])

// 错误信息
const fieldErrors = ref<{
  email?: string
  username?: string
  password?: string
  confirmPassword?: string
  terms?: string
  general?: string
}>({})

// 验证第一步
function validateStep1(): boolean {
  fieldErrors.value = {}
  
  if (!email.value.trim()) {
    fieldErrors.value.email = currentLang.value === 'zh' ? '请输入邮箱' : 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    fieldErrors.value.email = currentLang.value === 'zh' ? '邮箱格式不正确' : 'Invalid email format'
  }
  
  if (!username.value.trim()) {
    fieldErrors.value.username = currentLang.value === 'zh' ? '请输入用户名' : 'Username is required'
  } else if (username.value.length < 3) {
    fieldErrors.value.username = currentLang.value === 'zh' ? '用户名至少3个字符' : 'Username must be at least 3 characters'
  } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username.value)) {
    fieldErrors.value.username = currentLang.value === 'zh' ? '用户名只能包含字母、数字、下划线或中文' : 'Invalid username format'
  }
  
  return Object.keys(fieldErrors.value).length === 0
}

// 验证第二步
function validateStep2(): boolean {
  fieldErrors.value = {}
  
  if (!password.value) {
    fieldErrors.value.password = currentLang.value === 'zh' ? '请输入密码' : 'Password is required'
  } else if (password.value.length < 6) {
    fieldErrors.value.password = currentLang.value === 'zh' ? '密码至少6个字符' : 'Password must be at least 6 characters'
  }
  
  if (password.value !== confirmPassword.value) {
    fieldErrors.value.confirmPassword = currentLang.value === 'zh' ? '两次密码输入不一致' : 'Passwords do not match'
  }
  
  if (!agreeTerms.value) {
    fieldErrors.value.terms = currentLang.value === 'zh' ? '请阅读并同意服务条款' : 'Please agree to the terms'
  }
  
  return Object.keys(fieldErrors.value).length === 0
}

// 下一步
function nextStep() {
  if (validateStep1()) {
    currentStep.value = 2
  }
}

// 上一步
function prevStep() {
  currentStep.value = 1
}

// 提交注册
async function handleSubmit() {
  if (!validateStep2()) return
  
  isSubmitting.value = true
  fieldErrors.value.general = undefined
  
  const success = await userStore.register(email.value, username.value, password.value)
  isSubmitting.value = false
  
  if (success) {
    router.push('/')
  } else {
    fieldErrors.value.general = userStore.error || (currentLang.value === 'zh' ? '注册失败' : 'Registration failed')
  }
}

// 跳转登录
function goLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="register-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="leaf leaf-1"></div>
      <div class="leaf leaf-2"></div>
      <div class="leaf leaf-3"></div>
      <div class="gradient-overlay"></div>
    </div>
    
    <div class="register-container">
      <!-- 左侧品牌展示 -->
      <div class="brand-section">
        <div class="brand-content">
          <div class="brand-logo">
            <span class="logo-icon">🌿</span>
            <span class="logo-text">康养驻留</span>
          </div>
          
          <h2 class="brand-title">
            {{ currentLang === 'zh' ? '开启您的健康之旅' : 'Start Your Wellness Journey' }}
          </h2>
          
          <p class="brand-desc">
            {{ currentLang === 'zh' 
              ? '加入会员，探索全国优质康养资源，享受专属驻留权益与贴心服务' 
              : 'Join us to explore premium wellness destinations across China and enjoy exclusive residency benefits' 
            }}
          </p>
          
          <div class="brand-features">
            <div class="feature-item">
              <span class="feature-icon">🏨</span>
              <span class="feature-text">{{ currentLang === 'zh' ? '优质康养基地' : 'Premium Wellness Resorts' }}</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💆</span>
              <span class="feature-text">{{ currentLang === 'zh' ? '专业健康服务' : 'Professional Health Services' }}</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎁</span>
              <span class="feature-text">{{ currentLang === 'zh' ? '专属会员权益' : 'Exclusive Member Benefits' }}</span>
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
            <h1>{{ currentLang === 'zh' ? '创建账户' : 'Create Account' }}</h1>
            <p>{{ currentLang === 'zh' ? '填写以下信息完成注册' : 'Fill in the information below to register' }}</p>
          </div>
          
          <!-- 步骤指示器 -->
          <div class="steps-indicator">
            <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <span class="step-number">1</span>
              <span class="step-label">{{ currentLang === 'zh' ? '基本信息' : 'Basic Info' }}</span>
            </div>
            <div class="step-line" :class="{ active: currentStep > 1 }"></div>
            <div class="step" :class="{ active: currentStep >= 2 }">
              <span class="step-number">2</span>
              <span class="step-label">{{ currentLang === 'zh' ? '设置密码' : 'Password' }}</span>
            </div>
          </div>
          
          <!-- 表单内容 -->
          <form class="register-form" @submit.prevent="handleSubmit">
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
            
            <!-- 步骤1：基本信息 -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="currentStep === 1" key="step1" class="form-step">
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
                
                <!-- 用户名 -->
                <div class="form-group">
                  <label for="username">
                    <span class="label-text">{{ currentLang === 'zh' ? '用户名' : 'Username' }}</span>
                    <span class="label-required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      id="username"
                      v-model="username"
                      type="text"
                      :placeholder="currentLang === 'zh' ? '请输入用户名' : 'Choose a username'"
                      :class="{ 'has-error': fieldErrors.username, 'has-value': username }"
                      autocomplete="username"
                    />
                  </div>
                  <transition name="fade">
                    <span v-if="fieldErrors.username" class="field-error">{{ fieldErrors.username }}</span>
                  </transition>
                </div>
                
                <!-- 下一步按钮 -->
                <button type="button" class="btn-primary btn-full" @click="nextStep">
                  <span>{{ currentLang === 'zh' ? '下一步' : 'Continue' }}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              
              <!-- 步骤2：设置密码 -->
              <div v-else key="step2" class="form-step">
                <!-- 密码 -->
                <div class="form-group">
                  <label for="password">
                    <span class="label-text">{{ currentLang === 'zh' ? '设置密码' : 'Create Password' }}</span>
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
                      :placeholder="currentLang === 'zh' ? '请设置密码' : 'Create a password'"
                      :class="{ 'has-error': fieldErrors.password, 'has-value': password }"
                      autocomplete="new-password"
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
                  
                  <!-- 密码强度 -->
                  <div v-if="password" class="password-strength">
                    <div class="strength-header">
                      <span class="strength-label">{{ currentLang === 'zh' ? '密码强度' : 'Password Strength' }}</span>
                      <span class="strength-value" :style="{ color: passwordStrength.color }">{{ passwordStrength.text }}</span>
                    </div>
                    <div class="strength-bar">
                      <div class="strength-fill" :style="{ width: `${passwordStrength.percent}%`, backgroundColor: passwordStrength.color }"></div>
                    </div>
                    <div class="password-checks">
                      <div v-for="(check, index) in passwordChecks" :key="index" class="check-item" :class="{ valid: check.valid }">
                        <svg v-if="check.valid" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span v-else class="check-dot"></span>
                        <span>{{ check.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 确认密码 -->
                <div class="form-group">
                  <label for="confirmPassword">
                    <span class="label-text">{{ currentLang === 'zh' ? '确认密码' : 'Confirm Password' }}</span>
                    <span class="label-required">*</span>
                  </label>
                  <div class="input-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      id="confirmPassword"
                      v-model="confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      :placeholder="currentLang === 'zh' ? '请再次输入密码' : 'Confirm your password'"
                      :class="{ 'has-error': fieldErrors.confirmPassword, 'has-value': confirmPassword, 'is-valid': confirmPassword && password === confirmPassword }"
                      autocomplete="new-password"
                    />
                    <button type="button" class="toggle-visibility" @click="showConfirmPassword = !showConfirmPassword">
                      <svg v-if="showConfirmPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <svg v-if="confirmPassword && password === confirmPassword" class="input-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <transition name="fade">
                    <span v-if="fieldErrors.confirmPassword" class="field-error">{{ fieldErrors.confirmPassword }}</span>
                  </transition>
                </div>
                
                <!-- 同意条款 -->
                <div class="form-group">
                  <label class="checkbox-label" :class="{ 'has-error': fieldErrors.terms }">
                    <input v-model="agreeTerms" type="checkbox" />
                    <span class="checkbox-custom">
                      <svg v-if="agreeTerms" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    <span class="checkbox-text">
                      {{ currentLang === 'zh' ? '我已阅读并同意' : 'I agree to the' }}
                      <a href="#" class="link">{{ currentLang === 'zh' ? '服务条款' : 'Terms of Service' }}</a>
                      {{ currentLang === 'zh' ? '和' : 'and' }}
                      <a href="#" class="link">{{ currentLang === 'zh' ? '隐私政策' : 'Privacy Policy' }}</a>
                    </span>
                  </label>
                  <transition name="fade">
                    <span v-if="fieldErrors.terms" class="field-error">{{ fieldErrors.terms }}</span>
                  </transition>
                </div>
                
                <!-- 按钮组 -->
                <div class="btn-group">
                  <button type="button" class="btn-secondary" @click="prevStep">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span>{{ currentLang === 'zh' ? '上一步' : 'Back' }}</span>
                  </button>
                  <button type="submit" class="btn-primary" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="loading-spinner"></span>
                    <span>{{ isSubmitting ? (currentLang === 'zh' ? '注册中...' : 'Creating...') : (currentLang === 'zh' ? '完成注册' : 'Create Account') }}</span>
                  </button>
                </div>
              </div>
            </transition>
          </form>
          
          <!-- 底部登录链接 -->
          <div class="form-footer">
            <span>{{ currentLang === 'zh' ? '已有账户？' : 'Already have an account?' }}</span>
            <button type="button" class="link-btn" @click="goLogin">
              {{ currentLang === 'zh' ? '立即登录' : 'Sign in' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面基础 */
.register-page {
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
  animation-delay: -5s;
}

.leaf-3 {
  top: 40%;
  right: -50px;
  animation-delay: -10s;
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
.register-container {
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 700px;
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
  flex: 0 0 420px;
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
  max-width: 320px;
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
  max-width: 380px;
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
  margin-bottom: 1.75rem;
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

/* 步骤指示器 */
.steps-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e7e5e4;
  color: #78716c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: all 0.3s;
}

.step.active .step-number {
  background: #1a4d2e;
  color: white;
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step-label {
  font-size: 0.75rem;
  color: #78716c;
  font-weight: 500;
}

.step.active .step-label {
  color: #1a4d2e;
}

.step-line {
  flex: 1;
  height: 2px;
  background: #e7e5e4;
  margin: 0 0.5rem;
  transition: background 0.3s;
}

.step-line.active {
  background: #1a4d2e;
}

/* 表单 */
.register-form {
  position: relative;
}

.form-step {
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

.input-wrapper input.is-valid {
  border-color: #10b981;
  background: #f0fdf4;
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

.input-success {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
}

.field-error {
  display: block;
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.375rem;
  padding-left: 0.25rem;
}

/* 密码强度 */
.password-strength {
  margin-top: 0.875rem;
  padding: 1rem;
  background: #fafaf9;
  border-radius: 10px;
  border: 1px solid #e7e5e4;
}

.strength-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.strength-label {
  font-size: 0.75rem;
  color: #78716c;
  font-weight: 500;
}

.strength-value {
  font-size: 0.75rem;
  font-weight: 600;
}

.strength-bar {
  height: 4px;
  background: #e7e5e4;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s, background-color 0.3s;
}

.password-checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.375rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.6875rem;
  color: #a8a29e;
  transition: color 0.2s;
}

.check-item.valid {
  color: #10b981;
}

.check-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

/* 复选框 */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.8125rem;
  color: #57534e;
  line-height: 1.5;
}

.checkbox-label input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #d6d3d1;
  border-radius: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-top: 1px;
}

.checkbox-label input:checked + .checkbox-custom {
  background: #1a4d2e;
  border-color: #1a4d2e;
}

.checkbox-label.has-error .checkbox-custom {
  border-color: #dc2626;
}

.checkbox-text {
  flex: 1;
}

.checkbox-text .link {
  color: #1a4d2e;
  text-decoration: none;
  font-weight: 500;
}

.checkbox-text .link:hover {
  text-decoration: underline;
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

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9375rem 1.5rem;
  background: white;
  color: #57534e;
  border: 1.5px solid #e7e5e4;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #d6d3d1;
  background: #fafaf9;
}

.btn-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-group .btn-secondary {
  flex: 0 0 auto;
}

.btn-group .btn-primary {
  flex: 1;
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* 响应式 */
@media (max-width: 900px) {
  .register-container {
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
  .register-page {
    padding: 1rem;
  }
  
  .register-container {
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
  
  .password-checks {
    grid-template-columns: 1fr;
  }
  
  .btn-group {
    flex-direction: column;
  }
  
  .btn-group .btn-secondary {
    order: 2;
  }
}
</style>