<script setup lang="ts">
import { ref } from 'vue'
import { currentLang } from '../composables/useLanguage'

const form = ref({
  fullName: '',
  email: '',
  whatsapp: '',
  customerType: '',
  services: [] as string[],
  expectedDate: '',
  duration: '',
  budget: '',
  specialNeeds: '',
  source: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// 客户类型选项
const customerTypeOptions = [
  { value: 'expat', labelCn: '外籍商务人士', labelEn: 'Expat Business Professional' },
  { value: 'medical', labelCn: '医疗旅游客户', labelEn: 'Medical Tourist' },
  { value: 'wellness', labelCn: '康养度假客户', labelEn: 'Wellness Vacationer' },
  { value: 'retired', labelCn: '退休外籍人士', labelEn: 'Retired Expat' },
  { value: 'nomad', labelCn: '数字游民', labelEn: 'Digital Nomad' },
]

// 服务类型选项
const serviceOptions = [
  { value: 'healthCheck', labelCn: '健康体检', labelEn: 'Health Checkup' },
  { value: 'tcm', labelCn: '中医理疗', labelEn: 'TCM Therapy' },
  { value: 'rehab', labelCn: '康复治疗', labelEn: 'Rehabilitation' },
  { value: 'wellnessResidency', labelCn: '康养驻留', labelEn: 'Wellness Residency' },
  { value: 'visaAssist', labelCn: '签证协助', labelEn: 'Visa Assistance' },
  { value: 'other', labelCn: '其他', labelEn: 'Other' },
]

// 停留时长选项
const durationOptions = [
  { value: '7-14days', labelCn: '7-14天', labelEn: '7-14 Days' },
  { value: '30days', labelCn: '30天', labelEn: '30 Days' },
  { value: '60days', labelCn: '60天', labelEn: '60 Days' },
  { value: '90days', labelCn: '90天', labelEn: '90 Days' },
  { value: '90days+', labelCn: '90天以上', labelEn: '90+ Days' },
  { value: 'unsure', labelCn: '不确定', labelEn: 'Not Sure' },
]

// 预算选项
const budgetOptions = [
  { id: 'all', labelCn: '全部价格', labelEn: 'All Prices' },
  { id: 'low', labelCn: '$5,000以下', labelEn: 'Below $5,000' },
  { id: 'medium', labelCn: '$5,000-$10,000', labelEn: '$5,000 - $10,000' },
  { id: 'high', labelCn: '$10,000-$30,000', labelEn: '$10,000 - $30,000' },
  { id: 'premium', labelCn: '$30,000-$100,000', labelEn: '$30,000 - $100,000' },
  { id: 'over100k', labelCn: '$100,000以上', labelEn: 'Over $100,000' },
]

// 信息来源选项
const sourceOptions = [
  { value: 'instagram', labelCn: 'Instagram', labelEn: 'Instagram' },
  { value: 'google', labelCn: 'Google搜索', labelEn: 'Google Search' },
  { value: 'referral', labelCn: '朋友推荐', labelEn: 'Friend Referral' },
  { value: 'other', labelCn: '其他', labelEn: 'Other' },
]

const handleSubmit = async () => {
  // 前端验证
  if (!form.value.fullName || form.value.fullName.length < 2) {
    submitError.value = currentLang.value === 'zh' ? '请输入有效的姓名' : 'Please enter a valid name'
    return
  }

  if (!form.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    submitError.value = currentLang.value === 'zh' ? '请输入有效的邮箱地址' : 'Please enter a valid email address'
    return
  }

  if (!form.value.whatsapp) {
    submitError.value = currentLang.value === 'zh' ? '请输入WhatsApp或微信联系方式' : 'Please enter WhatsApp or WeChat contact'
    return
  }

  if (!form.value.customerType) {
    submitError.value = currentLang.value === 'zh' ? '请选择客户类型' : 'Please select customer type'
    return
  }

  if (!form.value.services || form.value.services.length === 0) {
    submitError.value = currentLang.value === 'zh' ? '请选择至少一项感兴趣的服务' : 'Please select at least one service'
    return
  }

  if (!form.value.expectedDate) {
    submitError.value = currentLang.value === 'zh' ? '请选择预计来华时间' : 'Please select expected arrival date'
    return
  }

  if (!form.value.duration) {
    submitError.value = currentLang.value === 'zh' ? '请选择预计停留时长' : 'Please select expected duration'
    return
  }

  if (!form.value.budget) {
    submitError.value = currentLang.value === 'zh' ? '请选择预算范围' : 'Please select budget range'
    return
  }

  // 日期验证：不能选择过去日期
  const selectedDate = new Date(form.value.expectedDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (selectedDate < today) {
    submitError.value = currentLang.value === 'zh' ? '预计来华时间不能是过去日期' : 'Expected arrival date cannot be in the past'
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  try {
    // 模拟API调用
    console.log('Submitting form:', form.value)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 提交成功
    submitSuccess.value = true

    // 重置表单
    form.value = {
      fullName: '',
      email: '',
      whatsapp: '',
      customerType: '',
      services: [],
      expectedDate: '',
      duration: '',
      budget: '',
      specialNeeds: '',
      source: '',
    }

    // 5秒后隐藏成功提示
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    submitError.value = currentLang.value === 'zh' ? '提交失败，请稍后重试' : 'Submission failed, please try again later'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <img class="hero-bg" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80" alt="Contact Hero" style="position: absolute; top: 80px; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;" />
      
      <div class="hero-overlay"></div>
      
      <div class="hero-content container">
        <div class="hero-subtitle">
          <span v-show="currentLang === 'zh'" class="hero-subtitle-cn">联系我们</span>
          <span v-show="currentLang === 'en'" class="hero-subtitle-en">Contact Us</span>
        </div>
        
        <h1>
          <span v-show="currentLang === 'zh'">开启您的中国康养之旅</span>
          <span v-show="currentLang === 'en'">Begin Your China Wellness Journey</span>
        </h1>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-form-section" id="form">
      <div class="container">
        <div class="form-section">
          <h3 class="form-title">
            <span v-show="currentLang === 'zh'" class="form-title-cn">预约咨询</span>
            <span v-show="currentLang === 'en'" class="form-title-en">Book Consultation</span>
          </h3>

          <!-- 成功提示 -->
          <div v-if="submitSuccess" class="success-message">
            <span class="success-icon">✓</span>
            <span v-show="currentLang === 'zh'" class="success-text-cn">提交成功！我们将在 24 小时内与您联系。</span>
            <span v-show="currentLang === 'en'" class="success-text-en">Success! We'll contact you within 24 hours.</span>
          </div>

          <!-- 错误提示 -->
          <div v-if="submitError" class="error-message">
            <span class="error-icon">⚠</span>
            <span>{{ submitError }}</span>
          </div>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <!-- 基本信息行 -->
            <div class="form-row">
              <div class="form-group">
                <label for="fullName">
                  <span v-show="currentLang === 'zh'">姓名 *</span>
                  <span v-show="currentLang === 'en'">Full Name *</span>
                </label>
                <input
                  id="fullName"
                  v-model="form.fullName"
                  type="text"
                  required
                  :placeholder="currentLang === 'zh' ? '您的姓名' : 'Your full name'"
                />
              </div>

              <div class="form-group">
                <label for="email">
                  <span v-show="currentLang === 'zh'">邮箱 *</span>
                  <span v-show="currentLang === 'en'">Email *</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  :placeholder="currentLang === 'zh' ? '您的邮箱' : 'your@email.com'"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="whatsapp">
                  <span v-show="currentLang === 'zh'">WhatsApp / 微信 *</span>
                  <span v-show="currentLang === 'en'">WhatsApp / WeChat *</span>
                </label>
                <input
                  id="whatsapp"
                  v-model="form.whatsapp"
                  type="tel"
                  required
                  :placeholder="currentLang === 'zh' ? '+86 XXX XXXX XXXX' : '+86 XXX XXXX XXXX'"
                />
              </div>

              <div class="form-group">
                <label for="customerType">
                  <span v-show="currentLang === 'zh'">客户类型 *</span>
                  <span v-show="currentLang === 'en'">Customer Type *</span>
                </label>
                <select id="customerType" v-model="form.customerType" required>
                  <option value="" disabled>
                    {{ currentLang === 'zh' ? '请选择客户类型' : 'Select customer type' }}
                  </option>
                  <option v-for="option in customerTypeOptions" :key="option.value" :value="option.value">
                    {{ currentLang === 'zh' ? option.labelCn : option.labelEn }}
                  </option>
                </select>
              </div>
            </div>

            <!-- 服务多选 -->
            <div class="form-group">
              <label>
                <span v-show="currentLang === 'zh'">感兴趣的服务 *</span>
                <span v-show="currentLang === 'en'">Interested Services *</span>
              </label>
              <div class="checkbox-group">
                <label v-for="option in serviceOptions" :key="option.value" class="checkbox-label">
                  <input
                    type="checkbox"
                    :value="option.value"
                    v-model="form.services"
                  />
                  <span v-show="currentLang === 'zh'">{{ option.labelCn }}</span>
                  <span v-show="currentLang === 'en'">{{ option.labelEn }}</span>
                </label>
              </div>
            </div>

            <!-- 时间和预算 -->
            <div class="form-row">
              <div class="form-group">
                <label for="expectedDate">
                  <span v-show="currentLang === 'zh'">预计来华时间 *</span>
                  <span v-show="currentLang === 'en'">Expected Arrival Date *</span>
                </label>
                <input
                  id="expectedDate"
                  v-model="form.expectedDate"
                  type="date"
                  required
                />
              </div>

              <div class="form-group">
                <label for="duration">
                  <span v-show="currentLang === 'zh'">预计停留时长 *</span>
                  <span v-show="currentLang === 'en'">Expected Duration *</span>
                </label>
                <select id="duration" v-model="form.duration" required>
                  <option value="" disabled>
                    {{ currentLang === 'zh' ? '请选择停留时长' : 'Select duration' }}
                  </option>
                  <option v-for="option in durationOptions" :key="option.value" :value="option.value">
                    {{ currentLang === 'zh' ? option.labelCn : option.labelEn }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="budget">
                <span v-show="currentLang === 'zh'">预算范围（USD） *</span>
                <span v-show="currentLang === 'en'">Budget Range (USD) *</span>
              </label>
              <select id="budget" v-model="form.budget" required>
                <option value="" disabled>
                  {{ currentLang === 'zh' ? '请选择预算范围' : 'Select budget range' }}
                </option>
                <option v-for="option in budgetOptions" :key="option.id" :value="option.id">
                  {{ currentLang === 'zh' ? option.labelCn : option.labelEn }}
                </option>
              </select>
            </div>

            <!-- 特殊需求 -->
            <div class="form-group">
              <label for="specialNeeds">
                <span v-show="currentLang === 'zh'">特殊需求（可选）</span>
                <span v-show="currentLang === 'en'">Special Needs (Optional)</span>
              </label>
              <textarea
                id="specialNeeds"
                v-model="form.specialNeeds"
                rows="3"
                maxlength="500"
                :placeholder="currentLang === 'zh' ? '语言、饮食、无障碍等特殊需求...' : 'Language, dietary, accessibility requirements...'"
              ></textarea>
              <div class="char-count">{{ form.specialNeeds.length }}/500</div>
            </div>

            <!-- 信息来源 -->
            <div class="form-group">
              <label for="source">
                <span v-show="currentLang === 'zh'">如何知道我们</span>
                <span v-show="currentLang === 'en'">How did you hear about us</span>
              </label>
              <select id="source" v-model="form.source">
                <option value="" disabled>
                  {{ currentLang === 'zh' ? '请选择' : 'Select' }}
                </option>
                <option v-for="option in sourceOptions" :key="option.value" :value="option.value">
                  {{ currentLang === 'zh' ? option.labelCn : option.labelEn }}
                </option>
              </select>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-gold" :disabled="isSubmitting">
                {{ isSubmitting ?
                  (currentLang === 'zh' ? '提交中...' : 'Submitting...') :
                  (currentLang === 'zh' ? '提交咨询' : 'Submit Inquiry')
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  --color-primary: #2C5F6E;
  --color-secondary: #C9A962;
  --color-accent: #D4AF37;
  --color-sand: #F5E6D3;
  --color-off-white: #FAF7F2;
  --color-white: #FFFFFF;
  color: var(--color-black);
}

/* Hero Section */
.page-hero {
  position: relative;
  width: 100%;
  min-height: 500px;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px; /* 为header预留空间，避免遮挡banner条 */
}

.hero-bg {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-subtitle {
  font-size: 1.125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.hero-subtitle-cn {
  display: block;
  font-size: 1.125rem;
  color: var(--color-white);
  opacity: 0.95;
}

.hero-subtitle-en {
  display: block;
  font-size: 1rem;
  color: var(--color-white);
  opacity: 0.9;
  letter-spacing: 0.05em;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

/* Contact Form Section */
.contact-form-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-off-white);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.form-section {
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: var(--color-primary);
}

.form-title-cn,
.form-title-en {
  display: block;
  color: var(--color-primary);
}

.form-title-en {
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Success/Error Messages */
.success-message,
.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.success-message {
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: #4CAF50;
}

.success-icon {
  font-size: 1.5rem;
  font-weight: 600;
}

.error-message {
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #F44336;
}

.error-icon {
  font-size: 1.5rem;
  font-weight: 600;
}

/* Form Styling */
.contact-form {
  background-color: var(--color-white);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-group label {
  font-size: 0.9375rem;
  color: #666;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-secondary);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #999;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-off-white);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.checkbox-label:hover {
  background-color: rgba(201, 169, 98, 0.1);
  border-color: rgba(201, 169, 98, 0.3);
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.char-count {
  text-align: right;
  font-size: 0.75rem;
  color: var(--color-stone);
  margin-top: 0.25rem;
}

.form-actions {
  margin-top: 1rem;
  text-align: center;
}

.btn-gold {
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%);
  color: var(--color-white);
  padding: 0.75rem 3rem;
  font-size: 1.125rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-gold:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 169, 98, 0.4);
}

.btn-gold:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkbox-group {
    grid-template-columns: 1fr;
  }
}
</style>