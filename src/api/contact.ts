/**
 * 联系表单 API
 */

import { API_KEY } from './config';

const API_URL = 'https://med-link.cn';

// 提交联系表单
export async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredDate?: string;
  serviceType?: string;
}) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// 提交预约申请
export async function submitApplication(data: {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  message?: string;
}) {
  const response = await fetch(`${API_URL}/api/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// 获取预约列表（需要认证）
export async function getApplications(token: string) {
  const response = await fetch(`${API_URL}/api/applications`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}