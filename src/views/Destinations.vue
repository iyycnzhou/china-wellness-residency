<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'
import { ref, onMounted, onUnmounted } from 'vue'

// 使用 import.meta.glob 导入图片
const bgImages = import.meta.glob('@/assets/images/*.webp', { eager: true, import: 'default' })
const bgImagesPng = import.meta.glob('@/assets/images/*.webp', { eager: true, import: 'default' })

// 协和医院本地图片
const xieheImage = bgImages['/src/assets/images/xiehe-caption.webp']
// 华山医院本地图片
const huashanImage = bgImagesPng['/src/assets/images/huashan-caption.webp']
// 同济医院本地图片
const tongjiImage = bgImages['/src/assets/images/tongji-caption.jpeg']

// 背景图片轮播数组 - 使用实际导入的图片路径
const backgroundImages = [
  bgImages['/src/assets/images/medical-mri-scan.webp'],
  bgImages['/src/assets/images/medical-lab-test.webp'],
  bgImages['/src/assets/images/health-consultation.webp'],
  bgImagesPng['/src/assets/images/wellness-treatment.webp'],
  bgImagesPng['/src/assets/images/benefit-detail-medical.webp']
]

// 当前背景图片索引（Hero Section）
const currentBgIndex = ref(0)
let bgInterval: number | null = null

// 景区轮播
const currentAttractionIndex = ref(0)

// 切换背景图片
const nextBackground = () => {
  currentBgIndex.value = (currentBgIndex.value + 1) % backgroundImages.length
}

// 开始自动轮播
const startBackgroundRotation = () => {
  if (bgInterval) return
  bgInterval = window.setInterval(() => {
    nextBackground()
  }, 5000) // 每 5 秒切换一次
}

// 停止自动轮播
const stopBackgroundRotation = () => {
  if (bgInterval) {
    clearInterval(bgInterval)
    bgInterval = null
  }
}

// 医院轮播（Medical Section）
const currentHospitalIndex = ref(0)

const nextHospital = () => {
  currentHospitalIndex.value = (currentHospitalIndex.value + 1) % medicalPartners.featuredHospitals.length
}

const setHospitalIndex = (index: number) => {
  currentHospitalIndex.value = index
}

// 景区轮播函数
const prevAttraction = () => {
  currentAttractionIndex.value = (currentAttractionIndex.value - 1 + tourismPartners.attractions.length) % tourismPartners.attractions.length
}

const nextAttraction = () => {
  currentAttractionIndex.value = (currentAttractionIndex.value + 1) % tourismPartners.attractions.length
}

onMounted(() => {
  startBackgroundRotation()
})

onUnmounted(() => {
  stopBackgroundRotation()
})

const medicalPartners = {
  number: '50+',
  labelCn: '服务三甲医院',
  labelEn: 'Network Grade-A Hospitals',
  sublabelCn: '含 15 家全国 Top100 医院',
  sublabelEn: 'Including 15 of China\'s Top 100',
  descCn: '与全国 50+ 家顶级三甲医院建立深度服务合作关系，其中包括 15 家全国医院 Top100 强。服务涵盖心血管、骨科、牙科、肿瘤、神经科、康复医学等 20+ 重点专科。',
  descEn: 'Deep service partnerships with 50+ top-tier Grade-A hospitals nationwide, including 15 of China\'s Top 100 Hospitals. Services cover 20+ key specialties.',
  stats: [
    { num: '50+', labelCn: '三甲医院', labelEn: 'Grade-A Hospitals' },
    { num: '15', labelCn: '全国 Top100', labelEn: 'Top 100' },
    { num: '20+', labelCn: '重点专科', labelEn: 'Specialties' },
    { num: '28', labelCn: '省市覆盖', labelEn: 'Provinces' }
  ],
  featuredHospitals: [
    {
      nameCn: '北京协和医院',
      nameEn: 'Peking Union Medical College Hospital',
      image: xieheImage,
      rank: '全国 Top 3',
      specialty: '心血管、肿瘤科'
    },
    {
      nameCn: '上海华山医院',
      nameEn: 'Shanghai Huashan Hospital',
      image: huashanImage,
      rank: '全国 Top 10',
      specialty: '神经科、皮肤科'
    },
    {
      nameCn: '四川华西医院',
      nameEn: 'Sichuan West China Hospital',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&q=80',
      rank: '全国 Top 5',
      specialty: '骨科、呼吸科'
    },
    {
      nameCn: '广州中山医院',
      nameEn: 'Guangzhou Zhongshan Hospital',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80',
      rank: '全国 Top 10',
      specialty: '肝胆外科、肿瘤科'
    },
    {
      nameCn: '武汉同济医院',
      nameEn: 'Wuhan Tongji Hospital',
      image: tongjiImage,
      rank: '全国 Top 10',
      specialty: '泌尿外科、器官移植'
    },
    {
      nameCn: '浙江邵逸夫医院',
      nameEn: 'Zhejiang Sir Run Run Shaw Hospital',
      image: 'https://images.unsplash.com/photo-1516574187841-69301976e499?w=800&h=600&fit=crop&q=80',
      rank: '全国 Top 50',
      specialty: '消化内科、普外科'
    }
  ]
}

