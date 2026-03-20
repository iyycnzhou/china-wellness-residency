<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { currentLang, getCityName } from '../composables/useLanguage'
import SliderCaptcha from './SliderCaptcha.vue'

// ==================== Props & Emits ====================
const props = defineProps<{
  modelValue: boolean
  service: {
    titleCn: string
    titleEn: string
    price: string
    priceCn: string
    priceEn: string
    image: string
    cities: string[]
  } | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', booking: BookingData): void
}>()

// ==================== Types ====================
interface BookingData {
  email: string
  phone: string
  name: string
  date: string
  guests: number
  city: string
  notes: string
  serviceTitle: string
  servicePrice: string
}

// ==================== State ====================
const currentStep = ref<1 | 2 | 3 | 4>(1)
const contactMethod = ref<'email' | 'phone'>('email')
const email = ref('')
const phone = ref('')
const verificationCode = ref('')
const name = ref('')
const date = ref('')
const guests = ref(1)
const city = ref('')
const notes = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)
const codeSent = ref(false)
const countdown = ref(0)

// 滑动验证码状态
const showCaptcha = ref(false)
const captchaVerified = ref(false)

// ==================== Computed ====================
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const contactValue = computed(() => {
  return contactMethod.value === 'email' ? email.value : phone.value
})

const isValidContact = computed(() => {
  if (contactMethod.value === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  } else {
    return /^\+?[\d\s-]{10,}$/.test(phone.value)
  }
})

const canProceedStep1 = computed(() => isValidContact.value)
const canProceedStep2 = computed(() => verificationCode.value.length >= 4 && name.value.trim().length >= 2)
const canSubmit = computed(() => date.value && city.value && agreeTerms.value)

// ==================== Methods ====================
function close() {
  isOpen.value = false
  // Reset state
  setTimeout(() => {
    currentStep.value = 1
    email.value = ''
    phone.value = ''
    verificationCode.value = ''
    name.value = ''
    date.value = ''
    guests.value = 1
    city.value = ''
    notes.value = ''
    agreeTerms.value = false
    codeSent.value = false
    countdown.value = 0
  }, 300)
}

async function sendVerificationCode() {
  if (!isValidContact.value) return
  
  // 先弹出滑动验证码
  showCaptcha.value = true
}

// 滑动验证码验证成功后发送验证码
async function onCaptchaSuccess() {
  captchaVerified.value = true
  showCaptcha.value = false
  
  isLoading.value = true
  
  try {
    // 调用 API 发送验证码
    const response = await fetch('/api/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: contactMethod.value === 'email' ? email.value : undefined,
        phone: contactMethod.value === 'phone' ? phone.value : undefined,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send verification code')
    }

    codeSent.value = true
    countdown.value = 60
    startCountdown()
  } catch (error) {
    console.error('Send verification code error:', error)
    alert(currentLang.value === 'zh' 
      ? '发送验证码失败，请稍后重试' 
      : 'Failed to send verification code. Please try again.')
  } finally {
    isLoading.value = false
  }
}

