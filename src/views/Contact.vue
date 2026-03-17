<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'
import { ref, onMounted, onUnmounted } from 'vue'

// 核心服务旅程卡片 - 替代传统表单
const journeyCards = [
  {
    index: '01',
    titleCn: '初始咨询',
    titleEn: 'Initial Consultation',
    descCn: '从一次对话，开启您的医疗路径',
    descEn: 'Begin your medical journey with a conversation',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop',
    imageAlt: 'Private consultation room'
  },
  {
    index: '02',
    titleCn: '医疗对接',
    titleEn: 'Clinical Access',
    descCn: '连接值得信任的医疗体系',
    descEn: 'Connect with a trusted medical system',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop',
    imageAlt: 'Advanced medical facilities'
  },
  {
    index: '03',
    titleCn: '驻留与康复',
    titleEn: 'Residency & Recovery',
    descCn: '在疗愈的环境中，回归身体的节奏',
    descEn: 'Return to your body\'s natural rhythm in a healing environment',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&h=900&fit=crop',
    imageAlt: 'Luxury wellness residence'
  },
  {
    index: '04',
    titleCn: '预防与筛查',
    titleEn: 'Preventive Screening',
    descCn: '在问题出现之前，理解身体',
    descEn: 'Understand your body before issues arise',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&h=900&fit=crop',
    imageAlt: 'Comprehensive health checkup'
  }
]

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  journeyType: '',
  message: '',
})

const isSubmitting = ref(false)

// 轮播控制
const currentIndex = ref(0)
const autoPlayInterval = ref<number | null>(null)
const autoPlayDelay = 5000 // 5秒自动切换

// 切换到指定卡片
const goToSlide = (index: number) => {
  currentIndex.value = index
  resetAutoPlay()
}

// 上一张
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + journeyCards.length) % journeyCards.length
  resetAutoPlay()
}

// 下一张
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % journeyCards.length
  resetAutoPlay()
}

// 重置自动播放
const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

// 开始自动播放
const startAutoPlay = () => {
  if (autoPlayInterval.value) return
  autoPlayInterval.value = window.setInterval(() => {
    nextSlide()
  }, autoPlayDelay)
}

// 停止自动播放
const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// 鼠标悬停时暂停自动播放
const handleMouseEnter = () => {
  stopAutoPlay()
}

const handleMouseLeave = () => {
  startAutoPlay()
}

// 触摸滑动支持
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide() // 左滑，下一张
    } else {
      prevSlide() // 右滑，上一张
    }
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  // TODO: API call to submit咨询
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  // Reset form after submission
  form.value = {
    fullName: '',
    email: '',
    phone: '',
    journeyType: '',
    message: '',
  }
}

