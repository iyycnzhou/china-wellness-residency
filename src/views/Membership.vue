<script setup lang="ts">
import { ref, computed } from 'vue'
import { currentLang, getCityNames } from '../composables/useLanguage'
import BookingModal from '../components/BookingModal.vue'

// 导入服务图片
import hospitalImg from '@/assets/images/services/01-hospital.webp'
import specialistImg from '@/assets/images/services/02-specialist.webp'
import checkupImg from '@/assets/images/services/03-checkup.webp'
import wellnessImg from '@/assets/images/services/04-wellness.webp'
import hotspringImg from '@/assets/images/services/05-hotspring.webp'
import tcmImg from '@/assets/images/services/06-tcm.webp'
import taichiImg from '@/assets/images/services/10-taichi.webp'
import tcmTherapyImg from '@/assets/images/services/11-tcm-therapy.webp'
import teaImg from '@/assets/images/services/12-tea.webp'

// 当前激活的Tab
const activeTab = ref<'membership' | 'services'>('membership')

// ==================== 预订模态框状态 ====================
const isBookingOpen = ref(false)
const selectedService = ref<any>(null)

// 打开预订模态框
function openBooking(service: any) {
  selectedService.value = service
  isBookingOpen.value = true
}

// 处理预订提交
function handleBookingSubmit(booking: any) {
  console.log('预订提交:', booking)
  // TODO: 调用API提交预订
  isBookingOpen.value = false
}

// ==================== 会员计划数据（重新设计） ====================
const memberships = [
  {
    tier: 'basic',
    badge: '🥉',
    nameCn: '基础康养驻留',
    nameEn: 'Basic Wellness Residency',
    price: '7,000–9,000',
    period: 'USD / 年',
    suitableCn: '适合关注健康管理与休闲度假的客户',
    suitableEn: 'For health-conscious individuals seeking wellness and leisure',
    compensation: null,
    compensationEn: null,
    features: [
      { cn: '1 张床位（单人/双人可选）', en: '1 Bed (single or double occupancy)' },
      { cn: '45 天年度驻留', en: '45 days annual residency' },
      { cn: '基础年度健康体检', en: 'Basic annual health screening' },
      { cn: '医疗咨询服务（5次/年）', en: 'Medical consultation (5 times/year)' },
      { cn: '康养旅游权益（景区门票 + 休闲课程）', en: 'Wellness tourism benefits (attraction tickets + leisure courses)' },
      { cn: '签证评估服务', en: 'Visa assessment service' },
      { cn: '❌ 不包含保险赔付', en: '❌ No insurance coverage' },
    ],
    includes: [], // 继承自：无
    highlight: false,
  },
  {
    tier: 'medical',
    badge: '🥈',
    nameCn: '医疗康养驻留',
    nameEn: 'Medical Wellness Residency',
    price: '15,000–20,000',
    period: 'USD / 年',
    suitableCn: '适合有一定医疗需求或商务出行的高端客户',
    suitableEn: 'For international clients with medical needs or business travelers',
    compensation: '最高赔付 $20,000',
    compensationEn: 'Max Coverage $20,000',
    features: [
      // 继承L1的所有服务
      { cn: '全部基础康养驻留服务内容', en: 'All Basic Wellness Residency services' },
      { cn: '升级：2 张床位（单人/双人可选）', en: 'Upgrade: 2 Beds (single or double occupancy)' },
      { cn: '升级：90 天年度驻留', en: 'Upgrade: 90 days annual residency' },
      { cn: '升级：深度年度体检 + 专家会诊', en: 'Upgrade: Comprehensive screening + specialist consultations' },
      // 新增服务
      { cn: '中医康复与调理服务（10次/年）', en: 'TCM rehabilitation and conditioning (10 sessions/year)' },
      { cn: '医疗绿色通道（三甲医院专家预约）', en: 'Priority medical access (top-tier hospital specialist booking)' },
      { cn: '签证评估服务', en: 'Visa assessment service' },
      { cn: '材料准备指导', en: 'Document preparation guidance' },
      { cn: '医疗翻译陪同（10次免费）', en: 'Medical translation (10 sessions included)' },
      { cn: '✅ 会员保险赔付（最高$20,000）', en: '✅ Member insurance coverage (max $20,000)' },
    ],
    includes: ['basic'], // 继承L1的所有服务
    highlight: true,
  },
  {
    tier: 'premium',
    badge: '🥇',
    nameCn: '高端医疗会员',
    nameEn: 'Premium Medical Residency',
    price: '30,000–40,000',
    period: 'USD / 年',
    suitableCn: '适合高端医疗旅游客户、企业高管、退休外籍人士',
    suitableEn: 'For premium medical tourists, executives, and retired expats',
    compensation: '最高赔付 $50,000',
    compensationEn: 'Max Coverage $50,000',
    features: [
      // 继承L2的所有服务（包括L1的）
      { cn: '全部医疗康养驻留服务内容', en: 'All Medical Wellness Residency services' },
      // 升级服务
      { cn: '升级：3 张床位（高端房型）', en: 'Upgrade: 3 Beds (premium accommodations)' },
      { cn: '升级：120 天年度驻留', en: 'Upgrade: 120 days annual residency' },
      { cn: '升级：VIP 医疗服务（年度深度体检 + 多学科专家会诊）', en: 'Upgrade: VIP medical services (comprehensive screening + multi-disciplinary specialist consultations)' },
      // 新增服务
      { cn: '私人健康管家全程服务（7×24小时）', en: 'Dedicated personal health concierge (7×24 hours)' },
      { cn: '签证评估服务', en: 'Visa assessment service' },
      { cn: '材料准备指导', en: 'Document preparation guidance' },
      { cn: '医院邀请函（加急办理）', en: 'Hospital invitation letter (expedited processing)' },
      { cn: '医疗翻译陪同（无限次）', en: 'Unlimited medical translation' },
      { cn: '保险直付对接（Cigna/Allianz等）', en: 'Insurance direct billing (Cigna/Allianz, etc.)' },
      { cn: '高端医疗设备使用（MRI/CT等）', en: 'Premium medical equipment access (MRI/CT, etc.)' },
      { cn: '家庭成员共享服务', en: 'Family member sharing benefits' },
      { cn: '✅ 会员保险赔付（最高$50,000）', en: '✅ Member insurance coverage (max $50,000)' },
    ],
    includes: ['medical'], // 继承L2的所有服务（包括L1的）
    highlight: false,
  },
]

