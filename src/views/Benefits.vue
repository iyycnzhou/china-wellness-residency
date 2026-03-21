<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'

// 六大权益 - 使用高质量图片替代 emoji 图标
const benefits = [
  {
    image: '/images/services/wellness.webp',
    nameCn: '康养驻留',
    nameEn: 'WELLNESS RESIDENCY',
    descCn: '每年可享 30/60/90 天灵活驻留期\n任选山东海滨疗养院、温泉度假村或康养小镇\n私密套房、管家服务、专属康养顾问\n让您的每一次驻留都成为身心 rejuvenation 的奢华体验',
    descEn: 'Enjoy 30/60/90 days annually with flexible scheduling\nChoose from Shandong coastal resorts, hot spring retreats, or wellness towns\nPrivate suites, butler service, dedicated wellness consultants\nEvery stay becomes a luxurious journey of rejuvenation',
  },
  {
    image: '/images/services/hospital.webp',
    nameCn: '医疗接入',
    nameEn: 'MEDICAL ACCESS',
    descCn: '三甲医院绿色通道，48 小时内专家预约\n快速门诊、住院协调、第二诊疗意见\n全程医疗翻译与陪诊服务\n让您在中国享受顶级医疗资源，无忧就医',
    descEn: "Priority access to Grade-A hospitals, specialist appointments within 48 hours\nExpedited consultations, hospitalization coordination, second opinions\nFull-service medical translation and companion care\nAccess China's premier medical resources with peace of mind",
  },
  {
    image: '/images/services/tcm.webp',
    nameCn: '年度体检',
    nameEn: 'ANNUAL HEALTH SCREENING',
    descCn: '年度全面健康检查，早发现早预防\n含肿瘤标志物筛查、心脑血管评估、中医体质辨识\n电子健康档案终身管理，云端存储随时查阅\n健康趋势分析，异常指标早期预警',
    descEn: 'Comprehensive annual health screening for early detection\nIncludes tumor markers, cardiovascular assessment, TCM constitution analysis\nLifetime electronic health records with secure cloud access\nHealth trend analysis with early warning system',
  },
  {
    image: '/images/services/tourism.webp',
    nameCn: '医疗保障',
    nameEn: 'MEDICAL PROTECTION',
    descCn: '定点医院医疗费用直接结算\n年度最高 50,000 美元医疗保障\n涵盖门诊、住院、手术、药品费用\n让您专注康养，无需担忧医疗费用',
    descEn: 'Direct settlement at designated partner hospitals\nAnnual medical coverage up to $50,000 USD\nCovers consultations, hospitalization, surgery, and medications\nFocus on your wellness without worrying about medical expenses',
  },
  {
    image: '/images/banner/hero-3.webp',
    nameCn: '康养旅游',
    nameEn: 'WELLNESS TOURISM',
    descCn: '太极、气功、中医养生课程专享\n50+ 5A 级景区门票、私人导游服务\n高端康养活动优先参与权\n探索中国传统养生智慧，品味品质生活',
    descEn: 'Exclusive access to Tai Chi, Qigong, and TCM wellness courses\n50+ 5A scenic attraction tickets with private guide services\nPriority participation in premium wellness activities\nDiscover traditional Chinese wellness wisdom and quality living',
  },
  {
    image: '/images/services/wellness.webp',
    nameCn: '家庭共享',
    nameEn: 'FAMILY SHARING',
    descCn: '主卡人可灵活分配权益给配偶、子女、父母\n家庭成员共享健康档案与医疗服务\n一张主卡，全家受益\n让爱与关怀，延伸至您珍视的每一位家人',
    descEn: 'Flexibly allocate benefits to spouse, children, and parents\nFamily members share health records and medical services\nOne card, benefits for the entire family\nExtend love and care to every family member you cherish',
  },
]
</script>