// 生命周期
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section - 在 Banner 区域下方 -->
    <section class="page-hero">
      <img class="hero-bg" src="@/assets/images/contact-hero.jpg" alt="Contact Hero" />
      
      <div class="hero-overlay"></div>
      
      <div class="hero-content container">
        <!-- 中文版本 -->
        <div v-show="currentLang === 'zh'" class="hero-content-zh">
          <h1 class="title-cn">联系我们</h1>
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
          <div class="cta-button">
            <a href="#journey" class="btn-scroll">
              开始您的旅程 →
            </a>
          </div>
        </div>
        
        <!-- 英文版本 -->
        <div v-show="currentLang === 'en'" class="hero-content-en">
          <h1 class="title-en">Contact Us</h1>
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
          <div class="cta-button">
            <a href="#journey" class="btn-scroll">
              Begin Your Journey →
            </a>
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
        </div>
      </div>
    </section>

    <!-- Care Journey Section - 单卡片轮播 -->
    <section class="care-journey-section" id="journey">
      <div class="journey-slider" 
           @mouseenter="handleMouseEnter" 
           @mouseleave="handleMouseLeave"
           @touchstart="handleTouchStart"
           @touchend="handleTouchEnd">
        
        <!-- 轮播指示器 -->
        <div class="slider-indicators">
          <div 
            v-for="(card, index) in journeyCards" 
            :key="index"
            :class="['indicator', { active: index === currentIndex }]"
            @click="goToSlide(index)"
          >
            <span class="indicator-index">{{ card.index }}</span>
          </div>
        </div>

        <!-- 导航按钮 -->
        <button class="nav-btn prev" @click="prevSlide" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="nav-btn next" @click="nextSlide" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- 单卡片展示 -->
        <div class="slider-track">
          <transition name="slide" mode="out-in">
            <div 
              :key="currentIndex" 
              class="journey-card"
            >
              <div class="card-image">
                <img 
                  :src="journeyCards[currentIndex].image" 
                  :alt="journeyCards[currentIndex].imageAlt"
                  loading="lazy"
                />
              </div>
              
              <div class="card-content">
                <span class="card-index">{{ journeyCards[currentIndex].index }}</span>
                
                <h3 class="card-title">
                  <span class="title-cn">{{ journeyCards[currentIndex].titleCn }}</span>
                  <span class="title-en">{{ journeyCards[currentIndex].titleEn }}</span>
                </h3>
                
                <p class="card-desc">
                  <span class="desc-cn">{{ journeyCards[currentIndex].descCn }}</span>
                  <span class="desc-en">{{ journeyCards[currentIndex].descEn }}</span>
                </p>
                
                <router-link :to="{ path: '/contact', hash: '#form' }" class="card-link">
                  <span v-show="currentLang === 'zh'" class="link-cn">→ 开始咨询</span>
                  <span v-show="currentLang === 'en'" class="link-en">→ Book Consultation</span>
                </router-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- 移动端滑动提示 -->
        <div class="mobile-hint">
          <span v-show="currentLang === 'zh'">← 滑动查看更多</span>
          <span v-show="currentLang === 'en'">← Swipe to explore</span>
        </div>
      </div>
    </section>

        <!-- Contact Form Section -->
    <section class="contact-form-section" id="form">
      <div class="container">
        <div class="form-section">
          <h3 class="form-title">
            <span v-show="currentLang === 'zh'" class="form-title-cn">发送咨询</span>
            <span v-show="currentLang === 'en'" class="form-title-en">Send Us a Message</span>
          </h3>
          
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="fullName">
                  <span v-show="currentLang === 'zh'">姓名</span>
                  <span v-show="currentLang === 'en'">Full Name</span>
                </label>
                <input
                  id="fullName"
                  v-model="form.fullName"
                  type="text"
                  required
                  :placeholder="currentLang === 'zh' ? '您的姓名' : 'Your name'"
                />
              </div>

              <div class="form-group">
                <label for="email">
                  <span v-show="currentLang === 'zh'">邮箱</span>
                  <span v-show="currentLang === 'en'">Email</span>
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
                <label for="phone">
                  <span v-show="currentLang === 'zh'">电话</span>
                  <span v-show="currentLang === 'en'">Phone</span>
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  :placeholder="currentLang === 'zh' ? '+86 XXX XXXX XXXX' : '+86 XXX XXXX XXXX'"
                />
              </div>

              <div class="form-group">
                <label for="journeyType">
                  <span v-show="currentLang === 'zh'">旅程类型</span>
                  <span v-show="currentLang === 'en'">Journey Type</span>
                </label>
                <select id="journeyType" v-model="form.journeyType">
                  <option value="" disabled>
                    {{ currentLang === 'zh' ? '请选择旅程类型' : 'Select journey type' }}
                  </option>
                  <option value="consultation">
                    {{ currentLang === 'zh' ? '初始咨询' : 'Initial Consultation' }}
                  </option>
                  <option value="treatment">
                    {{ currentLang === 'zh' ? '临床对接' : 'Clinical Access' }}
                  </option>
                  <option value="residency">
                    {{ currentLang === 'zh' ? '驻留康复' : 'Residency & Recovery' }}
                  </option>
                  <option value="screening">
                    {{ currentLang === 'zh' ? '预防筛查' : 'Preventive Screening' }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="message">
                <span v-show="currentLang === 'zh'">留言</span>
                <span v-show="currentLang === 'en'">Message</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                :placeholder="currentLang === 'zh' ? '请告诉我们您的需求...' : 'Tell us about your needs...'"
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-gold" :disabled="isSubmitting">
                {{ isSubmitting ? 
                  (currentLang === 'zh' ? '提交中...' : 'Submitting...') :
                  (currentLang === 'zh' ? '提交咨询' : 'Submit Consultation')
                }}
              </button>
            </div>
          </form>
        </div>

        <!-- 联系方式 -->
        <div class="contact-info">
          <h3 class="info-title">
            <span v-show="currentLang === 'zh'">联系方式</span>
            <span v-show="currentLang === 'en'">Contact Info</span>
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-icon">📞</span>
              <div class="info-content">
                <span class="info-label" v-show="currentLang === 'zh'">电话</span>
                <span class="info-label" v-show="currentLang === 'en'">Phone</span>
                <span class="info-value">400-XXX-XXXX</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">✉️</span>
              <div class="info-content">
                <span class="info-label" v-show="currentLang === 'zh'">邮箱</span>
                <span class="info-label" v-show="currentLang === 'en'">Email</span>
                <span class="info-value">info@wellness-residency.com</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">📍</span>
              <div class="info-content">
                <span class="info-label" v-show="currentLang === 'zh'">地址</span>
                <span class="info-label" v-show="currentLang === 'en'">Address</span>
                <span class="info-value">中国山东省济南市历下区...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  padding-top: var(--header-height);
}

/* Page Hero - 精简版 */
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
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
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

.hero-description-cn,
.hero-description-en {
  text-align: left;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-description-cn p,
.hero-description-en p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: var(--color-white) !important;
}

.hero-description-cn strong,
.hero-description-en strong {
  color: var(--color-secondary) !important;
  font-weight: 600;
}

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

.cta-button {
  margin-top: 2rem;
}

