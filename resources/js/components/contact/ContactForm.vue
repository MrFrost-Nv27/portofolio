<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import { useToast } from '@nuxt/ui/composables'
import { publicApi } from '@/api/public'
import { useContentStore } from '@/stores/content'
import type { ContactRequest } from '@/types'

const { t, locale } = useI18n()
const content = useContentStore()
const toast = useToast()

const serviceOptions = computed(() => [
  { label: t('form.service_web'), value: 'Web Development' },
  { label: t('form.service_mobile'), value: 'Mobile Development' },
  { label: t('form.service_backend'), value: 'Backend / API' },
  { label: t('form.service_ai'), value: 'AI / Machine Learning' },
  { label: t('form.service_consult'), value: 'Konsultasi Teknis' },
  { label: t('form.service_other'), value: 'Lainnya' },
])

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().min(1),
  message: z.string().min(1),
})

const state = reactive({ name: '', email: '', service: '', message: '' })
const sending = ref(false)

async function onSubmit() {
  sending.value = true
  try {
    const payload: ContactRequest = {
      name: state.name,
      email: state.email || undefined,
      service: state.service,
      message: state.message,
      locale: locale.value === 'en' ? 'en' : 'id',
    }
    await publicApi.submitContact(payload)

    const waTemplate =
      locale.value === 'en'
        ? `Halo Nova,\n\nSaya tertarik untuk berkolaborasi. Berikut detail saya:\n\n*Name*: ${state.name}\n\n*Type of Service*\n${state.service}\n\n*Message*\n${state.message}\n\n_Sent via contact form_`
        : `Halo Nova,\n\nSaya tertarik untuk berkolaborasi. Berikut detail saya:\n\n*Nama*: ${state.name}\n\n*Jenis Layanan*\n${state.service}\n\n*Pesan*\n${state.message}\n\n_Dikirim melalui formulir kontak_`
    const waUrl = `https://wa.me/${content.profile?.whatsapp_number}?text=${encodeURIComponent(waTemplate)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    toast.add({ title: t('form.sent'), color: 'success' })
    state.name = ''
    state.email = ''
    state.service = ''
    state.message = ''
  } catch (err) {
    toast.add({ title: err instanceof Error ? err.message : 'Error', color: 'error' })
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField :label="t('form.name')" name="name" required>
      <UInput v-model="state.name" class="w-full" />
    </UFormField>
    <UFormField :label="t('form.email')" name="email">
      <UInput v-model="state.email" type="email" class="w-full" />
    </UFormField>
    <UFormField :label="t('form.service')" name="service" required>
      <USelect v-model="state.service" :items="serviceOptions" class="w-full" />
    </UFormField>
    <UFormField :label="t('form.message')" name="message" required>
      <UTextarea v-model="state.message" :rows="5" class="w-full" />
    </UFormField>
    <UButton
      type="submit"
      block
      :loading="sending"
      icon="i-lucide-send"
      class="rounded-full shadow-[var(--glow)]"
      style="background-image: var(--grad)"
    >
      {{ sending ? t('form.sending') : t('form.send') }}
    </UButton>
  </UForm>
</template>
