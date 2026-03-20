/**
 * 会员 API
 */

import { apiConfig } from './index'

interface MembershipPlan {
  id: number
  name: string
  description: string
  price: number
  duration_days: number
  features: string[]
}

interface JoinMembershipParams {
  planId: number
  paymentMethod: 'wechat' | 'alipay' | 'bank_transfer'
}

interface MembershipOrder {
  orderId: number
  orderNumber: string
  amount: number
  planName: string
  paymentMethod: string
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
 * 获取所有会员计划
 */
export async function getMembershipPlans(): Promise<ApiResponse<MembershipPlan[]>> {
  return request<MembershipPlan[]>('/api/membership/plans')
}

/**
 * 加入会员（创建订单）
 */
export async function joinMembership(params: JoinMembershipParams): Promise<ApiResponse<MembershipOrder>> {
  return request<MembershipOrder>('/api/membership/join', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * 查询订单状态
 */
export async function getOrderStatus(orderId: number): Promise<ApiResponse<MembershipOrder & { status: string }>> {
  return request<MembershipOrder & { status: string }>(`/api/membership/orders/${orderId}`)
}

/**
 * 获取当前用户会员状态
 */
export async function getMyMembership(): Promise<ApiResponse<MembershipPlan & { 
  start_date: string
  end_date: string
  status: string
} | null>> {
  return request<MembershipPlan & { 
    start_date: string
    end_date: string
    status: string
  } | null>('/api/membership/my')
}

export type { MembershipPlan, MembershipOrder, JoinMembershipParams }