const wellnessPartners = {
  number: '20+',
  labelCn: '康养服务机构',
  labelEn: 'Wellness Service Network',
  sublabelCn: '总面积超 10000 亩',
  sublabelEn: 'Total Area 10,000+ Mu',
  descCn: '精选全国 20+ 高端康养社区，总占地面积超 10000 亩，年接待能力 10 万 + 人次。所有康养基地均为服务网络成员，确保服务品质与价格优势。',
  descEn: 'Carefully selected 20+ premium wellness communities nationwide, total area exceeds 10,000 mu, annual reception capacity 100,000+ person-times.',
  eyebrowCn: '专为您的健康而设计',
  eyebrowEn: 'DESIGNED FOR YOUR WELLNESS',
  titleCn: '康养社区，用心打造',
  titleEn: 'Wellness Communities, With Intention',
  features: [
    { icon: '🏖️', titleCn: '海滨基地', titleEn: 'Coastal Bases', descCn: '6 个海滨疗养基地', descEn: '6 coastal bases', value: '2000+ 床位' },
    { icon: '♨️', titleCn: '温泉中心', titleEn: 'Hot Spring', descCn: '5 个温泉度假基地', descEn: '5 hot spring bases', value: '天然温泉' },
    { icon: '⛰️', titleCn: '山林小镇', titleEn: 'Mountain Towns', descCn: '9 个山林康养基地', descEn: '9 mountain bases', value: '85% 森林' },
    { icon: '🏠', titleCn: '服务网络', titleEn: 'Service Network', descCn: '12 个服务网络基地', descEn: '12 network bases', value: '60% 占比' }
  ],
  bases: [
    {
      nameCn: '青岛康养基地',
      nameEn: 'Qingdao Wellness Base',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=800&fit=crop&q=85',
      categoryCn: '海滨疗养',
      categoryEn: 'Coastal Wellness'
    },
    {
      nameCn: '威海康养社区',
      nameEn: 'Weihai Wellness Community',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=800&fit=crop&q=85',
      categoryCn: '海滨度假',
      categoryEn: 'Coastal Retreat'
    },
    {
      nameCn: '临沂温泉度假村',
      nameEn: 'Linyi Hot Spring Resort',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop&q=85',
      categoryCn: '温泉疗愈',
      categoryEn: 'Hot Spring Healing'
    },
    {
      nameCn: '泰山康养中心',
      nameEn: 'Mount Tai Wellness Center',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=800&fit=crop&q=85',
      categoryCn: '山林康养',
      categoryEn: 'Mountain Wellness'
    }
  ]
}

const tourismPartners = {
  number: '150+',
  labelCn: '合作景区',
  labelEn: 'Partner Attractions',
  sublabelCn: '含 45 家 5A 级景区',
  sublabelEn: '45 5A-Rated Attractions',
  descCn: '与 150+ 家知名旅游景区建立合作关系，其中包括 45 家 5A 级景区、60 家 4A 级景区。会员可享受门票 5-8 折优惠、快速入园通道、专属导游服务等。',
  descEn: 'Partnerships with 150+ renowned attractions, including 45 5A-rated and 60 4A-rated scenic areas. Members enjoy 20-50% discounts and VIP services.',
  image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&h=800&fit=crop&q=80',
  benefits: [
    { titleCn: '门票折扣', titleEn: 'Ticket Discounts', descCn: '5A 景区 5-8 折', descEn: '20-50% off at 5A', icon: '🎫' },
    { titleCn: '快速通道', titleEn: 'Fast Track', descCn: '45 家免排队', descEn: '45 no queuing', icon: '⚡' },
    { titleCn: '专属导游', titleEn: 'Tour Guides', descCn: '20+ 家提供', descEn: '20+ available', icon: '🎤' },
    { titleCn: '定制行程', titleEn: 'Custom Tours', descCn: '康养 + 旅游', descEn: 'Wellness + Tour', icon: '📍' }
  ],
  attractions: [
    {
      nameCn: '故宫博物院',
      nameEn: 'The Palace Museum',
      image: 'https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=1200&h=600&fit=crop&q=85',
      descCn: '明清两朝皇宫，世界文化遗产',
      descEn: 'Imperial palace of Ming and Qing dynasties, UNESCO World Heritage'
    },
    {
      nameCn: '万里长城',
      nameEn: 'Great Wall of China',
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&h=600&fit=crop&q=85',
      descCn: '中华民族的象征，世界七大奇迹之一',
      descEn: 'Symbol of Chinese civilization, one of the Seven Wonders'
    },
    {
      nameCn: '兵马俑',
      nameEn: 'Terracotta Warriors',
      image: 'https://images.unsplash.com/photo-1569627048875-5b6db599a48a?w=1200&h=600&fit=crop&q=85',
      descCn: '秦始皇陵陪葬坑，世界第八大奇迹',
      descEn: 'Mausoleum of the First Qin Emperor, the Eighth Wonder'
    },
    {
      nameCn: '九寨沟',
      nameEn: 'Jiuzhaigou Valley',
      image: 'https://images.unsplash.com/photo-1598812832376-5c64377a8a3f?w=1200&h=600&fit=crop&q=85',
      descCn: '人间仙境，世界自然遗产',
      descEn: 'Fairyland on earth, UNESCO World Natural Heritage'
    },
    {
      nameCn: '黄山',
      nameEn: 'Mount Huangshan',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop&q=85',
      descCn: '天下第一奇山，世界文化与自然双重遗产',
      descEn: 'Most beautiful mountain, UNESCO World Heritage'
    },
    {
      nameCn: '桂林漓江',
      nameEn: 'Guilin Li River',
      image: 'https://images.unsplash.com/photo-1536826364020-7d47226e0bc0?w=1200&h=600&fit=crop&q=85',
      descCn: '桂林山水甲天下，世界自然遗产',
      descEn: 'Guilin\'s scenery is the best under heaven, World Natural Heritage'
    }
  ]
}

const coverageStats = [
  { number: '28', labelCn: '省市自治区', labelEn: 'Provinces', descCn: '覆盖全国 82%', descEn: '82% coverage' },
  { number: '200+', labelCn: '服务城市', labelEn: 'Cities', descCn: '触达主要城市', descEn: 'Major cities' },
  { number: '5000+', labelCn: '亩基地', labelEn: 'Mu of Bases', descCn: '自有 + 控股', descEn: 'Owned + controlled' },
  { number: '10 万+', labelCn: '年接待', labelEn: 'Annual', descCn: '全网络接待能力', descEn: 'Network capacity' }
]
</script>

