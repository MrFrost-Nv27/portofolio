import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Replaces the legacy `.reveal` / `.reveal.on` IntersectionObserver pattern.
 * Bind the returned `target` ref to an element and use `visible` to drive
 * Tailwind transition classes, e.g.:
 *   :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
 *
 * Pass an existing ref via `externalTarget` when the same element also
 * needs to be bound to another composable (e.g. useTilt3D) — avoids the
 * fragile pattern of juggling two separate `:ref` callbacks on one element.
 */
export function useScrollReveal(rootMargin = '0px 0px -40px 0px', externalTarget?: Ref<HTMLElement | null>) {
  const target = externalTarget ?? ref<HTMLElement | null>(null)
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.value = true
            observer?.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin },
    )
    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { target, visible }
}
