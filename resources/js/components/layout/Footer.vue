<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useContentStore } from '@/stores/content'
import { useCvDownload } from '@/composables/useCvDownload'

const { t } = useI18n()
const content = useContentStore()
const { downloadCv } = useCvDownload()

defineProps<{
  onOpenPrivacy: () => void
  onOpenTerms: () => void
}>()
</script>

<template>
  <footer class="relative border-t border-[var(--glass-b)] bg-[var(--bg-2)] pt-16 pb-8">
    <div class="absolute top-0 left-0 h-px w-full" style="background-image: var(--grad-text)" />
    <div class="mx-auto max-w-[1180px] px-7">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#hero" class="grad-text text-lg font-extrabold">
            &lt;Nova/&gt;
          </a>
          <p class="mt-3 max-w-sm text-sm text-[var(--txt-2)]" v-html="t('footer.tagline')" />
          <div class="mt-4 flex gap-3">
            <a v-if="content.profile?.github_url" :href="content.profile.github_url" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <UIcon name="simple-icons:github" class="size-5 text-[var(--txt-2)] transition hover:text-primary" />
            </a>
            <a v-if="content.profile?.gitlab_url" :href="content.profile.gitlab_url" target="_blank" rel="noopener noreferrer" aria-label="GitLab">
              <UIcon name="simple-icons:gitlab" class="size-5 text-[var(--txt-2)] transition hover:text-primary" />
            </a>
            <a v-if="content.profile?.linkedin_url" :href="content.profile.linkedin_url" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <UIcon name="simple-icons:linkedin" class="size-5 text-[var(--txt-2)] transition hover:text-primary" />
            </a>
            <a v-if="content.profile?.instagram_url" :href="content.profile.instagram_url" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <UIcon name="simple-icons:instagram" class="size-5 text-[var(--txt-2)] transition hover:text-primary" />
            </a>
            <a v-if="content.profile" :href="`https://wa.me/${content.profile.whatsapp_number}`" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <UIcon name="simple-icons:whatsapp" class="size-5 text-[var(--txt-2)] transition hover:text-primary" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-semibold text-[var(--txt)]">{{ t('footer.col.nav') }}</h4>
          <ul class="space-y-2 text-sm text-[var(--txt-2)]">
            <li><a href="#about" class="hover:text-primary">{{ t('nav.about') }}</a></li>
            <li><a href="#skills" class="hover:text-primary">{{ t('nav.skills') }}</a></li>
            <li><a href="#projects" class="hover:text-primary">{{ t('nav.projects') }}</a></li>
            <li><a href="#contact" class="hover:text-primary">{{ t('nav.contact') }}</a></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-semibold text-[var(--txt)]">{{ t('footer.col.contact') }}</h4>
          <ul class="space-y-2 text-sm text-[var(--txt-2)]">
            <li v-if="content.profile">
              <a :href="`mailto:${content.profile.email}`" class="flex items-center gap-2 hover:text-primary">
                <UIcon name="i-lucide-mail" class="size-4" /> Email
              </a>
            </li>
            <li v-if="content.profile">
              <a :href="`https://wa.me/${content.profile.whatsapp_number}`" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-primary">
                <UIcon name="simple-icons:whatsapp" class="size-4" /> WhatsApp
              </a>
            </li>
            <li v-if="content.profile?.cv_path">
              <button class="flex items-center gap-2 hover:text-primary" @click="downloadCv(content.profile!.cv_path)">
                <UIcon name="i-lucide-file-text" class="size-4" /> {{ t('about.cv') }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center gap-3 border-t border-[var(--glass-b)] pt-6 text-center text-xs text-[var(--txt-3)] md:flex-row md:justify-between">
        <p v-html="t('footer.copy')" />
        <div class="flex items-center gap-2">
          <button class="hover:text-primary" @click="onOpenPrivacy">{{ t('footer.privacy') }}</button>
          <span>&middot;</span>
          <button class="hover:text-primary" @click="onOpenTerms">{{ t('footer.terms') }}</button>
        </div>
        <p v-html="t('footer.made')" />
      </div>
    </div>
  </footer>
</template>
