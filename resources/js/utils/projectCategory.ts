export type CategoryKey = 'web' | 'mobile' | 'ai'

const CATEGORY_STYLE: Record<CategoryKey, { icon: string }> = {
  web: { icon: 'i-lucide-globe' },
  mobile: { icon: 'i-lucide-smartphone' },
  ai: { icon: 'i-lucide-brain' },
}

export const PROJECT_COLORS = [
  '#6c63ff', '#00d4ff', '#ff6b6b', '#ffd93d', '#a29bfe',
  '#55efc4', '#fd79a8', '#e17055', '#00cec9', '#74b9ff',
]

export function categoryKey(category: string): CategoryKey {
  if (/web/i.test(category)) return 'web'
  if (/mobile/i.test(category)) return 'mobile'
  if (/ai/i.test(category)) return 'ai'
  return 'web'
}

export function categoryIcon(category: string): string {
  return CATEGORY_STYLE[categoryKey(category)].icon
}

export function projectColor(index: number): string {
  return PROJECT_COLORS[index % PROJECT_COLORS.length]
}
