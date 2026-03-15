<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'
import { ref, onMounted, onUnmounted } from 'vue'

const scrollContainer = ref<HTMLElement | null>(null)
const dots = ref<NodeList | null>(null)
let autoScrollInterval: number | null = null

// 滚动控制
const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -400, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 400, behavior: 'smooth' })
  }
}

// 自动滚动
const startAutoScroll = () => {
  if (autoScrollInterval) return
  
  autoScrollInterval = window.setInterval(() => {
    if (scrollContainer.value) {
      const maxScrollLeft = scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth
      
      // 如果已经滚动到末尾，回到开始
      if (scrollContainer.value.scrollLeft >= maxScrollLeft - 10) {
        scrollContainer.value.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollContainer.value.scrollBy({ left: 400, behavior: 'smooth' })
      }
    }
  }, 3000) // 每 3 秒滚动一次
}

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

// 更新滚动点状态
const updateDots = () => {
  if (!scrollContainer.value || !dots.value) return
  
  const scrollPos = scrollContainer.value.scrollLeft
  const cardWidth = 370 // 350px + 20px gap
  const activeIndex = Math.round(scrollPos / cardWidth)
  
  dots.value.forEach((dot: Node, index: number) => {
    const el = dot as Element
    if (index === activeIndex) {
      el.classList.add('active')
    } else {
      el.classList.remove('active')
    }
  })
}

onMounted(() => {
  scrollContainer.value = document.querySelector('.highlights-scroll')
  dots.value = document.querySelectorAll('.scroll-dots .dot')
  
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', updateDots)
  }
  
  // 启动自动滚动
  startAutoScroll()
})

onUnmounted(() => {
  // 清理定时器
  stopAutoScroll()
})
</script>