<template>
  <div class="partners-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <!-- 背景图片轮播 -->
      <div class="hero-bg-container">
        <img 
          v-for="(img, index) in backgroundImages" 
          :key="index"
          class="hero-bg" 
          :class="{ active: index === currentBgIndex }"
          :src="img" 
          :alt="'Partners Network ' + (index + 1)"
        />
      </div>
      <div class="hero-overlay"></div>
      
      <!-- 轮播指示器 -->
      <div class="bg-indicators">
        <span 
          v-for="(img, index) in backgroundImages" 
          :key="index"
          :class="['indicator-dot', { active: index === currentBgIndex }]"
          @mouseenter="stopBackgroundRotation"
          @mouseleave="startBackgroundRotation"
          @click="currentBgIndex = index"
        ></span>
      </div>
      
      <div class="hero-content container">
        <!-- 顶部标签：5 年深耕 -->
        <div class="hero-badge">
          <span class="badge-text">
            <span v-show="currentLang === 'zh'">5 年深耕 · 全国布局</span>
            <span v-show="currentLang === 'en'">5 Years · Nationwide Network</span>
          </span>
        </div>
        
        <!-- 主标题 -->
        <h1>
          <span v-show="currentLang === 'zh'" class="title-cn">服务网络</span>
          <span v-show="currentLang === 'en'" class="title-en">Service Network</span>
        </h1>
        
        <!-- 副标题：一句话 Slogan -->
        <p class="hero-tagline">
          <span v-show="currentLang === 'zh'" class="tagline-cn">汇聚中国顶级资源，共创健康未来</span>
          <span v-show="currentLang === 'en'" class="tagline-en">China's Premier Resource Network for Global Health</span>
        </p>
        
        <!-- 描述文字 -->
        <div class="hero-description">
          <p v-show="currentLang === 'zh'" class="desc-cn">
            历经 5 年深耕，与全国各领域头部机构建立深度战略合作关系
          </p>
          <p v-show="currentLang === 'en'" class="desc-en">
            After 5 years of deep cultivation, established strategic partnerships with leading institutions nationwide
          </p>
        </div>
        
        <!-- Stats Bar -->
        <div class="hero-stats-row">
          <div class="hero-stat-item">
            <span class="hero-stat-number">50+</span>
            <span class="hero-stat-label">
              <span v-show="currentLang === 'zh'">三甲医院</span>
              <span v-show="currentLang === 'en'">Grade-A Hospitals</span>
            </span>
          </div>
          <span class="stat-divider"></span>
          <div class="hero-stat-item">
            <span class="hero-stat-number">20+</span>
            <span class="hero-stat-label">
              <span v-show="currentLang === 'zh'">康养基地</span>
              <span v-show="currentLang === 'en'">Wellness Bases</span>
            </span>
          </div>
          <span class="stat-divider"></span>
          <div class="hero-stat-item">
            <span class="hero-stat-number">30+</span>
            <span class="hero-stat-label">
              <span v-show="currentLang === 'zh'">中医机构</span>
              <span v-show="currentLang === 'en'">TCM Institutions</span>
            </span>
          </div>
          <span class="stat-divider"></span>
          <div class="hero-stat-item">
            <span class="hero-stat-number">150+</span>
            <span class="hero-stat-label">
              <span v-show="currentLang === 'zh'">合作景区</span>
              <span v-show="currentLang === 'en'">Attractions</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Medical Partners Section - 全屏沉浸式布局（固定宽度） -->
    <section class="partner-section medical-immersive-section">
      <div class="medical-immersive-container">
        <!-- 医院轮播展示区 -->
        <div class="medical-showcase-wrapper">
          <!-- 背景图片区 -->
          <div class="hospital-bg-container">
            <img
              v-for="(hospital, index) in medicalPartners.featuredHospitals"
              :key="index"
              class="hospital-bg-image"
              :class="{ active: index === currentHospitalIndex }"
              :src="hospital.image"
              :alt="hospital.nameCn"
            />
            <div class="hospital-bg-overlay"></div>
          </div>

          <!-- 玻璃卡片 - 浮动在背景上 -->
          <div class="glass-card-wrapper">
            <div class="glass-card">
              <div class="hospital-badge">
                {{ medicalPartners.featuredHospitals[currentHospitalIndex].rank }}
              </div>
              <h2 class="hospital-title-main">
                <span v-show="currentLang === 'zh'">{{ medicalPartners.featuredHospitals[currentHospitalIndex].nameCn }}</span>
                <span v-show="currentLang === 'en'">{{ medicalPartners.featuredHospitals[currentHospitalIndex].nameEn }}</span>
              </h2>
              <p class="hospital-subtitle">
                <span v-show="currentLang === 'zh'">{{ medicalPartners.featuredHospitals[currentHospitalIndex].specialty }}</span>
                <span v-show="currentLang === 'en'">{{ medicalPartners.featuredHospitals[currentHospitalIndex].specialty }}</span>
              </p>
              <button class="next-hospital-btn" @click="nextHospital">
                <span v-show="currentLang === 'zh'">切换下一家</span>
                <span v-show="currentLang === 'en'">Next Hospital</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>

          <!-- 轮播指示器 -->
          <div class="carousel-indicators">
            <span
              v-for="(hospital, index) in medicalPartners.featuredHospitals.slice(0, 6)"
              :key="index"
              class="indicator-dot"
              :class="{ active: index === currentHospitalIndex }"
              @click="setHospitalIndex(index)"
            ></span>
          </div>
        </div>

        <!-- 下方内容区 -->
        <div class="medical-bottom-content">
          <!-- 左侧：价值主张 -->
          <div class="value-proposition-card">
            <h3 class="value-title">
              <span v-show="currentLang === 'zh'">我们不是医院，而是您通往顶级医疗资源的桥梁</span>
              <span v-show="currentLang === 'en'">We are not a hospital, but your bridge to premier medical resources.</span>
            </h3>
            <p class="value-desc">
              <span v-show="currentLang === 'zh'">不直接诊疗，只专注资源协调。依托 50+ 家三甲医院（含 15 家全国 Top100）深度合作网络，为您提供专业、高效、私密的专属医疗方案。</span>
              <span v-show="currentLang === 'en'">We focus on resource coordination through our network of 50+ Grade-A hospitals.</span>
            </p>
          </div>

          <!-- 右侧：服务网格 -->
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">🗺️</div>
              <h4 class="service-card-title">
                <span v-show="currentLang === 'zh'">路径规划</span>
                <span v-show="currentLang === 'en'">Care Path Planning</span>
              </h4>
              <p class="service-card-desc">
                <span v-show="currentLang === 'zh'">从初诊到康复的全程科学引导</span>
                <span v-show="currentLang === 'en'">Scientific guidance from diagnosis to recovery</span>
              </p>
            </div>
            <div class="service-card">
              <div class="service-icon">👨‍⚕️</div>
              <h4 class="service-card-title">
                <span v-show="currentLang === 'zh'">专家预约</span>
                <span v-show="currentLang === 'en'">Expert Appointment</span>
              </h4>
              <p class="service-card-desc">
                <span v-show="currentLang === 'zh'">突破挂号瓶颈，直通核心科室</span>
                <span v-show="currentLang === 'en'">Direct access to core departments</span>
              </p>
            </div>
            <div class="service-card">
              <div class="service-icon">⚕️</div>
              <h4 class="service-card-title">
                <span v-show="currentLang === 'zh'">手术协调</span>
                <span v-show="currentLang === 'en'">Surgery Coordination</span>
              </h4>
              <p class="service-card-desc">
                <span v-show="currentLang === 'zh'">缩短等待周期，优化就医体验</span>
                <span v-show="currentLang === 'en'">Reduce waiting time, optimize experience</span>
              </p>
            </div>
            <div class="service-card">
              <div class="service-icon">🔄</div>
              <h4 class="service-card-title">
                <span v-show="currentLang === 'zh'">跨院转诊</span>
                <span v-show="currentLang === 'en'">Cross-Hospital Referral</span>
              </h4>
              <p class="service-card-desc">
                <span v-show="currentLang === 'zh'">打破地域壁垒，整合最优资源</span>
                <span v-show="currentLang === 'en'">Integrate optimal resources across regions</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Specialties Section -->

    <!-- Wellness Partners Section - COMO Shambhala Style -->
    <section class="partner-section wellness-section">
      <div class="wellness-container">
        <div class="wellness-layout">
          <!-- Left: Content -->
          <div class="wellness-content">
            <p class="wellness-eyebrow">
              <span v-show="currentLang === 'zh'">{{ wellnessPartners.eyebrowCn }}</span>
              <span v-show="currentLang === 'en'">{{ wellnessPartners.eyebrowEn }}</span>
            </p>
            
            <h2 class="wellness-main-title">
              <span v-show="currentLang === 'zh'">{{ wellnessPartners.titleCn }}</span>
              <span v-show="currentLang === 'en'">{{ wellnessPartners.titleEn }}</span>
            </h2>
            
            <p class="wellness-main-desc">
              <span v-show="currentLang === 'zh'">{{ wellnessPartners.descCn }}</span>
              <span v-show="currentLang === 'en'">{{ wellnessPartners.descEn }}</span>
            </p>
            
            <div class="wellness-stats-row">
              <div class="wellness-stat">
                <span class="stat-big">{{ wellnessPartners.number }}</span>
                <span class="stat-label">
                  <span v-show="currentLang === 'zh'">{{ wellnessPartners.labelCn }}</span>
                  <span v-show="currentLang === 'en'">{{ wellnessPartners.labelEn }}</span>
                </span>
                <span class="stat-sub">
                  <span v-show="currentLang === 'zh'">{{ wellnessPartners.sublabelCn }}</span>
                  <span v-show="currentLang === 'en'">{{ wellnessPartners.sublabelEn }}</span>
                </span>
              </div>
            </div>
          </div>
          
          <!-- Right: Image Grid -->
          <div class="wellness-images">
            <div v-for="(base, index) in wellnessPartners.bases" :key="index" class="wellness-image-card">
              <img :src="base.image" :alt="base.nameCn" class="wellness-base-image" />
              <div class="wellness-image-overlay"></div>
              <div class="wellness-image-info">
                <span class="base-category">
                  <span v-show="currentLang === 'zh'">{{ base.categoryCn }}</span>
                  <span v-show="currentLang === 'en'">{{ base.categoryEn }}</span>
                </span>
                <span class="base-name">
                  <span v-show="currentLang === 'zh'">{{ base.nameCn }}</span>
                  <span v-show="currentLang === 'en'">{{ base.nameEn }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tourism Partners Section - 水平卡片流设计（极简化） -->
    <section class="partner-section tourism-minimal-section">
      <div class="tourism-minimal-container">
        <!-- 顶部标题区 -->
        <div class="tourism-header">
          <h2 class="tourism-main-title">
            <span class="title-number-large">{{ tourismPartners.number }}</span>
            <span class="title-text-large">
              <span v-show="currentLang === 'zh'">{{ tourismPartners.labelCn }}</span>
              <span v-show="currentLang === 'en'">{{ tourismPartners.labelEn }}</span>
            </span>
          </h2>
          <p class="tourism-subtitle">
            <span v-show="currentLang === 'zh'">{{ tourismPartners.sublabelCn }}</span>
            <span v-show="currentLang === 'en'">{{ tourismPartners.sublabelEn }}</span>
          </p>
        </div>

        <!-- 水平权益卡片流 -->
        <div class="benefits-horizontal">
          <div v-for="(benefit, index) in tourismPartners.benefits" :key="index" class="benefit-card-minimal">
            <div class="benefit-icon-large">{{ benefit.icon }}</div>
            <h4 class="benefit-card-title">
              <span v-show="currentLang === 'zh'">{{ benefit.titleCn }}</span>
              <span v-show="currentLang === 'en'">{{ benefit.titleEn }}</span>
            </h4>
            <p class="benefit-card-desc">
              <span v-show="currentLang === 'zh'">{{ benefit.descCn }}</span>
              <span v-show="currentLang === 'en'">{{ benefit.descEn }}</span>
            </p>
          </div>
        </div>

        <!-- 景区图片轮播 - 长条状设计 -->
        <div class="attractions-carousel-wrapper">
          <!-- 左右切换按钮 -->
          <button class="carousel-nav-btn prev-btn" @click="prevAttraction" aria-label="Previous attraction">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- 图片轮播容器 -->
          <div class="attractions-carousel-container">
            <div class="attractions-carousel-track" :style="{ transform: `translateX(-${currentAttractionIndex * 100}%)` }">
              <div
                v-for="(attraction, index) in tourismPartners.attractions"
                :key="index"
                class="attraction-slide"
              >
                <img :src="attraction.image" :alt="attraction.nameCn" class="attraction-image" />
                <div class="attraction-overlay">
                  <div class="attraction-content">
                    <h3 class="attraction-title">
                      <span v-show="currentLang === 'zh'">{{ attraction.nameCn }}</span>
                      <span v-show="currentLang === 'en'">{{ attraction.nameEn }}</span>
                    </h3>
                    <p class="attraction-desc">
                      <span v-show="currentLang === 'zh'">{{ attraction.descCn }}</span>
                      <span v-show="currentLang === 'en'">{{ attraction.descEn }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 轮播指示器 -->
            <div class="attractions-indicators">
              <span
                v-for="(attraction, index) in tourismPartners.attractions"
                :key="index"
                class="attraction-indicator"
                :class="{ active: index === currentAttractionIndex }"
                @click="currentAttractionIndex = index"
              ></span>
            </div>
          </div>

          <!-- 右侧切换按钮 -->
          <button class="carousel-nav-btn next-btn" @click="nextAttraction" aria-label="Next attraction">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Coverage Section -->
    <section class="coverage-section">
      <div class="container">
        <h2 class="coverage-title">
          <span v-show="currentLang === 'zh'" class="title-cn">全国资源覆盖网络</span>
          <span v-show="currentLang === 'en'" class="title-en">Nationwide Coverage</span>
        </h2>
        
        <div class="coverage-stats">
          <div v-for="(stat, index) in coverageStats" :key="index" class="coverage-item">
            <span class="coverage-number">{{ stat.number }}</span>
            <span class="coverage-label">
              <span v-show="currentLang === 'zh'">{{ stat.labelCn }}</span>
              <span v-show="currentLang === 'en'">{{ stat.labelEn }}</span>
            </span>
            <span class="coverage-desc">
              <span v-show="currentLang === 'zh'">{{ stat.descCn }}</span>
              <span v-show="currentLang === 'en'">{{ stat.descEn }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.partners-page {
  padding-top: var(--header-height);
}

/* Page Hero - SHA Style */
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

.hero-bg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  /* 统一背景色调，降低亮度 */
  filter: brightness(0.85) contrast(1.05);
}

.hero-bg.active {
  opacity: 1;
  z-index: 1;
}

/* 背景轮播指示器 */
.bg-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 3;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.indicator-dot:hover {
  background-color: rgba(255, 255, 255, 0.7);
  transform: scale(1.2);
}

.indicator-dot.active {
  background-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.3);
  border-color: rgba(255, 255, 255, 1);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 加深遮罩层，确保文字在任何背景上都清晰 */
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-white);
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* 顶部徽章：5 年深耕 */
.hero-badge {
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-content h1 {
  font-size: clamp(3rem, 6vw, 5rem);
  margin-bottom: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.title-cn,
.title-en {
  display: block;
  color: var(--color-white);
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.6);
}

/* 副标题：Slogan */
.hero-tagline {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
}

.tagline-cn {
  display: block;
  color: rgba(255, 255, 255, 0.95);
}

.tagline-en {
  display: block;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.1em;
}

.hero-description {
  max-width: 700px;
  margin: 0 auto 3rem;
  padding: 0 1rem;
}

.desc-cn,
.desc-en {
  display: block;
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* Hero Stats Row - 横向排列带分隔符 */
.hero-stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 2.5rem 3rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.hero-stat-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hero-stat-number {
  display: block;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--color-white);
  line-height: 1;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
}

.hero-stat-label {
  display: block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* 分隔符：小竖杠 */
.stat-divider {
  width: 1px;
  height: 3rem;
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.5) 20%, 
    rgba(255, 255, 255, 0.5) 80%, 
    transparent 100%
  );
}

/* Section Container */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.label-icon {
  font-size: 1.5rem;
}

.label-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-secondary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* ==================== GLOBAL TYPOGRAPHY ==================== */
/* 统一字体样式 */
:root {
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #4a4a4a;
  --color-text-tertiary: #6b6b6b;
  --color-text-muted: #8a8a8a;
}

/* 标题样式 */
.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin-bottom: 1.25rem;
}

