// lib/apiClient.ts
import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiClientOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
}

class ApiClient {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const token = await user.getIdToken();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async request(endpoint: string, options: ApiClientOptions = {}) {
    const { method = 'GET', body, headers = {}, requireAuth = true } = options;

    const url = `${API_BASE_URL}${endpoint}`;

    let finalHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (requireAuth) {
      const authHeaders = await this.getAuthHeaders();
      finalHeaders = { ...finalHeaders, ...authHeaders };
    }

    const config: RequestInit = {
      method,
      headers: finalHeaders,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  // Convenience methods
  async get(endpoint: string, requireAuth = true) {
    return this.request(endpoint, { method: 'GET', requireAuth });
  }

  async post(endpoint: string, body: any, requireAuth = true) {
    return this.request(endpoint, { method: 'POST', body, requireAuth });
  }

  async put(endpoint: string, body: any, requireAuth = true) {
    return this.request(endpoint, { method: 'PUT', body, requireAuth });
  }

  async delete(endpoint: string, requireAuth = true) {
    return this.request(endpoint, { method: 'DELETE', requireAuth });
  }
}

export const apiClient = new ApiClient();
