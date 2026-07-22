import { defineStore } from 'pinia'
import { publicApi } from '@/api/public'
import type { Profile, Project, SkillCategory } from '@/types'

export const useContentStore = defineStore('content', {
  state: () => ({
    profile: null as Profile | null,
    skillCategories: [] as SkillCategory[],
    projects: [] as Project[],
    loading: false,
    error: null as string | null,
    loaded: false,
  }),
  actions: {
    async fetchAll() {
      if (this.loaded) return
      this.loading = true
      this.error = null
      try {
        const [profile, skillCategories, projects] = await Promise.all([
          publicApi.getProfile(),
          publicApi.getSkills(),
          publicApi.getProjects(),
        ])
        this.profile = profile
        this.skillCategories = skillCategories
        this.projects = projects
        this.loaded = true
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load content'
      } finally {
        this.loading = false
      }
    },
  },
})