.section-subtitle {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.section-desc {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-tertiary);
}

/* ==================== MEDICAL SECTION - 全屏沉浸式布局（固定宽度） ==================== */
.medical-immersive-section {
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
  padding: 0;
  overflow: hidden;
}

.medical-immersive-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

/* 医院展示区 - 上方轮播区 */
.medical-showcase-wrapper {
  position: relative;
  width: 100%;
  max-width: 1400px;
  height: 600px;
  margin: 0 auto 3rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

/* 背景图片容器 */
.hospital-bg-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hospital-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease;
  filter: brightness(0.85);
}

.hospital-bg-image.active {
  opacity: 1;
  z-index: 1;
}

.hospital-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
  z-index: 2;
}

/* 玻璃卡片包装器 */
.glass-card-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
}

/* 玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.25),
    0 10px 30px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.4);
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 玻璃卡片顶部光效 */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
}

/* 玻璃卡片内部微光 */
.glass-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 60%
  );
  pointer-events: none;
  animation: shimmer 8s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.hospital-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  color: white;
  padding: 10px 24px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow:
    0 8px 20px rgba(102, 126, 234, 0.4),
    0 4px 8px rgba(102, 126, 234, 0.2);
  animation: badgeGlow 3s ease-in-out infinite;
}

@keyframes badgeGlow {
  0%, 100% {
    background-position: 0% 50%;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4), 0 4px 8px rgba(102, 126, 234, 0.2);
  }
  50% {
    background-position: 100% 50%;
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.6), 0 6px 12px rgba(102, 126, 234, 0.3);
  }
}