// 支付方式
const paymentMethods = [
  {
    name: 'Visa / Mastercard',
    icon: '💳',
    descriptionCn: '支持国际信用卡',
    descriptionEn: 'Supports international credit cards'
  },
  {
    name: 'Stripe',
    icon: '🔒',
    descriptionCn: '安全的在线支付',
    descriptionEn: 'Secure online payment'
  },
  {
    name: 'PayPal',
    icon: '🅿️',
    descriptionCn: '全球即时转账',
    descriptionEn: 'Global instant transfer'
  },
  {
    name: 'Alipay International',
    icon: '📱',
    descriptionCn: '支付宝国际版',
    descriptionEn: 'Alipay International'
  },
  {
    name: 'USDT',
    icon: '₮',
    descriptionCn: '加密货币支付（针对特定客户）',
    descriptionEn: 'Cryptocurrency payment (for specific clients)'
  },
]

// ==================== 服务数据 ====================
const services = [
  // 医疗健康
  {
    category: 'medical',
    categoryCn: '医疗健康',
    categoryEn: 'Medical Health',
    titleCn: '三甲医院绿色通道',
    titleEn: 'Top-Tier Hospital Priority Access',
    descriptionCn: '通过我们与国内多家三甲医院的深度合作，为您和您的家人提供快速、便捷的就医通道。',
    descriptionEn: 'Through our deep partnerships with top-tier hospitals nationwide, we provide fast and convenient medical access for you and your family.',
    price: '500',
    priceCn: '元/次',
    priceEn: 'CNY/visit',
    rating: 4.8,
    tags: ['医院', '绿色通道', '专家门诊'],
    tagsEn: ['Hospital', 'Priority Access', 'Specialist Consultation'],
    image: hospitalImg,
    languages: ['zh', 'en', 'bilingual'],
    cities: ['北京', '上海', '广州', '深圳', '成都', '杭州']
  },
  {
    category: 'medical',
    categoryCn: '医疗健康',
    categoryEn: 'Medical Health',
    titleCn: '专科治疗中心',
    titleEn: 'Specialized Treatment Centers',
    descriptionCn: '覆盖肿瘤、心脑血管、骨科、眼科等专科领域的顶尖治疗资源。',
    descriptionEn: 'Top-tier treatment resources covering oncology, cardiovascular, orthopedics, ophthalmology, and other specialized fields.',
    price: '1200',
    priceCn: '元/次',
    priceEn: 'CNY/visit',
    rating: 4.9,
    tags: ['专科', '专家', '高端治疗'],
    tagsEn: ['Specialized', 'Expert', 'Premium Treatment'],
    image: specialistImg,
    languages: ['zh', 'en', 'bilingual'],
    cities: ['上海', '广州', '北京', '成都']
  },
  {
    category: 'medical',
    categoryCn: '医疗健康',
    categoryEn: 'Medical Health',
    titleCn: '高端体检中心',
    titleEn: 'Premium Health Screening Centers',
    descriptionCn: '提供全方位、个性化的高端健康体检服务，早发现、早预防。',
    descriptionEn: 'Comprehensive, personalized premium health screening services for early detection and prevention.',
    price: '800',
    priceCn: '元/起',
    priceEn: 'CNY/from',
    rating: 4.7,
    tags: ['体检', '健康管理', '预防医学'],
    tagsEn: ['Health Screening', 'Health Management', 'Preventive Medicine'],
    image: checkupImg,
    languages: ['zh', 'en', 'bilingual'],
    cities: ['北京', '上海', '广州', '深圳', '杭州']
  },

  // 康养驻留
  {
    category: 'wellness',
    categoryCn: '康养驻留',
    categoryEn: 'Wellness Residency',
    titleCn: '高端康养基地',
    titleEn: 'Premium Wellness Bases',
    descriptionCn: '位于风景秀丽的山水之地，提供长期或短期的康养驻留服务。',
    descriptionEn: 'Premium wellness bases located in picturesque natural settings, offering long-term or short-term wellness residency.',
    price: '3000',
    priceCn: '元/月',
    priceEn: 'CNY/month',
    rating: 4.9,
    tags: ['康养', '自然', '静修'],
    tagsEn: ['Wellness', 'Nature', 'Retreat'],
    image: wellnessImg,
    languages: ['zh', 'bilingual'],
    cities: ['三亚', '大理', '黄山', '莫干山', '珠海']
  },
  {
    category: 'wellness',
    categoryCn: '康养驻留',
    categoryEn: 'Wellness Residency',
    titleCn: '温泉度假疗养',
    titleEn: 'Hot Spring Resort & Therapy',
    descriptionCn: '结合传统温泉疗法与现代康复理念的专业疗养中心。',
    descriptionEn: 'Professional therapy centers combining traditional hot spring therapy with modern rehabilitation concepts.',
    price: '2500',
    priceCn: '元/周',
    priceEn: 'CNY/week',
    rating: 4.8,
    tags: ['温泉', '疗养', '康复'],
    tagsEn: ['Hot Spring', 'Therapy', 'Rehabilitation'],
    image: hotspringImg,
    languages: ['zh', 'en', 'bilingual'],
    cities: ['南京', '合肥', '南昌', '福州']
  },
  {
    category: 'wellness',
    categoryCn: '康养驻留',
    categoryEn: 'Wellness Residency',
    titleCn: '中医调理中心',
    titleEn: 'TCM Conditioning Centers',
    descriptionCn: '专业中医师团队，提供针灸、推拿、艾灸、药膳等传统中医调理服务。',
    descriptionEn: 'Professional TCM practitioner team providing acupuncture, massage, moxibustion, herbal cuisine and other traditional Chinese medicine conditioning services.',
    price: '800',
    priceCn: '元/次',
    priceEn: 'CNY/session',
    rating: 4.8,
    tags: ['中医', '调理', '康复'],
    tagsEn: ['TCM', 'Conditioning', 'Rehabilitation'],
    image: tcmImg,
    languages: ['zh', 'bilingual'],
    cities: ['北京', '上海', '广州', '成都']
  },

  // 文化体验
  {
    category: 'cultural',
    categoryCn: '文化体验',
    categoryEn: 'Cultural Experience',
    titleCn: '太极气功课程',
    titleEn: 'Tai Chi & Qigong Courses',
    descriptionCn: '由资深太极师和气功师教授，学习传统养生功法，提升身心健康。',
    descriptionEn: 'Taught by experienced Tai Chi and Qigong masters, learn traditional wellness practices to improve physical and mental health.',
    price: '300',
    priceCn: '元/次',
    priceEn: 'CNY/session',
    rating: 4.9,
    tags: ['太极', '气功', '养生'],
    tagsEn: ['Tai Chi', 'Qigong', 'Wellness'],
    image: taichiImg,
    languages: ['zh', 'en', 'bilingual'],
    cities: ['北京', '上海', '成都', '西安']
  },
  {
    category: 'cultural',
    categoryCn: '文化体验',
    categoryEn: 'Cultural Experience',
    titleCn: '中医理疗体验',
    titleEn: 'TCM Therapy Experience',
    descriptionCn: '体验针灸、推拿、艾灸等中医理疗，感受传统医学的智慧。',
    descriptionEn: 'Experience TCM therapies such as acupuncture, massage, moxibustion and feel the wisdom of traditional medicine.',
    price: '400',
    priceCn: '元/次',
    priceEn: 'CNY/session',
    rating: 4.8,
    tags: ['中医', '理疗', '体验'],
    tagsEn: ['TCM', 'Therapy', 'Experience'],
    image: tcmTherapyImg,
    languages: ['zh', 'bilingual'],
    cities: ['北京', '上海', '广州']
  },
  {
    category: 'cultural',
    categoryCn: '文化体验',
    categoryEn: 'Cultural Experience',
    titleCn: '中国茶文化体验',
    titleEn: 'Chinese Tea Culture Experience',
    descriptionCn: '在茶山或茶馆中，感受中国茶文化的博大精深。',
    descriptionEn: 'Experience the profound depth of Chinese tea culture in tea plantations or teahouses.',
    price: '200',
    priceCn: '元/次',
    priceEn: 'CNY/session',
    rating: 4.8,
    tags: ['茶道', '文化', '艺术'],
    tagsEn: ['Tea Ceremony', 'Culture', 'Art'],
    image: teaImg,
    languages: ['zh', 'en', 'bilingual'],
    cities: ['杭州', '福州', '厦门', '成都', '西安']
  }
]

