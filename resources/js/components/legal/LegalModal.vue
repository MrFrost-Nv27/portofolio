<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface LegalSection {
  title: string
  body?: string
  items?: string[]
}
interface LegalContent {
  title: string
  updated: string
  effective: string
  intro: string
  sections: LegalSection[]
}

const props = defineProps<{ type: 'privacy' | 'terms' }>()
const open = defineModel<boolean>('open', { default: false })

const { tm } = useI18n()

// tm() returns the raw (non-interpolated) message tree — safe here because
// this content is entirely static, authored in our own locale JSON files,
// never derived from user input.
const data = computed(() => tm(`legal.${props.type}`) as unknown as LegalContent)
</script>

<template>
  <UModal v-model:open="open" :title="data?.title" :ui="{ content: 'sm:max-w-2xl' }">
    <template #body>
      <div v-if="data" class="space-y-5 text-sm text-[var(--txt-2)]">
        <div class="flex flex-wrap gap-4 text-xs text-[var(--txt-3)]">
          <span class="flex items-center gap-1"><UIcon name="i-lucide-calendar" class="size-3.5" /> {{ data.updated }}</span>
          <span class="flex items-center gap-1"><UIcon name="i-lucide-check-circle" class="size-3.5" /> {{ data.effective }}</span>
        </div>
        <div class="rounded-[var(--r-sm)] bg-[var(--glass)] p-4" v-html="data.intro" />

        <div v-for="(section, i) in data.sections" :key="section.title" class="space-y-2">
          <h3 class="flex items-center gap-2 font-semibold text-[var(--txt)]">
            <span class="grid size-6 place-items-center rounded-full bg-[var(--primary)] text-xs text-white">{{ i + 1 }}</span>
            {{ section.title }}
          </h3>
          <p v-if="section.body" v-html="section.body" />
          <ul v-if="section.items?.length" class="list-disc space-y-1 pl-5">
            <li v-for="item in section.items" :key="item" v-html="item" />
          </ul>
        </div>
      </div>
    </template>
  </UModal>
</template>
