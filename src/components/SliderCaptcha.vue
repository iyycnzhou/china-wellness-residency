<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { currentLang } from '../composables/useLanguage'

// ==================== Props & Emits ====================
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'success'): void
  (e: 'close'): void
}>()

// ==================== State ====================
const sliderPosition = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const isVerified = ref(false)
const sliderWidth = ref(280) // 滑块容器宽度
const blockSize = ref(40) // 滑块大小

// 随机生成的拼图位置
const puzzleX = ref(0)
const puzzleY = ref(0)

// 图片背景位置
const bgImageX = ref(0)
const bgImageY = ref(0)

// ==================== Computed ====================
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// 滑块样式
const sliderStyle = computed(() => ({
  transform: `translateX(${sliderPosition.value}px)`,
}))

// 拼图块位置
const puzzleStyle = computed(() => ({
  left: `${sliderPosition.value}px`,
  top: `${puzzleY.value}px`,
}))

// 目标缺口位置
const targetStyle = computed(() => ({
  left: `${puzzleX.value}px`,
  top: `${puzzleY.value}px`,
}))

// 验证状态文字
const statusText = computed(() => {
  if (isVerified.value) {
    return currentLang.value === 'zh' ? '验证成功！' : 'Verified!'
  }
  return currentLang.value === 'zh' ? '向右滑动完成验证' : 'Slide right to verify'
})

// ==================== Methods ====================
function resetCaptcha() {
  sliderPosition.value = 0
  isDragging.value = false
  isVerified.value = false
  
  // 随机生成拼图位置
  puzzleX.value = Math.random() * (sliderWidth.value - blockSize.value - 50) + 50
  puzzleY.value = Math.random() * 100 + 40
  
  // 随机背景偏移
  bgImageX.value = Math.random() * 100
  bgImageY.value = Math.random() * 100
}

function handleMouseDown(e: MouseEvent) {
  if (isVerified.value) return
  isDragging.value = true
  startX.value = e.clientX - sliderPosition.value
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value || isVerified.value) return
  
  const newPosition = e.clientX - startX.value
  sliderPosition.value = Math.max(0, Math.min(newPosition, sliderWidth.value - blockSize.value))
}

function handleMouseUp() {
  if (!isDragging.value || isVerified.value) return
  isDragging.value = false
  
  // 检查是否验证成功（允许5px误差）
  const tolerance = 5
  if (Math.abs(sliderPosition.value - puzzleX.value) < tolerance) {
    isVerified.value = true
    setTimeout(() => {
      emit('success')
      close()
    }, 500)
  } else {
    // 验证失败，重置
    setTimeout(() => {
      resetCaptcha()
    }, 300)
  }
}

function handleTouchStart(e: TouchEvent) {
  if (isVerified.value) return
  isDragging.value = true
  startX.value = e.touches[0].clientX - sliderPosition.value
}

function handleTouchMove(e: TouchEvent) {
  if (!isDragging.value || isVerified.value) return
  
  const newPosition = e.touches[0].clientX - startX.value
  sliderPosition.value = Math.max(0, Math.min(newPosition, sliderWidth.value - blockSize.value))
}

function handleTouchEnd() {
  handleMouseUp()
}

function close() {
  isOpen.value = false
  setTimeout(resetCaptcha, 300)
}