// 服务筛选状态
const selectedCategory = ref<string | 'all'>('all')
const selectedCity = ref<string | 'all'>('all')
const selectedPriceRange = ref<string | 'all'>('all')
const searchQuery = ref('')

// 价格区间
const priceRanges = [
  { id: 'all', labelCn: '全部价格', labelEn: 'All Prices' },
  { id: 'low', labelCn: '¥100以下', labelEn: 'Below ¥100' },
  { id: 'medium', labelCn: '¥100-500', labelEn: '¥100-500' },
  { id: 'high', labelCn: '¥500-1000', labelEn: '¥500-1000' },
  { id: 'premium', labelCn: '¥1000以上', labelEn: 'Above ¥1000' }
]

// 计算属性：筛选后的服务列表
const filteredServices = computed(() => {
  return services.filter(service => {
    // 分类筛选
    if (selectedCategory.value !== 'all' && service.category !== selectedCategory.value) {
      return false
    }

    // 城市筛选
    if (selectedCity.value !== 'all' && !service.cities.includes(selectedCity.value)) {
      return false
    }

    // 价格筛选
    const price = parseFloat(service.price)
    if (selectedPriceRange.value === 'low' && price >= 100) return false
    if (selectedPriceRange.value === 'medium' && (price < 100 || price >= 500)) return false
    if (selectedPriceRange.value === 'high' && (price < 500 || price >= 1000)) return false
    if (selectedPriceRange.value === 'premium' && price < 1000) return false

    // 搜索筛选
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const titleCn = service.titleCn.toLowerCase()
      const titleEn = service.titleEn.toLowerCase()
      const descCn = service.descriptionCn.toLowerCase()
      const descEn = service.descriptionEn.toLowerCase()
      if (!titleCn.includes(query) && !titleEn.includes(query) && !descCn.includes(query) && !descEn.includes(query)) {
        return false
      }
    }

    return true
  })
})

// 获取类别标签
const getCategoryLabel = (category: string) => {
  const labels: Record<string, { cn: string, en: string }> = {
    medical: { cn: '医疗健康', en: 'Medical' },
    wellness: { cn: '康养驻留', en: 'Wellness' },
    cultural: { cn: '文化体验', en: 'Cultural' }
  }
  return labels[category] || { cn: '其他', en: 'Other' }
}

// 获取类别标签（当前语言版本）
const getCategoryLabelCurrent = (category: string) => {
  const labels = getCategoryLabel(category)
  return currentLang.value === 'zh' ? labels.cn : labels.en
}
</script>