<template>
  <div class="benefits-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <img class="hero-bg" src="@/assets/images/benefits-hero.webp" alt="Residency Benefits Hero">
      
      <div class="hero-overlay"></div>
      
      <div class="hero-content container">
        <h1>
          <span v-show="currentLang === 'zh'" class="title-cn">驻留权益</span>
          <span v-show="currentLang === 'en'" class="title-en">Residency Benefits</span>
        </h1>
        <p class="hero-description">
          <span v-show="currentLang === 'zh'" class="desc-cn">
            健康驻留权益是您购买驻留席位后获得的核心服务，<br>
            每年可享 30-90 天灵活驻留期，深度整合中国顶级三甲医院医疗资源、<br>
            千年中医养生智慧、专业康复疗养与文化底蕴体验，<br>
            为您打造全方位、个性化、可持续的健康生活方式
          </span>
          <span v-show="currentLang === 'en'" class="desc-en">
            Wellness Residency Benefits are the core services you receive after purchasing a residency seat.<br>
            Enjoy 30-90 days annually of flexible stays in China, with deep integration of top-tier Grade-A hospital resources,<br>
            millennia-old TCM wellness wisdom, professional rehabilitation, and cultural immersion.<br>
            We create a comprehensive, personalized, and sustainable healthy lifestyle just for you.
          </span>
        </p>
        
        <!-- 三个标签 -->
        <div class="hero-tags">
          <span class="tag">
            <span v-show="currentLang === 'zh'">健康投资</span>
            <span v-show="currentLang === 'en'">Health Investment</span>
          </span>
          <span class="tag">
            <span v-show="currentLang === 'zh'">驻留体验</span>
            <span v-show="currentLang === 'en'">Residency Experience</span>
          </span>
          <span class="tag">
            <span v-show="currentLang === 'zh'">核心权益</span>
            <span v-show="currentLang === 'en'">Core Entitlements</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Benefits Grid - Six Senses Style -->
    <section class="benefits-section">
      <div class="container">
        <!-- 章节标题 -->
        <div class="section-header">
          <h2 class="section-title">
            <span v-show="currentLang === 'zh'" class="title-cn">您的席位包含六大核心权益</span>
            <span v-show="currentLang === 'en'" class="title-en">SIX CORE ENTITLEMENTS</span>
          </h2>
          <p class="section-subtitle">
            <span v-show="currentLang === 'zh'" class="subtitle-cn">尊享全方位康养服务，开启品质生活新篇章</span>
            <span v-show="currentLang === 'en'" class="subtitle-en">Experience comprehensive wellness services and embark on a new chapter of quality living</span>
          </p>
          <div class="section-divider"></div>
        </div>
        
        <!-- 六大权益 - 杂志排版式布局 -->
        <div class="benefits-alternating">
          <div 
            v-for="(benefit, index) in benefits" 
            :key="index"
            class="benefit-alternating-item"
            :class="{ 'reverse': index % 2 === 1 }"
          >
            <!-- 图片区域 - 金色边框 -->
            <div class="benefit-image-wrapper">
              <img 
                :src="benefit.image" 
                :alt="currentLang === 'zh' ? benefit.nameCn : benefit.nameEn"
                class="benefit-img"
                loading="lazy"
              >
              <div class="benefit-img-overlay"></div>
            </div>
            
            <!-- 文字区域 -->
            <div class="benefit-text-wrapper">
              <div class="benefit-text-inner">
                <h3 class="benefit-heading">
                  <span class="heading-number">0{{ index + 1 }}</span>
                  <span v-show="currentLang === 'zh'" class="heading-cn">{{ benefit.nameCn }}</span>
                  <span v-show="currentLang === 'en'" class="heading-en">{{ benefit.nameEn }}</span>
                </h3>
                
                <div class="benefit-heading-divider"></div>
                
                <p class="benefit-text">
                  <span v-show="currentLang === 'zh'" class="text-cn">{{ benefit.descCn }}</span>
                  <span v-show="currentLang === 'en'" class="text-en">{{ benefit.descEn }}</span>
                </p>
                
                <div class="benefit-accent-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 模块 2：会员驻留体验 -->
    <section class="testimonials">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span v-show="currentLang === 'zh'" class="title-cn">会员驻留体验</span>
            <span v-show="currentLang === 'en'" class="title-en">Member Residency Experiences</span>
          </h2>
        </div>

        <div class="testimonial-grid">
          <!-- 证言 1：David -->
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-text">
                <span v-show="currentLang === 'zh'">
                  平台帮助我在 48 小时内完成专家预约，并安排了舒适的康养驻留。
                  整个流程非常专业，医护人员都很贴心。
                </span>
                <span v-show="currentLang === 'en'">
                  The platform helped me complete a specialist appointment within 48 hours 
                  and arranged comfortable wellness residency. The entire process was very 
                  professional, and the medical staff were very caring.
                </span>
              </p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img src="/images/testimonials/avatar-david.webp" alt="David" loading="lazy">
              </div>
              <div class="author-info">
                <span class="author-name">David</span>
                <span class="author-location">Singapore · 新加坡</span>
              </div>
            </div>
          </div>

          <!-- 证言 2：Maria -->
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-text">
                <span v-show="currentLang === 'zh'">
                  医疗资源非常专业，整个过程几乎没有等待。
                  医生很有耐心，详细解释每一个治疗方案。
                </span>
                <span v-show="currentLang === 'en'">
                  The medical resources are very professional, and there was almost no waiting 
                  throughout the entire process. The doctor was very patient and explained 
                  each treatment plan in detail.
                </span>
              </p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img src="/images/testimonials/avatar-maria.webp" alt="Maria" loading="lazy">
              </div>
              <div class="author-info">
                <span class="author-name">Maria</span>
                <span class="author-location">Spain · 西班牙</span>
              </div>
            </div>
          </div>

          <!-- 证言 3：Kenji -->
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-text">
                <span v-show="currentLang === 'zh'">
                  我每年都会来驻留一个月，这里像第二个家。
                  服务人员记得我的喜好，让我感到非常温暖。
                </span>
                <span v-show="currentLang === 'en'">
                  I come here for a month of residency every year. This place feels like 
                  my second home. The service staff remember my preferences, which makes 
                  me feel very warm.
                </span>
              </p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img src="/images/testimonials/avatar-kenji.webp" alt="Kenji" loading="lazy">
              </div>
              <div class="author-info">
                <span class="author-name">Kenji</span>
                <span class="author-location">Japan · 日本</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 查看更多按钮 -->
        <div class="view-more-container">
          <button class="view-more-btn">
            <span v-show="currentLang === 'zh'">查看更多</span>
            <span v-show="currentLang === 'en'">View More</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.benefits-page {
  padding-top: var(--header-height);
}

