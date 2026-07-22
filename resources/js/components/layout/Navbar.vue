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
  scrolled.value = window.scrollY > 70
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
  <nav
    class="fixed top-0 left-0 z-100 flex h-[70px] w-full items-center transition-all duration-300"
    aria-label="Navigasi Utama"
  >
    <div
      class="mx-auto flex h-full w-full max-w-[1180px] items-center justify-between px-7 transition-all duration-300"
      :class="scrolled && 'mt-3 max-w-[820px] rounded-full border border-[var(--glass-b)] bg-[var(--bg-nav)] px-6 shadow-[var(--shadow)] backdrop-blur-xl md:mt-0'"
    >
      <a href="#hero" class="text-lg font-bold text-[var(--txt)]">
        <span class="text-[var(--primary)]">&lt;</span>Nova<span class="text-[var(--primary)]">/&gt;</span>
      </a>

      <ul class="hidden items-center gap-6 md:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="text-sm font-medium text-[var(--txt-2)] transition-colors hover:text-[var(--txt)]"
            :class="activeSection === link.href.slice(1) && 'text-[var(--primary)]'"
          >
            {{ t(link.key) }}
          </a>
        </li>
      </ul>

      <div class="hidden items-center gap-2 md:flex">
        <button
          class="grid size-9 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt)] transition hover:border-[var(--primary)]"
          :aria-label="'Toggle theme'"
          @click="theme.toggle()"
        >
          <UIcon :name="theme.isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
        </button>
        <button
          class="flex items-center gap-1.5 rounded-full border border-[var(--glass-b)] px-2.5 py-1.5 text-sm font-semibold text-[var(--txt)] transition hover:border-[var(--primary)]"
          aria-label="Switch language"
          @click="locale.toggle()"
        >
          <img
            :src="locale.current === 'en' ? 'https://flagcdn.com/w20/gb.png' : 'https://flagcdn.com/w20/id.png'"
            :alt="locale.current === 'en' ? 'United Kingdom flag' : 'Indonesia flag'"
            width="20"
            height="15"
          />
          {{ locale.current.toUpperCase() }}
        </button>
      </div>

      <button
        class="grid size-9 place-items-center md:hidden"
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
        class="absolute top-[70px] left-0 flex w-full flex-col gap-1 border-t border-[var(--glass-b)] bg-[var(--bg-nav-mob)] p-4 backdrop-blur-xl md:hidden"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--txt-2)]"
          @click="closeMobile"
        >
          {{ t(link.key) }}
        </a>
        <div class="mt-2 flex items-center gap-2 border-t border-[var(--glass-b)] px-3 pt-3">
          <button
            class="grid size-9 place-items-center rounded-full border border-[var(--glass-b)] text-[var(--txt)]"
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