<template>
  <div class="services-membership-page">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="hero-bg-wrapper">
        <img class="hero-bg" src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80" alt="Services & Membership" />
      </div>
      
      <div class="hero-overlay"></div>
      
      <div class="hero-content container">
        <div class="hero-subtitle">
          <span v-show="currentLang === 'zh'" class="hero-subtitle-cn">China Wellness Residency</span>
          <span v-show="currentLang === 'en'" class="hero-subtitle-en">China Wellness Residency</span>
        </div>
        
        <h1>
          <span v-show="currentLang === 'zh'">灵活选择您的康养方式</span>
          <span v-show="currentLang === 'en'">Choose Your Wellness Journey</span>
        </h1>
        
        <p class="hero-description">
          <span v-show="currentLang === 'zh'">
            无论是年度会员计划，还是单次服务预订，我们都为您提供最优质的选择。
          </span>
          <span v-show="currentLang === 'en'">
            Whether you choose an annual membership plan or single service booking, we provide you with the finest options.
          </span>
        </p>
        
        <!-- Tab切换器 -->
        <div class="tab-switcher">
          <button 
            :class="['tab-btn', { active: activeTab === 'membership' }]"
            @click="activeTab = 'membership'"
          >
            <span class="tab-icon">💎</span>
            <span class="tab-text">
              <span v-show="currentLang === 'zh'">会员计划</span>
              <span v-show="currentLang === 'en'">Membership</span>
            </span>
          </button>
          <button 
            :class="['tab-btn', { active: activeTab === 'services' }]"
            @click="activeTab = 'services'"
          >
            <span class="tab-icon">🏥</span>
            <span class="tab-text">
              <span v-show="currentLang === 'zh'">单次服务</span>
              <span v-show="currentLang === 'en'">Single Service</span>
            </span>
          </button>
        </div>
      </div>
    </section>
    
    <!-- Tab 1: 会员计划 -->
    <section v-show="activeTab === 'membership'" class="membership-section">
      <div class="container">
        <div class="section-header">
          <h2>
            <span v-show="currentLang === 'zh'">会员计划</span>
            <span v-show="currentLang === 'en'">Membership Plans</span>
          </h2>
          <p class="section-subtitle">
            <span v-show="currentLang === 'zh'">选择适合您的会员等级，享受专属康养权益</span>
            <span v-show="currentLang === 'en'">Choose the membership tier that suits you and enjoy exclusive wellness benefits</span>
          </p>
        </div>
        
        <!-- 会员卡片 -->
        <div class="membership-cards">
          <div 
            v-for="membership in memberships" 
            :key="membership.tier"
            :class="['membership-card', { highlight: membership.highlight }]"
          >
            <div class="membership-badge">{{ membership.badge }}</div>
            <div class="membership-info">
              <h3>
                <span v-show="currentLang === 'zh'">{{ membership.nameCn }}</span>
                <span v-show="currentLang === 'en'">{{ membership.nameEn }}</span>
              </h3>
              <p class="membership-suitable">
                <span v-show="currentLang === 'zh'">{{ membership.suitableCn }}</span>
                <span v-show="currentLang === 'en'">{{ membership.suitableEn }}</span>
              </p>
            </div>
            <div class="membership-price">
              <span class="price-amount">${{ membership.price }}</span>
              <span class="price-period">{{ membership.period }}</span>
            </div>
            <div v-if="membership.compensation" class="membership-compensation">
              <span class="compensation-label">
                <span v-show="currentLang === 'zh'">🛡️ 保险赔付：</span>
                <span v-show="currentLang === 'en'">🛡️ Insurance Coverage:</span>
              </span>
              <span class="compensation-value">
                <span v-show="currentLang === 'zh'">{{ membership.compensation }}</span>
                <span v-show="currentLang === 'en'">{{ membership.compensationEn }}</span>
              </span>
            </div>
            <ul class="membership-features">
              <li v-for="(feature, index) in membership.features" :key="index">
                <span class="feature-check">✓</span>
                <span>
                  <span v-show="currentLang === 'zh'">{{ feature.cn }}</span>
                  <span v-show="currentLang === 'en'">{{ feature.en }}</span>
                </span>
              </li>
            </ul>
            <button class="btn btn-gold membership-cta">
              <span v-show="currentLang === 'zh'">立即加入</span>
              <span v-show="currentLang === 'en'">Join Now</span>
            </button>
          </div>
        </div>
        
        <!-- 会员权益对比表格 -->
        <div class="comparison-table-section">
          <h3>
            <span v-show="currentLang === 'zh'">会员权益对比</span>
            <span v-show="currentLang === 'en'">Membership Comparison</span>
          </h3>
          
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th style="width: 40%;">
                    <span v-show="currentLang === 'zh'">权益 / 保险赔付</span>
                    <span v-show="currentLang === 'en'">Benefits / Insurance Coverage</span>
                  </th>
                  <th style="width: 20%;" :class="{ highlight: true }">
                    🥈 L2
                    <br>
                    <span v-show="currentLang === 'zh'">医疗康养驻留</span>
                    <span v-show="currentLang === 'en'">Medical Wellness</span>
                    <br>
                    <span class="membership-table-price">$15,000-20,000</span>
                  </th>
                  <th style="width: 20%;">
                    🥉 L1
                    <br>
                    <span v-show="currentLang === 'zh'">基础康养驻留</span>
                    <span v-show="currentLang === 'en'">Basic Wellness</span>
                    <br>
                    <span class="membership-table-price">$7,000-9,000</span>
                  </th>
                  <th style="width: 20%;">
                    🥇 L3
                    <br>
                    <span v-show="currentLang === 'zh'">高端医疗会员</span>
                    <span v-show="currentLang === 'en'">Premium Medical</span>
                    <br>
                    <span class="membership-table-price">$30,000-40,000</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- 赔付标准 -->
                <tr>
                  <td>
                    <strong>
                      🛡️ <span v-show="currentLang === 'zh'">会员保险赔付</span>
                      <span v-show="currentLang === 'en'">Member Insurance Coverage</span>
                    </strong>
                  </td>
                  <td :class="{ highlight: true }" style="background-color: rgba(201, 169, 98, 0.1); font-weight: 600; color: var(--color-primary);">
                    <span v-show="currentLang === 'zh'">$20,000</span>
                    <span v-show="currentLang === 'en'">$20,000</span>
                  </td>
                  <td style="background-color: rgba(201, 169, 98, 0.05); font-weight: 600; color: var(--color-stone);">
                    <span v-show="currentLang === 'zh'">无</span>
                    <span v-show="currentLang === 'en'">None</span>
                  </td>
                  <td style="background-color: rgba(201, 169, 98, 0.15); font-weight: 600; color: var(--color-primary);">
                    <span v-show="currentLang === 'zh'">$50,000</span>
                    <span v-show="currentLang === 'en'">$50,000</span>
                  </td>
                </tr>
                
                <!-- L1基础权益 -->
                <tr>
                  <td colspan="4" style="background-color: rgba(201, 169, 98, 0.08); font-weight: 600; color: var(--color-primary);">
                    <span v-show="currentLang === 'zh'">🏡 基础康养驻留权益（L1）</span>
                    <span v-show="currentLang === 'en'">🏡 Basic Wellness Residency Benefits (L1)</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">床位数量</span>
                    <span v-show="currentLang === 'en'">Bed Count</span>
                  </td>
                  <td :class="{ highlight: true, has: true }">2张</td>
                  <td class="has">1张</td>
                  <td class="has">3张（高端房型）</td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">年度驻留天数</span>
                    <span v-show="currentLang === 'en'">Annual Residency Days</span>
                  </td>
                  <td :class="{ highlight: true, has: true }">90天</td>
                  <td class="has">45天</td>
                  <td class="has">120天</td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">健康体检</span>
                    <span v-show="currentLang === 'en'">Health Screening</span>
                  </td>
                  <td :class="{ highlight: true, has: true }">深度 + 专家会诊</td>
                  <td class="has">基础</td>
                  <td class="has">VIP + 多学科专家</td>
                </tr>
                
                <!-- L2/L3新增权益 -->
                <tr>
                  <td colspan="4" style="background-color: rgba(201, 169, 98, 0.08); font-weight: 600; color: var(--color-primary);">
                    <span v-show="currentLang === 'zh'">🏥 医疗康养驻留权益（L2/L3）</span>
                    <span v-show="currentLang === 'en'">🏥 Medical Wellness Residency Benefits (L2/L3)</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">中医康复（年）</span>
                    <span v-show="currentLang === 'en'">TCM Rehabilitation (year)</span>
                  </td>
                  <td :class="{ highlight: true, has: true }">10次</td>
                  <td>-</td>
                  <td class="has">10次（包含）</td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">医疗绿色通道</span>
                    <span v-show="currentLang === 'en'">Medical Priority Access</span>
                  </td>
                  <td :class="{ highlight: true, has: true }">✓</td>
                  <td>-</td>
                  <td class="has">✓</td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">医疗翻译陪同</span>
                    <span v-show="currentLang === 'en'">Medical Translation</span>
                  </td>
                  <td :class="{ highlight: true, has: true }">10次</td>
                  <td>-</td>
                  <td class="has">无限次</td>
                </tr>
                
                <!-- L3专属权益 -->
                <tr>
                  <td colspan="4" style="background-color: rgba(201, 169, 98, 0.08); font-weight: 600; color: var(--color-primary);">
                    <span v-show="currentLang === 'zh'">👑 高端医疗会员专属权益（L3）</span>
                    <span v-show="currentLang === 'en'">👑 Premium Medical Exclusive Benefits (L3)</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">私人健康管家</span>
                    <span v-show="currentLang === 'en'">Personal Health Concierge</span>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td class="has">7×24小时</td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">保险直付</span>
                    <span v-show="currentLang === 'en'">Insurance Direct Billing</span>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td class="has">Cigna/Allianz等</td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">高端设备使用</span>
                    <span v-show="currentLang === 'en'">Premium Equipment Access</span>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td class="has">MRI/CT等</td>
                </tr>
                <tr>
                  <td>
                    <span v-show="currentLang === 'zh'">家庭成员共享</span>
                    <span v-show="currentLang === 'en'">Family Member Sharing</span>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td class="has">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- 支付方式 -->
        <div class="payment-methods-section">
          <h3>
            <span v-show="currentLang === 'zh'">支持的支付方式</span>
            <span v-show="currentLang === 'en'">Supported Payment Methods</span>
          </h3>
          
          <div class="payment-methods-grid">
            <div v-for="method in paymentMethods" :key="method.name" class="payment-card">
              <div class="payment-icon">{{ method.icon }}</div>
              <div class="payment-name">{{ method.name }}</div>
              <div class="payment-desc">
                <span v-show="currentLang === 'zh'">{{ method.descriptionCn }}</span>
                <span v-show="currentLang === 'en'">{{ method.descriptionEn }}</span>
              </div>
            </div>
          </div>
          
          <div class="escrow-notice">
            <div class="escrow-icon">🔐</div>
            <div class="escrow-content">
              <div class="escrow-title">
                <span v-show="currentLang === 'zh'">第三方资金托管保障</span>
                <span v-show="currentLang === 'en'">Third-Party Escrow Protection</span>
              </div>
              <div class="escrow-desc">
                <span v-show="currentLang === 'zh'">
                  所有付款均通过第三方资金托管，保障您的资金安全。服务完成后，款项才会释放给服务提供商。
                </span>
                <span v-show="currentLang === 'en'">
                  All payments are held in escrow by a third-party payment processor to ensure your funds are secure.
                  Funds are only released to service providers after services are completed.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Tab 2: 单次服务 -->
    <section v-show="activeTab === 'services'" class="services-section">
      <div class="container">
        <div class="section-header">
          <h2>
            <span v-show="currentLang === 'zh'">单次服务预订</span>
            <span v-show="currentLang === 'en'">Single Service Booking</span>
          </h2>
          <p class="section-subtitle">
            <span v-show="currentLang === 'zh'">浏览我们的服务网络，按需预订，灵活便捷</span>
            <span v-show="currentLang === 'en'">Browse our service network, book on demand, flexible and convenient</span>
          </p>
        </div>
        
        <!-- 搜索框 -->
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            :placeholder="currentLang === 'zh' ? '搜索服务、描述...' : 'Search services, descriptions...'" 
            class="search-input"
          />
        </div>
        
        <!-- 筛选器 -->
        <div class="filters-row">
          <!-- 服务类型 -->
          <div class="filter-group">
            <label class="filter-label">
              <span v-show="currentLang === 'zh'">服务类型</span>
              <span v-show="currentLang === 'en'">Service Type</span>
            </label>
            <div class="filter-options">
              <button 
                v-for="cat in ['all', 'medical', 'wellness', 'cultural']" 
                :key="cat"
                :class="['filter-btn', { active: selectedCategory === cat }]"
                @click="selectedCategory = cat"
              >
                <span v-show="currentLang === 'zh'">
                  {{ cat === 'all' ? '全部' : 
                    cat === 'medical' ? '医疗健康' :
                    cat === 'wellness' ? '康养驻留' : '文化体验' }}
                </span>
                <span v-show="currentLang === 'en'">
                  {{ cat === 'all' ? 'All' : 
                    cat === 'medical' ? 'Medical' :
                    cat === 'wellness' ? 'Wellness' : 'Cultural' }}
                </span>
              </button>
            </div>
          </div>
          
          <!-- 价格 -->
          <div class="filter-group">
            <label class="filter-label">
              <span v-show="currentLang === 'zh'">价格</span>
              <span v-show="currentLang === 'en'">Price</span>
            </label>
            <div class="filter-options">
              <button 
                v-for="range in priceRanges" 
                :key="range.id"
                :class="['filter-btn', { active: selectedPriceRange === range.id }]"
                @click="selectedPriceRange = range.id"
              >
                <span v-show="currentLang === 'zh'">{{ range.labelCn }}</span>
                <span v-show="currentLang === 'en'">{{ range.labelEn }}</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 服务列表 -->
        <div class="results-count">
          <span v-show="currentLang === 'zh'">找到 {{ filteredServices.length }} 个服务</span>
          <span v-show="currentLang === 'en'">Found {{ filteredServices.length }} services</span>
        </div>
        
        <div class="services-grid">
          <div v-for="service in filteredServices" :key="service.titleCn" class="service-card">
            <img :src="service.image" :alt="service.titleCn" class="service-image" loading="lazy" />
            <div class="service-content">
              <div class="service-category">
                <span class="category-label">{{ getCategoryLabelCurrent(service.category) }}</span>
              </div>
              
              <h3 class="service-title">
                <span v-show="currentLang === 'zh'">{{ service.titleCn }}</span>
                <span v-show="currentLang === 'en'">{{ service.titleEn }}</span>
              </h3>
              
              <p class="service-description">
                <span v-show="currentLang === 'zh'">{{ service.descriptionCn }}</span>
                <span v-show="currentLang === 'en'">{{ service.descriptionEn }}</span>
              </p>
              
              <div class="service-footer">
                <div class="service-price">
                  <span class="price-amount">¥{{ service.price }}</span>
                  <span class="price-unit">
                    <span v-show="currentLang === 'zh'">{{ service.priceCn }}</span>
                    <span v-show="currentLang === 'en'">{{ service.priceEn }}</span>
                  </span>
                </div>
                
                <div class="service-rating">
                  <span class="rating-stars">⭐</span>
                  <span class="rating-score">{{ service.rating }}</span>
                </div>
              </div>
              
              <!-- 标签 -->
              <div class="service-tags">
                <span 
                  v-for="(tag, index) in service.tags" 
                  :key="index"
                  class="tag"
                >
                  <span v-show="currentLang === 'zh'">{{ tag }}</span>
                  <span v-show="currentLang === 'en'">{{ service.tagsEn[index] }}</span>
                </span>
              </div>
              
              <!-- 城市 -->
              <div class="service-cities">
                <span class="cities-icon">📍</span>
                <span class="cities-text">
                  <span v-show="currentLang === 'zh'">支持城市：</span>
                  <span v-show="currentLang === 'en'">Available in:</span>
                  <span class="cities-list">{{ getCityNames(service.cities.slice(0, 3)) }}</span>
                </span>
              </div>
              
              <!-- 操作按钮 -->
              <div class="service-actions">
                <button 
                  class="btn btn-gold" 
                  style="padding: 0.75rem 3rem; font-size: 1rem; border-radius: 8px;"
                  @click="openBooking(service)"
                >
                  <span v-show="currentLang === 'zh'">立即预订</span>
                  <span v-show="currentLang === 'en'">Book Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 无结果提示 -->
        <div v-if="filteredServices.length === 0" class="no-results">
          <div class="no-results-icon">🔍</div>
          <p v-show="currentLang === 'zh'">未找到符合条件的服务，请尝试修改筛选条件</p>
          <p v-show="currentLang === 'en'">No services found matching your criteria. Please try adjusting your filters.</p>
          <button class="btn btn-gold" @click="selectedCategory = 'all'; selectedPriceRange = 'all'; searchQuery = ''">
            <span v-show="currentLang === 'zh'">清除筛选</span>
            <span v-show="currentLang === 'en'">Clear Filters</span>
          </button>
        </div>
      </div>
    </section>
    
    <!-- 对比区域 -->
    <section class="comparison-section">
      <div class="container">
        <div class="section-header">
          <h2>
            <span v-show="currentLang === 'zh'">如何选择？</span>
            <span v-show="currentLang === 'en'">How to Choose?</span>
          </h2>
          <p class="section-subtitle">
            <span v-show="currentLang === 'zh'">根据您的需求选择最适合的方案，包含企业级医疗责任赔付保障</span>
            <span v-show="currentLang === 'en'">Choose the plan that best fits your needs, including enterprise-level medical liability coverage</span>
          </p>
        </div>
        
        <div class="comparison-grid">
          <div class="comparison-card membership-card">
            <div class="comparison-icon">💎</div>
            <h3>
              <span v-show="currentLang === 'zh'">会员计划</span>
              <span v-show="currentLang === 'en'">Membership Plan</span>
            </h3>
            <ul class="comparison-features">
              <li>✓ <span v-show="currentLang === 'zh'">年度无限使用</span><span v-show="currentLang === 'en'">Unlimited annual use</span></li>
              <li>✓ <span v-show="currentLang === 'zh'">会员保险赔付服务</span><span v-show="currentLang === 'en'">Member insurance coverage service</span></li>
              <li>✓ <span v-show="currentLang === 'zh'">L2: $20,000 / L3: $50,000</span><span v-show="currentLang === 'en'">L2: $20K / L3: $50K</span></li>
              <li>✓ <span v-show="currentLang === 'zh'">VIP专属服务</span><span v-show="currentLang === 'en'">VIP exclusive services</span></li>
              <li>✓ <span v-show="currentLang === 'zh'">签证协助</span><span v-show="currentLang === 'en'">Visa assistance</span></li>
            </ul>
            <div class="comparison-suitable">
              <strong>
                <span v-show="currentLang === 'zh'">适合：</span>
                <span v-show="currentLang === 'en'">Best for:</span>
              </strong>
              <ul>
                <li><span v-show="currentLang === 'zh'">• 长期驻留</span><span v-show="currentLang === 'en'">• Long-term residency</span></li>
                <li><span v-show="currentLang === 'zh'">• 多次服务需求</span><span v-show="currentLang === 'en'">• Multiple service needs</span></li>
                <li><span v-show="currentLang === 'zh'">• 企业高管</span><span v-show="currentLang === 'en'">• Executives</span></li>
                <li><span v-show="currentLang === 'zh'">• 需要医疗责任保障</span><span v-show="currentLang === 'en'">• Need medical liability coverage</span></li>
              </ul>
            </div>
          </div>
          
          <div class="comparison-card service-card">
            <div class="comparison-icon">🏥</div>
            <h3>
              <span v-show="currentLang === 'zh'">单次预订</span>
              <span v-show="currentLang === 'en'">Single Booking</span>
            </h3>
            <ul class="comparison-features">
              <li>✓ <span v-show="currentLang === 'zh'">按需付费</span><span v-show="currentLang === 'en'">Pay as you go</span></li>
              <li>✓ <span v-show="currentLang === 'zh'">灵活无约束</span><span v-show="currentLang === 'en'">Flexible, no commitment</span></li>
              <li>✓ <span v-show="currentLang === 'zh'">一次性体验</span><span v-show="currentLang === 'en'">One-time experience</span></li>
              <li>✓ <span v-show="currentLang === 'zh'">快速预订</span><span v-show="currentLang === 'en'">Quick booking</span></li>
              <li><span v-show="currentLang === 'zh'">⚠️ 不包含企业级医疗责任赔付</span><span v-show="currentLang === 'en'">⚠️ No enterprise-level medical liability coverage</span></li>
            </ul>
            <div class="comparison-suitable">
              <strong>
                <span v-show="currentLang === 'zh'">适合：</span>
                <span v-show="currentLang === 'en'">Best for:</span>
              </strong>
              <ul>
                <li><span v-show="currentLang === 'zh'">• 短期体验</span><span v-show="currentLang === 'en'">• Short-term experience</span></li>
                <li><span v-show="currentLang === 'zh'">• 单次体检</span><span v-show="currentLang === 'en'">• Single health checkup</span></li>
                <li><span v-show="currentLang === 'zh'">• 康养度假</span><span v-show="currentLang === 'en'">• Wellness vacation</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 预订模态框 -->
    <BookingModal
      v-model="isBookingOpen"
      :service="selectedService"
      @submit="handleBookingSubmit"
    />
  </div>
