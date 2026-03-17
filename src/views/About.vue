<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <img class="hero-bg" src="@/assets/images/about-hero.jpg" alt="About Hero" />
      
      <div class="hero-overlay"></div>
      
      <div class="hero-content container">
        <!-- 中文版本 -->
        <div v-show="currentLang === 'zh'" class="hero-content-zh">
          <h1 class="title-cn">关于我们</h1>
          <p class="hero-subtitle-cn">
            连接全球客户与中国优质医疗康养资源
          </p>
          <div class="hero-description-cn">
            <p>
              <strong>中国全球健康驻留权益网络</strong>是一个面向全球客户的医疗 + 康养 + 旅游 + 健康保障综合服务平台。
              我们整合中国顶级三甲医院、康养基地、温泉度假村和传统文化养生资源，为国际客户提供一站式健康解决方案。
            </p>
            <p>
              通过我们的<strong>中国国际健康驻留计划（China Wellness Residency Program）</strong>，
              客户购买的不仅是一次旅行，而是中国医疗康养资源的<strong>综合使用权与医疗保障权益</strong>。
              无论您是寻求健康体检、疾病治疗、康复疗养，还是体验中医文化，我们都能为您提供专业服务。
            </p>
          </div>
          <div class="hero-tabs-cn">
            <div class="hero-tab">
              <span class="tab-text">三甲医院深度合作</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">传统中医养生智慧</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">完善医疗保障体系</span>
            </div>
          </div>
        </div>
        
        <!-- 英文版本 -->
        <div v-show="currentLang === 'en'" class="hero-content-en">
          <h1 class="title-en">About Us</h1>
          <p class="hero-subtitle-en">
            Connecting Global Clients with China's Premium Medical & Wellness Resources
          </p>
          <div class="hero-description-en">
            <p>
              <strong>China Wellness Residency Benefits Network</strong> is an integrated service platform combining medical care, wellness,
              tourism, and health protection for global clients. We integrate China's top-tier hospitals, wellness bases, hot spring resorts,
              and traditional cultural wellness resources to provide one-stop health solutions for international clients.
            </p>
            <p>
              Through our <strong>China Wellness Residency Program</strong>, clients purchase not just a trip, but <strong>comprehensive access rights
              and medical protection benefits</strong> to China's medical and wellness resources. Whether you seek health checkups, disease treatment,
              rehabilitation conditioning, or TCM cultural experiences, we provide professional services tailored to your needs.
            </p>
          </div>
          <div class="hero-tabs-en">
            <div class="hero-tab">
              <span class="tab-text">Deep Partnerships with Grade-A Hospitals</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">Traditional TCM Wellness Wisdom</span>
            </div>
            <div class="hero-tab">
              <span class="tab-text">Comprehensive Medical Protection System</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Intro -->
    <section class="company-intro">
      <div class="container">
        <div class="intro-content">
          <h2 class="company-name">
            <span v-show="currentLang === 'zh'" class="name-cn">中国全球健康驻留权益网络</span>
            <span v-show="currentLang === 'en'" class="name-en">China Wellness Residency Benefits Network</span>
          </h2>

          <p class="intro-text">
            <span v-show="currentLang === 'zh'" class="text-cn">我们是一个面向全球客户的医疗 + 康养 + 旅游 + 健康保障综合服务平台。</span>
            <span v-show="currentLang === 'en'" class="text-en">We are an integrated service platform combining medical care, wellness, tourism, and health protection for global clients.</span>
          </p>

          <p class="intro-text">
            <span v-show="currentLang === 'zh'" class="text-cn">通过整合中国优质医疗资源与康养资源，我们为国际客户提供 <strong>中国国际健康驻留计划（China Wellness Residency Program）</strong>，让客户购买的不仅是一次旅行，而是中国医疗康养资源的综合使用权与医疗保障权益。</span>
            <span v-show="currentLang === 'en'" class="text-en">By integrating China's premium medical and wellness resources, we offer the <strong>China Wellness Residency Program</strong> — giving international clients not just a trip, but comprehensive access to China's medical and wellness resources with health protection benefits.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision">
      <div class="container">
        <div class="mv-grid">
          <div class="mv-card">
            <img class="mv-img" src="@/assets/images/mission.jpg" alt="Mission" />
            <div class="mv-content">
              <h3>
                <span v-show="currentLang === 'zh'" class="mv-title-cn">我们的使命</span>
                <span v-show="currentLang === 'en'" class="mv-title-en">Our Mission</span>
              </h3>
              <p class="mv-desc">
                <span v-show="currentLang === 'zh'" class="mv-desc-cn">
                  让全球客户在中国找到健康、平静与生命的延续。我们相信，每个人都值得拥有高质量的医疗服务和宁静的生活环境。
                  通过整合中国优质的医疗资源与康养文化，我们致力于为客户打造一个身心平衡的健康生态系统。
                </span>
                <span v-show="currentLang === 'en'" class="mv-desc-en">
                  Help global clients find health, peace, and longevity in China. We believe everyone deserves access to high-quality medical care and a tranquil living environment.
                  By integrating China's premium medical resources and wellness culture, we are committed to creating a balanced health ecosystem for our clients.
                </span>
              </p>
            </div>
          </div>

          <div class="mv-card">
            <img class="mv-img" src="@/assets/images/vision.jpg" alt="Vision" />
            <div class="mv-content">
              <h3>
                <span v-show="currentLang === 'zh'" class="mv-title-cn">我们的愿景</span>
                <span v-show="currentLang === 'en'" class="mv-title-en">Our Vision</span>
              </h3>
              <p class="mv-desc">
                <span v-show="currentLang === 'zh'" class="mv-desc-cn">
                  成为全球领先的医疗康养驻留服务平台。我们希望通过专业的服务、优质的资源和创新的理念，
                  让更多国际客户认识并体验到中国医疗康养的魅力，搭建起中外健康文化交流的桥梁。
                </span>
                <span v-show="currentLang === 'en'" class="mv-desc-en">
                  Become the world's leading medical wellness residency platform. We hope that through professional services,
                  premium resources, and innovative concepts, more international clients will discover and experience the charm of China's medical wellness,
                  building a bridge for health and cultural exchange between China and the world.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">3+</span>
            <span class="stat-label">
              <span v-show="currentLang === 'zh'" class="label-cn">会员等级</span>
              <span v-show="currentLang === 'en'" class="label-en">Membership Tiers</span>
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-number">50+</span>
            <span class="stat-label">
              <span v-show="currentLang === 'zh'" class="label-cn">合作医疗机构</span>
              <span v-show="currentLang === 'en'" class="label-en">Partner Medical Institutions</span>
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-number">10+</span>
            <span class="stat-label">
              <span v-show="currentLang === 'zh'" class="label-cn">康养目的地</span>
              <span v-show="currentLang === 'en'" class="label-en">Wellness Destinations</span>
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">
              <span v-show="currentLang === 'zh'" class="label-cn">客户支持</span>
              <span v-show="currentLang === 'en'" class="label-en">Customer Support</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <h2 class="section-title">
          <span v-show="currentLang === 'zh'" class="title-cn">核心价值观</span>
          <span v-show="currentLang === 'en'" class="title-en">Core Values</span>
        </h2>

        <div class="values-grid">
          <div class="value-card">
            <span class="value-icon">🏥</span>
            <h4>
              <span v-show="currentLang === 'zh'" class="value-cn">专业医疗</span>
              <span v-show="currentLang === 'en'" class="value-en">Medical Excellence</span>
            </h4>
            <p>
              <span v-show="currentLang === 'zh'" class="value-desc-cn">与三甲医院深度合作，提供世界级医疗服务</span>
              <span v-show="currentLang === 'en'" class="value-desc-en">Deep partnerships with Grade-A hospitals for world-class medical care</span>
            </p>
          </div>

          <div class="value-card">
            <span class="value-icon">🌿</span>
            <h4>
              <span v-show="currentLang === 'zh'" class="value-cn">东方智慧</span>
              <span v-show="currentLang === 'en'" class="value-en">Eastern Wisdom</span>
            </h4>
            <p>
              <span v-show="currentLang === 'zh'" class="value-desc-cn">传承千年中医养生哲学，融入现代健康管理</span>
              <span v-show="currentLang === 'en'" class="value-desc-en">Ancient TCM wellness philosophy integrated into modern health management</span>
            </p>
          </div>

          <div class="value-card">
            <span class="value-icon">🛡️</span>
            <h4>
              <span v-show="currentLang === 'zh'" class="value-cn">安心保障</span>
              <span v-show="currentLang === 'en'" class="value-en">Trusted Protection</span>
            </h4>
            <p>
              <span v-show="currentLang === 'zh'" class="value-desc-cn">完善的医疗保障体系，让客户无后顾之忧</span>
              <span v-show="currentLang === 'en'" class="value-desc-en">Comprehensive medical protection for peace of mind</span>
            </p>
          </div>

          <div class="value-card">
            <span class="value-icon">🌏</span>
            <h4>
              <span v-show="currentLang === 'zh'" class="value-cn">全球服务</span>
              <span v-show="currentLang === 'en'" class="value-en">Global Service</span>
            </h4>
            <p>
              <span v-show="currentLang === 'zh'" class="value-desc-cn">多语言团队，服务全球客户</span>
              <span v-show="currentLang === 'en'" class="value-desc-en">Multilingual team serving clients worldwide</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
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

