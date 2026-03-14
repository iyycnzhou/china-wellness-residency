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
            每年可享 30-90 天中国康养驻留，整合三甲医院医疗资源、中医调理、康复疗养于一体
          </span>
          <span v-show="currentLang === 'en'" class="desc-en">
            Wellness Residency Benefits are the core services you receive after purchasing a residency seat.<br>
            Enjoy 30-90 days annually in China, integrating top-tier medical resources, TCM wellness, and rehabilitation.
          </span>
        </p>
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

    <!-- Benefits Detail Section -->
    <section class="benefits-detail">
      <div class="container">
        <div class="detail-grid">
          <div class="detail-item">
            <img class="detail-img" src="@/assets/images/benefit-detail-stay.png" alt="康养驻留环境">
            <div class="detail-content">
              <h4>
                <span v-show="currentLang === 'zh'" class="detail-title-cn">灵活驻留安排</span>
                <span v-show="currentLang === 'en'" class="detail-title-en">Flexible Residency Scheduling</span>
              </h4>
              <p>
                <span v-show="currentLang === 'zh'" class="detail-desc-cn">根据您的个人计划，驻留时间可分次使用。无论是短期疗养还是长期驻留，都能灵活安排。</span>
                <span v-show="currentLang === 'en'" class="detail-desc-en">Your residency days can be used in multiple visits. Whether short-term recovery or extended stay, schedule it your way.</span>
              </p>
            </div>
          </div>

          <div class="detail-item reverse">
            <img class="detail-img" src="@/assets/images/benefit-detail-medical.png" alt="医疗对接服务">
            <div class="detail-content">
              <h4>
                <span v-show="currentLang === 'zh'" class="detail-title-cn">无缝医疗对接</span>
                <span v-show="currentLang === 'en'" class="detail-title-en">Seamless Medical Coordination</span>
              </h4>
              <p>
                <span v-show="currentLang === 'zh'" class="detail-desc-cn">平台作为医疗协调与服务中心，为您对接三甲医院资源，提供从预约到康复的全流程服务。</span>
                <span v-show="currentLang === 'en'" class="detail-desc-en">We coordinate with Grade-A hospitals to provide end-to-end medical services, from appointment to recovery.</span>
              </p>
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
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  color: #ffffff;
}

.title-cn {
  display: block;
  color: #ffffff;
}

.title-en {
  display: block;
  font-size: 2rem;
  letter-spacing: 0.1em;
  color: #ffffff;
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
  max-width: 700px;
  margin: 1.5rem auto 0;
  font-size: 1rem;
  line-height: 1.8;
}

.desc-cn {
  display: block;
  color: var(--color-white);
  opacity: 0.9;
}

.desc-en {
  display: block;
  color: var(--color-white);
  opacity: 0.85;
  font-size: 0.9375rem;
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

.title-cn {
  display: block;
  font-size: clamp(2rem, 4vw, 3rem);
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--primary-dark);
  letter-spacing: -0.02em;
}

.title-en {
  display: block;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--stone);
  letter-spacing: 0.15em;
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

/* Benefits Detail */
.benefits-detail {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-off-white);
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
  height: 500px;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
}

.detail-content h4 {
  margin-bottom: 1rem;
}

.detail-title-cn {
  display: block;
  font-size: 1.75rem;
  color: var(--color-black);
}

.detail-title-en {
  display: block;
  font-size: 1.5rem;
  color: var(--color-black);
  letter-spacing: 0.05em;
}

.detail-desc-cn {
  display: block;
  color: var(--color-stone);
  line-height: 1.8;
  margin-top: 0.75rem;
}

.detail-desc-en {
  display: block;
  color: var(--color-stone);
  line-height: 1.8;
  margin-top: 0.75rem;
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
</style>