.hospital-title-main {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.3;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hospital-subtitle {
  font-size: 17px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.5;
  letter-spacing: 0.3px;
}

.next-hospital-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

/* 按钮光效 */
.next-hospital-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.next-hospital-btn:hover {
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  transform: translateY(-3px) translateX(4px);
  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.3),
    0 8px 20px rgba(0, 0, 0, 0.15);
}

.next-hospital-btn:hover::before {
  left: 100%;
}

.btn-arrow {
  font-size: 20px;
  line-height: 1;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.next-hospital-btn:hover .btn-arrow {
  transform: translateX(6px);
}

/* 轮播指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 4;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.indicator-dot.active {
  background: rgba(255, 255, 255, 0.95);
  transform: scale(1.4);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 0 12px rgba(255, 255, 255, 0.6),
    0 0 24px rgba(255, 255, 255, 0.3);
}

/* 下方内容区 */
.medical-bottom-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* 价值主张卡片 */
.value-proposition-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 48px 40px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 8px 25px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 顶部装饰线条 */
.value-proposition-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg,
    transparent 0%,
    linear-gradient(135deg, #667eea 0%, #764ba2 100%) 50%,
    transparent 100%
  );
  border-radius: 0 0 3px 3px;
}

/* 微光背景效果 */
.value-proposition-card::after {
  content: '';
  position: absolute;
  top: -30%;
  right: -30%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.value-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
  line-height: 1.5;
  letter-spacing: -0.3px;
  position: relative;
  z-index: 1;
}

