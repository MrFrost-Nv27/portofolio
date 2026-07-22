<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SkillCategory } from '@/types'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useTilt3D } from '@/composables/useTilt3D'

const props = defineProps<{ category: SkillCategory }>()
const { locale } = useI18n()

const name = computed(() => (locale.value === 'en' ? props.category.name_en : props.category.name_id))

// Full literal Tailwind class strings — the build-time scanner can't see
// classes assembled via template-literal interpolation, so each variant's
// hover classes must appear verbatim here.
const categoryStyle = computed(() => {
  const key = props.category.name_id.toLowerCase()
  if (key.includes('frontend'))
    return { icon: 'i-lucide-monitor', grad: 'var(--grad)', chipHover: 'hover:border-primary hover:text-primary' }
  if (key.includes('backend'))
    return { icon: 'i-lucide-server', grad: 'var(--grad-warm)', chipHover: 'hover:border-secondary hover:text-secondary' }
  if (key.includes('artificial') || key.includes('ai'))
    return { icon: 'i-lucide-brain', grad: 'linear-gradient(135deg, var(--tertiary), var(--primary))', chipHover: 'hover:border-tertiary hover:text-tertiary' }
  return { icon: 'i-lucide-database', grad: 'linear-gradient(135deg, var(--warm), var(--secondary))', chipHover: 'hover:border-warm hover:text-warm' }
})

const cardEl = ref<HTMLElement | null>(null)
const { visible } = useScrollReveal(undefined, cardEl)
const { style: tiltStyle, onMouseMove, onMouseLeave } = useTilt3D({ max: 6, scale: 1.02 }, cardEl)
</script>

<template>
  <div
    ref="cardEl"
    class="glass-card rounded-[var(--r)] p-6 transition-all duration-300 will-change-transform"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    :style="tiltStyle"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="mb-4 grid size-11 place-items-center rounded-xl text-white" :style="{ backgroundImage: categoryStyle.grad }">
      <UIcon :name="categoryStyle.icon" class="size-5" />
    </div>
    <h3 class="text-lg font-semibold text-[var(--txt)]">{{ name }}</h3>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="chip in category.chips"
        :key="chip.id"
        class="rounded-full border border-[var(--glass-b)] bg-[var(--glass)] px-3 py-1 text-xs font-medium text-[var(--txt-2)] transition"
        :class="categoryStyle.chipHover"
      >
        {{ chip.label }}
      </span>
    </div>
  </div>
</template>
