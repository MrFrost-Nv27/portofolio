<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'

const theme = useThemeStore()
const locale = useLocaleStore()

onMounted(() => {
  theme.init()
  locale.init()
})
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