</template>

<style scoped>
/* ==================== Six Senses 风格变量 ==================== */
.services-membership-page {
  --color-primary: #2C5F6E;
  --color-secondary: #C9A962;
  --color-accent: #D4AF37;
  --color-sand: #F5E6D3;
  --color-off-white: #FAF7F2;
  --color-white: #FFFFFF;
  --color-black: #1A1A1A;
  --color-stone: #6B6B6B;
  --color-border: #E0E0E0;
  
  font-family: 'Georgia', serif;
  color: var(--color-black);
}

/* ==================== Hero Section ==================== */
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

.hero-bg-wrapper {
  position: absolute;
  top: 80px; /* 从header下方开始，避免遮挡 */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 80px; /* 从header下方开始 */
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-white);
  padding: 4rem 2rem 2rem 2rem;
  max-width: 1000px;
  margin-top: 80px;
}

.hero-subtitle {
  font-size: 1.25rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-sand);
  margin-bottom: 1rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-white) !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-sand);
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Tab切换器 */
.tab-switcher {
  display: inline-flex;
  gap: 1rem;
  margin-top: 2rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--color-secondary);
  border-radius: 50px;
  color: var(--color-white);
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.tab-btn:hover {
  background: rgba(201, 169, 98, 0.2);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: var(--color-secondary);
  color: var(--color-white);
  box-shadow: 0 4px 20px rgba(201, 169, 98, 0.4);
}

