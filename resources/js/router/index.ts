import { createRouter, createWebHistory } from 'vue-router'
import PublicSiteView from '@/views/PublicSiteView.vue'
import AdminLoginView from '@/views/admin/AdminLoginView.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import { useAuthStore } from '@/stores/auth'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PublicSiteView },
    { path: '/admin/login', component: AdminLoginView },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [{ path: '', component: AdminDashboardView }],
    },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const auth = useAuthStore()
  if (!auth.checked) await auth.fetchMe()

  if (!auth.isAuthenticated) {
    return { path: '/admin/login', query: { redirect: to.fullPath } }
  }
  return true
})