/* Page Hero */
.page-hero {
  position: relative;
  width: 100%;
  min-height: 600px;
  height: 75vh;
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
  object-fit: cover;  /* 填满区域，无留白 */
  object-position: center 35%;  /* 从上部 35% 处开始裁剪，显示更多下方内容 */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%);
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

/* Hero Tags */
.hero-tags {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.hero-content h1 {
  font-size: clamp(3rem, 6vw, 5rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.hero-content h1 .title-cn,
.hero-content h1 .title-en {
  display: block;
  color: #ffffff !important;
}

.title-cn {
  display: block;
  color: #ffffff !important;
}

.title-en {
  display: block;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: 0.1em;
  color: #ffffff !important;
  font-weight: 600;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

/* Hero Tags - moved below description */
.hero-tags {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 0;
  flex-wrap: wrap;
}

.hero-subtitle {
  font-size: 1.125rem;
  margin-top: 1.5rem;
  letter-spacing: 0.1em;
}

.subtitle-cn {
  display: block;
  font-size: 1.125rem;
  color: var(--color-white);
  opacity: 0.95;
}

.subtitle-en {
  display: block;
  font-size: 1rem;
  color: var(--color-white);
  opacity: 0.9;
  letter-spacing: 0.05em;
}

.hero-description {
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 2rem 2.5rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  font-size: 1.0625rem;
  line-height: 2;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.desc-cn {
  display: block;
  color: #ffffff;
  font-weight: 400;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
}

.desc-en {
  display: block;
  color: #ffffff;
  font-size: 0.9375rem;
  margin-top: 1rem;
  font-weight: 400;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
}

/* Benefits Section */
/* Benefits Section - Six Senses Showcase Style */
.benefits-section {
  padding: var(--spacing-2xl) 0;
  background-color: var(--sand-light);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  padding: 0 var(--spacing-lg);
  position: relative;
}

/* ========== Decorative Number Badge ========== */
.section-number-badge {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.badge-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    var(--secondary) 0%, 
    #c9a962 50%, 
    #b89654 100%);
  box-shadow: 
    0 4px 15px rgba(201, 169, 98, 0.4),
    inset 0 2px 10px rgba(255, 255, 255, 0.3),
    inset 0 -2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.badge-circle::before {
  content: '';
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  z-index: 2;
}

.badge-circle::after {
  content: '';
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 1px dashed rgba(201, 169, 98, 0.5);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.badge-number {
  font-size: 1.75rem;
  font-family: var(--font-heading);
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 3;
  letter-spacing: -0.02em;
}

.section-title {
  margin-bottom: var(--spacing-sm);
}

.section-title .title-cn {
  display: block;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-family: var(--font-heading);
  font-weight: 600;
  color: #000000 !important;
  letter-spacing: -0.02em;
}

.section-title .title-en {
  display: block;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-family: var(--font-body);
  font-weight: 400;
  color: #000000 !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-subtitle {
  max-width: 600px;
  margin: 0 auto var(--spacing-md);
}

.subtitle-cn {
  display: block;
  font-size: 1.125rem;
  color: var(--stone-dark);
  line-height: 1.8;
}

.subtitle-en {
  display: block;
  font-size: 0.9375rem;
  color: var(--stone);
  line-height: 1.7;
  margin-top: 0.5rem;
}

.section-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--secondary) 50%, 
    transparent 100%);
  margin: var(--spacing-md) auto 0;
}

/* Benefits Magazine Layout - Scheme B */
.benefits-alternating {
  display: flex;
  flex-direction: column;
  gap: 8rem;
  padding: 2rem 0;
}

.benefit-alternating-item {
  display: grid;
  grid-template-columns: 48% 52%;
  gap: 5rem;
  align-items: start;
}

/* Reverse layout for even items (right image, left text) */
.benefit-alternating-item.reverse {
  direction: rtl;
}

.benefit-alternating-item.reverse .benefit-image-wrapper {
  direction: ltr;
  margin-left: 0;
  margin-right: -50px;
}

.benefit-alternating-item.reverse .benefit-text-wrapper {
  direction: ltr;
}

.benefit-alternating-item.reverse .benefit-number-row {
  direction: ltr;
}



/* ========== Image Wrapper with Gold Border ========== */
.benefit-image-wrapper {
  position: relative;
  width: calc(100% + 50px);
  height: 580px;
  overflow: hidden;
  border: 3px solid var(--secondary);
  border-radius: 4px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: all 0.5s ease;
  margin-left: -50px;
}

.benefit-alternating-item:hover .benefit-image-wrapper {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

/* ========== Text Wrapper ========== */
.benefit-text-wrapper {
  padding: 0;
}

.benefit-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.benefit-alternating-item:hover .benefit-img {
  transform: scale(1.06);
}

.benefit-img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(26, 74, 62, 0.35) 0%, 
    rgba(26, 74, 62, 0.1) 100%);
  pointer-events: none;
}

/* ========== Text Wrapper ========== */
.benefit-text-wrapper {
  padding: 1rem 0;
}

.benefit-text-inner {
  max-width: 100%;
}

.benefit-heading {
  margin-bottom: 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.benefit-heading .heading-number {
  display: inline-block;
  font-size: 2.25rem;
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--secondary);
  line-height: 1;
  letter-spacing: -0.02em;
}

.benefit-heading .heading-cn {
  display: block;
  font-size: 2.25rem;
  font-family: var(--font-heading);
  font-weight: 600;
  color: #000000;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.benefit-heading .heading-en {
  display: block;
  font-size: 1.375rem;
  font-family: var(--font-body);
  font-weight: 500;
  color: #000000;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Double Gold Lines */
.benefit-heading-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.25rem 0;
}

.benefit-heading-divider::before,
.benefit-heading-divider::after {
  content: '';
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, 
    var(--secondary) 0%, 
    rgba(201, 169, 98, 0.3) 100%);
}

.benefit-heading-divider::after {
  background: linear-gradient(90deg, 
    rgba(201, 169, 98, 0.3) 0%, 
    var(--secondary) 100%);
}

.benefit-text {
  margin-bottom: 2rem;
}

.benefit-text .text-cn {
  display: block;
  font-size: 1.25rem;
  color: #6f7c76;
  line-height: 2.2;
  white-space: pre-line;
}

.benefit-text .text-en {
  display: block;
  font-size: 1.0625rem;
  color: #6f7c76;
  line-height: 2.1;
  margin-top: 1.5rem;
  white-space: pre-line;
}

.benefit-accent-line {
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--secondary) 0%, 
    rgba(201, 169, 98, 0.2) 100%);
  border-radius: 2px;
}

