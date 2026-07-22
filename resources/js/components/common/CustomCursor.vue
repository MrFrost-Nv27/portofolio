<script setup lang="ts">
import { useCustomCursor } from '@/composables/useCustomCursor'

const { enabled, dotX, dotY, ringX, ringY, hovering, pressed, idle } = useCustomCursor()
</script>

<template>
  <template v-if="enabled">
    <div
      class="pointer-events-none fixed top-0 left-0 z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cursor-dot)] transition-[opacity] duration-150"
      :class="[hovering && 'scale-150 bg-[var(--cursor-dot-hover)]', pressed && 'scale-75 bg-[var(--cursor-dot-press)]', idle && 'opacity-0']"
      :style="{ left: `${dotX}px`, top: `${dotY}px` }"
    />
    <div
      class="pointer-events-none fixed top-0 left-0 z-[9998] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[opacity,transform] duration-150"
      :class="[
        hovering ? 'scale-150 border-[var(--cursor-ring-hover)] bg-[var(--cursor-ring-fill)]' : 'border-[var(--cursor-ring)]',
        pressed && 'scale-75 border-[var(--cursor-ring-press)] bg-[var(--cursor-ring-pfill)]',
        idle && 'opacity-0',
      ]"
      :style="{ left: `${ringX}px`, top: `${ringY}px` }"
    />
  </template>
</template>
