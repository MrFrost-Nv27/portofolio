<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ images: string[] }>()
const emit = defineEmits<{ expand: [index: number] }>()

const { t } = useI18n()
const activeIndex = ref(0)

watch(
  () => props.images,
  () => {
    activeIndex.value = 0
  },
)

function go(delta: number) {
  const len = props.images.length
  activeIndex.value = ((activeIndex.value + delta) % len + len) % len
}
</script>

<template>
  <div v-if="!images.length" class="flex h-56 flex-col items-center justify-center gap-2 rounded-[var(--r-sm)] bg-[var(--glass)] text-sm text-[var(--txt-3)]">
    <UIcon name="i-lucide-image" class="size-8" />
    {{ t('modal.noImage') }}
  </div>

  <div v-else class="space-y-3">
    <div class="relative aspect-video overflow-hidden rounded-[var(--r-sm)] bg-black">
      <img
        :src="images[activeIndex]"
        alt="Project screenshot"
        class="h-full w-full cursor-zoom-in object-contain transition-opacity duration-200"
        @click="emit('expand', activeIndex)"
      />
      <button
        class="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-black/50 text-white"
        aria-label="View fullscreen"
        @click="emit('expand', activeIndex)"
      >
        <UIcon name="i-lucide-expand" class="size-4" />
      </button>

      <template v-if="images.length > 1">
        <button
          class="absolute top-1/2 left-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white"
          aria-label="Previous image"
          @click="go(-1)"
        >
          <UIcon name="i-lucide-chevron-left" class="size-4" />
        </button>
        <button
          class="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white"
          aria-label="Next image"
          @click="go(1)"
        >
          <UIcon name="i-lucide-chevron-right" class="size-4" />
        </button>
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
          {{ activeIndex + 1 }} / {{ images.length }}
        </div>
      </template>
    </div>

    <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="(img, i) in images"
        :key="img"
        class="h-11 w-16 shrink-0 overflow-hidden rounded-md border-2 transition"
        :class="i === activeIndex ? 'border-[var(--primary)]' : 'border-transparent opacity-70'"
        @click="activeIndex = i"
      >
        <img :src="img" :alt="`Screenshot ${i + 1}`" loading="lazy" class="h-full w-full object-cover" />
      </button>
    </div>
  </div>
</template>
