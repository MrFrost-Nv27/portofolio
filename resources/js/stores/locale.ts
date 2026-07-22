import { defineStore } from 'pinia'
import { i18n } from '@/i18n'
import type { Locale } from '@/i18n'

const STORAGE_KEY = 'lang'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    current: (localStorage.getItem(STORAGE_KEY) as Locale) || 'id',
  }),
  actions: {
    init() {
      document.documentElement.setAttribute('data-lang', this.current)
      document.documentElement.setAttribute('lang', this.current === 'en' ? 'en' : 'id')
    },
    set(locale: Locale) {
      this.current = locale
      localStorage.setItem(STORAGE_KEY, locale)
      i18n.global.locale.value = locale
      document.documentElement.setAttribute('data-lang', locale)
      document.documentElement.setAttribute('lang', locale === 'en' ? 'en' : 'id')
    },
    toggle() {
      this.set(this.current === 'en' ? 'id' : 'en')
    },
  },
})