// ==================== Lifecycle ====================
onMounted(() => {
  resetCaptcha()
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="captcha-fade">
      <div v-if="isOpen" class="captcha-overlay" @click.self="close">
        <div class="captcha-container">
          <!-- 关闭按钮 -->
          <button class="close-btn" @click="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- 标题 -->
          <div class="captcha-header">
            <h3>{{ currentLang === 'zh' ? '安全验证' : 'Security Verification' }}</h3>
            <p>{{ currentLang === 'zh' ? '请完成下方验证以继续' : 'Please complete the verification below' }}</p>
          </div>

          <!-- 拼图区域 -->
          <div class="captcha-puzzle">
            <!-- 背景图 -->
            <div class="puzzle-bg">
              <div class="bg-pattern" :style="{ backgroundPosition: `-${bgImageX}px -${bgImageY}px` }"></div>
              
              <!-- 目标缺口 -->
              <div class="puzzle-target" :style="targetStyle">
                <svg viewBox="0 0 40 40" class="puzzle-shape">
                  <path d="M0,0 L40,0 L40,40 L0,40 Z" fill="rgba(0,0,0,0.5)" />
                </svg>
              </div>
              
              <!-- 滑动的拼图块 -->
              <div class="puzzle-block" :style="puzzleStyle">
                <svg viewBox="0 0 40 40" class="puzzle-shape filled">
                  <path d="M0,0 L40,0 L40,40 L0,40 Z" fill="url(#puzzleGradient)" />
                  <defs>
                    <linearGradient id="puzzleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#2C5F6E;stop-opacity:0.9" />
                      <stop offset="100%" style="stop-color:#3a7a8c;stop-opacity:0.9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- 滑块区域 -->
          <div class="captcha-slider" :class="{ verified: isVerified, dragging: isDragging }">
            <div class="slider-track">
              <div class="slider-fill" :style="{ width: `${sliderPosition + blockSize}px` }"></div>
            </div>
            <div 
              class="slider-handle"
              :style="sliderStyle"
              @mousedown="handleMouseDown"
              @touchstart="handleTouchStart"
            >
              <span v-if="!isVerified">⟩⟩</span>
              <span v-else>✓</span>
            </div>
            <span class="slider-hint" v-if="!isVerified && sliderPosition === 0">
              {{ currentLang === 'zh' ? '向右拖动滑块' : 'Drag the slider' }}
            </span>
          </div>

          <!-- 状态提示 -->
          <div class="captcha-status" :class="{ success: isVerified }">
            {{ statusText }}
          </div>

          <!-- 刷新按钮 -->
          <button class="refresh-btn" @click="resetCaptcha" v-if="!isVerified">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            {{ currentLang === 'zh' ? '换一张' : 'Refresh' }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.captcha-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 1rem;
}

.captcha-container {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 320px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f5f5f4;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #78716c;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e7e5e4;
  color: #1c1917;
}

.captcha-header {
  text-align: center;
  margin-bottom: 1rem;
}

.captcha-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 0.25rem;
}

.captcha-header p {
  font-size: 0.75rem;
  color: #78716c;
}

/* 拼图区域 */
.captcha-puzzle {
  margin-bottom: 1rem;
}

.puzzle-bg {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.bg-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(45deg, #2C5F6E 25%, transparent 25%),
    linear-gradient(-45deg, #2C5F6E 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #2C5F6E 75%),
    linear-gradient(-45deg, transparent 75%, #2C5F6E 75%);
  background-size: 20px 20px;
  opacity: 0.1;
}

.puzzle-target {
  position: absolute;
  width: 40px;
  height: 40px;
}

.puzzle-block {
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 10;
}

.puzzle-shape {
  width: 100%;
  height: 100%;
}

/* 滑块 */
.captcha-slider {
  position: relative;
  height: 48px;
  background: #f5f5f4;
  border-radius: 24px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.slider-track {
  position: absolute;
  inset: 4px;
  background: #e7e5e4;
  border-radius: 20px;
}

.slider-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #2C5F6E 0%, #3a7a8c 100%);
  border-radius: 20px;
  transition: width 0.1s;
}

.slider-handle {
  position: absolute;
  left: 4px;
  top: 4px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  font-size: 1rem;
  color: #2C5F6E;
  user-select: none;
  transition: box-shadow 0.2s;
}

.slider-handle:active {
  cursor: grabbing;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.captcha-slider.verified .slider-handle {
  background: #065f46;
  color: white;
}

.slider-hint {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8125rem;
  color: #a8a29e;
  pointer-events: none;
}

/* 状态提示 */
.captcha-status {
  text-align: center;
  font-size: 0.8125rem;
  color: #78716c;
  margin-bottom: 0.75rem;
}

.captcha-status.success {
  color: #065f46;
  font-weight: 500;
}

/* 刷新按钮 */
.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #78716c;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: #fafaf9;
  border-color: #d6d3d1;
}

/* 动画 */
.captcha-fade-enter-active,
.captcha-fade-leave-active {
  transition: all 0.3s ease;
}

.captcha-fade-enter-from,
.captcha-fade-leave-to {
  opacity: 0;
}

.captcha-fade-enter-from .captcha-container,
.captcha-fade-leave-to .captcha-container {
  transform: scale(0.95);
}
</style>