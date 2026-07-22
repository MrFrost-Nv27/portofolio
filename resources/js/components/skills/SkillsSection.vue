<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useContentStore } from '@/stores/content'
import SkillCategoryCard from './SkillCategoryCard.vue'

const { t } = useI18n()
const content = useContentStore()
</script>

<template>
  <section id="skills" class="py-28" aria-labelledby="skills-heading">
    <div class="mx-auto max-w-[1180px] px-7">
      <div class="mb-12 text-center">
        <span class="text-sm font-semibold tracking-wide text-[var(--primary)] uppercase">{{ t('skills.tag') }}</span>
        <h2 id="skills-heading" class="mt-2 text-3xl font-bold sm:text-4xl">
          {{ t('skills.title') }}
          <span class="bg-clip-text text-transparent" style="background-image: var(--grad-text)">{{ t('skills.titleHl') }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SkillCategoryCard v-for="cat in content.skillCategories" :key="cat.id" :category="cat" />
      </div>
    </div>
  </section>
</template>
