import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Ported from the legacy stat-counter animation. Bind `target` to the
 * container element wrapping all counters; call `register(getFinal)` for
 * each individual stat to get back a reactive `current` count that animates
 * up once the container scrolls into view. `getFinal` is read lazily when
 * the animation actually starts, not at registration time, since the final
 * values (e.g. profile.projects_completed) load asynchronously from the API.
 */
export function useCounterAnimation() {
  const target: Ref<HTMLElement | null> = ref(null)
  const counters: { getFinal: () => number; current: Ref<number> }[] = []
  let observer: IntersectionObserver | null = null
  let started = false

  function register(getFinal: () => number) {
    const current = ref(0)
    counters.push({ getFinal, current })
    return current
  }

  function animate() {
    if (started) return
    started = true
    counters.forEach(({ getFinal, current }) => {
      const final = getFinal()
      const durationMs = 1800
      const stepMs = 16
      const step = final / (durationMs / stepMs)
      // Accumulate in a plain local variable — current.value only ever
      // receives the floored display value. Flooring the accumulator itself
      // (as an earlier version did) destroys sub-1 fractional progress every
      // tick, so counters with a small final value never move off zero.
      let acc = 0
      const id = setInterval(() => {
        acc += step
        if (acc >= final) {
          current.value = final
          clearInterval(id)
        } else {
          current.value = Math.floor(acc)
        }
      }, stepMs)
    })
  }

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) animate()
      },
      { threshold: 0.6 },
    )
    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { target, register }
}
