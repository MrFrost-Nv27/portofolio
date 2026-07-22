<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useParticles } from '@/composables/useParticles'
import { useThemeStore } from '@/stores/theme'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const theme = useThemeStore()
useParticles(canvasRef, toRef(theme, 'isDark'))
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" />
</template>
