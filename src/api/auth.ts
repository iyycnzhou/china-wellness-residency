/**
 * 认证 API
 */

import { apiConfig } from './index'

interface RegisterParams {
  email: string
  username: string
  password: string
}

interface LoginParams {
  email: string
  password: string
}

interface User {
  id: number
  email: string
  username: string
  avatarUrl?: string
  bio?: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

/**
 * 发起 API 请求
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${apiConfig.baseURL}${endpoint}`
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // 添加认证 token
  const token = localStorage.getItem('accessToken')
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || { code: 'UNKNOWN', message: '请求失败' },
      }
    }

    return {
      success: true,
      data: data.data,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : '网络错误',
      },
    }
  }
}

/**
 * 用户注册
 */
export async function register(params: RegisterParams): Promise<ApiResponse<User>> {
  return request<User>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * 用户登录
 */
export async function login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
  const result = await request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(params),
  })

  // 登录成功后保存 token
  if (result.success && result.data) {
    localStorage.setItem('accessToken', result.data.accessToken)
    localStorage.setItem('refreshToken', result.data.refreshToken)
  }

  return result
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser(): Promise<ApiResponse<User & { membership?: unknown }>> {
  return request<User & { membership?: unknown }>('/api/auth/me')
}

/**
 * 刷新 Token
 */
export async function refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
  const refreshTokenValue = localStorage.getItem('refreshToken')
  
  if (!refreshTokenValue) {
    return {
      success: false,
      error: { code: 'NO_REFRESH_TOKEN', message: '没有刷新令牌' },
    }
  }

  const result = await request<{ accessToken: string }>('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken: refreshTokenValue }),
  })

  // 更新 access token
  if (result.success && result.data) {
    localStorage.setItem('accessToken', result.data.accessToken)
  }

  return result
}

/**
 * 登出
 */
export function logout(): void {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export type { User, LoginResponse, ApiResponse }