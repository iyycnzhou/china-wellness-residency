<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'
import { ref, onMounted, onUnmounted } from 'vue'

// 使用 import.meta.glob 导入图片
const bgImages = import.meta.glob('@/assets/images/*.jpg', { eager: true, import: 'default' })
const bgImagesPng = import.meta.glob('@/assets/images/*.png', { eager: true, import: 'default' })

// 协和医院本地图片
const xieheImage = bgImages['/src/assets/images/xiehe-caption.jpg']
// 华山医院本地图片
const huashanImage = bgImagesPng['/src/assets/images/huashan-caption.png']
// 同济医院本地图片
const tongjiImage = bgImages['/src/assets/images/tongji-caption.jpeg']

// 背景图片轮播数组 - 使用实际导入的图片路径
const backgroundImages = [
  bgImages['/src/assets/images/medical-mri-scan.jpg'],
  bgImages['/src/assets/images/medical-lab-test.jpg'],
  bgImages['/src/assets/images/health-consultation.jpg'],
  bgImagesPng['/src/assets/images/wellness-treatment.png'],
  bgImagesPng['/src/assets/images/benefit-detail-medical.png']
]

// 当前背景图片索引
const currentBgIndex = ref(0)
let bgInterval: number | null = null

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

const tcmPartners = {
  number: '30+',
  labelCn: '中医机构',
  labelEn: 'TCM Institutions',
  sublabelCn: '含 8 家国医大师工作室',
  sublabelEn: '8 National TCM Master Studios',
  descCn: '与全国 30+ 家知名中医机构建立深度合作，其中包括 8 家国医大师工作室、15 家省级中医院、7 家中医养生连锁品牌。',
  descEn: 'Deep cooperation with 30+ renowned TCM institutions, including 8 National TCM Master Studios, 15 provincial TCM hospitals.',
  image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=1200&h=800&fit=crop&q=80',
  cards: [
    { icon: '🌿', num: '8', labelCn: '国医大师工作室', labelEn: 'TCM Master Studios' },
    { icon: '🏥', num: '15', labelCn: '省级中医院', labelEn: 'Provincial Hospitals' },
    { icon: '🍵', num: '10+', labelCn: '道地药材基地', labelEn: 'Herb Bases' },
    { icon: '🧘', num: '20+', labelCn: '养生课程', labelEn: 'Wellness Courses' }
  ],
  partners: [
    { nameCn: '中国中医科学院', nameEn: 'China Academy of TCM', logo: '🌿' },
    { nameCn: '北京中医医院', nameEn: 'Beijing TCM Hospital', logo: '🏥' },
    { nameCn: '上海中医药大学', nameEn: 'Shanghai TCM University', logo: '🎓' },
    { nameCn: '广东省中医院', nameEn: 'Guangdong TCM Hospital', logo: '🏥' },
    { nameCn: '同仁堂', nameEn: 'Tongrentang', logo: '🍵' },
    { nameCn: '固生堂', nameEn: 'Gushengtang', logo: '🍵' }
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
  partners: [
    { nameCn: '故宫博物院', nameEn: 'The Palace Museum', logo: '🏯' },
    { nameCn: '长城景区', nameEn: 'Great Wall', logo: '🏞️' },
    { nameCn: '兵马俑博物馆', nameEn: 'Terracotta Warriors', logo: '🏛️' },
    { nameCn: '九寨沟', nameEn: 'Jiuzhaigou', logo: '🏞️' },
    { nameCn: '黄山风景区', nameEn: 'Mount Huangshan', logo: '⛰️' },
    { nameCn: '桂林漓江', nameEn: 'Guilin Li River', logo: '🏞️' }
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

    <!-- Medical Partners Section - Mayo Clinic 风格布局 -->
    <section class="partner-section medical-section">
      <div class="medical-container">
        <!-- 左侧文案区 -->
        <div class="medical-content-left">
          <p class="medical-label">
            <span v-show="currentLang === 'zh'">医疗服务机构</span>
            <span v-show="currentLang === 'en'">Medical Service Network</span>
          </p>
          
          <h2 class="medical-title">
            <span v-show="currentLang === 'zh'">{{ medicalPartners.sublabelCn }}</span>
            <span v-show="currentLang === 'en'">{{ medicalPartners.sublabelEn }}</span>
          </h2>
          
          <p class="medical-desc">
            <span v-show="currentLang === 'zh'">{{ medicalPartners.descCn }}</span>
            <span v-show="currentLang === 'en'">{{ medicalPartners.descEn }}</span>
          </p>
          
          <!-- 左侧医院展示图片 -->
          <div class="medical-showcase-image">
            <img src="@/assets/images/hospital-doctor-consultation.png" alt="Medical Service" class="showcase-img" />
          </div>
        </div>
        
        <!-- 右侧医院图片网格 -->
        <div class="medical-hospitals-grid">
          <!-- 前 4 家医院图片 -->
          <div v-for="(hospital, index) in medicalPartners.featuredHospitals.slice(0, 4)" :key="index" class="hospital-card-mayo">
            <div class="hospital-card-image">
              <img :src="hospital.image" :alt="hospital.nameCn" class="card-img" />
              <div class="card-overlay"></div>
              <div class="card-content">
                <h3 class="card-hospital-name">
                  <span v-show="currentLang === 'zh'">{{ hospital.nameCn }}</span>
                  <span v-show="currentLang === 'en'">{{ hospital.nameEn }}</span>
                </h3>
                <p class="card-location">{{ hospital.specialty }}</p>
                <span class="card-rank">{{ hospital.rank }}</span>
              </div>
            </div>
          </div>
          
          <!-- 底部文案区域 -->
          <div class="medical-value-prop">
            <p class="value-prop-title">
              <span v-show="currentLang === 'zh'">我们不是医院，而是您通往顶级医疗资源的桥梁</span>
              <span v-show="currentLang === 'en'">Your Bridge to Premier Medical Resources</span>
            </p>
            
            <p class="value-prop-desc">
              <span v-show="currentLang === 'zh'">不直接诊疗，只专注资源协调。依托 50+ 家三甲医院（含 15 家全国 Top100）深度合作网络，为您提供：</span>
              <span v-show="currentLang === 'en'">We coordinate resources through our network of 50+ Grade-A hospitals.</span>
            </p>
            
            <div class="value-prop-services">
              <div class="service-item">
                <span class="service-check">✓</span>
                <div class="service-content">
                  <span class="service-title">
                    <span v-show="currentLang === 'zh'">路径规划</span>
                    <span v-show="currentLang === 'en'">Care Path Planning</span>
                  </span>
                  <span class="service-detail">
                    <span v-show="currentLang === 'zh'">从初诊到康复的全程科学引导</span>
                    <span v-show="currentLang === 'en'">Scientific guidance from diagnosis to recovery</span>
                  </span>
                </div>
              </div>
              
              <div class="service-item">
                <span class="service-check">✓</span>
                <div class="service-content">
                  <span class="service-title">
                    <span v-show="currentLang === 'zh'">专家预约</span>
                    <span v-show="currentLang === 'en'">Expert Appointment</span>
                  </span>
                  <span class="service-detail">
                    <span v-show="currentLang === 'zh'">突破挂号瓶颈，直通核心科室</span>
                    <span v-show="currentLang === 'en'">Direct access to core departments</span>
                  </span>
                </div>
              </div>
              
              <div class="service-item">
                <span class="service-check">✓</span>
                <div class="service-content">
                  <span class="service-title">
                    <span v-show="currentLang === 'zh'">手术协调</span>
                    <span v-show="currentLang === 'en'">Surgery Coordination</span>
                  </span>
                  <span class="service-detail">
                    <span v-show="currentLang === 'zh'">缩短等待周期，优化就医体验</span>
                    <span v-show="currentLang === 'en'">Reduce waiting time, optimize experience</span>
                  </span>
                </div>
              </div>
              
              <div class="service-item">
                <span class="service-check">✓</span>
                <div class="service-content">
                  <span class="service-title">
                    <span v-show="currentLang === 'zh'">跨院转诊</span>
                    <span v-show="currentLang === 'en'">Cross-Hospital Referral</span>
                  </span>
                  <span class="service-detail">
                    <span v-show="currentLang === 'zh'">打破地域壁垒，整合最优资源</span>
                    <span v-show="currentLang === 'en'">Integrate optimal resources across regions</span>
                  </span>
                </div>
              </div>
            </div>
            
            <p class="value-prop-footer">
              <span v-show="currentLang === 'zh'">以专业顾问身份，为您定制高效、私密的专属医疗方案</span>
              <span v-show="currentLang === 'en'">Professional, efficient, and private medical solutions</span>
            </p>
          </div>
        </div>
      </div>
      
      <!-- 底部特色科室区域 -->
      <div class="featured-specialties">
        <div class="specialties-container">
          <div class="specialties-header">
            <h3 class="specialties-title">
              <span v-show="currentLang === 'zh'">重点服务专科</span>
              <span v-show="currentLang === 'en'">Featured Specialties</span>
            </h3>
            <p class="specialties-desc">
              <span v-show="currentLang === 'zh'">我们提供 20+ 重点专科的深度医疗服务，涵盖心血管、骨科、肿瘤、神经科等领域</span>
              <span v-show="currentLang === 'en'">We provide deep medical services in 20+ key specialties</span>
            </p>
          </div>
          
          <div class="specialties-list">
            <div class="specialty-item">
              <span class="specialty-name">
                <span v-show="currentLang === 'zh'">心血管内科</span>
                <span v-show="currentLang === 'en'">Cardiology</span>
              </span>
              <span class="specialty-arrow">›</span>
            </div>
            <div class="specialty-item">
              <span class="specialty-name">
                <span v-show="currentLang === 'zh'">骨科</span>
                <span v-show="currentLang === 'en'">Orthopedics</span>
              </span>
              <span class="specialty-arrow">›</span>
            </div>
            <div class="specialty-item">
              <span class="specialty-name">
                <span v-show="currentLang === 'zh'">肿瘤科</span>
                <span v-show="currentLang === 'en'">Oncology</span>
              </span>
              <span class="specialty-arrow">›</span>
            </div>
            <div class="specialty-item">
              <span class="specialty-name">
                <span v-show="currentLang === 'zh'">神经科</span>
                <span v-show="currentLang === 'en'">Neurology</span>
              </span>
              <span class="specialty-arrow">›</span>
            </div>
            <div class="specialty-item">
              <span class="specialty-name">
                <span v-show="currentLang === 'zh'">康复医学</span>
                <span v-show="currentLang === 'en'">Rehabilitation</span>
              </span>
              <span class="specialty-arrow">›</span>
            </div>
            <div class="specialty-item">
              <span class="specialty-name">
                <span v-show="currentLang === 'zh'">牙科</span>
                <span v-show="currentLang === 'en'">Dentistry</span>
              </span>
              <span class="specialty-arrow">›</span>
            </div>
          </div>
        </div>
      </div>
    </section>

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

    <!-- TCM Partners Section -->
    <section class="partner-section tcm-section">
      <div class="section-container">
        <div class="tcm-header">
          <div class="tcm-icon-large">🌿</div>
          
          <div class="section-label-centered">
            <span class="label-text">
              <span v-show="currentLang === 'zh'">中医服务机构</span>
              <span v-show="currentLang === 'en'">TCM Service Network</span>
            </span>
          </div>
          
          <div class="tcm-number-display">
            <span class="number-big">{{ tcmPartners.number }}</span>
            <span class="number-label">
              <span v-show="currentLang === 'zh'">{{ tcmPartners.labelCn }}</span>
              <span v-show="currentLang === 'en'">{{ tcmPartners.labelEn }}</span>
            </span>
            <span class="number-sublabel">
              <span v-show="currentLang === 'zh'">{{ tcmPartners.sublabelCn }}</span>
              <span v-show="currentLang === 'en'">{{ tcmPartners.sublabelEn }}</span>
            </span>
          </div>
          
          <p class="section-desc-centered">
            <span v-show="currentLang === 'zh'">{{ tcmPartners.descCn }}</span>
            <span v-show="currentLang === 'en'">{{ tcmPartners.descEn }}</span>
          </p>
        </div>
        
        <div class="tcm-cards-row">
          <div v-for="(card, index) in tcmPartners.cards" :key="index" class="tcm-card">
            <div class="tcm-card-icon">{{ card.icon }}</div>
            <div class="tcm-card-num">{{ card.num }}</div>
            <h4 class="tcm-card-title">
              <span v-show="currentLang === 'zh'">{{ card.labelCn }}</span>
              <span v-show="currentLang === 'en'">{{ card.labelEn }}</span>
            </h4>
          </div>
        </div>
        
        <div class="tcm-partners-section">
          <p class="logos-title-centered">
            <span v-show="currentLang === 'zh'">部分服务机构</span>
            <span v-show="currentLang === 'en'">Selected Service Network</span>
          </p>
          <div class="tcm-logos-grid">
            <div v-for="(partner, index) in tcmPartners.partners" :key="index" class="tcm-logo-item">
              <div class="tcm-logo-icon">{{ partner.logo }}</div>
              <span class="tcm-logo-name">
                <span v-show="currentLang === 'zh'">{{ partner.nameCn }}</span>
                <span v-show="currentLang === 'en'">{{ partner.nameEn }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tourism Partners Section -->
    <section class="partner-section tourism-section">
      <div class="section-container">
        <div class="tourism-layout">
          <div class="tourism-content">
            <div class="section-label">
              <span class="label-icon">🎫</span>
              <span class="label-text">
                <span v-show="currentLang === 'zh'">旅游合作伙伴</span>
                <span v-show="currentLang === 'en'">Tourism Partners</span>
              </span>
            </div>
            
            <h2 class="section-title">
              <span class="title-number">{{ tourismPartners.number }}</span>
              <span class="title-text">
                <span v-show="currentLang === 'zh'">{{ tourismPartners.labelCn }}</span>
                <span v-show="currentLang === 'en'">{{ tourismPartners.labelEn }}</span>
              </span>
            </h2>
            
            <p class="section-subtitle">
              <span v-show="currentLang === 'zh'">{{ tourismPartners.sublabelCn }}</span>
              <span v-show="currentLang === 'en'">{{ tourismPartners.sublabelEn }}</span>
            </p>
            
            <p class="section-desc">
              <span v-show="currentLang === 'zh'">{{ tourismPartners.descCn }}</span>
              <span v-show="currentLang === 'en'">{{ tourismPartners.descEn }}</span>
            </p>
            
            <div class="tourism-benefits">
              <div v-for="(benefit, index) in tourismPartners.benefits" :key="index" class="benefit-item">
                <div class="benefit-icon">{{ benefit.icon }}</div>
                <div class="benefit-content">
                  <h4 class="benefit-title">
                    <span v-show="currentLang === 'zh'">{{ benefit.titleCn }}</span>
                    <span v-show="currentLang === 'en'">{{ benefit.titleEn }}</span>
                  </h4>
                  <p class="benefit-desc">
                    <span v-show="currentLang === 'zh'">{{ benefit.descCn }}</span>
                    <span v-show="currentLang === 'en'">{{ benefit.descEn }}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div class="partner-logos">
              <p class="logos-title">
                <span v-show="currentLang === 'zh'">部分合作景区</span>
                <span v-show="currentLang === 'en'">Selected Attractions</span>
              </p>
              <div class="logos-row">
                <div v-for="(partner, index) in tourismPartners.partners" :key="index" class="logo-pill">
                  <span class="logo-icon">{{ partner.logo }}</span>
                  <span class="logo-name">
                    <span v-show="currentLang === 'zh'">{{ partner.nameCn }}</span>
                    <span v-show="currentLang === 'en'">{{ partner.nameEn }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tourism-image-wrapper">
            <img :src="tourismPartners.image" alt="Tourism Partners" class="tourism-image" />
            <div class="tourism-image-badge">
              <span class="badge-icon">🎫</span>
              <span class="badge-text">
                <span v-show="currentLang === 'zh'">会员专属权益</span>
                <span v-show="currentLang === 'en'">Member Benefits</span>
              </span>
            </div>
          </div>
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

/* ==================== MEDICAL SECTION - Mayo Clinic 风格 ==================== */
.medical-section {
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
  padding: 6rem 0;
}

.medical-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 4rem;
  align-items: start;
}

/* 左侧文案区 */
.medical-content-left {
  padding-top: 2rem;
}

/* 右侧占位空白区 */
.medical-content-spacer {
  display: block;
}

.medical-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-secondary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.medical-title {
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--color-black);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.medical-desc {
  font-size: 1.125rem;
  line-height: 1.9;
  color: var(--color-stone);
  margin-bottom: 2.5rem;
}

/* 左侧医院展示图片 */
.medical-showcase-image {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.medical-showcase-image:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.showcase-img {
  width: 100%;
  height: auto;
  display: block;
}

/* 右侧医院图片网格 */
.medical-hospitals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding-top: 2rem;
  align-content: start;
}

.hospital-card-mayo {
  border-radius: 8px;
  overflow: hidden;
}

.hospital-card-image {
  position: relative;
  height: 280px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

/* 价值主张文案区域 */
.medical-value-prop {
  grid-column: span 2;
  padding: 3rem 2rem;
  margin-top: 1rem;
}

.value-prop-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.value-prop-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-stone);
  margin-bottom: 2rem;
}

.value-prop-services {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.service-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.service-check {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: var(--color-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-white);
}

.service-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.service-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-black);
}

.service-detail {
  font-size: 0.875rem;
  color: var(--color-stone);
  line-height: 1.5;
}

.value-prop-footer {
  font-size: 0.9375rem;
  color: var(--color-stone);
  line-height: 1.7;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.hospital-card-mayo:hover .card-img {
  transform: scale(1.08);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.hospital-card-mayo:hover .card-overlay {
  opacity: 1;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  z-index: 2;
}

.card-hospital-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.card-location {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.75rem;
}

.card-rank {
  display: inline-block;
  background: rgba(255, 255, 255, 0.98);
  padding: 0.375rem 0.875rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-black);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 底部特色科室区域 */
.featured-specialties {
  margin-top: 6rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.specialties-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.specialties-header {
  margin-bottom: 3rem;
}

.specialties-title {
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-black);
  margin-bottom: 1rem;
}

.specialties-desc {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-stone);
  max-width: 700px;
}

.specialties-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.specialty-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.specialty-item:hover {
  border-color: var(--color-secondary);
  background: rgba(102, 126, 234, 0.03);
  transform: translateX(8px);
}

.specialty-name {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-black);
}

.specialty-arrow {
  font-size: 1.5rem;
  color: var(--color-secondary);
  line-height: 1;
  transition: transform 0.3s ease;
}

.specialty-item:hover .specialty-arrow {
  transform: translateX(4px);
}

/* Featured Hospitals */
.featured-hospitals {
  margin-top: 3rem;
}

.hospitals-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-stone);
  margin-bottom: 1.5rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hospitals-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.hospital-card {
  background: var(--color-white);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hospital-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--color-secondary);
}