.btn-scroll {
  background: var(--color-secondary);
  color: var(--color-white);
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.btn-scroll:hover {
  background: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(191, 163, 122, 0.3);
  color: var(--color-white);
}

/* Page Banner */
.page-banner {
  position: relative;
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--color-secondary);
}

.page-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/contact-banner-bg.jpg') center/cover no-repeat;
  opacity: 0.3;
}

.banner-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-white);
}

.banner-content h2 {
  margin-bottom: 1rem;
}

.banner-title-cn,
.banner-title-en {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: var(--color-white);
}

.divider {
  color: rgba(255, 255, 255, 0.7);
}

.current {
  color: var(--color-white);
  font-weight: 500;
}

/* Intro Section */
.intro-section {
  padding: var(--spacing-xxl) 0;
  background: linear-gradient(135deg, var(--color-off-white) 0%, var(--color-white) 100%);
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-content h2 {
  margin-bottom: 2rem;
}

.intro-title-cn,
.intro-title-en {
  display: block;
  font-size: 2.5rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.intro-text {
  margin-bottom: 2rem;
  line-height: 1.8;
}

.intro-highlight {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: 50px;
}

.highlight-cn,
.highlight-en {
  color: var(--color-white) !important;
  font-size: 1.25rem;
  font-weight: 600;
}

/* Care Journey Section - 单卡片轮播 */
.care-journey-section {
  padding: 0;
  background-color: var(--color-sand);
}

.journey-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  max-height: 900px;
  overflow: hidden;
}

/* 轮播指示器 */
.slider-indicators {
  position: absolute;
  top: 50%;
  left: var(--spacing-lg);
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.indicator {
  width: 50px;
  height: 50px;
  border: 2px solid rgba(26, 26, 26, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;
}

.indicator:hover {
  border-color: var(--color-secondary);
  background-color: rgba(201, 169, 98, 0.1);
}

.indicator.active {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.indicator-index {
  font-size: 0.875rem;
  color: var(--color-black);
  font-weight: 500;
}

.indicator.active .indicator-index {
  color: var(--color-white);
}

/* 导航按钮 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border: 2px solid rgba(26, 26, 26, 0.2);
  background-color: var(--color-white);
  color: var(--color-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  border-color: var(--color-secondary);
  background-color: var(--color-secondary);
  color: var(--color-white);
}

.nav-btn.prev {
  left: calc(50% - 550px);
}

.nav-btn.next {
  right: calc(50% - 550px);
}

/* 轮播轨道 */
.slider-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-xxl);
}

/* 单卡片 */
.journey-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

.card-image {
  position: relative;
  width: 100%;
  height: 65vh;
  min-height: 450px;
  overflow: hidden;
  border-radius: 8px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 8s ease;
}

.journey-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: var(--color-white);
  text-align: left;
}

.card-index {
  font-family: var(--font-primary);
  font-size: 3rem;
  color: var(--color-secondary);
  display: block;
  margin-bottom: 0.5rem;
}

.card-title {
  font-family: var(--font-primary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.card-title .title-cn {
  display: block;
  margin-bottom: 0.25rem;
}

.card-title .title-en {
  display: block;
  font-size: 1.25rem;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.card-desc {
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 600px;
}

.card-desc .desc-cn {
  display: block;
  margin-bottom: 0.5rem;
}

.card-desc .desc-en {
  display: block;
  font-size: 1rem;
  opacity: 0.8;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: var(--color-secondary);
  color: var(--color-white);
  font-size: 0.9375rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.card-link:hover {
  background-color: var(--color-white);
  color: var(--color-black);
  transform: translateX(5px);
}

/* 移动端提示 */
.mobile-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-stone);
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  z-index: 10;
}

/* 幻灯片过渡动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Contact Form Section */
.contact-form-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-off-white);
}

.form-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-title {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title .form-title-cn {
  display: block;
  font-size: 2rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.form-title .form-title-en {
  display: block;
  font-size: 1.25rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9375rem;
  color: var(--color-black);
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.875rem;
  border: 1px solid var(--color-sand);
  border-radius: 8px;
  font-family: var(--font-secondary);
  font-size: 0.9375rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
}

.form-actions {
  margin-top: 1rem;
  text-align: center;
}

/* Contact Info */
.contact-info {
  margin-top: 3rem;
  padding: 3rem;
  background-color: var(--color-sand);
  border-radius: 16px;
  color: var(--color-black);
}

.info-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-black);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.info-icon {
  font-size: 2.5rem;
}

.info-label {
  display: block;
  font-size: 0.875rem;
  opacity: 0.8;
}

.info-value {
  display: block;
  font-size: 1.125rem;
}

/* Responsive */
@media (max-width: 768px) {
  .journey-slider {
    height: auto;
    min-height: auto;
    max-height: none;
    padding: 3rem 0;
  }
  
  .slider-indicators {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .nav-btn {
    display: none;
  }
  
  .card-image {
    height: 50vh;
    min-height: 350px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-index {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .card-desc {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .card-link {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
  
  .mobile-hint {
    display: block;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) {
  .mobile-hint {
    display: none;
  }
}
</style>
