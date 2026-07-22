<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useContentStore } from '@/stores/content'
import { useCounterAnimation } from '@/composables/useCounterAnimation'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useCvDownload } from '@/composables/useCvDownload'

const { t, locale } = useI18n()
const content = useContentStore()

const bioP1 = computed(() => (locale.value === 'en' ? content.profile?.bio_p1_en : content.profile?.bio_p1_id) ?? '')
const bioP2 = computed(() => (locale.value === 'en' ? content.profile?.bio_p2_en : content.profile?.bio_p2_id) ?? '')

const yearsExperience = computed(() => {
  const since = content.profile?.experience_since_year
  return since ? new Date().getFullYear() - since : 0
})

const { target: statsTarget, register } = useCounterAnimation()
const yearsCount = register(() => yearsExperience.value)
const projectsCount = register(() => content.profile?.projects_completed ?? 0)
const languagesCount = register(() => content.profile?.languages_count ?? 0)

const { target: revealTarget, visible } = useScrollReveal()
const { downloadCv } = useCvDownload()
</script>

<template>
  <section id="about" class="py-28" aria-labelledby="about-heading">
    <div class="mx-auto max-w-[1180px] px-7">
      <div class="mb-12 text-center">
        <span class="text-sm font-semibold tracking-wide text-[var(--primary)] uppercase">{{ t('about.tag') }}</span>
        <h2 id="about-heading" class="mt-2 text-3xl font-bold sm:text-4xl">
          {{ t('about.title') }}
          <span class="bg-clip-text text-transparent" style="background-image: var(--grad-text)">{{ t('about.titleHl') }}</span>
        </h2>
      </div>

      <div
        ref="revealTarget"
        class="grid grid-cols-1 items-center gap-12 transition-all duration-700 md:grid-cols-2"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
      >
        <div class="mx-auto w-full max-w-sm">
          <div class="relative aspect-[3/4] overflow-hidden rounded-[var(--r)] border border-[var(--glass-b)] shadow-[var(--shadow)]">
            <img
              v-if="content.profile?.photo_path"
              :src="content.profile.photo_path"
              :alt="content.profile.name"
              class="h-full w-full object-cover"
            />
            <div class="absolute inset-2 rounded-[var(--r-sm)] border-2 border-dashed border-[var(--primary)] opacity-40 [animation:ringRotate_12s_linear_infinite]" />
            <div class="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white" style="background-image: var(--grad)">
              <UIcon name="i-lucide-code" class="size-3.5" /> {{ t('about.badge') }}
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-[var(--txt)]">{{ t('about.h3') }}</h3>
          <p class="mt-4 text-[var(--txt-2)]" v-html="bioP1" />
          <p class="mt-3 text-[var(--txt-2)]">{{ bioP2 }}</p>

          <div ref="statsTarget" class="mt-8 grid grid-cols-3 gap-3">
            <div class="rounded-[var(--r-sm)] border border-[var(--glass-b)] bg-[var(--bg-card)] p-4 text-center">
              <span class="text-3xl font-extrabold text-[var(--primary)]">{{ Math.floor(yearsCount) }}</span><span class="text-[var(--primary)]">+</span>
              <p class="mt-1 text-xs text-[var(--txt-2)]" v-html="t('about.stat.years')" />
            </div>
            <div class="rounded-[var(--r-sm)] border border-[var(--glass-b)] bg-[var(--bg-card)] p-4 text-center">
              <span class="text-3xl font-extrabold text-[var(--primary)]">{{ Math.floor(projectsCount) }}</span><span class="text-[var(--primary)]">+</span>
              <p class="mt-1 text-xs text-[var(--txt-2)]" v-html="t('about.stat.projects')" />
            </div>
            <div class="rounded-[var(--r-sm)] border border-[var(--glass-b)] bg-[var(--bg-card)] p-4 text-center">
              <span class="text-3xl font-extrabold text-[var(--primary)]">{{ Math.floor(languagesCount) }}</span><span class="text-[var(--primary)]">+</span>
              <p class="mt-1 text-xs text-[var(--txt-2)]" v-html="t('about.stat.clients')" />
            </div>
          </div>

          <UButton
            v-if="content.profile?.cv_path"
            class="mt-8"
            icon="i-lucide-download"
            @click="downloadCv(content.profile.cv_path)"
          >
            {{ t('about.cv') }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
