<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTypingEffect } from '@/composables/useTypingEffect'
import { useContentStore } from '@/stores/content'
import ParticleCanvas from './ParticleCanvas.vue'

const { t, tm } = useI18n()
const content = useContentStore()

const roles = computed(() => tm('hero.roles') as unknown as string[])
const { displayText } = useTypingEffect(roles)
</script>

<template>
  <section id="hero" class="relative flex min-h-screen items-center overflow-hidden" aria-labelledby="hero-heading">
    <ParticleCanvas />

    <div class="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-[var(--primary)] opacity-20 blur-3xl [animation:blobPulse_8s_ease-in-out_infinite_alternate]" />
    <div class="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-[var(--cyan)] opacity-20 blur-3xl [animation:blobPulse_8s_ease-in-out_infinite_alternate]" />

    <div class="relative z-10 mx-auto w-full max-w-[1180px] px-7 py-32 text-center">
      <div class="inline-block rounded-full border border-[var(--glass-b)] bg-[var(--glass)] px-4 py-1.5 text-sm text-[var(--txt-2)] [animation:heroIn_0.6s_ease_forwards]">
        {{ t('hero.greeting') }}
      </div>
      <h1 id="hero-heading" class="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl [animation:heroIn_0.6s_0.08s_ease_forwards]">
        <span class="bg-clip-text text-transparent" style="background-image: var(--grad-text)">
          {{ content.profile?.name ?? 'Nova Adi Saputra' }}
        </span>
      </h1>
      <p class="mt-4 text-xl text-[var(--txt-2)] [animation:heroIn_0.6s_0.16s_ease_forwards]">
        {{ t('hero.role.prefix') }}
        <span class="font-semibold text-[var(--txt)]">{{ displayText }}</span
        ><span class="animate-[blink_0.75s_step-end_infinite] text-[var(--primary)]">|</span>
      </p>
      <p class="mx-auto mt-4 max-w-xl text-[var(--txt-2)] [animation:heroIn_0.6s_0.24s_ease_forwards]">
        {{ t('hero.desc') }}
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3 [animation:heroIn_0.6s_0.32s_ease_forwards]">
        <UButton to="#projects" size="lg" icon="i-lucide-rocket">{{ t('hero.cta.projects') }}</UButton>
        <UButton to="#contact" size="lg" variant="ghost" icon="i-lucide-send">{{ t('hero.cta.contact') }}</UButton>
      </div>

      <div class="mt-8 flex items-center justify-center gap-3 [animation:heroIn_0.6s_0.4s_ease_forwards]">
        <a
          v-if="content.profile?.github_url"
          :href="content.profile.github_url"
          target="_blank"
          rel="noopener noreferrer"
          class="grid size-10 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt-2)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <UIcon name="simple-icons:github" class="size-4" />
        </a>
        <a
          v-if="content.profile?.linkedin_url"
          :href="content.profile.linkedin_url"
          target="_blank"
          rel="noopener noreferrer"
          class="grid size-10 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt-2)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <UIcon name="simple-icons:linkedin" class="size-4" />
        </a>
        <a
          v-if="content.profile?.instagram_url"
          :href="content.profile.instagram_url"
          target="_blank"
          rel="noopener noreferrer"
          class="grid size-10 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt-2)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <UIcon name="simple-icons:instagram" class="size-4" />
        </a>
        <a
          v-if="content.profile"
          :href="`mailto:${content.profile.email}`"
          class="grid size-10 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt-2)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <UIcon name="i-lucide-mail" class="size-4" />
        </a>
        <a
          v-if="content.profile"
          :href="`https://wa.me/${content.profile.whatsapp_number}`"
          target="_blank"
          rel="noopener noreferrer"
          class="grid size-10 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt-2)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <UIcon name="simple-icons:whatsapp" class="size-4" />
        </a>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-[var(--txt-3)]">
      <span>{{ t('hero.scroll') }}</span>
      <div class="h-8 w-px [animation:scrollFloat_2s_ease-in-out_infinite] bg-[var(--txt-3)]" />
    </div>
  </section>
</template>