<template>
  <div class="home">
    <!-- Hero Section - Video Background -->
    <section class="hero">
      <!-- 视频背景 - 压缩优化版本 -->
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="@/assets/images/hero-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      
      <!-- 半透明遮罩 - 让背景变暗，文字更清晰 -->
      <div class="hero-overlay"></div>
      
      <!-- 文字内容层 - z-index 确保在最上层 -->
      <div class="hero-content container">
        <!-- 主标题 -->
        <h1 class="hero-title">
          <span v-show="currentLang === 'zh'" class="title-cn">
            <span class="title-line">这不是一次简单的旅行</span>
            <span class="title-line">而是一种生活方式的延续</span>
          </span>
          <span v-show="currentLang === 'en'" class="title-en">More Than a Journey — A Continuation of Life</span>
        </h1>
        
        <!-- 副标题 -->
        <p class="hero-subtitle">
          <span v-show="currentLang === 'zh'" class="subtitle-cn">每年 30-90 天的中国康养驻留，整合三甲医院医疗资源、中医调理、康复疗养与文化体验。您购买的不是住宿，而是中国顶级医疗康养资源的综合使用权。</span>
          <span v-show="currentLang === 'en'" class="subtitle-en">30-90 days annually of wellness residency in China, integrating top-tier medical care, Traditional Chinese Medicine, rehabilitation, and cultural immersion. You're not booking a stay — you're gaining access to China's premier medical and wellness resources.</span>
        </p>
        
        <div class="hero-cta">
          <router-link to="/membership" class="btn btn-gold">
            {{ currentLang === 'zh' ? '探索会员计划' : 'Explore Memberships' }}
          </router-link>
          <router-link to="/contact" class="btn btn-secondary">
            {{ currentLang === 'zh' ? '预约咨询' : 'Book a Consultation' }}
          </router-link>
        </div>
      </div>
      
      <div class="hero-scroll-indicator">
        <span class="scroll-text">Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Global Wellness Residency Section -->
    <section class="global-residency-section">
      <div class="global-container">
        <div class="global-image-col">
          <img src="@/assets/images/benefit-detail-stay.png" alt="Global Wellness Residency">
        </div>
        <div class="global-content-col">
          <h3 class="global-heading">
            <span v-show="currentLang === 'zh'" class="heading-cn">全球健康驻留中心</span>
            <span v-show="currentLang === 'en'" class="heading-en">Global Wellness Residency Center</span>
          </h3>
          <p class="global-paragraph">
            <span v-show="currentLang === 'zh'" class="paragraph-cn">平台面向全球会员开放，来自世界各地的客户通过平台来到中国，在山东体验融合医疗、康养与自然疗愈的健康生活方式。</span>
            <span v-show="currentLang === 'en'" class="paragraph-en">The platform is open to global members. Clients from around the world come to China through the platform to experience a healthy lifestyle integrating medical care, wellness, and natural healing in Shandong.</span>
          </p>
          <p class="global-paragraph">
            <span v-show="currentLang === 'zh'" class="paragraph-cn">依托优质医疗资源、优越自然环境与专业健康管理体系，这里不仅提供医疗支持，更为会员打造长期健康驻留的生活方式。</span>
            <span v-show="currentLang === 'en'" class="paragraph-en">Relying on quality medical resources, superior natural environment, and professional health management systems, we not only provide medical support but also create a long-term wellness residency lifestyle for members.</span>
          </p>

          <div class="core-services">
            <h4 class="services-title">
              <span v-show="currentLang === 'zh'" class="title-cn">核心服务</span>
              <span v-show="currentLang === 'en'" class="title-en">Core Services</span>
            </h4>
            <ul class="services-list">
              <li>
                <span class="service-icon">🏥</span>
                <span v-show="currentLang === 'zh'" class="service-cn">国内顶级三甲医院医疗资源</span>
                <span v-show="currentLang === 'en'" class="service-en">Top-tier domestic tertiary hospital medical resources</span>
              </li>
              <li>
                <span class="service-icon">🗺️</span>
                <span v-show="currentLang === 'zh'" class="service-cn">医疗路径规划与跨境服务支持</span>
                <span v-show="currentLang === 'en'" class="service-en">Medical pathway planning and cross-border service support</span>
              </li>
              <li>
                <span class="service-icon">🌿</span>
                <span v-show="currentLang === 'zh'" class="service-cn">康养驻留与疗愈生活体验</span>
                <span v-show="currentLang === 'en'" class="service-en">Wellness residency and healing life experience</span>
              </li>
              <li>
                <span class="service-icon">📊</span>
                <span v-show="currentLang === 'zh'" class="service-cn">持续健康管理与跟踪服务</span>
                <span v-show="currentLang === 'en'" class="service-en">Continuous health management and tracking services</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- New Wellness Lifestyle Section -->
    <section class="wellness-lifestyle-section">
      <div class="container">
        <div class="section-header centered">
          <h2 class="section-title">
            <span v-show="currentLang === 'zh'" class="title-cn">一种全新的健康生活方式</span>
            <span v-show="currentLang === 'en'" class="title-en">A New Wellness Lifestyle</span>
          </h2>
          <p class="section-subtitle">
            <span v-show="currentLang === 'zh'" class="subtitle-cn">医疗 · 康养 · 文化 · 旅行的融合体验</span>
            <span v-show="currentLang === 'en'" class="subtitle-en">Integration of Medical · Wellness · Culture · Travel</span>
          </p>
        </div>

        <div class="lifestyle-hero">
          <div class="lifestyle-hero-image">
            <img src="@/assets/images/shandong-coastal-resort.png" alt="山海疗愈">
            <div class="lifestyle-hero-overlay">
              <!-- 英文版：只显示副标题在图片中间 -->
              <div v-show="currentLang === 'en'" class="hero-overlay-content-en">
                <p class="hero-overlay-subtitle-en">
                  Integration of Medical · Wellness · Culture · Travel
                </p>
              </div>
              <!-- 中文版：显示山海疗愈 -->
              <div v-show="currentLang === 'zh'" class="hero-overlay-content-cn">
                <h3 class="hero-overlay-title-cn">山海疗愈</h3>
                <p class="hero-overlay-desc-cn">在自然环境中恢复身体与精神的平衡</p>
                <p class="hero-overlay-sub-cn">远离城市喧嚣，享受宁静与疗愈</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lifestyle-cards">
          <div class="lifestyle-card">
            <h4 class="card-title">
              <span v-show="currentLang === 'zh'" class="title-cn">山海疗愈</span>
              <span v-show="currentLang === 'en'" class="title-en">Mountain & Sea Healing</span>
            </h4>
            <p class="card-desc">
              <span v-show="currentLang === 'zh'" class="desc-cn">在自然环境中恢复身体与精神的平衡</span>
              <span v-show="currentLang === 'en'" class="desc-en">Restore balance of body and mind in natural environment</span>
            </p>
            <p class="card-detail">
              <span v-show="currentLang === 'zh'" class="detail-cn">远离城市喧嚣，享受宁静与疗愈</span>
              <span v-show="currentLang === 'en'" class="detail-en">Away from city hustle, enjoy tranquility and healing</span>
            </p>
            <p class="card-detail">
              <span v-show="currentLang === 'zh'" class="detail-cn">让身心在大自然的怀抱中得到彻底的放松与修复</span>
              <span v-show="currentLang === 'en'" class="detail-en">Let body and mind get complete relaxation and restoration in nature's embrace</span>
            </p>
          </div>

          <div class="lifestyle-card">
            <h4 class="card-title">
              <span v-show="currentLang === 'zh'" class="title-cn">中医养生</span>
              <span v-show="currentLang === 'en'" class="title-en">TCM Wellness</span>
            </h4>
            <p class="card-desc">
              <span v-show="currentLang === 'zh'" class="desc-cn">传统医学智慧结合现代健康管理</span>
              <span v-show="currentLang === 'en'" class="desc-en">Traditional medicine wisdom combined with modern health management</span>
            </p>
            <p class="card-detail">
              <span v-show="currentLang === 'zh'" class="detail-cn">针灸、推拿、药膳，全方位调理</span>
              <span v-show="currentLang === 'en'" class="detail-en">Acupuncture, massage, herbal diet, comprehensive conditioning</span>
            </p>
            <p class="card-detail">
              <span v-show="currentLang === 'zh'" class="detail-cn">传承千年中医智慧，打造个性化养生方案</span>
              <span v-show="currentLang === 'en'" class="detail-en">Inherit thousands of years of TCM wisdom, create personalized wellness plans</span>
            </p>
          </div>

          <div class="lifestyle-card">
            <h4 class="card-title">
              <span v-show="currentLang === 'zh'" class="title-cn">慢生活驻留</span>
              <span v-show="currentLang === 'en'" class="title-en">Slow Life Residency</span>
            </h4>
            <p class="card-desc">
              <span v-show="currentLang === 'zh'" class="desc-cn">远离城市压力，重建健康生活节奏</span>
              <span v-show="currentLang === 'en'" class="desc-en">Away from city pressure, rebuild healthy life rhythm</span>
            </p>
            <p class="card-detail">
              <span v-show="currentLang === 'zh'" class="detail-cn">太极、冥想、瑜伽，身心合一</span>
              <span v-show="currentLang === 'en'" class="detail-en">Tai Chi, meditation, yoga, mind-body unity</span>
            </p>
            <p class="card-detail">
              <span v-show="currentLang === 'zh'" class="detail-cn">在慢节奏中找回生活的本真与健康</span>
              <span v-show="currentLang === 'en'" class="detail-en">Find the true essence of life and health in a slow pace</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Philosophy Section -->
    <section class="philosophy-section">
      <div class="container">
        <h2 class="philosophy-title">
          <span v-show="currentLang === 'zh'" class="title-cn">我们的理念</span>
          <span v-show="currentLang === 'en'" class="title-en">Our Philosophy</span>
        </h2>
        
        <div class="philosophy-main">
          <div class="main-statement">
            <p class="statement-text">
              <span v-show="currentLang === 'zh'" class="statement-cn">我们相信，优质医疗康养资源不应该有国界。</span>
              <span v-show="currentLang === 'en'" class="statement-en">We Believe Quality Medical and Wellness Resources Should Have No Borders.</span>
            </p>
          </div>
          
          <div class="intro-text">
            <p>
              <span v-show="currentLang === 'zh'" class="text-cn">自 2026 年起，中国全球健康驻留权益网络致力于搭建一座桥梁 —— 将全球追求健康生活的人们与中国顶级医疗康养资源深度连接。</span>
              <span v-show="currentLang === 'en'" class="text-en">Since 2026, China Wellness Residency Benefits Network has been building a bridge — connecting people worldwide who pursue a healthier life with China's premier medical and wellness resources.</span>
            </p>
            <p>
              <span v-show="currentLang === 'zh'" class="text-cn">您购买的不仅是一个驻留身份，而是中国三甲医院绿色通道、中医康养调理、康复疗养资源的<strong>综合使用权</strong>。</span>
              <span v-show="currentLang === 'en'" class="text-en">You're not just purchasing a residency status — you're gaining <strong>comprehensive access</strong> to priority lanes in top-tier hospitals, Traditional Chinese Medicine wellness programs, and rehabilitation resources.</span>
            </p>
          </div>
        </div>
        
        <div class="beliefs-grid">
          <div class="belief-card">
            <div class="belief-content">
              <span class="belief-number">01</span>
              <h3>
                <span v-show="currentLang === 'zh'" class="belief-cn">医疗无国界</span>
                <span v-show="currentLang === 'en'" class="belief-en">Healthcare Without Borders</span>
              </h3>
              <p>
                <span v-show="currentLang === 'zh'" class="belief-desc-cn">中国的三甲医院拥有世界级的专家和设备，但国际访客往往难以触及。我们让您成为"系统内的人"，享受本地人的医疗便利。</span>
                <span v-show="currentLang === 'en'" class="belief-desc-en">China's top hospitals have world-class specialists and equipment, but international visitors often struggle to access them. We make you an "insider" with the same convenience as local residents.</span>
              </p>
            </div>
          </div>

          <div class="belief-card">
            <div class="belief-content">
              <span class="belief-number">02</span>
              <h3>
                <span v-show="currentLang === 'zh'" class="belief-cn">东方智慧，科学验证</span>
                <span v-show="currentLang === 'en'" class="belief-en">Eastern Wisdom, Scientifically Validated</span>
              </h3>
              <p>
                <span v-show="currentLang === 'zh'" class="belief-desc-cn">传承千年的中医养生哲学，以现代医学标准重新诠释。针灸、推拿、药膳 —— 不是替代医学，而是整合医学的重要组成部分。</span>
                <span v-show="currentLang === 'en'" class="belief-desc-en">Thousand-year-old TCM wellness philosophy, reinterpreted through modern medical standards. Acupuncture, massage, dietary therapy — not alternative medicine, but integral parts of integrative healthcare.</span>
              </p>
            </div>
          </div>

          <div class="belief-card">
            <div class="belief-content">
              <span class="belief-number">03</span>
              <h3>
                <span v-show="currentLang === 'zh'" class="belief-cn">每年 30-90 天，健康成为一种生活方式</span>
                <span v-show="currentLang === 'en'" class="belief-en">30-90 Days Annually, Health as a Lifestyle</span>
              </h3>
              <p>
                <span v-show="currentLang === 'zh'" class="belief-desc-cn">这不是度假，而是年度健康投资。在山东海滨、温泉度假区或康养小镇驻留，完成深度体检、调理方案和文化沉浸。</span>
                <span v-show="currentLang === 'en'" class="belief-desc-en">This is not a vacation — it's an annual health investment. Stay in coastal Shandong, hot spring resorts, or wellness towns to complete comprehensive screenings, treatment plans, and cultural immersion.</span>
              </p>
            </div>
          </div>
        </div>
        
        <div class="closing-statement">
          <p class="closing-text">
            <span v-show="currentLang === 'zh'" class="closing-cn">您不是游客，而是中国医疗康养生态的参与者。<br>您购买的不是住宿，而是健康生活的延续权。</span>
            <span v-show="currentLang === 'en'" class="closing-en">You are not a tourist — you are a participant in China's medical wellness ecosystem.<br>You're not booking a stay — you're securing the right to continue a healthier life.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Key Highlights Section - Horizontal Scroll -->
    <section class="highlights">
      <div class="container">
        <h2 class="highlights-title">
          <span v-show="currentLang === 'zh'" class="title-cn">核心亮点</span>
          <span v-show="currentLang === 'en'" class="title-en">Key Highlights</span>
        </h2>
        
        <div class="highlights-scroll-wrapper">
          <div 
            ref="scrollContainer" 
            class="highlights-scroll"
            @mouseenter="stopAutoScroll"
            @mouseleave="startAutoScroll"
          >
            <div class="highlight-card">
              <img class="highlight-img" src="@/assets/images/hospital-doctor-consultation.png" alt="医疗绿色通道">
              <div class="highlight-content">
                <span class="highlight-icon">🏥</span>
                <h3>
                  <span v-show="currentLang === 'zh'" class="content-cn">医疗绿色通道</span>
                  <span v-show="currentLang === 'en'" class="content-en">Priority Medical Access</span>
                </h3>
                <p>
                  <span v-show="currentLang === 'zh'" class="content-desc-cn">三甲医院专家预约、快速门诊、住院协调</span>
                  <span v-show="currentLang === 'en'" class="content-desc-en">Specialist appointments, expedited consultations, hospitalization coordination</span>
                </p>
              </div>
            </div>

            <div class="highlight-card">
              <img class="highlight-img" src="@/assets/images/tcm-acupuncture-treatment.png" alt="中医康养调理">
              <div class="highlight-content">
                <span class="highlight-icon">🌿</span>
                <h3>
                  <span v-show="currentLang === 'zh'" class="content-cn">中医康养调理</span>
                  <span v-show="currentLang === 'en'" class="content-en">TCM Wellness Programs</span>
                </h3>
                <p>
                  <span v-show="currentLang === 'zh'" class="content-desc-cn">体质评估、针灸、推拿、药膳定制</span>
                  <span v-show="currentLang === 'en'" class="content-desc-en">Constitution assessment, acupuncture, massage, dietary therapy</span>
                </p>
              </div>
            </div>

            <div class="highlight-card">
              <img class="highlight-img" src="@/assets/images/shandong-coastal-resort.png" alt="优质驻留环境">
              <div class="highlight-content">
                <span class="highlight-icon">🏖️</span>
                <h3>
                  <span v-show="currentLang === 'zh'" class="content-cn">优质驻留环境</span>
                  <span v-show="currentLang === 'en'" class="content-en">Premium Residency Locations</span>
                </h3>
                <p>
                  <span v-show="currentLang === 'zh'" class="content-desc-cn">山东海滨、温泉度假区、康养小镇</span>
                  <span v-show="currentLang === 'en'" class="content-desc-en">Coastal Shandong, hot spring resorts, wellness towns</span>
                </p>
              </div>
            </div>

            <div class="highlight-card">
              <img class="highlight-img" src="@/assets/images/medical-insurance-protection.png" alt="医疗保障体系">
              <div class="highlight-content">
                <span class="highlight-icon">🛡️</span>
                <h3>
                  <span v-show="currentLang === 'zh'" class="content-cn">医疗保障体系</span>
                  <span v-show="currentLang === 'en'" class="content-en">Medical Protection System</span>
                </h3>
                <p>
                  <span v-show="currentLang === 'zh'" class="content-desc-cn">最高 50 万元定点医院费用报销</span>
                  <span v-show="currentLang === 'en'" class="content-desc-en">Up to ¥500,000 reimbursement at partner hospitals</span>
                </p>
              </div>
            </div>

            <div class="highlight-card">
              <img class="highlight-img" src="@/assets/images/tai-chi-qigong-practice.png" alt="文化沉浸体验">
              <div class="highlight-content">
                <span class="highlight-icon">🎋</span>
                <h3>
                  <span v-show="currentLang === 'zh'" class="content-cn">文化沉浸体验</span>
                  <span v-show="currentLang === 'en'" class="content-en">Cultural Immersion</span>
                </h3>
                <p>
                  <span v-show="currentLang === 'zh'" class="content-desc-cn">太极、气功、养生课程、景区专享</span>
                  <span v-show="currentLang === 'en'" class="content-desc-en">Tai Chi, Qigong, wellness courses, exclusive attraction access</span>
                </p>
              </div>
            </div>
          </div>
          
          <!-- 滚动指示器 -->
          <div class="scroll-indicators">
            <button class="scroll-btn prev" @click="scrollLeft" aria-label="Scroll left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div class="scroll-dots">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <button class="scroll-btn next" @click="scrollRight" aria-label="Scroll right">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <img class="cta-bg" src="@/assets/images/cta-background.png" alt="开启您的健康驻留之旅">
      
      <div class="cta-overlay"></div>
      
      <div class="cta-content container">
        <h2>
          <span v-show="currentLang === 'zh'" class="cta-title-cn">开启您的健康驻留之旅</span>
          <span v-show="currentLang === 'en'" class="cta-title-en">Begin Your Wellness Journey</span>
        </h2>
        <router-link to="/contact" class="btn btn-gold">
          {{ currentLang === 'zh' ? '预约咨询' : 'Book a Consultation' }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-top: var(--header-height);
}

