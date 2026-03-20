/**
 * 用户状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authApi from '../api/auth'
import type { User } from '../api/auth'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.username || '')
  const userEmail = computed(() => user.value?.email || '')

  /**
   * 初始化用户状态（从 token 恢复）
   */
  async function init() {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    isLoading.value = true
    const result = await authApi.getCurrentUser()
    isLoading.value = false

    if (result.success && result.data) {
      user.value = result.data
    } else {
      // token 无效，清除
      authApi.logout()
    }
  }

  /**
   * 用户登录
   */
  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    const result = await authApi.login({ email, password })
    isLoading.value = false

    if (result.success && result.data) {
      user.value = result.data.user
      return true
    } else {
      error.value = result.error?.message || '登录失败'
      return false
    }
  }

  /**
   * 用户注册
   */
  async function register(email: string, username: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    const result = await authApi.register({ email, username, password })
    isLoading.value = false

    if (result.success && result.data) {
      // 注册成功后自动登录
      return await login(email, password)
    } else {
      error.value = result.error?.message || '注册失败'
      return false
    }
  }

  /**
   * 用户登出
   */
  function logout() {
    authApi.logout()
    user.value = null
    error.value = null
  }

  /**
   * 清除错误
   */
  function clearError() {
    error.value = null
  }

  return {
    // 状态
    user,
    isLoading,
    error,
    // 计算属性
    isLoggedIn,
    userName,
    userEmail,
    // 方法
    init,
    login,
    register,
    logout,
    clearError,
  }
})