/* Company Intro */
.company-intro {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.intro-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.company-name {
  margin-bottom: 3rem;
}

.name-cn,
.name-en {
  display: block;
  text-align: center;
}

.name-cn {
  font-size: 2.5rem;
  color: var(--color-black);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.name-en {
  font-size: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
  font-weight: 500;
}

.intro-text {
  font-size: 1.125rem;
  line-height: 2;
  margin-bottom: 1.5rem;
}

.text-cn,
.text-en {
  display: block;
  text-align: center;
  color: var(--color-stone);
}

/* Mission & Vision */
.mission-vision {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-off-white);
}

.mv-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.mv-card {
  background-color: var(--color-white);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mv-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.mv-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.mv-content {
  padding: 2.5rem;
  text-align: center;
}

.mv-content h3 {
  margin-bottom: 1rem;
}

.mv-title-cn,
.mv-title-en {
  display: block;
  text-align: center;
}

.mv-title-cn {
  font-size: 2rem;
  color: var(--color-black);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.mv-title-en {
  font-size: 1.25rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
  font-weight: 500;
}

.mv-desc-cn,
.mv-desc-en {
  display: block;
  text-align: center;
}

.mv-desc-cn {
  color: var(--color-stone);
  font-size: 1.0625rem;
  line-height: 1.8;
}

.mv-desc-en {
  color: var(--color-stone);
  font-size: 1rem;
  line-height: 1.7;
}

/* Stats Section */
.stats-section {
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, 
    rgba(26, 74, 62, 0.85) 0%, 
    rgba(26, 74, 62, 0.75) 100%),
    url('@/assets/images/partners-bg.jpg') center/cover no-repeat;
  position: relative;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.stat-item {
  color: var(--color-white);
  position: relative;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
}

.stat-number {
  display: block;
  font-size: 3.5rem;
  font-family: var(--font-primary);
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

.stat-label {
  font-size: 0.9375rem;
}

.label-cn,
.label-en {
  display: block;
  text-align: center;
}

.label-cn {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.label-en {
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.85;
}

/* Values Section */
.values-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-white);
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
}

.title-cn,
.title-en {
  display: block;
  text-align: center;
}

.title-cn {
  font-size: 2.5rem;
  color: var(--color-black);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.title-en {
  font-size: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
  font-weight: 500;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.value-card {
  text-align: center;
  padding: 2rem;
  background-color: var(--color-off-white);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.value-card h4 {
  margin-bottom: 1rem;
}

.value-cn,
.value-en {
  display: block;
  text-align: center;
}

.value-cn {
  font-size: 1.375rem;
  color: var(--color-black);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.value-en {
  font-size: 1.0625rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
  font-weight: 500;
}

.value-desc-cn,
.value-desc-en {
  display: block;
  text-align: center;
}

.value-desc-cn {
  color: var(--color-stone);
  font-size: 1rem;
  line-height: 1.6;
}

.value-desc-en {
  color: var(--color-stone);
  font-size: 0.9375rem;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 1024px) {
  .mv-grid,
  .stats-grid,
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
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
  .mv-grid,
  .stats-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-item:not(:last-child)::after {
    display: none;
  }
}
</style>