.hospital-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.hospital-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.hospital-card:hover .hospital-image {
  transform: scale(1.05);
}

.hospital-rank-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.98);
  padding: 0.5rem 0.75rem;
  border-radius: 50px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--color-black);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.05em;
}

.hospital-info {
  padding: 1.25rem;
}

.hospital-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.hospital-specialty {
  font-size: 0.8125rem;
  color: var(--color-stone);
  line-height: 1.5;
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

/* ==================== TOURISM SECTION ==================== */
.tourism-section {
  background: linear-gradient(180deg, #faf5ff 0%, #ffffff 100%);
}

.tourism-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 4rem;
  align-items: start;
}

.tourism-content {
  padding-top: 2rem;
}

.tourism-content .section-title {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tourism-content .title-number {
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.tourism-content .title-text {
  font-size: 1.75rem;
  font-weight: 400;
  color: var(--color-black);
}

.tourism-content .section-subtitle {
  font-size: 1rem;
  color: var(--color-stone);
  margin-bottom: 1.5rem;
}

.tourism-content .section-desc {
  font-size: 1.0625rem;
  line-height: 1.9;
  color: var(--color-stone);
  margin-bottom: 3rem;
  max-width: 600px;
}

.tourism-benefits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--color-white);
  border-radius: 4px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  border-color: var(--color-secondary);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
}

.benefit-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 0.35rem;
}

