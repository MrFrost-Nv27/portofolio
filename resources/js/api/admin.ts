import { apiClient } from './client'

export interface AdminUser {
  id: number
  username: string
}

export const adminApi = {
  login: (username: string, password: string) =>
    apiClient.post<AdminUser>('/api/admin/login', { username, password }),
  logout: () => apiClient.post<void>('/api/admin/logout'),
  me: () => apiClient.get<AdminUser>('/api/admin/me'),
}