/* Detail Section */
.benefits-detail {
  padding: var(--spacing-2xl) 0;
  background-color: var(--white);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
}

.detail-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.detail-item.reverse {
  direction: rtl;
}

.detail-item.reverse .detail-content {
  direction: ltr;
}

.detail-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center;
  border-radius: var(--radius-lg);
}

.detail-content h4 {
  margin-bottom: var(--spacing-md);
}

.detail-title-cn {
  display: block;
  font-size: 1.75rem;
  color: var(--primary-dark);
  font-family: var(--font-heading);
  font-weight: 600;
}

.detail-title-en {
  display: block;
  font-size: 1.5rem;
  color: var(--stone-dark);
  letter-spacing: 0.05em;
}

.detail-desc-cn {
  display: block;
  color: var(--stone-dark);
  line-height: 1.8;
  margin-top: var(--spacing-sm);
}

.detail-desc-en {
  display: block;
  color: var(--stone);
  line-height: 1.8;
  margin-top: var(--spacing-sm);
}

/* Global Residency Section - New Design */
.global-residency {
  padding: var(--spacing-2xl) 0;
  background-color: var(--sand);
}

.global-residency .section-header {
  margin-bottom: var(--spacing-2xl);
  text-align: center;
}

.global-residency .section-title .title-cn {
  font-size: 2.375rem;  /* 38px */
  color: #3d3d3d;  /* Dark gray */
  margin-bottom: var(--spacing-sm);
}

