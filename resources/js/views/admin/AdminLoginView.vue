<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { z } from 'zod'
import { useAuthStore } from '@/stores/auth'
import { ApiError } from '@/api/client'
import { useToast } from '@nuxt/ui/composables'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

const state = reactive({ username: '', password: '' })
const submitting = ref(false)

async function onSubmit() {
  submitting.value = true
  try {
    await auth.login(state.username, state.password)
    const redirect = (route.query.redirect as string) || '/admin'
    router.push(redirect)
  } catch (err) {
    const message = err instanceof ApiError ? err.message : 'Login failed'
    toast.add({ title: message, color: 'error' })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
    <div class="absolute inset-0" style="background-image: var(--grad-mesh)" />

    <div class="glass-card relative z-10 w-full max-w-sm rounded-[var(--r)] p-8">
      <div class="mb-6 text-center">
        <a href="/" class="grad-text text-xl font-extrabold">&lt;Nova/&gt;</a>
        <h1 class="mt-3 text-xl font-bold text-[var(--txt)]">Admin Login</h1>
        <p class="mt-1 text-sm text-[var(--txt-2)]">Masuk untuk mengelola konten portfolio</p>
      </div>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Username" name="username" required>
          <UInput v-model="state.username" class="w-full" autocomplete="username" />
        </UFormField>
        <UFormField label="Password" name="password" required>
          <UInput v-model="state.password" type="password" class="w-full" autocomplete="current-password" />
        </UFormField>
        <UButton
          type="submit"
          block
          :loading="submitting"
          class="rounded-full shadow-[var(--glow)]"
          style="background-image: var(--grad)"
        >
          {{ submitting ? 'Signing in…' : 'Sign in' }}
        </UButton>
      </UForm>
    </div>
  </div>
</template>
