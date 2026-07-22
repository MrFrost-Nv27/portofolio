import { apiClient } from './client'
import type { ContactRequest, Profile, Project, SkillCategory } from '@/types'

export const publicApi = {
  getProfile: () => apiClient.get<Profile>('/api/profile'),
  getSkills: () => apiClient.get<SkillCategory[]>('/api/skills'),
  getProjects: (category?: string) =>
    apiClient.get<Project[]>(`/api/projects${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getProject: (id: number) => apiClient.get<Project>(`/api/projects/${id}`),
  submitContact: (payload: ContactRequest) => apiClient.post<{ id: number }>('/api/contact', payload),
}
