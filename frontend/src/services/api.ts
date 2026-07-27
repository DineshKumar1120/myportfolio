import axios from 'axios';
import { PublicPortfolioData } from '../types';

// Dynamic API URL detection: Uses local backend on localhost, or environment / cloud URL in production
const isLocal =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (isLocal
    ? 'http://localhost:5001/api'
    : 'https://portfolio-backend.onrender.com/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchPublicPortfolioData = async (): Promise<PublicPortfolioData> => {
  try {
    const res = await api.get('/public/all');
    if (res.data.success) {
      return res.data.data;
    }
    throw new Error(res.data.message || 'Failed to fetch portfolio data');
  } catch (error) {
    console.error('Error fetching public portfolio data:', error);
    throw error;
  }
};

export const fetchQRCode = async (url?: string): Promise<string> => {
  try {
    const res = await api.get('/qrcode', { params: { url } });
    return res.data.qrCode || '';
  } catch (error) {
    console.error('Error generating QR code:', error);
    return '';
  }
};

export const submitContactForm = async (formData: { name: string; email: string; phone?: string; subject: string; message: string }) => {
  const res = await api.post('/contact', formData);
  return res.data;
};

export const uploadMediaFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.fileUrl;
};

export default api;
