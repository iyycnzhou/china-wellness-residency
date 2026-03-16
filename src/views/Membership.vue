<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'

const memberships = [
  {
    tier: 'basic',
    badge: '🥉',
    nameCn: '基础康养驻留',
    nameEn: 'Basic Wellness Residency',
    price: '3,000–5,000',
    period: 'USD / 年',
    suitableCn: '适合关注健康管理与休闲度假的普通客户',
    suitableEn: 'For health-conscious individuals seeking wellness and leisure',
    features: [
      { cn: '1 张床位（单人/双人可选）', en: '1 Bed (single or double occupancy)' },
      { cn: '30 天年度驻留', en: '30 days annual residency' },
      { cn: '基础年度健康体检', en: 'Basic annual health screening' },
      { cn: '医疗咨询服务', en: 'Medical consultation services' },
      { cn: '康养旅游权益（景区门票 + 休闲课程）', en: 'Wellness tourism benefits (attraction tickets + leisure courses)' },
    ],
    reimbursement: null,
    highlight: false,
  },
  {
    tier: 'medical',
    badge: '🥈',
    nameCn: '医疗康养驻留',
    nameEn: 'Medical Wellness Residency',
    price: '8,000–12,000',
    period: 'USD / 年',
    suitableCn: '适合有一定医疗需求的国际客户',
    suitableEn: 'For international clients with specific medical needs',
    features: [
      { cn: '2 张床位（单人/双人可选）', en: '2 Beds (single or double occupancy)' },
      { cn: '60 天年度驻留', en: '60 days annual residency' },
      { cn: '深度年度体检', en: 'Comprehensive annual screening' },
      { cn: '中医康复与调理服务', en: 'TCM rehabilitation and conditioning' },
      { cn: '医疗绿色通道', en: 'Priority medical access' },
    ],
    reimbursement: '10 万元人民币',
    highlight: true,
  },
  {
    tier: 'premium',
    badge: '🥇',
    nameCn: '高端医疗会员',
    nameEn: 'Premium Medical Residency',
    price: '20,000',
    period: 'USD / 年',
    suitableCn: '适合高端医疗旅游客户、企业高管、富裕家庭',
    suitableEn: 'For premium medical tourists, executives, and affluent families',
    features: [
      { cn: '3 张床位（高端房型）', en: '3 Beds (premium accommodations)' },
      { cn: '90 天年度驻留', en: '90 days annual residency' },
      { cn: 'VIP 医疗服务（年度深度体检 + 专家会诊）', en: 'VIP medical services (comprehensive screening + specialist consultations)' },
      { cn: '中医康复及特色疗养课程', en: 'TCM rehabilitation and specialty wellness programs' },
      { cn: '私人健康管家全程服务', en: 'Dedicated personal health concierge' },
    ],
    reimbursement: '30 万元人民币',
    highlight: false,
  },
]
</script>

