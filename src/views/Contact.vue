<script setup lang="ts">
import { ref } from 'vue'
import { currentLang } from '../composables/useLanguage'

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  membership: 'undecided',
  message: '',
  language: 'en',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const membershipOptions = [
  { value: 'undecided', cn: '尚未决定', en: 'Undecided' },
  { value: 'basic', cn: '基础康养驻留', en: 'Basic Wellness Residency' },
  { value: 'medical', cn: '医疗康养驻留', en: 'Medical Wellness Residency' },
  { value: 'premium', cn: '高端医疗会员', en: 'Premium Medical Residency' },
]

const handleSubmit = async () => {
  isSubmitting.value = true
  // TODO: API call to submit consultation
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  submitSuccess.value = true
}
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <img class="hero-bg" src="@/assets/images/contact-hero.jpg" alt="Contact Hero" />
      
      <div class="hero-overlay"></div>
      
      <div class="hero-content container">
        <!-- 中文版本 -->
        <div v-show="currentLang === 'zh'" class="hero-content-zh">
          <h1 class="title-cn">预约咨询</h1>
          <p class="hero-subtitle-cn">
            开启您的健康驻留之旅
          </p>
          <div class="hero-description-cn">
            <p>
              无论您是想了解<strong>会员计划详情</strong>，还是需要<strong>定制化的康养方案</strong>，
              我们的专业团队都将为您提供一对一的咨询服务。
            </p>
            <p>
              填写下方表单，我们将在<strong>24 小时内</strong>与您联系，为您解答所有疑问。
              我们的多语言客服团队支持中文、英文、俄语、阿拉伯语等多种语言，确保沟通无障碍。
            </p>
          </div>
          <div class="hero-tabs-cn">
            <div class="hero-tab">
              <span class="tab-text">24/7 多语言客服支持</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">专业医疗顾问团队</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">快速响应 24 小时内联系</span>
            </div>
          </div>
        </div>
        
        <!-- 英文版本 -->
        <div v-show="currentLang === 'en'" class="hero-content-en">
          <h1 class="title-en">Book a Consultation</h1>
          <p class="hero-subtitle-en">
            Begin Your Wellness Residency Journey
          </p>
          <div class="hero-description-en">
            <p>
              Whether you want to learn more about our <strong>membership plans</strong> or need a <strong>customized wellness solution</strong>,
              our professional team is ready to provide one-on-one consultation.
            </p>
            <p>
              Fill out the form below, and we'll contact you within <strong>24 hours</strong> to answer all your questions.
              Our multilingual customer service team supports Chinese, English, Russian, Arabic, and more, ensuring seamless communication.
            </p>
          </div>
          <div class="hero-tabs-en">
            <div class="hero-tab">
              <span class="tab-text">24/7 Multilingual Support</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">Professional Medical Advisors</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">Fast Response Within 24 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-content">
          <h2>
            <span v-show="currentLang === 'zh'" class="intro-title-cn">我们随时为您服务</span>
            <span v-show="currentLang === 'en'" class="intro-title-en">We're Here to Help</span>
          </h2>
          <p class="intro-text">
            <span v-show="currentLang === 'zh'" class="intro-desc-cn">
              无论您是想了解会员计划详情，还是需要定制化的康养方案，我们的专业团队都将为您提供一对一的咨询服务。
              填写下方表单，我们将在 24 小时内与您联系，为您解答所有疑问。
            </span>
            <span v-show="currentLang === 'en'" class="intro-desc-en">
              Whether you want to learn more about our membership plans or need a customized wellness solution,
              our professional team is ready to provide one-on-one consultation. Fill out the form below,
              and we'll contact you within 24 hours to answer all your questions.
            </span>
          </p>
          <p class="intro-highlight">
            <span v-show="currentLang === 'zh'" class="highlight-cn">首次咨询完全免费，无需任何承诺</span>
            <span v-show="currentLang === 'en'" class="highlight-en">First consultation is completely free with no obligation</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <div v-if="!submitSuccess" class="contact-form">
              <h2>
                <span class="form-title-cn">发送咨询</span>
                <span class="form-title-en">Send Us a Message</span>
              </h2>
              
              <form @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label for="fullName">
                    <span class="label-cn">姓名</span>
                    <span class="label-en">Full Name</span>
                  </label>
                  <input
                    id="fullName"
                    v-model="form.fullName"
                    type="text"
                    required
                    placeholder="Your name"
                  />
                </div>

                <div class="form-group">
                  <label for="email">
                    <span class="label-cn">邮箱</span>
                    <span class="label-en">Email</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div class="form-group">
                  <label for="phone">
                    <span class="label-cn">电话</span>
                    <span class="label-en">Phone Number</span>
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+86 XXX XXXX XXXX"
                  />
                </div>

                <div class="form-group">
                  <label for="membership">
                    <span class="label-cn">意向会员等级</span>
                    <span class="label-en">Preferred Membership</span>
                  </label>
                  <select id="membership" v-model="form.membership">
                    <option
                      v-for="option in membershipOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.cn }} / {{ option.en }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">
                    <span class="label-cn">留言</span>
                    <span class="label-en">Message</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    placeholder="Tell us about your needs..."
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-gold" :disabled="isSubmitting">
                  {{ isSubmitting ? '提交中...' : '提交咨询' }}
                </button>
              </form>
            </div>

            <div v-else class="success-message">
              <span class="success-icon">✓</span>
              <h3>
                <span class="success-cn">咨询已提交</span>
                <span class="success-en">Consultation Submitted</span>
              </h3>
              <p>
                <span class="success-desc-cn">我们将在 24 小时内回复您的咨询。</span>
                <span class="success-desc-en">We'll respond within 24 hours.</span>
              </p>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="contact-info-wrapper">
            <h2>
              <span class="info-title-cn">联系方式</span>
              <span class="info-title-en">Contact Information</span>
            </h2>

            <div class="contact-methods">
              <div class="contact-method">
                <span class="method-icon">📧</span>
                <div class="method-content">
                  <span class="method-label">
                    <span class="label-cn">电子邮箱</span>
                    <span class="label-en">Email</span>
                  </span>
                  <a href="mailto:concierge@chinawellnessresidency.com">
                    concierge@chinawellnessresidency.com
                  </a>
                </div>
              </div>

              <div class="contact-method">
                <span class="method-icon">📞</span>
                <div class="method-content">
                  <span class="method-label">
                    <span class="label-cn">咨询热线</span>
                    <span class="label-en">Hotline</span>
                  </span>
                  <a href="tel:+86XXXXXXXXXXX">+86-XXX-XXXX-XXXX</a>
                </div>
              </div>

              <div class="contact-method">
                <span class="method-icon">💬</span>
                <div class="method-content">
                  <span class="method-label">
                    <span class="label-cn">在线聊天</span>
                    <span class="label-en">Live Chat</span>
                  </span>
                  <p>
                    <span class="chat-desc-cn">点击右下角图标，即时沟通</span>
                    <span class="chat-desc-en">Click the icon in the bottom right corner</span>
                  </p>
                </div>
              </div>

              <div class="contact-method">
                <span class="method-icon">📍</span>
                <div class="method-content">
                  <span class="method-label">
                    <span class="label-cn">线下中心</span>
                    <span class="label-en">Visit Us</span>
                  </span>
                  <p>
                    <span class="visit-desc-cn">预约参观我们的康养展示中心</span>
                    <span class="visit-desc-en">Schedule a tour of our wellness showcase center</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="response-time">
              <span class="time-icon">⏱</span>
              <span class="time-text">
                <span class="time-cn">我们将在 24 小时内回复</span>
                <span class="time-en">We'll respond within 24 hours</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (Optional) -->
    <section class="map-section">
      <img class="map-bg" src="@/assets/images/office-location.jpg" alt="Office Location" />
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  padding-top: var(--header-height);
}

