import axios, { InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://www.pre-onboarding-selection-task.shop/';

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
