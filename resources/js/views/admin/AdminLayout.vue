<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function onLogout() {
  await auth.logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-[var(--bg)]">
    <nav class="glass-card sticky top-0 z-50 flex items-center justify-between rounded-none px-6 py-4">
      <a href="/" class="grad-text text-lg font-extrabold">&lt;Nova/&gt;</a>
      <div class="flex items-center gap-4 text-sm text-[var(--txt-2)]">
        <span v-if="auth.user">Logged in as <strong class="text-[var(--txt)]">{{ auth.user.username }}</strong></span>
        <UButton variant="ghost" size="sm" icon="i-lucide-log-out" @click="onLogout">Logout</UButton>
      </div>
    </nav>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <RouterView />
    </main>
  </div>
</template>
