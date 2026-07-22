<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useContentStore } from '@/stores/content'
import type { Project } from '@/types'
import { categoryKey } from '@/utils/projectCategory'
import ProjectCard from './ProjectCard.vue'
import ProjectDetailModal from './ProjectDetailModal.vue'

const { t } = useI18n()
const content = useContentStore()

const filters = [
  { key: 'all', label: 'filter.all' },
  { key: 'web', label: 'filter.web' },
  { key: 'mobile', label: 'filter.mobile' },
  { key: 'ai', label: 'filter.ai' },
] as const

const activeFilter = ref<'all' | 'web' | 'mobile' | 'ai'>('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return content.projects
  return content.projects.filter((p) => categoryKey(p.category) === activeFilter.value)
})

const selected = ref<Project | null>(null)
const modalOpen = ref(false)

function openProject(p: Project) {
  selected.value = p
  modalOpen.value = true
}
</script>

<template>
  <section id="projects" class="py-28" aria-labelledby="projects-heading">
    <div class="mx-auto max-w-[1180px] px-7">
      <div class="mb-10 text-center">
        <span class="text-sm font-semibold tracking-wide text-[var(--primary)] uppercase">{{ t('projects.tag') }}</span>
        <h2 id="projects-heading" class="mt-2 text-3xl font-bold sm:text-4xl">
          {{ t('projects.title') }}
          <span class="bg-clip-text text-transparent" style="background-image: var(--grad-text)">{{ t('projects.titleHl') }}</span>
        </h2>
      </div>

      <div class="mb-10 flex flex-wrap justify-center gap-2">
        <button
          v-for="f in filters"
          :key="f.key"
          class="rounded-full border px-4 py-1.5 text-sm font-medium transition"
          :class="
            activeFilter === f.key
              ? 'border-transparent text-white'
              : 'border-[var(--glass-b)] text-[var(--txt-2)] hover:border-[var(--primary)]'
          "
          :style="activeFilter === f.key ? { backgroundImage: 'var(--grad)' } : {}"
          @click="activeFilter = f.key"
        >
          {{ t(f.label) }}
        </button>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="(p, i) in filteredProjects"
          :key="p.id"
          :project="p"
          :index="i"
          @open="openProject(p)"
        />
      </div>

      <p class="mt-10 text-center text-sm text-[var(--txt-3)]">{{ t('projects.note') }}</p>
    </div>

    <ProjectDetailModal v-model:open="modalOpen" :project="selected" />
  </section>
</template>