.value-desc {
  font-size: 16px;
  line-height: 2;
  color: #555;
  position: relative;
  z-index: 1;
}

/* 服务网格 */
.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.service-card {
  background: white;
  border-radius: 16px;
  padding: 32px 28px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.08),
    0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  text-align: center;
}

/* 服务卡片顶部装饰 */
.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    #667eea 0%,
    #764ba2 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* 悬停时光效 */
.service-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
    rgba(102, 126, 234, 0.05) 0%,
    rgba(118, 75, 162, 0.03) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.service-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.12),
    0 10px 30px rgba(0, 0, 0, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
}

.service-card:hover::before {
  opacity: 1;
}

.service-card:hover::after {
  opacity: 1;
}

.service-icon {
  font-size: 32px;
  margin-bottom: 16px;
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.service-card:hover .service-icon {
  transform: translateY(-4px) scale(1.1);
}

.service-card-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1a1a1a;
  line-height: 1.4;
  letter-spacing: -0.2px;
}

.service-card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  letter-spacing: 0.2px;
}

/* ==================== WELLNESS SECTION - COMO Shambhala Style ==================== */
.wellness-section {
  background: linear-gradient(180deg, #F5F0EB 0%, #EBE5DE 100%);
  padding: 0;
  overflow: hidden;
}

.wellness-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.wellness-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 5rem;
  align-items: center;
}

.wellness-content {
  padding-right: 2rem;
}

.wellness-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #6B5B4F;
  margin-bottom: 1.5rem;
}

.wellness-main-title {
  font-size: 2.5rem;
  font-weight: 400;
  color: #2C2420;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.wellness-main-desc {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #5A4F45;
  margin-bottom: 2.5rem;
  max-width: 400px;
}

.wellness-stats-row {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(107, 91, 79, 0.2);
}

.wellness-stat {
  display: block;
}

.wellness-stat .stat-big {
  display: block;
  font-size: 4rem;
  font-weight: 300;
  color: #2C2420;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.wellness-stat .stat-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B5B4F;
  margin-bottom: 0.25rem;
}

.wellness-stat .stat-sub {
  display: block;
  font-size: 0.8125rem;
  color: #8B7B6F;
}

/* Wellness Images Grid */
.wellness-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.wellness-image-card {
  position: relative;
  height: 500px;
  overflow: hidden;
  border-radius: 4px;
}

.wellness-base-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.wellness-image-card:hover .wellness-base-image {
  transform: scale(1.05);
}

.wellness-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(44, 36, 32, 0) 0%, rgba(44, 36, 32, 0.7) 100%);
}

.wellness-image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  text-align: left;
}

.base-category {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.base-name {
  display: block;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--color-white);
  line-height: 1.3;
}