function startCountdown() {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

async function nextStep() {
  if (currentStep.value === 1 && canProceedStep1.value) {
    if (!codeSent.value) {
      await sendVerificationCode()
    }
    currentStep.value = 2
  } else if (currentStep.value === 2 && canProceedStep2.value) {
    currentStep.value = 3
  }
}

async function submitBooking() {
  if (!canSubmit.value || !props.service) return
  
  isLoading.value = true
  // TODO: 调用API提交预订
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const bookingData: BookingData = {
    email: email.value,
    phone: phone.value,
    name: name.value,
    date: date.value,
    guests: guests.value,
    city: city.value,
    notes: notes.value,
    serviceTitle: currentLang.value === 'zh' ? props.service.titleCn : props.service.titleEn,
    servicePrice: props.service.price,
  }
  
  emit('submit', bookingData)
  isLoading.value = false
  
  // 显示成功状态
  currentStep.value = 4
}

// 设置默认城市
watch(() => props.service, (newService) => {
  if (newService && newService.cities && newService.cities.length > 0) {
    city.value = newService.cities[0] || ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-container">
          <!-- 关闭按钮 -->
          <button class="close-btn" @click="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- Step 1: 输入联系方式 -->
          <div v-if="currentStep === 1" class="modal-content">
            <div class="modal-header">
              <h2>{{ currentLang === 'zh' ? '立即预订' : 'Book Now' }}</h2>
              <p>{{ currentLang === 'zh' ? '请输入您的联系方式，我们将发送验证码' : 'Enter your contact info to receive verification code' }}</p>
            </div>

            <!-- 服务摘要 -->
            <div v-if="service" class="service-summary">
              <img :src="service.image" :alt="service.titleCn" class="service-thumb" />
              <div class="service-info">
                <div class="service-title">
                  {{ currentLang === 'zh' ? service.titleCn : service.titleEn }}
                </div>
                <div class="service-price">
                  ¥{{ service.price }} {{ currentLang === 'zh' ? service.priceCn : service.priceEn }}
                </div>
              </div>
            </div>

            <!-- 联系方式选择 -->
            <div class="contact-toggle">
              <button 
                :class="['toggle-btn', { active: contactMethod === 'email' }]"
                @click="contactMethod = 'email'"
              >
                📧 Email
              </button>
              <button 
                :class="['toggle-btn', { active: contactMethod === 'phone' }]"
                @click="contactMethod = 'phone'"
              >
                📱 {{ currentLang === 'zh' ? '手机' : 'Phone' }}
              </button>
            </div>

            <!-- 输入框 -->
            <div class="input-group">
              <input
                v-if="contactMethod === 'email'"
                v-model="email"
                type="email"
                :placeholder="currentLang === 'zh' ? '请输入邮箱地址' : 'Enter your email'"
                class="input-field"
              />
              <input
                v-else
                v-model="phone"
                type="tel"
                :placeholder="currentLang === 'zh' ? '请输入手机号（含国际区号）' : 'Enter phone with country code'"
                class="input-field"
              />
            </div>

            <button 
              class="btn-primary btn-full"
              :disabled="!canProceedStep1 || isLoading"
              @click="sendVerificationCode"
            >
              {{ isLoading ? (currentLang === 'zh' ? '发送中...' : 'Sending...') : (currentLang === 'zh' ? '发送验证码' : 'Send Code') }}
            </button>

            <p class="privacy-notice">
              {{ currentLang === 'zh' ? '继续即表示您同意我们的' : 'By continuing, you agree to our' }}
              <a href="#">{{ currentLang === 'zh' ? '隐私政策' : 'Privacy Policy' }}</a>
            </p>
          </div>

          <!-- Step 2: 验证 + 基本信息 -->
          <div v-if="currentStep === 2" class="modal-content">
            <div class="modal-header">
              <h2>{{ currentLang === 'zh' ? '验证身份' : 'Verify Identity' }}</h2>
              <p>{{ currentLang === 'zh' ? `验证码已发送至 ${contactValue}` : `Code sent to ${contactValue}` }}</p>
            </div>

            <!-- 验证码 -->
            <div class="input-group">
              <label class="input-label">{{ currentLang === 'zh' ? '验证码' : 'Verification Code' }}</label>
              <div class="code-input-row">
                <input
                  v-model="verificationCode"
                  type="text"
                  maxlength="6"
                  :placeholder="currentLang === 'zh' ? '请输入验证码' : 'Enter code'"
                  class="input-field"
                />
                <button 
                  class="btn-resend"
                  :disabled="countdown > 0"
                  @click="sendVerificationCode"
                >
                  {{ countdown > 0 ? `${countdown}s` : (currentLang === 'zh' ? '重发' : 'Resend') }}
                </button>
              </div>
            </div>

            <!-- 姓名 -->
            <div class="input-group">
              <label class="input-label">{{ currentLang === 'zh' ? '您的姓名' : 'Your Name' }}</label>
              <input
                v-model="name"
                type="text"
                :placeholder="currentLang === 'zh' ? '请输入真实姓名' : 'Enter your full name'"
                class="input-field"
              />
            </div>

            <div class="step-actions">
              <button class="btn-secondary" @click="currentStep = 1">
                {{ currentLang === 'zh' ? '返回' : 'Back' }}
              </button>
              <button 
                class="btn-primary"
                :disabled="!canProceedStep2"
                @click="nextStep"
              >
                {{ currentLang === 'zh' ? '继续' : 'Continue' }}
              </button>
            </div>
          </div>

          <!-- Step 3: 预订详情 -->
          <div v-if="currentStep === 3" class="modal-content">
            <div class="modal-header">
              <h2>{{ currentLang === 'zh' ? '预订详情' : 'Booking Details' }}</h2>
              <p>{{ currentLang === 'zh' ? '请完善您的预订信息' : 'Complete your booking information' }}</p>
            </div>

            <!-- 日期 -->
            <div class="input-group">
              <label class="input-label">{{ currentLang === 'zh' ? '预订日期' : 'Preferred Date' }}</label>
              <input
                v-model="date"
                type="date"
                class="input-field"
                :min="new Date().toISOString().split('T')[0]"
              />
            </div>

            <!-- 人数 -->
            <div class="input-group">
              <label class="input-label">{{ currentLang === 'zh' ? '人数' : 'Number of Guests' }}</label>
              <div class="guests-selector">
                <button class="guest-btn" @click="guests = Math.max(1, guests - 1)">−</button>
                <span class="guest-count">{{ guests }}</span>
                <button class="guest-btn" @click="guests = Math.min(10, guests + 1)">+</button>
              </div>
            </div>

            <!-- 城市 -->
            <div class="input-group" v-if="service">
              <label class="input-label">{{ currentLang === 'zh' ? '选择城市' : 'Select City' }}</label>
              <select v-model="city" class="input-field select-field">
                <option v-for="c in service.cities" :key="c" :value="c">{{ getCityName(c) }}</option>
              </select>
            </div>

            <!-- 备注 -->
            <div class="input-group">
              <label class="input-label">{{ currentLang === 'zh' ? '备注信息（可选）' : 'Special Requests (Optional)' }}</label>
              <textarea
                v-model="notes"
                :placeholder="currentLang === 'zh' ? '如有特殊需求请在此说明...' : 'Any special requests...'"
                class="input-field textarea-field"
                rows="3"
              ></textarea>
            </div>

            <!-- 同意条款 -->
            <label class="checkbox-label">
              <input type="checkbox" v-model="agreeTerms" />
              <span>
                {{ currentLang === 'zh' ? '我已阅读并同意' : 'I have read and agree to the' }}
                <a href="#">{{ currentLang === 'zh' ? '服务条款' : 'Terms of Service' }}</a>
              </span>
            </label>

            <div class="step-actions">
              <button class="btn-secondary" @click="currentStep = 2">
                {{ currentLang === 'zh' ? '返回' : 'Back' }}
              </button>
              <button 
                class="btn-primary btn-gold"
                :disabled="!canSubmit || isLoading"
                @click="submitBooking"
              >
                {{ isLoading ? (currentLang === 'zh' ? '提交中...' : 'Submitting...') : (currentLang === 'zh' ? '确认预订' : 'Confirm Booking') }}
              </button>
            </div>
          </div>

          <!-- Step 4: 成功 -->
          <div v-if="currentStep === 4" class="modal-content success-content">
            <div class="success-icon">✅</div>
            <h2>{{ currentLang === 'zh' ? '预订成功！' : 'Booking Confirmed!' }}</h2>
            <p>{{ currentLang === 'zh' ? '我们已收到您的预订请求，确认邮件将发送至您的邮箱。' : 'We received your booking. A confirmation email will be sent to you.' }}</p>
            
            <div class="booking-summary">
              <div class="summary-item">
                <span class="summary-label">{{ currentLang === 'zh' ? '服务' : 'Service' }}</span>
                <span class="summary-value">{{ service ? (currentLang === 'zh' ? service.titleCn : service.titleEn) : '' }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">{{ currentLang === 'zh' ? '日期' : 'Date' }}</span>
                <span class="summary-value">{{ date }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">{{ currentLang === 'zh' ? '人数' : 'Guests' }}</span>
                <span class="summary-value">{{ guests }}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">{{ currentLang === 'zh' ? '城市' : 'City' }}</span>
                <span class="summary-value">{{ getCityName(city) }}</span>
              </div>
            </div>

            <button class="btn-primary btn-full" @click="close">
              {{ currentLang === 'zh' ? '完成' : 'Done' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 滑动验证码 -->
    <SliderCaptcha
      v-model="showCaptcha"
      @success="onCaptchaSuccess"
    />
  </Teleport>
</template>

<style scoped>
/* ==================== Six Senses 风格 ==================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f4;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #57534e;
  transition: all 0.2s;
  z-index: 10;
}

.close-btn:hover {
  background: #e7e5e4;
  color: #1c1917;
}

.modal-content {
  padding: 2.5rem 2rem 2rem;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 0.5rem;
}

.modal-header p {
  font-size: 0.875rem;
  color: #78716c;
}

/* 服务摘要 */
.service-summary {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #fafaf9;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.service-thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.service-info {
  flex: 1;
}

.service-title {
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 0.25rem;
}

.service-price {
  font-size: 0.875rem;
  color: #C9A962;
  font-weight: 500;
}

/* 联系方式切换 */
.contact-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.toggle-btn {
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid #e7e5e4;
  border-radius: 8px;
  background: white;
  font-size: 0.875rem;
  color: #57534e;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn.active {
  border-color: #2C5F6E;
  background: #f0f9f9;
  color: #2C5F6E;
}

/* 输入框 */
.input-group {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #44403c;
  margin-bottom: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid #e7e5e4;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #2C5F6E;
  box-shadow: 0 0 0 3px rgba(44, 95, 110, 0.1);
}

.textarea-field {
  resize: vertical;
  min-height: 80px;
}

.select-field {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2378716c' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* 验证码行 */
.code-input-row {
  display: flex;
  gap: 0.5rem;
}

.code-input-row .input-field {
  flex: 1;
}

.btn-resend {
  padding: 0 1rem;
  background: #fafaf9;
  border: 1.5px solid #e7e5e4;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #57534e;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-resend:hover:not(:disabled) {
  background: #f5f5f4;
  border-color: #d6d3d1;
}

.btn-resend:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 人数选择器 */
.guests-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.guest-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid #e7e5e4;
  background: white;
  font-size: 1.25rem;
  color: #44403c;
  cursor: pointer;
  transition: all 0.2s;
}

.guest-btn:hover {
  border-color: #2C5F6E;
  background: #f0f9f9;
}

.guest-count {
  font-size: 1.25rem;
  font-weight: 600;
  min-width: 2rem;
  text-align: center;
}

/* 复选框 */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: #57534e;
  margin-bottom: 1.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #C9A962;
  margin-top: 2px;
}

.checkbox-label a {
  color: #2C5F6E;
  text-decoration: underline;
}

/* 按钮 */
.btn-primary {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #2C5F6E 0%, #3a7a8c 100%);
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(44, 95, 110, 0.25);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-gold {
  background: linear-gradient(135deg, #C9A962 0%, #D4AF37 100%);
}

.btn-gold:hover:not(:disabled) {
  box-shadow: 0 8px 20px rgba(201, 169, 98, 0.35);
}

.btn-secondary {
  padding: 1rem 2rem;
  background: white;
  border: 1.5px solid #e7e5e4;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #57534e;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #d6d3d1;
  background: #fafaf9;
}

.btn-full {
  width: 100%;
}

.step-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.step-actions .btn-secondary {
  flex: 1;
}

.step-actions .btn-primary {
  flex: 2;
}

/* 隐私提示 */
.privacy-notice {
  text-align: center;
  font-size: 0.75rem;
  color: #a8a29e;
  margin-top: 1rem;
}

.privacy-notice a {
  color: #2C5F6E;
}

/* 成功页面 */
.success-content {
  text-align: center;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-content h2 {
  color: #065f46;
  margin-bottom: 0.5rem;
}

.success-content p {
  color: #78716c;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.booking-summary {
  background: #fafaf9;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e7e5e4;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-size: 0.875rem;
  color: #78716c;
}

.summary-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1c1917;
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.95) translateY(10px);
}

/* 响应式 */
@media (max-width: 480px) {
  .modal-content {
    padding: 2rem 1.5rem 1.5rem;
  }
  
  .step-actions {
    flex-direction: column;
  }
  
  .step-actions .btn-primary {
    order: 1;
  }
  
  .step-actions .btn-secondary {
    order: 2;
  }
}
</style>