import { defineStore } from 'pinia'

const STORAGE_KEY = 'theme'

function applyClass(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: (localStorage.getItem(STORAGE_KEY) || 'light') === 'dark',
  }),
  actions: {
    init() {
      applyClass(this.isDark)
    },
    toggle() {
      this.isDark = !this.isDark
      localStorage.setItem(STORAGE_KEY, this.isDark ? 'dark' : 'light')
      applyClass(this.isDark)
    },
  },
})