.tab-icon {
  font-size: 1.5rem;
}

.tab-text {
  font-size: 1.125rem;
  font-weight: 500;
}

/* ==================== Section Header ==================== */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-stone);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
}

/* ==================== Membership Section ==================== */
.membership-section {
  padding: 6rem 0;
  background-color: var(--color-off-white);
}

.membership-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 6rem;
}

.membership-card {
  background-color: var(--color-white);
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.membership-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.membership-card.highlight {
  border-color: var(--color-secondary);
  box-shadow: 0 8px 30px rgba(201, 169, 98, 0.3);
}

.membership-badge {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  background: var(--color-white);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.membership-info h3 {
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}

.membership-suitable {
  font-size: 0.875rem;
  color: var(--color-stone);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.membership-price {
  text-align: center;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, rgba(191, 163, 122, 0.1) 100%);
  border-radius: 12px;
}

.price-amount {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-secondary);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.price-period {
  display: block;
  font-size: 0.875rem;
  color: var(--color-stone);
  margin-top: 0.5rem;
}

.membership-compensation {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(201, 169, 98, 0.05);
  border: 1px solid rgba(201, 169, 98, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.compensation-label {
  font-size: 0.875rem;
  color: var(--color-stone);
  font-weight: 500;
}

.compensation-value {
  font-size: 1rem;
  color: var(--color-primary);
  font-weight: 600;
}

.membership-features {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1; /* 让权益列表占据剩余空间 */
}

.membership-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-stone);
}

.membership-features li:last-child {
  border-bottom: none;
}

.feature-check {
  color: var(--color-secondary);
  font-weight: bold;
  flex-shrink: 0;
}

.membership-cta {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 2rem; /* 在按钮上方添加间距 */
}

/* ==================== Comparison Table ==================== */
.comparison-table-section {
  margin-bottom: 6rem;
}

.comparison-table-section h3 {
  text-align: center;
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 3rem;
}

.comparison-table {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
}

.comparison-table th,
.comparison-table td {
  padding: 1.25rem 1.5rem;
  text-align: left;
  border: 1px solid var(--color-border);
}

.comparison-table th {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: var(--color-white);
  font-weight: 600;
  font-size: 1.125rem;
  text-align: center;
}

.comparison-table th.highlight {
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%);
}

.membership-table-price {
  display: block;
  font-size: 0.875rem;
  color: var(--color-sand);
  margin-top: 0.5rem;
  font-weight: 400;
}

.comparison-table tbody tr:hover {
  background-color: rgba(201, 169, 98, 0.05);
}

.comparison-table td.has {
  color: var(--color-secondary);
  font-weight: bold;
  text-align: center;
}

.comparison-table tbody tr:first-child td {
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
}

.comparison-table tbody tr:first-child td strong {
  display: block;
  margin-bottom: 0.25rem;
}

/* ==================== Payment Methods ==================== */
.payment-methods-section {
  margin-bottom: 4rem;
}

.payment-methods-section h3 {
  text-align: center;
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 3rem;
}

.payment-methods-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.payment-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background-color: var(--color-white);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
}

