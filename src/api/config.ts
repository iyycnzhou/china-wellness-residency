/**
 * API 配置
 * 
 * 本地开发时使用本地 API，生产环境使用云端 API
 */

// API 基础 URL
export const API_BASE_URL = import.meta.env.PROD 
  ? '' // 生产环境使用相对路径（同域名）
  : (import.meta.env.VITE_API_URL || 'http://localhost:3000'); // 本地开发使用本地 API

// API Key
export const API_KEY = 'medlink-prod-key-2026';

// 请求头
export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
});

// 带认证的请求头
export const getAuthHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
  'Authorization': `Bearer ${token}`,
});

// API 请求封装
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.message || '请求失败');
  }
  
  return data;
}

// 带认证的 API 请求
export async function authRequest<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeaders(token),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.message || '请求失败');
  }
  
  return data;
}