/* Hero Section - Six Senses Style */
.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 视频背景 - Six Senses 风格 */
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* 图片背景备用 (如果视频加载失败) */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  /* 添加平滑过渡 */
  transition: transform 10s ease;
  animation: slowZoom 20s ease-in-out infinite;
}

@keyframes slowZoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 遮罩层 - 中性深色调 */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* 中性深色遮罩 - 让视频更清晰 */
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.5) 0%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.5) 100%);
}

/* 文字内容 - 最上层 */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff !important;
  max-width: 900px;
  padding: 0 2rem;
}

.hero-title {
  margin-bottom: 1.5rem;
  color: #ffffff !important;
}

.title-cn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.title-line {
  display: block;
  font-size: clamp(2rem, 5vw, 4rem);
  color: #ffffff !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  line-height: 1.4;
  white-space: nowrap;
}

/* 第二行可以稍小一点，确保完整显示 */
.title-line:last-child {
  font-size: clamp(1.75rem, 4.5vw, 3.5rem);
}

.title-en {
  display: block;
  font-size: clamp(1.5rem, 5vw, 4rem) !important;
  letter-spacing: 0.05em;
  color: #ffffff !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  /* 欧美网站常用字体 - Montserrat/Playfair Display */
  font-family: 'Montserrat', 'Playfair Display', Georgia, serif !important;
}

