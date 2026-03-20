/**
 * 联系我们 API
 */

import { apiConfig } from './index'

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  clientType?: string
  services?: string[]
  arrivalDate?: string
  duration?: string
  budgetRange?: string
  specialRequirements?: string
  source?: string
  message?: string
}

interface SubmitInquiryResponse {
  inquiryNumber: string
  status: string
  createdAt: string
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
 * 提交预约咨询申请
 */
export async function submitInquiry(formData: ContactFormData): Promise<ApiResponse<SubmitInquiryResponse>> {
  const url = `${apiConfig.baseURL}/api/contact/inquiries`
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || { code: 'UNKNOWN', message: '提交失败' },
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

export type { ContactFormData, SubmitInquiryResponse }