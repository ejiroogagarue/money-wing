import axios from 'axios';
import { API_BASE_URL } from '../app/constants/config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // You can add token here later when implementing secure storage
    // const token = await SecureStore.getItemAsync('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  signup: async (email: string, password: string) => {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  },

  verifyOTP: async (email: string, otpCode: string) => {
    const response = await api.post('/auth/verify-otp', { email, otpCode });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// User API calls
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },
};

// KYC API calls
export const kycAPI = {
  submitKYC: async (data: any) => {
    const response = await api.post('/kyc/submit', data);
    return response.data;
  },

  getKYCStatus: async () => {
    const response = await api.get('/kyc/status');
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error('API is not accessible');
  }
};

export default api;
