import { createI18n } from 'vue-i18n'
import id from './locales/id.json'
import en from './locales/en.json'

export type Locale = 'id' | 'en'

export const i18n = createI18n({
  legacy: false,
  locale: (localStorage.getItem('lang') as Locale) || 'id',
  fallbackLocale: 'id',
  messages: { id, en },
  // A handful of chrome strings (stat labels, footer credit, legal text)
  // intentionally contain static, self-authored HTML — same trust model as
  // the legacy site's data-i18n-html usage. Silence the otherwise-correct
  // XSS warning for that known-safe case.
  warnHtmlMessage: false,
})