/* ==================== TCM SECTION ==================== */
.tcm-section {
  background: linear-gradient(180deg, #fff9f5 0%, #ffffff 100%);
}

.tcm-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.tcm-icon-large {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.section-label-centered {
  margin-bottom: 1.5rem;
}

.section-label-centered .label-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-secondary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.tcm-number-display {
  margin-bottom: 2rem;
}

.number-big {
  display: block;
  font-size: 6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #B79891 0%, #94716B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.number-label {
  display: block;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-black);
  margin-bottom: 0.35rem;
}

.number-sublabel {
  display: block;
  font-size: 0.9375rem;
  color: var(--color-stone);
}

.section-desc-centered {
  font-size: 1.0625rem;
  line-height: 1.9;
  color: var(--color-stone);
}

.tcm-cards-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.tcm-card {
  background: var(--color-white);
  border-radius: 4px;
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid rgba(183, 152, 145, 0.2);
  transition: all 0.3s ease;
}

.tcm-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(183, 152, 145, 0.15);
  border-color: var(--color-secondary);
}

.tcm-card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tcm-card-num {
  display: block;
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #B79891 0%, #94716B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.tcm-card-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-black);
}

.tcm-partners-section {
  padding-top: 3rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.logos-title-centered {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-stone);
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.tcm-logos-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
}

.tcm-logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: var(--color-white);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.tcm-logo-item:hover {
  border-color: var(--color-secondary);
  transform: translateY(-4px);
}

.tcm-logo-icon {
  font-size: 2rem;
}

.tcm-logo-name {
  font-size: 0.8125rem;
  color: var(--color-stone);
  font-weight: 500;
  text-align: center;
}

/* ==================== TOURISM SECTION - 水平卡片流（极简化） ==================== */
.tourism-minimal-section {
  background: linear-gradient(180deg, #faf5ff 0%, #ffffff 100%);
  padding: 6rem 0;
}

.tourism-minimal-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 顶部标题区 */
.tourism-header {
  text-align: center;
  margin-bottom: 4rem;
}

.tourism-main-title {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.title-number-large {
  font-size: 4.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  letter-spacing: -0.02em;
}

.title-text-large {
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}

.tourism-subtitle {
  font-size: 1.125rem;
  color: #666;
  font-weight: 400;
  letter-spacing: 0.3px;
}

/* 水平权益卡片流 */
.benefits-horizontal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 3rem;
}

.benefit-card-minimal {
  background: white;
  border-radius: 20px;
  padding: 36px 28px;
  text-align: center;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.08),
    0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 顶部渐变装饰 */
.benefit-card-minimal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* 微光背景 */
.benefit-card-minimal::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(139, 92, 246, 0.08) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.benefit-card-minimal:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow:
    0 25px 60px rgba(139, 92, 246, 0.15),
    0 12px 30px rgba(236, 72, 153, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
}

.benefit-card-minimal:hover::before {
  opacity: 1;
}

.benefit-card-minimal:hover::after {
  opacity: 1;
}

.benefit-icon-large {
  font-size: 40px;
  margin-bottom: 16px;
  display: inline-block;
  filter: drop-shadow(0 4px 12px rgba(139, 92, 246, 0.2));
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.benefit-card-minimal:hover .benefit-icon-large {
  transform: translateY(-6px) scale(1.15);
}

.benefit-card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 10px;
  line-height: 1.4;
  letter-spacing: -0.2px;
}

.benefit-card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  letter-spacing: 0.2px;
}

/* 景区图片轮播 - 长条状设计 */
.attractions-carousel-wrapper {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.carousel-nav-btn {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: white;
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.04);
  z-index: 10;
}

.carousel-nav-btn:hover {
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  border-color: transparent;
  color: white;
  transform: scale(1.1);
  box-shadow:
    0 8px 24px rgba(139, 92, 246, 0.25),
    0 4px 12px rgba(236, 72, 153, 0.2);
}

.carousel-nav-btn:active {
  transform: scale(1.05);
}

.carousel-nav-btn svg {
  color: #666;
  transition: color 0.3s ease;
}

.carousel-nav-btn:hover svg {
  color: white;
}

.attractions-carousel-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.12),
    0 8px 30px rgba(0, 0, 0, 0.08);
}

.attractions-carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.attraction-slide {
  flex: 0 0 100%;
  position: relative;
  aspect-ratio: 12/5;
  overflow: hidden;
}

.attraction-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.attraction-slide:hover .attraction-image {
  transform: scale(1.05);
}

.attraction-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0.85) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 0;
}

.attraction-content {
  color: white;
  text-align: left;
  max-width: 100%;
  width: 100%;
  padding: 2.5rem 2rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  position: relative;
}

.attraction-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  letter-spacing: -0.3px;
}

.attraction-desc {
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.95;
  font-weight: 400;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.2px;
}

.attractions-indicators {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 5;
}

.attraction-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.attraction-indicator:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.2);
}

.attraction-indicator.active {
  background: rgba(255, 255, 255, 0.95);
  transform: scale(1.3);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 0 12px rgba(255, 255, 255, 0.5),
    0 0 24px rgba(255, 255, 255, 0.25);
}

/* Coverage Section */
.coverage-section {
  padding: 6rem 0;
  background: var(--color-white);
}

.coverage-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.coverage-title {
  text-align: center;
  margin-bottom: 4rem;
}

.coverage-title .title-cn,
.coverage-title .title-en {
  display: block;
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-black);
  letter-spacing: 0.05em;
}

.coverage-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.coverage-item {
  text-align: center;
  padding: 2.5rem 2rem;
  background: var(--color-white);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.coverage-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border-color: var(--color-secondary);
}

