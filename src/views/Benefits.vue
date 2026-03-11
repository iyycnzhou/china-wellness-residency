<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'

const benefits = [
  {
    icon: '🏠',
    nameCn: '康养驻留',
    nameEn: 'Wellness Residency Stay',
    descCn: '每年 30/60/90 天灵活驻留，山东海滨、温泉度假区、康养小镇任选',
    descEn: '30/60/90 days annually, flexible scheduling across Shandong coastal, hot spring resorts, wellness towns',
  },
  {
    icon: '🏥',
    nameCn: '医疗接入',
    nameEn: 'Medical Access',
    descCn: '三甲医院绿色通道、专家预约、快速门诊、住院协调',
    descEn: 'Priority lanes at top hospitals, specialist appointments, expedited consultations, hospitalization coordination',
  },
  {
    icon: '📋',
    nameCn: '健康档案',
    nameEn: 'Health Records',
    descCn: '个人健康数据长期管理、年度体检、中医体质评估',
    descEn: 'Long-term personal health data management, annual screenings, TCM constitution assessment',
  },
  {
    icon: '🛡️',
    nameCn: '医疗保障',
    nameEn: 'Medical Protection',
    descCn: '定点医院费用报销，最高 50 万元人民币',
    descEn: 'Reimbursement at partner hospitals, up to ¥500,000 RMB',
  },
  {
    icon: '🎋',
    nameCn: '康养体验',
    nameEn: 'Wellness Experiences',
    descCn: '太极、气功、中医养生课程、景区门票专享',
    descEn: 'Tai Chi, Qigong, TCM wellness courses, exclusive attraction tickets',
  },
  {
    icon: '👨‍👩‍👧',
    nameCn: '家庭共享',
    nameEn: 'Family Sharing',
    descCn: '主卡人可灵活分配权益给家庭成员使用',
    descEn: 'Primary member can flexibly allocate benefits to family members',
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
        <p class="hero-subtitle">
          <span v-show="currentLang === 'zh'" class="subtitle-cn">您的驻留席位，包含六大核心权益</span>
          <span v-show="currentLang === 'en'" class="subtitle-en">Your Residency Includes Six Core Entitlements</span>
        </p>
      </div>
    </section>

    <!-- Benefits Grid -->
    <section class="benefits-section">
      <div class="container">
        <div class="benefits-grid">
          <div 
            v-for="(benefit, index) in benefits" 
            :key="index"
            class="benefit-card"
          >
            <span class="benefit-icon">{{ benefit.icon }}</span>
            <h3>
              <span v-show="currentLang === 'zh'" class="benefit-name-cn">{{ benefit.nameCn }}</span>
              <span v-show="currentLang === 'en'" class="benefit-name-en">{{ benefit.nameEn }}</span>
            </h3>
            <p>
              <span v-show="currentLang === 'zh'" class="benefit-desc-cn">{{ benefit.descCn }}</span>
              <span v-show="currentLang === 'en'" class="benefit-desc-en">{{ benefit.descEn }}</span>
            </p>
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
  color: var(--color-white);
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
}

.title-cn {
  display: block;
  color: var(--color-white);
}

.title-en {
  display: block;
  font-size: 2rem;
  letter-spacing: 0.1em;
  color: var(--color-white);
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
.benefits-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.benefit-card {
  padding: 3rem 2rem;
  text-align: center;
  background-color: var(--color-off-white);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.benefit-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1.5rem;
}

.benefit-card h3 {
  margin-bottom: 1rem;
}

.benefit-name-cn {
  display: block;
  font-size: 1.5rem;
  color: var(--color-black);
}

.benefit-name-en {
  display: block;
  font-size: 1.25rem;
  color: var(--color-black);
  letter-spacing: 0.05em;
}

.benefit-card p {
  font-size: 1rem;
  line-height: 1.8;
}

.benefit-desc-cn {
  display: block;
  color: var(--color-stone);
  line-height: 1.8;
}

.benefit-desc-en {
  display: block;
  color: var(--color-stone);
  line-height: 1.8;
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
@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
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