.global-residency .section-title .title-en {
  font-size: 1.75rem;
  color: #3d3d3d;  /* Dark gray */
  margin-bottom: var(--spacing-sm);
}

.global-residency .section-subtitle {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.125rem;
  color: #6f7c76;
  line-height: 1.8;
}

.residency-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.map-area {
  position: relative;
}

.map-area .map-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
}

.residency-text {
  padding: var(--spacing-lg);
}

.residency-title {
  font-size: 1.625rem;  /* 26px */
  font-family: var(--font-heading);
  font-weight: 600;
  color: #3d3d3d;  /* Dark gray */
  margin-bottom: var(--spacing-md);
}

.residency-description {
  font-size: 1rem;
  color: #6f7c76;
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.service-heading {
  font-size: 1.25rem;
  font-family: var(--font-heading);
  font-weight: 600;
  color: #3d3d3d;  /* Dark gray */
  margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-lg) 0 0 0;
}

.service-list li {
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-md);
  position: relative;
  font-size: 1rem;
  color: #6f7c76;
}

.service-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--secondary);
  font-weight: bold;
  font-size: 1.125rem;
}

/* Remove old network styles */
.global-network {
  display: none;
}

/* Testimonials Section */
.testimonials {
  padding: var(--spacing-2xl) 0;
  background-color: var(--sand);
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.testimonial-card {
  background-color: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.testimonial-content {
  margin-bottom: var(--spacing-lg);
}

.testimonial-text {
  font-size: 1rem;
  color: #6f7c76;
  line-height: 1.8;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.author-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #3d3d3d;  /* Dark gray */
}

.author-location {
  font-size: 0.875rem;
  color: #6f7c76;
}

/* View More Button */
.view-more-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 2px solid var(--secondary);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.view-more-btn:hover {
  background: var(--secondary);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 169, 98, 0.4);
}

.view-more-btn .btn-arrow {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.view-more-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 1200px) {
  .benefit-alternating {
    gap: 6rem;
  }
  
  .benefit-alternating-item,
  .benefit-alternating-item.reverse {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .benefit-alternating-item.reverse {
    direction: ltr;
  }
  
  .benefit-image-wrapper {
    height: 450px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
  }
  
  .benefit-heading .heading-number,
  .benefit-heading .heading-cn {
    font-size: 2rem;
  }
  
  .benefit-heading .heading-en {
    font-size: 1.25rem;
  }
  
  .benefit-text .text-cn {
    font-size: 1.125rem;
  }
  
  .benefit-text .text-en {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .section-title .title-cn {
    font-size: 1.5rem;
  }
  
  .section-title .title-en {
    font-size: 1rem;
  }
  
  .benefit-alternating {
    gap: 4rem;
  }
  
  .benefit-image-wrapper {
    height: 350px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
  }
  
  .benefit-heading {
    flex-direction: column;
  }
  
  .benefit-heading .heading-number,
  .benefit-heading .heading-cn {
    font-size: 1.75rem;
  }
  
  .benefit-heading .heading-en {
    font-size: 1.125rem;
  }
  
  .benefit-text .text-cn {
    font-size: 1rem;
  }
  
  .benefit-text .text-en {
    font-size: 0.9375rem;
  }
  
  .benefit-heading-divider::before,
  .benefit-heading-divider::after {
    display: none;
  }
  
  .testimonial-grid {
    grid-template-columns: 1fr;
  }
  
  .view-more-btn {
    padding: 0.875rem 2rem;
    font-size: 0.9375rem;
  }
}

/* Lifestyle Section Styles */
.lifestyle-hero {
  position: relative;
  width: 100%;
  height: 650px;
  margin-bottom: 48px;
  border-radius: 12px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
}

.hero-text {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.hero-card-title {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
}

.hero-card-desc {
  font-size: 20px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
}

.lifestyle-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.lifestyle-card {
  background-color: #f9f7f2;
  padding: 32px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.lifestyle-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  background-color: #f5f1e8;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  color: #3d3d3d;  /* Dark gray */
  margin-bottom: 16px;
}

.card-description {
  font-size: 16px;
  color: #6f7c76;
  line-height: 1.8;
  text-align: center;
}
</style>
