<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="glass-card rounded-[var(--r)] p-8">
    <h1 class="text-2xl font-bold text-[var(--txt)]">
      Selamat datang, {{ auth.user?.username }} 👋
    </h1>
    <p class="mt-2 text-[var(--txt-2)]">
      Login berhasil. Halaman pengelolaan konten (projects, skills, profile, contact submissions)
      belum dibangun — ini baru placeholder untuk membuktikan alur login/logout/session bekerja.
    </p>
  </div>
</template>