<template>
  <div class="membership-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <img class="hero-bg" src="@/assets/images/membership-hero.jpg" alt="Membership Hero" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;" />
      
      <div class="hero-overlay"></div>
      
      <div class="hero-content container">
        <!-- 中文版本 -->
        <div v-show="currentLang === 'zh'" class="hero-content-zh">
          <p class="hero-subtitle-cn">
            加入 China Wellness Residency 会员计划，开启您的中国健康之旅
          </p>
          <div class="hero-description-cn">
            <p>
              我们的会员计划是<strong>中国国际健康驻留计划</strong>的核心服务，专为追求高品质健康生活的全球精英人士设计。成为会员后，您将获得中国顶级医疗康养资源的<strong>综合使用权</strong>，包括三甲医院绿色通道、高端康养基地驻留、中医调理康复、健康旅游体验等全方位服务。无论您是希望定期来华进行健康体检与调理，还是寻求专业医疗服务，或是体验中国传统康养文化，我们的三档会员方案都能满足您的个性化需求。
            </p>
          </div>
          <div class="hero-tabs-cn">
            <div class="hero-tab">
              <span class="tab-text">医疗资源绿色通道</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">康养基地专属席位</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">专属医疗保障计划</span>
            </div>
          </div>
        </div>
        
        <!-- 英文版本 -->
        <div v-show="currentLang === 'en'" class="hero-content-en">
          <p class="hero-subtitle-en">
            Join China Wellness Residency and Begin Your Wellness Journey in China
          </p>
          <div class="hero-description-en">
            <p>
              Our Membership Program is the core service of the <strong>China International Wellness Residency Program</strong>, 
              designed for global elites pursuing a high-quality healthy lifestyle.
            </p>
            <p>
              As a member, you will gain <strong>comprehensive access</strong> to China's top medical and wellness resources, 
              including priority access to top-tier hospitals, stays at premium wellness bases, TCM rehabilitation and conditioning, 
              wellness tourism experiences, and comprehensive services.
            </p>
            <p>
              Whether you wish to visit China regularly for health checkups and conditioning, seek professional medical services, 
              or experience traditional Chinese wellness culture, our three membership tiers can meet your personalized needs.
            </p>
          </div>
          <div class="hero-tabs-en">
            <div class="hero-tab">
              <span class="tab-text">Priority Medical Access</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">Exclusive Wellness Base Seats</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">Medical Protection Plan</span>
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
            <span v-show="currentLang === 'zh'" class="intro-title-cn">选择适合您的会员方案</span>
            <span v-show="currentLang === 'en'" class="intro-title-en">Choose Your Membership Plan</span>
          </h2>
          <p class="intro-text">
            <span v-show="currentLang === 'zh'" class="intro-desc-cn">
              我们为中国国际健康驻留计划提供三档会员选择，从基础康养到高端医疗，满足不同客户的健康需求。
              每一档会员都享有专属的康养权益、医疗保障和增值服务，让您的中国健康之旅更加安心、舒适。
            </span>
            <span v-show="currentLang === 'en'" class="intro-desc-en">
              We offer three membership tiers for the China Wellness Residency Program, from basic wellness to premium medical care,
              catering to different health needs. Each tier includes exclusive wellness benefits, medical protection, and value-added services,
              making your wellness journey in China more secure and comfortable.
            </span>
          </p>
          <p class="intro-highlight">
            <span v-show="currentLang === 'zh'" class="highlight-cn">所有会员均享受 24/7 中文/英文双语客服支持</span>
            <span v-show="currentLang === 'en'" class="highlight-en">All members enjoy 24/7 bilingual Chinese/English concierge support</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Membership Cards -->
    <section class="membership-section">
      <div class="container">
        <div class="membership-grid">
          <div 
            v-for="member in memberships" 
            :key="member.tier"
            :class="['membership-card', { highlight: member.highlight }]"
          >
            <div class="membership-header">
              <span class="membership-badge">{{ member.badge }}</span>
              <h3>
                <span v-show="currentLang === 'zh'" class="member-name-cn">{{ member.nameCn }}</span>
                <span v-show="currentLang === 'en'" class="member-name-en">{{ member.nameEn }}</span>
              </h3>
              <div class="membership-price">
                <span class="price">{{ member.price }}</span>
                <span class="period">{{ member.period }}</span>
              </div>
            </div>

            <p class="membership-suitable">
              <span v-show="currentLang === 'zh'" class="suitable-cn">{{ member.suitableCn }}</span>
              <span v-show="currentLang === 'en'" class="suitable-en">{{ member.suitableEn }}</span>
            </p>

            <ul class="membership-features">
              <li v-for="(feature, index) in member.features" :key="index">
                <span v-show="currentLang === 'zh'" class="feature-cn">{{ feature.cn }}</span>
                <span v-show="currentLang === 'en'" class="feature-en">{{ feature.en }}</span>
              </li>
            </ul>

            <div v-if="member.reimbursement" class="reimbursement-badge">
              <span class="reimbursement-label">
                <span v-show="currentLang === 'zh'" class="label-cn">医疗保障额度</span>
                <span v-show="currentLang === 'en'" class="label-en">Medical Protection</span>
              </span>
              <span class="reimbursement-amount">{{ member.reimbursement }}</span>
            </div>

            <router-link to="/contact" class="btn" :class="member.highlight ? 'btn-gold' : 'btn-primary'">
              {{ currentLang === 'zh' ? '立即咨询' : 'Book Now' }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="comparison-section">
      <div class="container">
        <h2 class="section-title">
          <span v-show="currentLang === 'zh'" class="title-cn">权益对比</span>
          <span v-show="currentLang === 'en'" class="title-en">Benefits Comparison</span>
        </h2>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="feature-col">
                  <span v-show="currentLang === 'zh'" class="th-cn">权益项目</span>
                  <span v-show="currentLang === 'en'" class="th-en">Benefits</span>
                </th>
                <th>
                  <span v-show="currentLang === 'zh'" class="th-cn">基础</span>
                  <span v-show="currentLang === 'en'" class="th-en">Basic</span>
                </th>
                <th class="highlight-col">
                  <span v-show="currentLang === 'zh'" class="th-cn">医疗</span>
                  <span v-show="currentLang === 'en'" class="th-en">Medical</span>
                </th>
                <th>
                  <span v-show="currentLang === 'zh'" class="th-cn">高端</span>
                  <span v-show="currentLang === 'en'" class="th-en">Premium</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">床位数量</span>
                  <span v-show="currentLang === 'en'" class="td-en">Beds</span>
                </td>
                <td>1</td>
                <td class="highlight-col">2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">年度驻留天数</span>
                  <span v-show="currentLang === 'en'" class="td-en">Annual Residency Days</span>
                </td>
                <td>30</td>
                <td class="highlight-col">60</td>
                <td>90</td>
              </tr>
              <tr>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">健康体检</span>
                  <span v-show="currentLang === 'en'" class="td-en">Health Screening</span>
                </td>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">基础</span>
                  <span v-show="currentLang === 'en'" class="td-en">Basic</span>
                </td>
                <td class="highlight-col">
                  <span v-show="currentLang === 'zh'" class="td-cn">深度</span>
                  <span v-show="currentLang === 'en'" class="td-en">Comprehensive</span>
                </td>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">VIP</span>
                  <span v-show="currentLang === 'en'" class="td-en">VIP</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">医疗绿色通道</span>
                  <span v-show="currentLang === 'en'" class="td-en">Priority Medical Access</span>
                </td>
                <td>—</td>
                <td class="highlight-col">✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">医疗保障报销</span>
                  <span v-show="currentLang === 'en'" class="td-en">Medical Reimbursement</span>
                </td>
                <td>—</td>
                <td class="highlight-col">10 万元</td>
                <td>30 万元</td>
              </tr>
              <tr>
                <td>
                  <span v-show="currentLang === 'zh'" class="td-cn">私人健康管家</span>
                  <span v-show="currentLang === 'en'" class="td-en">Personal Health Concierge</span>
                </td>
                <td>—</td>
                <td class="highlight-col">—</td>
                <td>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.membership-page {
  padding-top: var(--header-height);
}

/* Intro Section */
.intro-section {
  padding: 4rem 0;
  background-color: var(--color-white);
}

.intro-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.intro-title-cn,
.intro-title-en {
  display: block;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 1.5rem;
  text-align: center;
}

.intro-text {
  font-size: 1.125rem;
  line-height: 2;
  color: #6f7c76;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.intro-highlight {
  font-size: 1rem;
  color: var(--color-secondary);
  font-weight: 500;
  text-align: center;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
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
  color: var(--color-white);
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.hero-subtitle-cn,
.hero-subtitle-en {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-sand);
  font-weight: 500;
}

/* Hero Description - Chinese */
.hero-description-cn {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-description-cn p {
  font-size: 1.25rem;
  line-height: 2;
  margin-bottom: 0;
  color: var(--color-white);
}

.hero-description-cn strong {
  color: var(--color-secondary);
  font-weight: 600;
}

/* Hero Description - English */
.hero-description-en {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-description-en p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 0;
  color: var(--color-white);
}

.hero-description-en strong {
  color: var(--color-secondary);
  font-weight: 600;
}

/* Hero Tabs - 标签样式 */
.hero-tabs-cn,
.hero-tabs-en {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
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
  color: var(--color-white);
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* Hero Highlights - 保留原有样式供其他页面使用 */
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
  color: var(--color-white);
  text-align: left;
}

/* Membership Section */
.membership-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.membership-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.membership-card {
  padding: 3rem 2rem;
  background-color: var(--color-off-white);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
}

.membership-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
}

.membership-card.highlight {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-secondary);
}

