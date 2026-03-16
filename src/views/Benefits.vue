<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'

// 六大权益 - 使用高质量图片替代 emoji 图标
const benefits = [
  {
    image: '/images/services/wellness.jpg',
    nameCn: '康养驻留',
    nameEn: 'WELLNESS RESIDENCY',
    descCn: '每年可享 30/60/90 天灵活驻留期\n任选山东海滨疗养院、温泉度假村或康养小镇\n私密套房、管家服务、专属康养顾问\n让您的每一次驻留都成为身心 rejuvenation 的奢华体验',
    descEn: 'Enjoy 30/60/90 days annually with flexible scheduling\nChoose from Shandong coastal resorts, hot spring retreats, or wellness towns\nPrivate suites, butler service, dedicated wellness consultants\nEvery stay becomes a luxurious journey of rejuvenation',
  },
  {
    image: '/images/services/hospital.jpg',
    nameCn: '医疗接入',
    nameEn: 'MEDICAL ACCESS',
    descCn: '三甲医院绿色通道，48 小时内专家预约\n快速门诊、住院协调、第二诊疗意见\n全程医疗翻译与陪诊服务\n让您在中国享受顶级医疗资源，无忧就医',
    descEn: "Priority access to Grade-A hospitals, specialist appointments within 48 hours\nExpedited consultations, hospitalization coordination, second opinions\nFull-service medical translation and companion care\nAccess China's premier medical resources with peace of mind",
  },
  {
    image: '/images/services/tcm.jpg',
    nameCn: '年度体检',
    nameEn: 'ANNUAL HEALTH SCREENING',
    descCn: '年度全面健康检查，早发现早预防\n含肿瘤标志物筛查、心脑血管评估、中医体质辨识\n电子健康档案终身管理，云端存储随时查阅\n健康趋势分析，异常指标早期预警',
    descEn: 'Comprehensive annual health screening for early detection\nIncludes tumor markers, cardiovascular assessment, TCM constitution analysis\nLifetime electronic health records with secure cloud access\nHealth trend analysis with early warning system',
  },
  {
    image: '/images/services/tourism.jpg',
    nameCn: '医疗保障',
    nameEn: 'MEDICAL PROTECTION',
    descCn: '定点医院医疗费用直接结算\n年度最高 50,000 美元医疗保障\n涵盖门诊、住院、手术、药品费用\n让您专注康养，无需担忧医疗费用',
    descEn: 'Direct settlement at designated partner hospitals\nAnnual medical coverage up to $50,000 USD\nCovers consultations, hospitalization, surgery, and medications\nFocus on your wellness without worrying about medical expenses',
  },
  {
    image: '/images/banner/hero-3.jpg',
    nameCn: '康养旅游',
    nameEn: 'WELLNESS TOURISM',
    descCn: '太极、气功、中医养生课程专享\n50+ 5A 级景区门票、私人导游服务\n高端康养活动优先参与权\n探索中国传统养生智慧，品味品质生活',
    descEn: 'Exclusive access to Tai Chi, Qigong, and TCM wellness courses\n50+ 5A scenic attraction tickets with private guide services\nPriority participation in premium wellness activities\nDiscover traditional Chinese wellness wisdom and quality living',
  },
  {
    image: '/images/services/wellness.jpg',
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
      <img class="hero-bg" src="@/assets/images/benefits-hero.jpg" alt="Residency Benefits Hero">
      
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
        
        <!-- 交错的图文卡片 - 2 行 x3 列布局 -->
        <div class="benefits-showcase">
          <!-- 第一行 -->
          <div class="benefits-row">
            <div 
              v-for="(benefit, index) in benefits.slice(0, 3)" 
              :key="index"
              class="benefit-showcase-item"
              :class="{ 'reverse': index % 2 === 1 }"
            >
              <!-- 图片区域 -->
              <div class="benefit-showcase-image">
                <img 
                  :src="benefit.image" 
                  :alt="currentLang === 'zh' ? benefit.nameCn : benefit.nameEn"
                  class="showcase-img"
                  loading="lazy"
                >
                <div class="showcase-image-overlay"></div>
                <!-- 权益编号 -->
                <div class="benefit-number">
                  <span class="number-bg">0{{ index + 1 }}</span>
                </div>
              </div>
              
              <!-- 文字区域 -->
              <div class="benefit-showcase-content">
                <div class="content-inner">
                  <span class="benefit-label">
                    <span v-show="currentLang === 'zh'">核心权益</span>
                    <span v-show="currentLang === 'en'">CORE ENTITLEMENT</span>
                    <span class="label-number">0{{ index + 1 }}</span>
                  </span>
                  
                  <h3 class="benefit-title">
                    <span v-show="currentLang === 'zh'" class="title-cn">{{ benefit.nameCn }}</span>
                    <span v-show="currentLang === 'en'" class="title-en">{{ benefit.nameEn }}</span>
                  </h3>
                  
                  <p class="benefit-description">
                    <span v-show="currentLang === 'zh'" class="desc-cn">{{ benefit.descCn }}</span>
                    <span v-show="currentLang === 'en'" class="desc-en">{{ benefit.descEn }}</span>
                  </p>
                  
                  <div class="benefit-decoration"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 第二行 -->
          <div class="benefits-row">
            <div 
              v-for="(benefit, index) in benefits.slice(3, 6)" 
              :key="index + 3"
              class="benefit-showcase-item"
              :class="{ 'reverse': (index + 3) % 2 === 1 }"
            >
              <!-- 图片区域 -->
              <div class="benefit-showcase-image">
                <img 
                  :src="benefit.image" 
                  :alt="currentLang === 'zh' ? benefit.nameCn : benefit.nameEn"
                  class="showcase-img"
                  loading="lazy"
                >
                <div class="showcase-image-overlay"></div>
                <!-- 权益编号 -->
                <div class="benefit-number">
                  <span class="number-bg">0{{ index + 4 }}</span>
                </div>
              </div>
              
              <!-- 文字区域 -->
              <div class="benefit-showcase-content">
                <div class="content-inner">
                  <span class="benefit-label">
                    <span v-show="currentLang === 'zh'">核心权益</span>
                    <span v-show="currentLang === 'en'">CORE ENTITLEMENT</span>
                    <span class="label-number">0{{ index + 4 }}</span>
                  </span>
                  
                  <h3 class="benefit-title">
                    <span v-show="currentLang === 'zh'" class="title-cn">{{ benefit.nameCn }}</span>
                    <span v-show="currentLang === 'en'" class="title-en">{{ benefit.nameEn }}</span>
                  </h3>
                  
                  <p class="benefit-description">
                    <span v-show="currentLang === 'zh'" class="desc-cn">{{ benefit.descCn }}</span>
                    <span v-show="currentLang === 'en'" class="desc-en">{{ benefit.descEn }}</span>
                  </p>
                  
                  <div class="benefit-decoration"></div>
                </div>
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
                <img src="/images/testimonials/avatar-david.jpg" alt="David" loading="lazy">
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
                <img src="/images/testimonials/avatar-maria.jpg" alt="Maria" loading="lazy">
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
                <img src="/images/testimonials/avatar-kenji.jpg" alt="Kenji" loading="lazy">
              </div>
              <div class="author-info">
                <span class="author-name">Kenji</span>
                <span class="author-location">Japan · 日本</span>
              </div>
            </div>
          </div>
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
  font-size: clamp(4rem, 8vw, 7rem);
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
  font-size: clamp(2.5rem, 5vw, 4rem);
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

/* Benefits Showcase - 2 Rows x 3 Columns Layout */
.benefits-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.benefits-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);  /* 缩小列间距 */
  overflow-x: auto;  /* 支持横向滚动 */
  padding-bottom: var(--spacing-md);
}

