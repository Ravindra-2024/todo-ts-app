import axios from 'axios';
import { RegisterRequest, LoginRequest, AuthResponse, User, ApiResponse } from '../types/auth';

const API_BASE_URL = 'http://localhost:5000/api';

const authService = {
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<ApiResponse<AuthResponse>>(`${API_BASE_URL}/auth/register`, userData);
      return response.data.data!;
    } catch (error: any) {
      console.error('Error registering user:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<ApiResponse<AuthResponse>>(`${API_BASE_URL}/auth/login`, loginData);
      return response.data.data!;
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async getCurrentUser(token: string): Promise<User> {
    try {
      const response = await axios.get<ApiResponse<User>>(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data!;
    } catch (error: any) {
      console.error('Error fetching current user:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // Helper function to set auth token in localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  // Helper function to get auth token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  // Helper function to remove auth token from localStorage
  removeToken(): void {
    localStorage.removeItem('token');
  },

  // Helper function to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

export default authService; 