.hero-subtitle {
  margin-bottom: 3rem;
  color: #ffffff !important;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.subtitle-cn {
  display: block;
  font-size: 1.25rem;
  line-height: 1.8;
  color: #ffffff !important;
  margin-bottom: 0.5rem;
}

.subtitle-en {
  display: block;
  font-size: 1.125rem;
  color: #ffffff !important;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-white);
}

.scroll-text {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.5);
  animation: scrollPulse 2s ease infinite;
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Philosophy Section */
.philosophy-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-off-white);
}

.philosophy-title {
  text-align: center;
  margin-bottom: 3rem;
}

.philosophy-title .title-cn {
  display: block;
  font-size: 2.5rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.philosophy-title .title-en {
  display: block;
  font-size: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.philosophy-main {
  max-width: 900px;
  margin: 0 auto 4rem;
  text-align: center;
}

.main-statement {
  margin-bottom: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.statement-text {
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.6;
  text-align: center;
}

.statement-cn {
  display: block !important;
  color: var(--color-black);
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
}

.statement-en {
  display: block;
  color: var(--color-secondary);
  font-size: 1.25rem;
}

.intro-text p {
  font-size: 1.125rem;
  line-height: 2;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.text-cn {
  display: block !important;
  color: var(--color-black);
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
}

.text-en {
  display: block;
  color: var(--color-stone);
}

.beliefs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.belief-card {
  background-color: var(--color-white);
  padding: 2.5rem;
  border: 1px solid var(--color-sand);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.belief-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.belief-content {
  text-align: center;
}

.belief-number {
  display: block;
  font-size: 3rem;
  font-family: var(--font-primary);
  color: var(--color-secondary);
  opacity: 0.5;
  margin-bottom: 1rem;
}

.belief-content h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.belief-cn {
  display: block;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.belief-en {
  display: block;
  font-size: 0.875rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.belief-desc-cn {
  display: block;
  color: var(--color-stone);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.belief-desc-en {
  display: block;
  color: var(--color-stone);
  font-size: 0.8125rem;
  line-height: 1.6;
}

.closing-statement {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-primary);
  border-radius: 4px;
}

.closing-text {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 2;
  color: var(--color-white);
}

.closing-cn {
  display: block;
  margin-bottom: 1rem;
}

.closing-en {
  display: block;
  font-size: 1rem;
  color: var(--color-secondary);
}

/* Value Proposition */
.value-prop {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-off-white);
}

.value-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  margin-bottom: 2rem;
}

.title-cn {
  display: block;
  color: var(--color-black);
  margin-bottom: 1rem;
}

.title-en {
  display: block;
  font-size: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.section-description {
  font-size: 1.125rem;
  line-height: 2;
}

.desc-cn {
  display: block;
  color: var(--color-black);
  margin-bottom: 1rem;
}

.desc-en {
  display: block;
  color: var(--color-stone);
}

/* Highlights - Horizontal Scroll */
.highlights {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.highlights-title {
  text-align: center;
  margin-bottom: 3rem;
}

.highlights-title .title-cn {
  display: block;
  font-size: 2.5rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.highlights-title .title-en {
  display: block;
  font-size: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.highlights-scroll-wrapper {
  position: relative;
}

.highlights-scroll {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  padding: 0 0 2rem;
}

.highlights-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.highlight-card {
  flex: 0 0 350px;
  max-width: 350px;
  background-color: var(--color-white);
  scroll-snap-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--color-sand);
}

.highlight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.highlight-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.highlight-content {
  padding: 2rem;
  text-align: center;
}

.highlight-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.highlight-content h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.content-cn {
  display: block;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.content-en {
  display: block;
  font-size: 0.875rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.content-desc-cn {
  display: block;
  font-size: 0.9375rem;
  color: var(--color-stone);
  line-height: 1.6;
}

.content-desc-en {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-stone);
  line-height: 1.6;
}

/* Scroll Controls */
.scroll-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.scroll-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--color-stone);
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-stone);
  transition: all 0.2s ease;
}

.scroll-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.scroll-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-sand);
  transition: all 0.3s ease;
}

.dot.active {
  background-color: var(--color-primary);
  transform: scale(1.2);
}

/* CTA Section */
.cta-section {
  position: relative;
  padding: var(--spacing-xl) 0;
  text-align: center;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.cta-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(26, 74, 62, 0.85);
}

.cta-content {
  position: relative;
  z-index: 3;
  color: var(--color-white);
}

.cta-content h2 {
  margin-bottom: 2rem;
}

.cta-title-cn {
  display: block;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0.5rem;
  color: var(--color-white);
}

.cta-title-en {
  display: block;
  font-size: 1.25rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

/* Responsive */
@media (max-width: 1024px) {
  .beliefs-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .highlight-card {
    flex: 0 0 280px;
    max-width: 280px;
  }
  
  .scroll-indicators {
    gap: 1rem;
  }
  
  .scroll-btn {
    width: 40px;
    height: 40px;
  }
  
  .philosophy-title .title-cn {
    font-size: 2rem;
  }
  
  .statement-text {
    font-size: 1.25rem;
  }
  
  .belief-card {
    padding: 1.5rem;
  }
}

/* Global Residency Section */
.global-residency-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.global-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  align-items: start;
}

.global-image-col {
  position: relative;
  height: 700px;
  overflow: hidden;
}

.global-image-col img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.global-content-col {
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  background: var(--color-off-white);
}

.global-heading {
  font-size: 2.5rem;
  color: var(--color-black);
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 600;
}

.global-paragraph {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-stone);
  margin-bottom: 1.5rem;
}

.core-services {
  margin-top: 2rem;
  padding: 2.5rem;
  background: rgba(26, 74, 62, 0.03);
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.services-title {
  font-size: 1.5rem;
  color: var(--color-black);
  margin-bottom: 2rem;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 600;
}

.services-title .title-en {
  color: var(--color-black) !important;
  text-shadow: none !important;
  font-size: 1.5rem !important;
}

.services-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.services-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  color: var(--color-black);
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.services-list li:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateX(5px);
}

.service-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

/* Wellness Lifestyle Section */
.wellness-lifestyle-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.lifestyle-hero {
  margin-bottom: 4rem;
}

.lifestyle-hero-image {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
}

.lifestyle-hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lifestyle-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  color: white;
}

/* 中文版样式 */
.hero-overlay-content-cn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-overlay-title-cn {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-family: 'Playfair Display', Georgia, serif;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: white;
}

.hero-overlay-desc-cn {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: white;
}

.hero-overlay-sub-cn {
  font-size: 1.125rem;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: white;
}

/* 英文版样式 */
.hero-overlay-content-en {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-overlay-title-en {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-family: 'Montserrat', 'Playfair Display', Georgia, serif;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.hero-overlay-subtitle-en {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: white;
  letter-spacing: 0.1em;
  font-weight: 400;
}

.lifestyle-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.lifestyle-card {
  padding: 2rem;
  text-align: center;
  background: var(--color-off-white);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.lifestyle-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  color: var(--color-black);
  margin-bottom: 1rem;
  font-family: 'Playfair Display', Georgia, serif;
}

.card-desc {
  font-size: 1.125rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  font-style: italic;
}

.card-detail {
  font-size: 1rem;
  color: var(--color-black);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .global-container {
    grid-template-columns: 1fr;
  }
  
  .global-image-col {
    height: 300px;
  }
  
  .global-content-col {
    padding: 3rem 2rem;
  }
  
  .lifestyle-cards {
    grid-template-columns: 1fr;
  }
  
  .lifestyle-hero-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .section-subtitle.combined {
    white-space: normal !important;
    font-size: 1.25rem !important;
  }
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 2rem;
  }
  
  .global-text {
    padding: 1rem;
  }
  
  .lifestyle-hero-image {
    height: 300px;
  }
  
  .hero-overlay-title {
    font-size: 2rem;
  }
  
  .lifestyle-card {
    padding: 1.5rem;
  }
}
</style>