.payment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--color-secondary);
}

.payment-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.payment-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 0.5rem;
}

.payment-desc {
  font-size: 0.875rem;
  color: var(--color-stone);
  line-height: 1.5;
}

.escrow-notice {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, rgba(191, 163, 122, 0.1) 100%);
  border-radius: 12px;
  border: 1px solid rgba(201, 169, 98, 0.3);
}

.escrow-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.escrow-content {
  flex-grow: 1;
}

.escrow-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 0.75rem;
}

.escrow-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-stone);
}

/* ==================== Services Section ==================== */
.services-section {
  padding: 6rem 0;
  background-color: var(--color-white);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  padding: 1rem 1.5rem;
  background-color: var(--color-off-white);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.search-icon {
  font-size: 1.25rem;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--color-black);
  outline: none;
}

.search-input::placeholder {
  color: var(--color-stone);
}

.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-label {
  font-size: 0.875rem;
  color: var(--color-stone);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-btn {
  padding: 0.625rem 1.25rem;
  background-color: var(--color-off-white);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  color: var(--color-stone);
  white-space: nowrap;
}

.filter-btn:hover {
  border-color: var(--color-secondary);
  color: var(--color-black);
}

.filter-btn.active {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
  color: var(--color-white);
}

.results-count {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.125rem;
  color: var(--color-stone);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  background-color: var(--color-white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.service-content {
  padding: 1.5rem;
}

.service-category {
  margin-bottom: 0.75rem;
}

.category-label {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(201, 169, 98, 0.1);
  color: var(--color-secondary);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.service-title {
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.service-description {
  font-size: 0.9375rem;
  color: var(--color-stone);
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.service-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 让内容占据剩余空间 */
}

/* ... 其他样式保持不变 ... */

.service-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto; /* 将按钮推到底部 */
}

.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.service-price {
  display: flex;
  flex-direction: column;
}

.price-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
}

.price-unit {
  font-size: 0.75rem;
  color: var(--color-stone);
}

.service-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-stars {
  font-size: 1rem;
}

.rating-score {
  font-weight: 600;
  color: var(--color-stone);
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-off-white);
  color: var(--color-stone);
  border-radius: 50px;
}

.service-cities {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--color-stone);
}

.cities-list {
  font-weight: 500;
  color: var(--color-primary);
}

.service-actions {
  display: flex;
  gap: 0.75rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

/* ==================== Comparison Section ==================== */
.comparison-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--color-off-white) 0%, var(--color-sand) 100%);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.comparison-card {
  background-color: var(--color-white);
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.comparison-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.comparison-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.comparison-card h3 {
  font-size: 1.75rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
}

.comparison-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.comparison-features li {
  padding: 0.75rem 0;
  font-size: 1rem;
  color: var(--color-stone);
  line-height: 1.6;
}

.comparison-suitable {
  border-top: 2px solid var(--color-border);
  padding-top: 1.5rem;
}

.comparison-suitable strong {
  display: block;
  font-size: 1rem;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}

.comparison-suitable ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-suitable li {
  padding: 0.5rem 0;
  font-size: 0.9375rem;
  color: var(--color-stone);
  line-height: 1.6;
}

/* ==================== Button Styles ==================== */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.btn-gold {
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%);
  color: var(--color-white);
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 169, 98, 0.4);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: #235566;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(44, 95, 110, 0.4);
}

/* ==================== Responsive Design ==================== */
@media (max-width: 1024px) {
  .membership-cards {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .payment-methods-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .tab-switcher {
    flex-direction: column;
    width: 100%;
  }
  
  .tab-btn {
    width: 100%;
    justify-content: center;
  }
  
  .filters-row {
    flex-direction: column;
    gap: 2rem;
  }
  
  .payment-methods-grid {
    grid-template-columns: 1fr;
  }
}
</style>