import { API_CONFIG, getApiUrl } from "../config/api";
import { User } from "../types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}
export default class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH_LOGIN);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.non_field_errors?.[0] || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH_LOGOUT);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie("csrftoken") || ""
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const data: LogoutResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH_ME);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      const data: User = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }
} 