.benefit-desc {
  font-size: 0.875rem;
  color: var(--color-stone);
}

.partner-logos {
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.logos-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-stone);
  margin-bottom: 1.25rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.logos-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.logo-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 50px;
  transition: all 0.2s ease;
}

.logo-pill:hover {
  background: rgba(0, 0, 0, 0.06);
}

.logo-pill .logo-icon {
  font-size: 1.25rem;
}

.logo-pill .logo-name {
  font-size: 0.8125rem;
  color: var(--color-stone);
  font-weight: 500;
}

.tourism-image-wrapper {
  position: sticky;
  top: 120px;
}

.tourism-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}

.tourism-image-badge {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-white);
  padding: 1.25rem 2rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.badge-icon {
  font-size: 1.75rem;
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-black);
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
  .medical-hospitals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .specialties-list {
    grid-template-columns: repeat(2, 1fr);
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
  
  /* 医疗板块响应式 */
  .medical-stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hospital-carousel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-container {
    padding: 4rem 1.5rem;
  }
  
  .medical-container {
    padding: 0 1.5rem;
  }
  
  .medical-title {
    font-size: 1.75rem;
  }
  
  .medical-desc {
    font-size: 1rem;
  }
  
  .medical-showcase-image {
    margin-top: 2rem;
  }
  
  .medical-hospitals-grid {
    grid-template-columns: 1fr;
  }
  
  .hospital-card-image {
    height: 240px;
  }
  
  .medical-value-prop {
    grid-column: span 1;
    padding: 2rem 1.5rem;
  }
  
  .value-prop-title {
    font-size: 1.25rem;
  }
  
  .value-prop-services {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .medical-content-spacer {
    display: none;
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
}
</style>
