<script setup lang="ts">
import { currentLang } from '../composables/useLanguage'

const currentYear = new Date().getFullYear()

const footerLinks = {
  programs: [
    { name: '基础康养驻留', nameEn: 'Basic Wellness Residency', path: '/membership#basic' },
    { name: '医疗康养驻留', nameEn: 'Medical Wellness Residency', path: '/membership#medical' },
    { name: '高端医疗会员', nameEn: 'Premium Medical Residency', path: '/membership#premium' },
  ],
  company: [
    { name: '关于我们', nameEn: 'About Us', path: '/about' },
    { name: '康养资源', nameEn: 'Wellness Destinations', path: '/destinations' },
  ],
  support: [
    { name: '预约咨询', nameEn: 'Book a Consultation', path: '/contact' },
    { name: '联系我们', nameEn: 'Contact Us', path: '/contact' },
  ],
}

const socialLinks = [
  { name: 'WeChat', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'LinkedIn', url: '#' },
  { name: 'Facebook', url: '#' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <!-- 品牌区域 -->
          <div class="footer-brand">
            <h3>
              <span v-show="currentLang === 'zh'" class="footer-brand-cn">中国全球健康驻留权益网络</span>
              <span v-show="currentLang === 'en'" class="footer-brand-en">China Wellness Residency Benefits Network</span>
            </h3>
            <p class="footer-tagline">
              <span v-show="currentLang === 'zh'">在中国，遇见更长的生命</span>
              <span v-show="currentLang === 'en'">Discover Longer Life in China</span>
            </p>
          </div>

          <!-- 会员计划 -->
          <div class="footer-section">
            <h4 class="footer-heading">
              <span v-show="currentLang === 'zh'">会员计划</span>
              <span v-show="currentLang === 'en'">Programs</span>
            </h4>
            <ul class="footer-links">
              <li v-for="link in footerLinks.programs" :key="link.path">
                <router-link :to="link.path">
                  <span v-show="currentLang === 'zh'">{{ link.name }}</span>
                  <span v-show="currentLang === 'en'">{{ link.nameEn }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- 公司 -->
          <div class="footer-section">
            <h4 class="footer-heading">
              <span v-show="currentLang === 'zh'">关于</span>
              <span v-show="currentLang === 'en'">Company</span>
            </h4>
            <ul class="footer-links">
              <li v-for="link in footerLinks.company" :key="link.path">
                <router-link :to="link.path">
                  <span v-show="currentLang === 'zh'">{{ link.name }}</span>
                  <span v-show="currentLang === 'en'">{{ link.nameEn }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- 支持 -->
          <div class="footer-section">
            <h4 class="footer-heading">
              <span v-show="currentLang === 'zh'">支持</span>
              <span v-show="currentLang === 'en'">Support</span>
            </h4>
            <ul class="footer-links">
              <li v-for="link in footerLinks.support" :key="link.path">
                <router-link :to="link.path">
                  <span v-show="currentLang === 'zh'">{{ link.name }}</span>
                  <span v-show="currentLang === 'en'">{{ link.nameEn }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- 联系方式 -->
          <div class="footer-section footer-contact">
            <h4 class="footer-heading">
              <span v-show="currentLang === 'zh'">联系我们</span>
              <span v-show="currentLang === 'en'">Contact</span>
            </h4>
            <div class="contact-details">
              <p class="contact-item">
                <span class="icon">📧</span>
                concierge@chinawellnessresidency.com
              </p>
              <p class="contact-item">
                <span class="icon">📞</span>
                +86-XXX-XXXX-XXXX
              </p>
              <div class="social-links">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url"
                  class="social-link"
                >
                  {{ social.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p class="copyright">
            © {{ currentYear }} China Wellness Residency Benefits Network. All rights reserved.
          </p>
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.footer-top {
  padding: 5rem 0 3rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
  gap: 3rem;
}

.footer-brand {
  padding-right: 2rem;
}

.footer-brand-cn {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: var(--color-white);
}

.footer-brand-en {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
}

.footer-tagline {
  font-size: 1rem;
  color: var(--color-white);
  margin-bottom: 0.25rem;
}

.footer-tagline-en {
  font-size: 0.875rem;
  color: var(--color-stone);
}

.footer-heading {
  margin-bottom: 1.5rem;
}

.heading-cn {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
}

.heading-en {
  display: block;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-secondary);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin: 0.75rem 0;
}

.footer-links a {
  display: block;
  color: var(--color-stone);
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--color-white);
}

.link-cn {
  display: block;
  font-size: 0.9375rem;
}

.link-en {
  display: block;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-stone);
}

.footer-contact .contact-details {
  color: var(--color-stone);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  font-size: 0.9375rem;
}

.contact-item .icon {
  font-size: 1rem;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-stone);
  transition: color 0.2s ease;
}

.social-link:hover {
  color: var(--color-secondary);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 0.8125rem;
  color: var(--color-stone);
}

.legal-links {
  display: flex;
  gap: 2rem;
}

.legal-links a {
  font-size: 0.8125rem;
  color: var(--color-stone);
  transition: color 0.2s ease;
}

.legal-links a:hover {
  color: var(--color-white);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .footer-brand {
    grid-column: 1 / -1;
    padding-right: 0;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .legal-links {
    justify-content: center;
  }
}
</style>
