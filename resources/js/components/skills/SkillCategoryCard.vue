<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SkillCategory } from '@/types'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps<{ category: SkillCategory }>()
const { locale } = useI18n()

const name = computed(() => (locale.value === 'en' ? props.category.name_en : props.category.name_id))

const icon = computed(() => {
  const key = props.category.name_id.toLowerCase()
  if (key.includes('frontend')) return 'i-lucide-monitor'
  if (key.includes('backend')) return 'i-lucide-server'
  if (key.includes('artificial') || key.includes('ai')) return 'i-lucide-brain'
  return 'i-lucide-database'
})

const { target, visible } = useScrollReveal()
</script>

<template>
  <div
    ref="target"
    class="rounded-[var(--r)] border border-[var(--glass-b)] bg-[var(--bg-card)] p-6 transition-all duration-700"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
  >
    <div class="mb-4 grid size-11 place-items-center rounded-xl text-white" style="background-image: var(--grad)">
      <UIcon :name="icon" class="size-5" />
    </div>
    <h3 class="text-lg font-semibold text-[var(--txt)]">{{ name }}</h3>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="chip in category.chips"
        :key="chip.id"
        class="rounded-full border border-[var(--glass-b)] bg-[var(--glass)] px-3 py-1 text-xs font-medium text-[var(--txt-2)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        {{ chip.label }}
      </span>
    </div>
  </div>
</template>