/* 滚动条样式 */
.benefits-row::-webkit-scrollbar {
  height: 6px;
}

.benefits-row::-webkit-scrollbar-track {
  background: var(--sand);
  border-radius: 3px;
}

.benefits-row::-webkit-scrollbar-thumb {
  background: var(--secondary);
  border-radius: 3px;
}

.benefits-row::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-dark);
}

.benefit-showcase-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 280px;  /* 降低高度，形成扁长方形 */
  min-width: 600px;  /* 增加宽度，形成长方形 */
  background-color: var(--white);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
  flex-shrink: 0;
  gap: 0;  /* 移除间距，让两个区域独立 */
}

.benefit-showcase-item:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.benefit-showcase-item.reverse {
  direction: rtl;
}

.benefit-showcase-item.reverse .benefit-showcase-content {
  direction: ltr;
}

/* Image Side - Perfect Square */
.benefit-showcase-image {
  position: relative;
  overflow: hidden;
  border-right: 3px solid var(--secondary);  /* 金色分隔线 */
  aspect-ratio: 1 / 1;  /* 强制正方形 */
}

.showcase-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.benefit-showcase-item:hover .showcase-img {
  transform: scale(1.05);
}

.showcase-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(26, 74, 62, 0.4) 0%, 
    rgba(26, 74, 62, 0.2) 100%);
  pointer-events: none;
}

