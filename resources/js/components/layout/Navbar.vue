<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'

const { t } = useI18n()
const theme = useThemeStore()
const locale = useLocaleStore()

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('')

const links = [
  { href: '#about', key: 'nav.about' },
  { href: '#skills', key: 'nav.skills' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#contact', key: 'nav.contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 40
  let current = ''
  document.querySelectorAll('section[id]').forEach((sec) => {
    const el = sec as HTMLElement
    if (window.scrollY >= el.offsetTop - 110) current = el.id
  })
  activeSection.value = current
}

function closeMobile() {
  mobileOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav class="fixed top-0 left-0 z-100 flex w-full items-center justify-center px-4 pt-4" aria-label="Navigasi Utama">
    <div
      class="glass-card flex h-16 w-full max-w-[900px] items-center justify-between rounded-full px-3 pl-6 transition-all duration-300"
      :class="scrolled ? 'max-w-[760px] shadow-[var(--glow)]' : ''"
    >
      <a href="#hero" class="grad-text text-lg font-extrabold tracking-tight">
        &lt;Nova/&gt;
      </a>

      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="link in links" :key="link.href" class="relative">
          <a
            :href="link.href"
            class="relative block rounded-full px-4 py-2 text-sm font-medium text-[var(--txt-2)] transition-colors hover:text-[var(--txt)]"
          >
            <span
              v-if="activeSection === link.href.slice(1)"
              class="absolute inset-0 -z-10 rounded-full"
              style="background-image: var(--grad); opacity: 0.16"
            />
            <span :class="activeSection === link.href.slice(1) && 'grad-text font-semibold'">{{ t(link.key) }}</span>
          </a>
        </li>
      </ul>

      <div class="hidden items-center gap-2 md:flex">
        <button
          class="grid size-10 place-items-center rounded-full text-[var(--txt)] transition hover:bg-[var(--glass)]"
          :aria-label="'Toggle theme'"
          @click="theme.toggle()"
        >
          <UIcon :name="theme.isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
        </button>
        <button
          class="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-[var(--txt)] transition hover:bg-[var(--glass)]"
          aria-label="Switch language"
          @click="locale.toggle()"
        >
          <img
            :src="locale.current === 'en' ? 'https://flagcdn.com/w20/gb.png' : 'https://flagcdn.com/w20/id.png'"
            :alt="locale.current === 'en' ? 'United Kingdom flag' : 'Indonesia flag'"
            width="20"
            height="15"
            class="rounded-sm"
          />
          {{ locale.current.toUpperCase() }}
        </button>
      </div>

      <button
        class="grid size-10 place-items-center rounded-full md:hidden"
        aria-label="Menu"
        @click="mobileOpen = !mobileOpen"
      >
        <UIcon :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-6 text-[var(--txt)]" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="glass-card absolute top-[76px] left-4 right-4 flex flex-col gap-1 rounded-3xl p-4 md:hidden"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--txt-2)] transition hover:bg-[var(--glass)] hover:text-[var(--txt)]"
          @click="closeMobile"
        >
          {{ t(link.key) }}
        </a>
        <div class="mt-2 flex items-center gap-2 border-t border-[var(--glass-b)] px-4 pt-3">
          <button
            class="grid size-10 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt)]"
            @click="theme.toggle()"
          >
            <UIcon :name="theme.isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
          </button>
          <button
            class="flex items-center gap-1.5 rounded-full border border-[var(--glass-b)] px-2.5 py-1.5 text-sm font-semibold text-[var(--txt)]"
            @click="locale.toggle()"
          >
            {{ locale.current.toUpperCase() }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>
