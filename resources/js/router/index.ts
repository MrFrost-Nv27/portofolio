import { createRouter, createWebHistory } from 'vue-router'
import PublicSiteView from '@/views/PublicSiteView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PublicSiteView },
    // /admin/* routes are added in Phase C.
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
