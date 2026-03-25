/**
 * 认证 API
 * 用户注册、登录、获取用户信息
 */

import { API_BASE_URL, API_KEY } from './config';

const API_URL = API_BASE_URL;

// 用户注册
export async function register(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// 用户登录
export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// 获取用户信息
export async function getProfile(token: string) {
  const response = await fetch(`${API_URL}/api/auth/profile`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

// 更新用户信息
export async function updateProfile(token: string, data: {
  name?: string;
  phone?: string;
}) {
  const response = await fetch(`${API_URL}/api/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}