/* Number Badge */
.benefit-number {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  z-index: 2;
}

.number-bg {
  display: inline-block;
  font-size: 3rem;  /* 缩小编号 */
  font-family: var(--font-heading);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  line-height: 1;
}

/* Content Side - Square Independent */
.benefit-showcase-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-lg);
  background-color: var(--white);
  border-left: 3px solid var(--sand);  /* 左侧淡色分隔线 */
  max-height: 280px;  /* 限制最大高度，与图片区域一致 */
  overflow: hidden;  /* 隐藏溢出 */
}

.content-inner {
  max-width: 100%;
}

.benefit-label {
  display: block;
  font-size: 0.6875rem;  /* 缩小标签 */
  font-weight: 600;
  color: var(--secondary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: var(--spacing-xs);
}

.label-number {
  display: inline-block;
  margin-left: 0.5rem;
  opacity: 0.5;
}

.benefit-title {
  margin-bottom: var(--spacing-sm);
}

.benefit-title .title-cn {
  display: block;
  font-size: 1.5rem;  /* 调整标题大小 */
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--primary-dark);
  line-height: 1.2;
  margin-bottom: var(--spacing-xs);
}

.benefit-title .title-en {
  display: block;
  font-size: 1.125rem;  /* 调整英文标题 */
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--stone-dark);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.benefit-description {
  margin-bottom: var(--spacing-sm);
}

.benefit-description .desc-cn {
  display: block;
  font-size: 0.875rem;  /* 调整中文描述 */
  color: var(--stone-dark);
  line-height: 1.6;
  white-space: pre-line;
}

.benefit-description .desc-en {
  display: block;
  font-size: 0.8125rem;  /* 调整英文描述 */
  color: var(--stone);
  line-height: 1.5;
  margin-top: 0.5rem;
  white-space: pre-line;
}

.benefit-decoration {
  width: 40px;  /* 缩小装饰线 */
  height: 2px;
  background: linear-gradient(90deg, 
    var(--secondary) 0%, 
    transparent 100%);
  margin-top: var(--spacing-sm);
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

/* Responsive */
@media (max-width: 1440px) {
  .benefits-row {
    grid-template-columns: repeat(2, 1fr);  /* 中等屏幕 2 列 */
  }
}

@media (max-width: 1024px) {
  .benefits-row {
    grid-template-columns: 1fr;  /* 小屏幕 1 列滚动 */
  }
  
  .benefit-showcase-item {
    min-height: 400px;
    min-width: auto;
  }
  
  .benefit-showcase-image {
    min-height: 200px;
  }
}

@media (max-width: 768px) {
  .benefits-row {
    grid-template-columns: 1fr;  /* 移动端 1 列 */
  }
  
  .section-title .title-cn {
    font-size: 1.75rem;
  }
  
  .section-title .title-en {
    font-size: 1.25rem;
  }
  
  .benefit-showcase-item {
    min-height: auto;
    border-radius: var(--radius-lg);
  }
  
  .benefit-showcase-image {
    height: 250px;
    min-height: 250px;
  }
  
  .number-bg {
    font-size: 2.5rem;
  }
  
  .benefit-showcase-content {
    padding: var(--spacing-md);
  }
  
  .benefit-title .title-cn {
    font-size: 1.5rem;
  }
  
  .benefit-title .title-en {
    font-size: 1.125rem;
  }
  
  .benefit-description .desc-cn {
    font-size: 0.875rem;
  }
  
  .benefit-description .desc-en {
    font-size: 0.8125rem;
  }
  
  .benefit-decoration {
    width: 30px;
  }
}

/* Detail Section Responsive */
@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .detail-item,
  .detail-item.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
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
