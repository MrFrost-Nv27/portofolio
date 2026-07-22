import { ref, onMounted, onUnmounted } from 'vue'

const HOVER_SELECTORS =
  'a, button, [role="button"], .chip, .filter-btn, .skill-card, .proj-card, .oval-btn, .mc-thumb, .mc-arrow, .lb-zoom-btn, .lb-arrow, .lb-close, .social-pill, .lang-btn, .hamburger'

/** Ported from the legacy custom cursor (desktop-only pointer follower). */
export function useCustomCursor() {
  const enabled = ref(false)
  const dotX = ref(0)
  const dotY = ref(0)
  const ringX = ref(0)
  const ringY = ref(0)
  const hovering = ref(false)
  const pressed = ref(false)
  const idle = ref(false)

  let mx = 0
  let my = 0
  let rx = 0
  let ry = 0
  let rafId = 0

  function onMouseMove(e: MouseEvent) {
    mx = e.clientX
    my = e.clientY
    dotX.value = mx
    dotY.value = my
  }
  function onMouseOver(e: MouseEvent) {
    if ((e.target as HTMLElement)?.closest?.(HOVER_SELECTORS)) hovering.value = true
  }
  function onMouseOut(e: MouseEvent) {
    if ((e.target as HTMLElement)?.closest?.(HOVER_SELECTORS)) hovering.value = false
  }
  function onMouseDown() {
    pressed.value = true
  }
  function onMouseUp() {
    pressed.value = false
  }
  function onMouseLeave() {
    idle.value = true
  }
  function onMouseEnter() {
    idle.value = false
  }

  function raf() {
    rx += (mx - rx) * 0.1
    ry += (my - ry) * 0.1
    ringX.value = rx
    ringY.value = ry
    rafId = requestAnimationFrame(raf)
  }

  onMounted(() => {
    enabled.value = !window.matchMedia('(pointer: coarse)').matches
    if (!enabled.value) return

    document.documentElement.classList.add('cursor-none')
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    raf()
  })

  onUnmounted(() => {
    document.documentElement.classList.remove('cursor-none')
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseover', onMouseOver)
    document.removeEventListener('mouseout', onMouseOut)
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('mouseenter', onMouseEnter)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { enabled, dotX, dotY, ringX, ringY, hovering, pressed, idle }
}
