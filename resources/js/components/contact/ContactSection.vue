<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useContentStore } from '@/stores/content'
import ContactForm from './ContactForm.vue'

const { t } = useI18n()
const content = useContentStore()

const items = computed(() => {
  const p = content.profile
  if (!p) return []
  return [
    { icon: 'simple-icons:whatsapp', label: t('ci.whatsapp.label'), value: `+${p.whatsapp_number}`, href: `https://wa.me/${p.whatsapp_number}` },
    { icon: 'i-lucide-mail', label: t('ci.email.label'), value: p.email, href: `mailto:${p.email}` },
    { icon: 'i-lucide-map-pin', label: t('ci.location.label'), value: p.address, href: null },
  ]
})

const socials = computed(() => {
  const p = content.profile
  if (!p) return []
  return [
    { icon: 'simple-icons:github', label: 'GitHub', href: p.github_url },
    { icon: 'simple-icons:gitlab', label: 'GitLab', href: p.gitlab_url },
    { icon: 'simple-icons:linkedin', label: 'LinkedIn', href: p.linkedin_url },
    { icon: 'simple-icons:instagram', label: 'Instagram', href: p.instagram_url },
    { icon: 'simple-icons:whatsapp', label: 'WhatsApp', href: `https://wa.me/${p.whatsapp_number}` },
  ].filter((s) => s.href)
})
</script>

<template>
  <section id="contact" class="py-28" aria-labelledby="contact-heading">
    <div class="mx-auto max-w-[1180px] px-7">
      <div class="mb-12 text-center">
        <span class="text-sm font-semibold tracking-wide text-[var(--primary)] uppercase">{{ t('contact.tag') }}</span>
        <h2 id="contact-heading" class="mt-2 text-3xl font-bold sm:text-4xl">
          {{ t('contact.title') }}
          <span class="bg-clip-text text-transparent" style="background-image: var(--grad-text)">{{ t('contact.titleHl') }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p class="text-[var(--txt-2)]">{{ t('contact.lead') }}</p>

          <address class="mt-6 space-y-4 not-italic">
            <div v-for="item in items" :key="item.label" class="flex items-start gap-3">
              <div class="grid size-10 shrink-0 place-items-center rounded-full" style="background-image: var(--grad)">
                <UIcon :name="item.icon" class="size-4 text-white" />
              </div>
              <div>
                <span class="block text-xs text-[var(--txt-3)]">{{ item.label }}</span>
                <a v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--txt)] hover:text-[var(--primary)]">
                  {{ item.value }}
                </a>
                <span v-else class="font-medium text-[var(--txt)]">{{ item.value }}</span>
              </div>
            </div>
          </address>

          <div class="mt-6 flex flex-wrap gap-2">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href!"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 rounded-full border border-[var(--glass-b)] px-3 py-1.5 text-sm text-[var(--txt-2)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <UIcon :name="s.icon" class="size-3.5" /> {{ s.label }}
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  </section>
</template>
