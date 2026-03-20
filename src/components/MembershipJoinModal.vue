<script setup lang="ts">
import { ref, computed } from 'vue'
import { currentLang } from '../composables/useLanguage'
import type { MembershipPlan } from '../api/membership'

const props = defineProps<{
  modelValue: boolean
  plan: MembershipPlan | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', plan: MembershipPlan, paymentMethod: string): void
}>()

// 支付方式
const paymentMethod = ref<'wechat' | 'alipay' | 'bank_transfer'>('wechat')

// 计算属性
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const planPrice = computed(() => {
  if (!props.plan) return '0'
  return props.plan.price.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
})

const planDuration = computed(() => {
  if (!props.plan) return ''
  const days = props.plan.duration_days
  if (days >= 365) {
    const years = days / 365
    return currentLang.value === 'zh' ? `${years}年` : `${years} year${years > 1 ? 's' : ''}`
  } else if (days >= 30) {
    const months = days / 30
    return currentLang.value === 'zh' ? `${months}个月` : `${months} month${months > 1 ? 's' : ''}`
  } else {
    return currentLang.value === 'zh' ? `${days}天` : `${days} day${days > 1 ? 's' : ''}`
  }
})

// 关闭弹窗
function close() {
  isOpen.value = false
}

// 确认加入
function confirmJoin() {
  if (props.plan) {
    emit('confirm', props.plan, paymentMethod.value)
  }
}

// 支付方式配置
const paymentMethods = [
  {
    id: 'wechat',
    name: currentLang.value === 'zh' ? '微信支付' : 'WeChat Pay',
    icon: '💚',
    color: '#07c160',
  },
  {
    id: 'alipay',
    name: currentLang.value === 'zh' ? '支付宝' : 'Alipay',
    icon: '💙',
    color: '#1677ff',
  },
  {
    id: 'bank_transfer',
    name: currentLang.value === 'zh' ? '银行转账' : 'Bank Transfer',
    icon: '🏦',
    color: '#78716c',
  },
]
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-container">
          <!-- 关闭按钮 -->
          <button class="close-btn" @click="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- 内容 -->
          <div class="modal-content">
            <!-- 标题 -->
            <div class="modal-header">
              <h2>{{ currentLang === 'zh' ? '确认加入会员' : 'Confirm Membership' }}</h2>
              <p>{{ currentLang === 'zh' ? '选择支付方式并完成支付' : 'Choose payment method and complete payment' }}</p>
            </div>

            <!-- 会员计划详情 -->
            <div v-if="plan" class="plan-summary">
              <div class="plan-name">{{ plan.name }}</div>
              <div class="plan-price">{{ planPrice }}</div>
              <div class="plan-duration">{{ planDuration }}</div>
              
              <!-- 权益列表 -->
              <div class="plan-features">
                <div v-for="(feature, index) in plan.features" :key="index" class="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>

            <!-- 支付方式选择 -->
            <div class="payment-section">
              <h3>{{ currentLang === 'zh' ? '选择支付方式' : 'Payment Method' }}</h3>
              <div class="payment-methods">
                <button
                  v-for="method in paymentMethods"
                  :key="method.id"
                  :class="['payment-option', { selected: paymentMethod === method.id }]"
                  @click="paymentMethod = method.id as any"
                >
                  <span class="payment-icon">{{ method.icon }}</span>
                  <span class="payment-name">{{ method.name }}</span>
                  <div v-if="paymentMethod === method.id" class="selected-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="modal-actions">
              <button class="btn-secondary" @click="close">
                {{ currentLang === 'zh' ? '取消' : 'Cancel' }}
              </button>
              <button class="btn-primary" @click="confirmJoin">
                {{ currentLang === 'zh' ? '确认支付' : 'Confirm Payment' }}
                <span class="btn-price">{{ planPrice }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 遮罩层 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

/* 弹窗容器 */
.modal-container {
  background: white;
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f4;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #57534e;
  transition: all 0.2s;
  z-index: 10;
}

.close-btn:hover {
  background: #e7e5e4;
  color: #1c1917;
}

/* 内容 */
.modal-content {
  padding: 2.5rem 2rem 2rem;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 0.5rem;
}

.modal-header p {
  font-size: 0.875rem;
  color: #78716c;
}

/* 会员计划摘要 */
.plan-summary {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 1px solid #10b981;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 0.5rem;
}

.plan-price {
  font-size: 2rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 0.25rem;
}

.plan-duration {
  font-size: 0.875rem;
  color: #047857;
  margin-bottom: 1rem;
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #065f46;
}

/* 支付方式 */
.payment-section {
  margin-bottom: 1.5rem;
}

.payment-section h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #44403c;
  margin-bottom: 1rem;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e7e5e4;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}

.payment-option:hover {
  border-color: #1a4d2e;
}

.payment-option.selected {
  border-color: #1a4d2e;
  background: #f0fdf4;
}

.payment-icon {
  font-size: 1.5rem;
}

.payment-name {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1c1917;
}

.selected-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1a4d2e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 操作按钮 */
.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-actions .btn-secondary {
  flex: 1;
  padding: 1rem;
  background: white;
  border: 1.5px solid #e7e5e4;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #57534e;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-actions .btn-secondary:hover {
  border-color: #d6d3d1;
  background: #fafaf9;
}

.modal-actions .btn-primary {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%);
  border: none;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-actions .btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(26, 77, 46, 0.25);
}

.btn-price {
  font-weight: 700;
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.95) translateY(10px);
}

/* 响应式 */
@media (max-width: 480px) {
  .modal-content {
    padding: 2rem 1.5rem 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal-actions .btn-primary {
    order: 1;
  }
  
  .modal-actions .btn-secondary {
    order: 2;
  }
}
</style>
