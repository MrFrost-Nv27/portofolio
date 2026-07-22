<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useLightboxZoom } from '@/composables/useLightboxZoom'

const props = defineProps<{ images: string[]; startIndex: number }>()
const emit = defineEmits<{ close: [] }>()

const index = ref(props.startIndex)
const imgRef = ref<HTMLElement | null>(null)
const {
  zoomed, transform, zoomPercent, reset, zoomIn, zoomOut, toggleDblClick,
  onWheel, onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, scale,
} = useLightboxZoom(imgRef)

watch(
  () => props.startIndex,
  (v) => (index.value = v),
)

function go(delta: number) {
  reset()
  const len = props.images.length
  index.value = ((index.value + delta) % len + len) % len
}

function onBackdropClick(e: MouseEvent) {
  if (scale.value > 1) {
    reset()
    return
  }
  if (e.target === e.currentTarget) emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') go(-1)
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === '+' || e.key === '=') zoomIn()
  else if (e.key === '-') zoomOut()
  else if (e.key === '0') reset()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    class="fixed inset-0 z-[200] flex flex-col bg-black/95"
    role="dialog"
    aria-modal="true"
    @click="onBackdropClick"
    @wheel="onWheel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
  >
    <button class="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-2xl text-white" aria-label="Close lightbox" @click="emit('close')">
      &times;
    </button>

    <button
      v-if="images.length > 1"
      class="absolute top-1/2 left-4 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white"
      aria-label="Previous"
      @click.stop="go(-1)"
    >
      <UIcon name="i-lucide-chevron-left" class="size-5" />
    </button>
    <button
      v-if="images.length > 1"
      class="absolute top-1/2 right-4 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white"
      aria-label="Next"
      @click.stop="go(1)"
    >
      <UIcon name="i-lucide-chevron-right" class="size-5" />
    </button>

    <div class="flex flex-1 items-center justify-center overflow-hidden" :class="zoomed ? (scale > 1 ? 'cursor-grab' : '') : ''">
      <img
        ref="imgRef"
        :src="images[index]"
        alt="Project screenshot"
        class="max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-200 select-none"
        :style="{ transform }"
        @dblclick.stop="toggleDblClick"
        @mousedown.stop="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @click.stop
      />
    </div>

    <div class="z-10 flex items-center justify-center gap-3 pb-6 text-sm text-white">
      <span v-if="images.length > 1">{{ index + 1 }} / {{ images.length }}</span>
      <span class="h-4 w-px bg-white/30" />
      <button class="grid size-8 place-items-center rounded-full bg-white/10 disabled:opacity-40" :disabled="scale <= 1" aria-label="Zoom out" @click.stop="zoomOut">
        <UIcon name="i-lucide-minus" class="size-4" />
      </button>
      <span class="w-12 text-center">{{ zoomPercent }}%</span>
      <button class="grid size-8 place-items-center rounded-full bg-white/10 disabled:opacity-40" :disabled="scale >= 5" aria-label="Zoom in" @click.stop="zoomIn">
        <UIcon name="i-lucide-plus" class="size-4" />
      </button>
      <span class="h-4 w-px bg-white/30" />
      <button class="grid size-8 place-items-center rounded-full bg-white/10" aria-label="Reset zoom" @click.stop="reset">
        <UIcon name="i-lucide-shrink" class="size-4" />
      </button>
    </div>
  </div>
</template>
