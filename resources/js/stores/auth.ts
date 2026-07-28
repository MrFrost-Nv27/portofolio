import { defineStore } from 'pinia'
import { adminApi, type AdminUser } from '@/api/admin'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AdminUser | null,
    // Whether fetchMe() has resolved at least once — the router guard uses
    // this to avoid redirecting to /admin/login before the session cookie
    // (if any) has actually been checked against the server.
    checked: false,
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null,
  },
  actions: {
    async fetchMe() {
      try {
        this.user = await adminApi.me()
      } catch {
        this.user = null
      } finally {
        this.checked = true
      }
    },
    async login(username: string, password: string) {
      this.user = await adminApi.login(username, password)
      this.checked = true
    },
    async logout() {
      try {
        await adminApi.logout()
      } finally {
        this.user = null
      }
    },
  },
})
