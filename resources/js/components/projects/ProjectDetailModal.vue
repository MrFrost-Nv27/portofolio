<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '@/types'
import ImageCarousel from './ImageCarousel.vue'
import ImageLightbox from './ImageLightbox.vue'

const props = defineProps<{ project: Project | null }>()
const open = defineModel<boolean>('open', { default: false })

const { t, locale } = useI18n()

const title = computed(() => (props.project ? (locale.value === 'en' ? props.project.title_en : props.project.title_id) : ''))
const description = computed(() =>
  props.project ? (locale.value === 'en' ? props.project.description_en : props.project.description_id) : '',
)
const images = computed(() => props.project?.images.map((img) => img.image_path) ?? [])

const lightboxIndex = ref<number | null>(null)
</script>

<template>
  <UModal v-model:open="open" :title="title" :ui="{ content: 'sm:max-w-2xl' }">
    <template #body>
      <div v-if="project" class="space-y-4">
        <ImageCarousel :images="images" @expand="(i) => (lightboxIndex = i)" />
        <p class="text-sm text-[var(--txt-2)]">{{ description }}</p>
        <div v-if="project.tags?.length" class="flex flex-wrap gap-1.5">
          <span v-for="tag in project.tags" :key="tag" class="rounded-md bg-[var(--glass)] px-2 py-0.5 font-mono text-[11px] text-[var(--txt-2)]">
            {{ tag }}
          </span>
        </div>
        <div class="flex gap-2 pt-1">
          <UButton
            v-if="project.url_demo"
            :to="project.url_demo"
            target="_blank"
            icon="i-lucide-globe"
            class="rounded-full px-5 shadow-[var(--glow)]"
            style="background-image: var(--grad)"
          >
            {{ t('modal.live') }}
          </UButton>
          <UButton v-if="project.url_repo" :to="project.url_repo" target="_blank" variant="ghost" icon="simple-icons:github" class="rounded-full px-5">
            {{ t('modal.repo') }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>

  <Teleport to="body">
    <ImageLightbox
      v-if="lightboxIndex !== null"
      :images="images"
      :start-index="lightboxIndex"
      @close="lightboxIndex = null"
    />
  </Teleport>
</template>
