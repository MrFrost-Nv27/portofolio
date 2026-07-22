import { ref, watch, onUnmounted, type Ref } from 'vue'

/**
 * Ported from the legacy typewriter effect in js/main.js. `roles` should be
 * a reactive/computed array (e.g. depending on the current locale) so the
 * effect restarts automatically when it changes.
 */
export function useTypingEffect(roles: Ref<string[]>) {
  const displayText = ref('')
  let timer: ReturnType<typeof setTimeout> | null = null

  function start() {
    if (timer) clearTimeout(timer)
    displayText.value = ''
    let roleIndex = 0
    let charIndex = 0
    let deleting = false

    function tick() {
      const words = roles.value
      if (!words.length) return
      const word = words[roleIndex % words.length]
      displayText.value = deleting ? word.slice(0, charIndex - 1) : word.slice(0, charIndex + 1)
      charIndex = deleting ? charIndex - 1 : charIndex + 1

      let delay = deleting ? 55 : 95
      if (!deleting && charIndex === word.length) {
        delay = 2200
        deleting = true
      } else if (deleting && charIndex === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % words.length
        delay = 420
      }
      timer = setTimeout(tick, delay)
    }
    tick()
  }

  watch(roles, start, { immediate: true })
  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { displayText }
}
