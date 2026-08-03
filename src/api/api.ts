import axios from 'axios';
import { tokenStorage } from '@/lib/token-storage';

export const api = axios.create({
  baseURL: 'https://deskly-back-api-deskly.xqmbls.easypanel.host',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
