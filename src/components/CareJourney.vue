<script setup lang="ts">
import { ref } from 'vue'

// 四个核心服务卡片
const cards = ref([
  {
    index: '01',
    titleCn: '初始咨询',
    titleEn: 'Initial Consultation',
    descCn: '您私人医疗旅程的入口点',
    descEn: 'A private entry point to your care journey',
    image: '/images/consultation.jpg',
    imageAlt: 'Private consultation room'
  },
  {
    index: '02',
    titleCn: '临床对接',
    titleEn: 'Clinical Access',
    descCn: '直连中国顶级医疗资源',
    descEn: 'Direct connection to top-tier medical expertise in China',
    image: '/images/clinical.jpg',
    imageAlt: 'Advanced medical facilities'
  },
  {
    index: '03',
    titleCn: '驻留康复',
    titleEn: 'Residency & Recovery',
    descCn: '在精心设计的环境中疗养恢复',
    descEn: 'Stay, recover, and restore in a curated environment',
    image: '/images/residency.jpg',
    imageAlt: 'Luxury wellness residence'
  },
  {
    index: '04',
    titleCn: '预防筛查',
    titleEn: 'Preventive Screening',
    descCn: '全面健康管理，防患于未然',
    descEn: 'Comprehensive health insights, proactively managed',
    image: '/images/screening.jpg',
    imageAlt: 'Comprehensive health checkup'
  }
])
</script>

<template>
  <!-- 核心服务旅程区域 -->
  <section class="care-section">
    <!-- 顶部引导区 -->
    <div class="header">
      <h2 class="title">
        <span class="title-cn">您的医疗旅程，</span>
        <span class="title-en">Your Journey to Care,</span>
      </h2>
      <h2 class="title-sub">
        <span class="title-cn-cn">精心管理</span>
        <span class="title-en-en">Thoughtfully Managed</span>
      </h2>
      <p class="subtitle">
        <span class="subtitle-cn">从咨询到康复驻留，每一步都由专人精心指导</span>
        <span class="subtitle-en">From consultation to recovery residency, every step is privately guided.</span>
      </p>
      <div class="cta-group">
        <router-link to="/contact" class="btn btn-primary">
          <span class="btn-cn">开始咨询</span>
          <span class="btn-en">Start Your Consultation</span>
        </router-link>
      </div>
    </div>

    <!-- 服务卡片区域（横向滑动布局） -->
    <div class="cards-slider">
      <div class="cards-container">
        <div 
          v-for="(card, index) in cards" 
          :key="index" 
          class="card"
        >
          <div class="card-image-wrapper">
            <img 
              :src="card.image" 
              :alt="card.imageAlt" 
              class="card-image"
              loading="lazy"
            />
          </div>
          
          <div class="card-content">
            <span class="card-index">{{ card.index }}</span>
            <h3 class="card-title">
              <span class="title-cn">{{ card.titleCn }}</span>
              <span class="title-en">{{ card.titleEn }}</span>
            </h3>
            <p class="card-desc">
              <span class="desc-cn">{{ card.descCn }}</span>
              <span class="desc-en">{{ card.descEn }}</span>
            </p>
            <span class="card-link">→ Explore</span>
          </div>
        </div>
      </div>
      
      <!-- 滚动提示 -->
      <div class="scroll-hint">
        <span class="hint-text">
          <span class="hint-cn">← 滑动查看更多服务</span>
          <span class="hint-en">← Swipe to explore more</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 核心服务旅程区域 */
.care-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%);
  overflow: hidden;
}

/* 顶部引导区 */
.header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 80px;
  animation: fadeInUp 0.8s ease;
}

.title {
  margin-bottom: 24px;
}

.title-cn,
.title-en {
  display: block;
}

.title-cn {
  font-size: 32px;
  font-weight: 500;
  color: #1a1a1a;
  letter-spacing: 1px;
  line-height: 1.4;
  margin-bottom: 0;
}

