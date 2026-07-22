<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '@/types'
import { categoryIcon, projectColor } from '@/utils/projectCategory'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useTilt3D } from '@/composables/useTilt3D'

const props = defineProps<{ project: Project; index: number }>()
const emit = defineEmits<{ open: [] }>()

const { locale } = useI18n()
const title = computed(() => (locale.value === 'en' ? props.project.title_en : props.project.title_id))
const description = computed(() => (locale.value === 'en' ? props.project.description_en : props.project.description_id))
const color = computed(() => projectColor(props.index))
const icon = computed(() => categoryIcon(props.project.category))

const cardEl = ref<HTMLElement | null>(null)
const { visible } = useScrollReveal(undefined, cardEl)
const { style: tiltStyle, onMouseMove, onMouseLeave } = useTilt3D({ max: 5, scale: 1.015 }, cardEl)
</script>

<template>
  <article
    ref="cardEl"
    class="glass-card group cursor-pointer overflow-hidden rounded-[var(--r)] transition-all duration-300 will-change-transform hover:[box-shadow:0_0_0_1.5px_var(--card-color),0_20px_45px_-15px_var(--card-color)]"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    :style="{ ...tiltStyle, '--card-color': color }"
    role="button"
    tabindex="0"
    :aria-label="`Open project details: ${title}`"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="emit('open')"
    @keydown.enter.prevent="emit('open')"
    @keydown.space.prevent="emit('open')"
  >
    <div class="relative aspect-video overflow-hidden">
      <img
        v-if="project.hero_image_path"
        :src="project.hero_image_path"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div v-else class="flex h-full w-full items-center justify-center" :style="{ background: `${color}22` }">
        <UIcon :name="icon" class="size-10" :style="{ color }" />
      </div>

      <div class="absolute inset-0 flex items-end justify-end gap-2 bg-black/0 p-3 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
        <a
          v-if="project.url_demo"
          :href="project.url_demo"
          target="_blank"
          rel="noopener noreferrer"
          title="Demo"
          class="grid size-9 place-items-center rounded-full bg-white/90 text-[var(--txt)] transition-transform hover:scale-110"
          @click.stop
        >
          <UIcon name="i-lucide-external-link" class="size-4" />
        </a>
        <a
          v-if="project.url_repo"
          :href="project.url_repo"
          target="_blank"
          rel="noopener noreferrer"
          title="Repo"
          class="grid size-9 place-items-center rounded-full bg-white/90 text-[var(--txt)] transition-transform hover:scale-110"
          @click.stop
        >
          <UIcon name="simple-icons:github" class="size-4" />
        </a>
      </div>
    </div>

    <div class="p-5">
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase"
        :style="{ color, background: `${color}1a` }"
      >
        {{ project.category }}
      </span>
      <h3 class="mt-2 text-lg font-semibold text-[var(--txt)]">{{ title }}</h3>
      <p class="mt-2 line-clamp-3 text-sm text-[var(--txt-2)]">{{ description }}</p>
      <div v-if="project.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-md bg-[var(--glass)] px-2 py-0.5 font-mono text-[11px] text-[var(--txt-2)]"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
