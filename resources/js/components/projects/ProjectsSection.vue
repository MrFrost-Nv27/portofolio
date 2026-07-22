<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useContentStore } from '@/stores/content'
import { publicApi } from '@/api/public'
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

async function openProject(p: Project) {
  // The list endpoint omits gallery images to keep the grid payload small
  // (see internal/httpapi ListProjects) — fetch the full detail so the
  // modal's carousel actually has screenshots to show.
  selected.value = p
  modalOpen.value = true
  try {
    selected.value = await publicApi.getProject(p.id)
  } catch {
    // keep the list-item fallback (no gallery) if the detail fetch fails
  }
}
</script>

<template>
  <section id="projects" class="py-28" aria-labelledby="projects-heading">
    <div class="mx-auto max-w-[1180px] px-7">
      <div class="mb-10 text-center">
        <span class="text-sm font-semibold tracking-wide text-primary uppercase">{{ t('projects.tag') }}</span>
        <h2 id="projects-heading" class="mt-2 text-3xl font-bold sm:text-4xl">
          {{ t('projects.title') }}
          <span class="grad-text">{{ t('projects.titleHl') }}</span>
        </h2>
      </div>

      <div class="mb-10 flex flex-wrap justify-center gap-2">
        <button
          v-for="f in filters"
          :key="f.key"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
          :class="
            activeFilter === f.key
              ? 'text-white shadow-[var(--glow)]'
              : 'glass-card text-[var(--txt-2)] hover:text-primary'
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
