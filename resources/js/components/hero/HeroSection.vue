<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTypingEffect } from '@/composables/useTypingEffect'
import { useContentStore } from '@/stores/content'
import { useMagnetic } from '@/composables/useMagnetic'
import ParticleCanvas from './ParticleCanvas.vue'

const { t, tm } = useI18n()
const content = useContentStore()

const roles = computed(() => tm('hero.roles') as unknown as string[])
const { displayText } = useTypingEffect(roles)

const {
  target: magneticPrimaryTarget,
  style: magneticPrimaryStyle,
  onMouseMove: onMagneticPrimaryMove,
  onMouseLeave: onMagneticPrimaryLeave,
} = useMagnetic({ strength: 0.25 })
const {
  target: magneticGhostTarget,
  style: magneticGhostStyle,
  onMouseMove: onMagneticGhostMove,
  onMouseLeave: onMagneticGhostLeave,
} = useMagnetic({ strength: 0.25 })

// Subtle parallax: blobs drift opposite the cursor for a sense of depth.
const parallax = ref({ x: 0, y: 0 })
function onMouseMove(e: MouseEvent) {
  parallax.value = {
    x: (e.clientX / window.innerWidth - 0.5) * 30,
    y: (e.clientY / window.innerHeight - 0.5) * 30,
  }
}
onMounted(() => window.addEventListener('mousemove', onMouseMove))
onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))
</script>

<template>
  <section id="hero" class="relative flex min-h-screen items-center overflow-hidden pt-24" aria-labelledby="hero-heading">
    <div class="absolute inset-0" style="background-image: var(--grad-mesh)" />
    <ParticleCanvas />

    <div
      class="pointer-events-none absolute -top-32 -left-32 size-[28rem] rounded-full bg-primary opacity-25 blur-3xl [animation:meshDrift_10s_ease-in-out_infinite]"
      :style="{ transform: `translate(${-parallax.x}px, ${-parallax.y}px)` }"
    />
    <div
      class="pointer-events-none absolute top-1/3 -right-40 size-[26rem] rounded-full bg-secondary opacity-20 blur-3xl [animation:meshDrift_12s_ease-in-out_infinite_1s]"
      :style="{ transform: `translate(${parallax.x}px, ${-parallax.y}px)` }"
    />
    <div
      class="pointer-events-none absolute -bottom-32 left-1/4 size-[24rem] rounded-full bg-tertiary opacity-20 blur-3xl [animation:meshDrift_14s_ease-in-out_infinite_2s]"
      :style="{ transform: `translate(${-parallax.x}px, ${parallax.y}px)` }"
    />

    <div class="relative z-10 mx-auto w-full max-w-[1180px] px-7 py-16 text-center">
      <div class="glass-card inline-block rounded-full px-4 py-1.5 text-sm text-[var(--txt-2)] [animation:heroIn_0.6s_ease_forwards]">
        {{ t('hero.greeting') }}
      </div>
      <h1 id="hero-heading" class="mt-6 text-5xl font-extrabold tracking-tight sm:text-7xl [animation:heroIn_0.6s_0.08s_ease_forwards]">
        <span
          class="grad-text bg-[length:200%_auto] [animation:gradientPan_6s_ease_infinite]"
        >
          {{ content.profile?.name ?? 'Nova Adi Saputra' }}
        </span>
      </h1>
      <p class="mt-4 text-xl text-[var(--txt-2)] [animation:heroIn_0.6s_0.16s_ease_forwards]">
        {{ t('hero.role.prefix') }}
        <span class="font-semibold text-[var(--txt)]">{{ displayText }}</span
        ><span class="animate-[blink_0.75s_step-end_infinite] text-[var(--secondary)]">|</span>
      </p>
      <p class="mx-auto mt-4 max-w-xl text-[var(--txt-2)] [animation:heroIn_0.6s_0.24s_ease_forwards]">
        {{ t('hero.desc') }}
      </p>

      <div class="mt-9 flex flex-wrap items-center justify-center gap-4 [animation:heroIn_0.6s_0.32s_ease_forwards]">
        <span
          ref="magneticPrimaryTarget"
          class="inline-block transition-transform duration-200 ease-out"
          :style="magneticPrimaryStyle"
          @mousemove="onMagneticPrimaryMove"
          @mouseleave="onMagneticPrimaryLeave"
        >
          <UButton
            to="#projects"
            size="xl"
            icon="i-lucide-rocket"
            class="rounded-full px-6 shadow-[var(--glow)]"
            style="background-image: var(--grad)"
          >
            {{ t('hero.cta.projects') }}
          </UButton>
        </span>
        <span
          ref="magneticGhostTarget"
          class="inline-block transition-transform duration-200 ease-out"
          :style="magneticGhostStyle"
          @mousemove="onMagneticGhostMove"
          @mouseleave="onMagneticGhostLeave"
        >
          <UButton to="#contact" size="xl" variant="ghost" icon="i-lucide-send" class="glass-card rounded-full px-6">
            {{ t('hero.cta.contact') }}
          </UButton>
        </span>
      </div>

      <div class="mt-9 flex items-center justify-center gap-3 [animation:heroIn_0.6s_0.4s_ease_forwards]">
        <a
          v-if="content.profile?.github_url"
          :href="content.profile.github_url"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card grid size-11 place-items-center rounded-full text-[var(--txt-2)] transition-all duration-200 hover:-translate-y-1 hover:text-primary"
        >
          <UIcon name="simple-icons:github" class="size-4" />
        </a>
        <a
          v-if="content.profile?.linkedin_url"
          :href="content.profile.linkedin_url"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card grid size-11 place-items-center rounded-full text-[var(--txt-2)] transition-all duration-200 hover:-translate-y-1 hover:text-secondary"
        >
          <UIcon name="simple-icons:linkedin" class="size-4" />
        </a>
        <a
          v-if="content.profile?.instagram_url"
          :href="content.profile.instagram_url"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card grid size-11 place-items-center rounded-full text-[var(--txt-2)] transition-all duration-200 hover:-translate-y-1 hover:text-tertiary"
        >
          <UIcon name="simple-icons:instagram" class="size-4" />
        </a>
        <a
          v-if="content.profile"
          :href="`mailto:${content.profile.email}`"
          class="glass-card grid size-11 place-items-center rounded-full text-[var(--txt-2)] transition-all duration-200 hover:-translate-y-1 hover:text-warm"
        >
          <UIcon name="i-lucide-mail" class="size-4" />
        </a>
        <a
          v-if="content.profile"
          :href="`https://wa.me/${content.profile.whatsapp_number}`"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card grid size-11 place-items-center rounded-full text-[var(--txt-2)] transition-all duration-200 hover:-translate-y-1 hover:text-primary"
        >
          <UIcon name="simple-icons:whatsapp" class="size-4" />
        </a>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-[var(--txt-3)]">
      <span>{{ t('hero.scroll') }}</span>
      <div class="h-8 w-px [animation:scrollFloat_2s_ease-in-out_infinite]" style="background-image: var(--grad)" />
    </div>
  </section>
</template>