.title-en {
  font-size: 20px;
  font-weight: 400;
  color: #666;
  letter-spacing: 1.5px;
  line-height: 1.6;
  margin-top: 8px;
}

.title-sub {
  margin: 16px 0 32px;
}

.title-cn-cn,
.title-en-en {
  display: block;
}

.title-cn-cn {
  font-size: 32px;
  font-weight: 500;
  color: #1a1a1a;
  letter-spacing: 1px;
  line-height: 1.4;
}

.title-en-en {
  font-size: 20px;
  font-weight: 400;
  color: #666;
  letter-spacing: 1.5px;
  line-height: 1.6;
}

.subtitle {
  margin-bottom: 40px;
}

.subtitle-cn,
.subtitle-en {
  display: block;
  font-size: 16px;
  color: #666;
  line-height: 1.8;
}

.subtitle-cn {
  margin-bottom: 16px;
}

.subtitle-en {
  font-size: 14px;
}

.cta-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #BFA37A;
  color: white;
  border-radius: 999px;
  padding: 12px 28px;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.btn-primary:hover {
  background: #a88b65;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(191, 163, 122, 0.3);
}

/* 卡片滑动区域 */
.cards-slider {
  position: relative;
  padding: 0 40px;
}

.cards-container {
  display: flex;
  gap: 32px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  padding: 20px 0;
}

.cards-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* 卡片设计 */
.card {
  flex: 0 0 520px;
  width: 520px;
  height: 640px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 70%;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .card-image {
  transform: scale(1.05);
}

.card-content {
  padding: 32px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.card-index {
  display: block;
  font-size: 12px;
  color: #BFA37A;
  letter-spacing: 2px;
  margin-bottom: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.card-title {
  margin-bottom: 12px;
}

.title-cn,
.title-en {
  display: block;
}

.title-cn {
  font-size: 22px;
  font-weight: 500;
  color: #1a1a1a;
  letter-spacing: 0.5px;
  line-height: 1.4;
}

.title-en {
  font-size: 14px;
  font-weight: 400;
  color: #666;
  letter-spacing: 1.5px;
  line-height: 1.6;
  margin-top: 4px;
}

.card-desc {
  margin-bottom: 16px;
}

.desc-cn,
.desc-en {
  display: block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.6;
}

.desc-cn {
  margin-bottom: 8px;
}

.desc-en {
  font-size: 13px;
}

.card-link {
  display: inline-block;
  font-size: 14px;
  color: #BFA37A;
  font-weight: 500;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;
}

.card-link:hover {
  color: #1a1a1a;
  letter-spacing: 2px;
}

/* 滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 0;
  text-align: center;
}

.hint-text {
  font-size: 13px;
  color: #999;
  letter-spacing: 1px;
  opacity: 0.8;
}

.hint-cn,
.hint-en {
  display: block;
}

.hint-cn {
  margin-bottom: 4px;
}

.hint-en {
  font-size: 12px;
  color: #bbb;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式 */
@media (max-width: 1200px) {
  .card {
    width: 480px;
    height: 600px;
  }
  
  .title-cn {
    font-size: 28px;
  }
  
  .title-cn-cn {
    font-size: 28px;
  }
}

@media (max-width: 992px) {
  .card {
    width: 440px;
    height: 560px;
  }
  
  .title-cn {
    font-size: 24px;
  }
  
  .subtitle-cn {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .care-section {
    padding: 80px 0;
  }
  
  .header {
    margin-bottom: 40px;
  }
  
  .title-cn,
  .title-cn-cn {
    font-size: 24px;
  }
  
  .subtitle-cn {
    font-size: 14px;
  }
  
  .cards-slider {
    padding: 0 20px;
  }
  
  .cards-container {
    gap: 20px;
  }
  
  .card {
    width: 380px;
    height: 520px;
    flex: 0 0 380px;
  }
  
  .card-content {
    padding: 24px;
  }
  
  .title-cn {
    font-size: 20px;
  }
}
</style>
