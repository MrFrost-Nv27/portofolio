<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useContentStore } from '@/stores/content'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import CustomCursor from '@/components/common/CustomCursor.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import AboutSection from '@/components/about/AboutSection.vue'
import SkillsSection from '@/components/skills/SkillsSection.vue'
import ProjectsSection from '@/components/projects/ProjectsSection.vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import LegalModal from '@/components/legal/LegalModal.vue'

const content = useContentStore()
onMounted(() => content.fetchAll())

const privacyOpen = ref(false)
const termsOpen = ref(false)
</script>

<template>
  <CustomCursor />
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:rounded focus:bg-[var(--primary)] focus:px-3 focus:py-2 focus:text-white">
    Skip to main content
  </a>

  <Navbar />

  <main id="main-content">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>

  <Footer :on-open-privacy="() => (privacyOpen = true)" :on-open-terms="() => (termsOpen = true)" />

  <LegalModal type="privacy" v-model:open="privacyOpen" />
  <LegalModal type="terms" v-model:open="termsOpen" />
</template>