/* Page Hero */
.page-hero {
  position: relative;
  width: 100%;
  min-height: 500px;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-white);
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 2.5rem;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
}

.title-cn,
.title-en {
  display: block;
  margin-bottom: 1rem;
  color: var(--color-white) !important;
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.hero-subtitle-cn,
.hero-subtitle-en {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-sand) !important;
  font-weight: 500;
}

/* Hero Description - Chinese */
.hero-description-cn {
  text-align: left;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-description-cn p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: var(--color-white) !important;
}

.hero-description-cn strong {
  color: var(--color-secondary) !important;
  font-weight: 600;
}

/* Hero Description - English */
.hero-description-en {
  text-align: left;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-description-en p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: var(--color-white) !important;
}

.hero-description-en strong {
  color: var(--color-secondary) !important;
  font-weight: 600;
}

/* Hero Highlights */
.hero-highlights-cn,
.hero-highlights-en {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.highlight-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.highlight-text {
  font-size: 1rem;
  color: var(--color-white) !important;
  text-align: left;
}

/* Hero Tabs - 标签样式 */
.hero-tabs-cn,
.hero-tabs-en {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.hero-tab {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  cursor: default;
  white-space: nowrap;
}

.hero-tab:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.tab-text {
  font-size: 1rem;
  color: var(--color-white) !important;
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-highlights-cn,
  .hero-highlights-en {
    grid-template-columns: 1fr;
  }
  
  .hero-description-cn,
  .hero-description-en {
    text-align: center;
  }
  
  .highlight-item {
    justify-content: center;
  }
  
  .highlight-text {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .hero-description-cn,
  .hero-description-en {
    padding: 1.5rem;
  }
  
  .hero-description-cn p,
  .hero-description-en p {
    font-size: 1rem;
  }
  
  .hero-subtitle-cn,
  .hero-subtitle-en {
    font-size: 1.25rem;
  }
  
  .highlight-item {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  
  .highlight-icon {
    font-size: 2.5rem;
  }
  
  .highlight-text {
    font-size: 0.9375rem;
  }
}

/* Contact Section */
.contact-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
}

/* Contact Form */
.contact-form {
  padding: 2rem;
}

.contact-form h2,
.contact-info-wrapper h2 {
  margin-bottom: 2rem;
}

.form-title-cn {
  display: block;
  font-size: 2rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.form-title-en {
  display: block;
  font-size: 1.25rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
  color: var(--color-black);
}

.label-cn {
  display: block;
  margin-bottom: 0.25rem;
}

.label-en {
  display: block;
  font-size: 0.75rem;
  color: var(--color-stone);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-sand);
  font-family: var(--font-secondary);
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background-color: var(--color-white);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group textarea {
  resize: vertical;
}

/* Success Message */
.success-message {
  text-align: center;
  padding: 4rem 2rem;
}

.success-icon {
  display: inline-block;
  width: 80px;
  height: 80px;
  line-height: 80px;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 2.5rem;
  border-radius: 50%;
  margin-bottom: 2rem;
}

.success-message h3 {
  margin-bottom: 1rem;
}

.success-cn {
  display: block;
  font-size: 1.75rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.success-en {
  display: block;
  font-size: 1.25rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.success-desc-cn {
  display: block;
  color: var(--color-stone);
  margin-bottom: 0.5rem;
}

.success-desc-en {
  display: block;
  color: var(--color-stone);
}

/* Contact Info */
.contact-info-wrapper {
  padding: 2rem;
  background-color: var(--color-off-white);
}

.info-title-cn {
  display: block;
  font-size: 2rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.info-title-en {
  display: block;
  font-size: 1.25rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.contact-methods {
  margin: 2rem 0;
}

.contact-method {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.method-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.method-content {
  flex: 1;
}

.method-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
  color: var(--color-black);
}

.method-content .label-cn {
  display: block;
}

.method-content .label-en {
  display: block;
  font-size: 0.6875rem;
  color: var(--color-stone);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.method-content a {
  color: var(--color-primary);
  font-size: 1.0625rem;
  transition: color 0.2s ease;
}

.method-content a:hover {
  color: var(--color-secondary);
}

.method-content p {
  font-size: 0.9375rem;
  color: var(--color-stone);
}

.chat-desc-cn,
.visit-desc-cn {
  display: block;
  margin-bottom: 0.25rem;
}

.chat-desc-en,
.visit-desc-en {
  display: block;
  font-size: 0.8125rem;
}

.response-time {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--color-sand);
  margin-top: 2rem;
}

.time-icon {
  font-size: 1.5rem;
}

.time-text {
  font-size: 0.9375rem;
  color: var(--color-stone);
}

.time-cn {
  display: block;
  margin-bottom: 0.25rem;
}

.time-en {
  display: block;
  font-size: 0.8125rem;
}

/* Map Section */
.map-section {
  height: 400px;
}

.map-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .hero-tabs-cn,
  .hero-tabs-en {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-tab {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
  
  .tab-text {
    font-size: 0.9375rem;
  }
}
</style>