.membership-card.highlight .member-name-cn,
.membership-card.highlight .member-name-en,
.membership-card.highlight .suitable-cn,
.membership-card.highlight .feature-cn,
.membership-card.highlight .feature-en {
  color: var(--color-white);
}

.membership-card.highlight .member-name-en,
.membership-card.highlight .suitable-en,
.membership-card.highlight .feature-en {
  color: var(--color-secondary);
}

.membership-badge {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.membership-header h3 {
  margin-bottom: 1rem;
}

.member-name-cn {
  display: block;
  font-size: 1.5rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.member-name-en {
  display: block;
  font-size: 0.875rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.membership-price {
  margin: 2rem 0;
}

.price {
  display: block;
  font-size: 2.5rem;
  font-family: var(--font-primary);
  color: var(--color-black);
}

.membership-card.highlight .price {
  color: var(--color-white);
}

.period {
  display: block;
  font-size: 0.875rem;
  color: var(--color-stone);
  margin-top: 0.5rem;
}

.membership-suitable {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.membership-card.highlight .membership-suitable {
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.suitable-cn {
  display: block;
  color: var(--color-stone);
  margin-bottom: 0.5rem;
}

.membership-card.highlight .suitable-cn {
  color: var(--color-sand);
}

.suitable-en {
  display: block;
  font-size: 0.9375rem;
  color: var(--color-stone);
}

.membership-features {
  list-style: none;
  margin-bottom: 2rem;
  text-align: left;
  flex-grow: 1;
}

.membership-features li {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.membership-card.highlight .membership-features li {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.feature-cn {
  display: block;
  color: var(--color-stone);
  margin-bottom: 0.25rem;
}

.feature-en {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-stone);
}

.reimbursement-badge {
  background-color: var(--color-secondary);
  color: var(--color-white);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
  flex-shrink: 0;
}

.reimbursement-label {
  display: block;
  margin-bottom: 0.5rem;
}

.label-cn {
  display: block;
  font-size: 0.9375rem;
}

.label-en {
  display: block;
  font-size: 0.75rem;
  opacity: 0.8;
  letter-spacing: 0.1em;
}

.reimbursement-amount {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
}

/* 按钮自动推到底部 */
.membership-card .btn {
  margin-top: auto;
  align-self: center;
}

/* Comparison Section */
.comparison-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-off-white);
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
}

.title-cn {
  display: block;
  font-size: 2.5rem;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.title-en {
  display: block;
  font-size: 1.25rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.comparison-table-wrapper {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--color-white);
}

.comparison-table th,
.comparison-table td {
  padding: 1.25rem;
  text-align: center;
  border-bottom: 1px solid var(--color-sand);
}

.comparison-table th {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: 400;
}

.feature-col {
  text-align: left !important;
  width: 25%;
}

.th-cn,
.td-cn {
  display: block;
}

.th-en,
.td-en {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
}

.highlight-col {
  background-color: rgba(201, 169, 98, 0.1);
}

.comparison-table th.highlight-col {
  background-color: var(--color-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .membership-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
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
  
  .hero-subtitle-cn,
  .hero-subtitle-en {
    font-size: 1.5rem;
  }
  
  .hero-description-cn p,
  .hero-description-en p {
    font-size: 1.125rem;
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

@media (max-width: 768px) {
  .hero-description-cn,
  .hero-description-en {
    padding: 1.25rem;
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
  
  .hero-tabs-cn,
  .hero-tabs-en {
    gap: 0.75rem;
  }
  
  .hero-tab {
    padding: 0.625rem 1rem;
  }
  
  .tab-text {
    font-size: 0.8125rem;
  }
}
</style>