.coverage-number {
  display: block;
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.coverage-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.coverage-desc {
  display: block;
  font-size: 0.875rem;
  color: var(--color-stone);
}

/* Responsive */
@media (max-width: 1024px) {
  .medical-immersive-container {
    padding: 4rem 1.5rem;
  }

  .medical-showcase-wrapper {
    height: 500px;
    margin-bottom: 2rem;
  }

  .glass-card {
    padding: 32px;
  }

  .hospital-title-main {
    font-size: 24px;
  }

  .medical-bottom-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .value-proposition-card {
    padding: 28px;
  }

  .services-grid {
    grid-template-columns: 1fr 1fr;
  }

  .wellness-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .wellness-content {
    padding-right: 0;
  }

  .wellness-images {
    grid-template-columns: repeat(2, 1fr);
  }

  .wellness-image-card {
    height: 400px;
  }

  .tcm-cards-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .tcm-logos-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .tourism-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .tourism-image-wrapper {
    position: relative;
    top: 0;
  }

  .coverage-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-stats-row {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .stat-divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .section-container {
    padding: 4rem 1.5rem;
  }

  .medical-immersive-container {
    padding: 3rem 1rem;
  }

  .medical-showcase-wrapper {
    height: 400px;
    border-radius: 8px;
  }

  .glass-card-wrapper {
    padding: 0 16px;
  }

  .glass-card {
    padding: 24px;
  }

  .hospital-badge {
    font-size: 12px;
    padding: 6px 16px;
  }

  .hospital-title-main {
    font-size: 20px;
  }

  .hospital-subtitle {
    font-size: 14px;
  }

  .next-hospital-btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .carousel-indicators {
    bottom: 20px;
  }

  .indicator-dot {
    width: 8px;
    height: 8px;
  }

  .value-proposition-card {
    padding: 24px;
  }

  .value-title {
    font-size: 18px;
  }

  .value-desc {
    font-size: 14px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    padding: 20px;
  }

  .service-icon {
    font-size: 24px;
  }

  .service-card-title {
    font-size: 15px;
  }

  .service-card-desc {
    font-size: 13px;
  }

  .big-number {
    font-size: 3.5rem;
  }

  .number-title {
    font-size: 1.125rem;
  }

  .header-desc {
    font-size: 0.875rem;
  }

  .medical-divider-line {
    margin: 2rem 0;
  }

  .value-statement {
    font-size: 1rem;
  }

  .value-desc {
    font-size: 0.875rem;
  }

  .checklist-title {
    font-size: 0.875rem;
  }

  .checklist-detail {
    font-size: 0.8125rem;
  }

  .value-footer {
    font-size: 0.875rem;
  }

  .medical-images-grid {
    gap: 0.75rem;
  }

  .hospital-image-large {
    height: 200px;
  }

  .hospital-image-medium {
    height: 150px;
  }

  .hospital-image-wide {
    height: 160px;
  }

  .view-more-btn {
    padding: 0.625rem 1.5rem;
    font-size: 0.875rem;
  }

  .specialties-container {
    padding: 0 1.5rem;
  }

  .specialties-title {
    font-size: 1.5rem;
  }

  .specialties-list {
    grid-template-columns: 1fr;
  }

  .specialty-item {
    padding: 1rem 1.25rem;
  }

  .hospitals-grid {
    grid-template-columns: 1fr;
  }

  .wellness-images {
    grid-template-columns: 1fr;
  }

  .wellness-image-card {
    height: 350px;
  }

  .wellness-main-title {
    font-size: 2rem;
  }

  .tcm-cards-row {
    grid-template-columns: 1fr;
  }

  .tcm-logos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tourism-benefits {
    gap: 0.75rem;
  }

  .benefit-item {
    padding: 1.25rem;
  }

  .coverage-stats {
    grid-template-columns: 1fr;
  }

  .hero-stats-row {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }

  .stat-divider {
    display: none;
  }

  /* 旅游资源板块响应式 */
  .tourism-minimal-container {
    padding: 0 1rem;
  }

  .tourism-header {
    margin-bottom: 2.5rem;
  }

  .title-number-large {
    font-size: 3rem;
  }

  .title-text-large {
    font-size: 1.5rem;
  }

  .tourism-subtitle {
    font-size: 1rem;
  }

  .benefits-horizontal {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .benefit-card-minimal {
    padding: 24px 20px;
  }

  .benefit-icon-large {
    font-size: 32px;
  }

  .benefit-card-title {
    font-size: 16px;
  }

  .benefit-card-desc {
    font-size: 13px;
  }

  .attractions-carousel-wrapper {
    gap: 0.75rem;
  }

  .carousel-nav-btn {
    width: 40px;
    height: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .attractions-carousel-container {
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .attraction-slide {
    aspect-ratio: 4/3;
  }

  .attraction-content {
    padding: 1.75rem 1.25rem;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.6) 40%,
      rgba(0, 0, 0, 0.2) 70%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .attraction-title {
    font-size: 1.375rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    letter-spacing: -0.2px;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  }

  .attraction-desc {
    font-size: 0.9375rem;
    line-height: 1.5;
    opacity: 0.95;
    font-weight: 400;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
    letter-spacing: 0.15px;
  }

  .attractions-indicators {
    bottom: 1.25rem;
    gap: 8px;
  }

  .attraction-indicator {
    width: 8px;
    height: 8px;
  }

  .carousel-nav-btn svg {
    width: 18px;
    height: 18px;
  }
}

/* 旅游资源板块 - 平板响应式 */
@media (max-width: 1024px) {
  .benefits-horizontal {
    grid-template-columns: repeat(2, 1fr);
  }

  .attractions-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 旅游资源板块 - 移动响应式 */
@media (max-width: 768px) {
  .benefits-horizontal {
    grid-template-columns: 1fr;
  }

  .attractions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
