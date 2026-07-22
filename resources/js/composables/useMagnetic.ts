import { ref, type Ref } from 'vue'

interface MagneticOptions {
  strength?: number // how far the element follows the cursor, 0-1
}

/** Magnetic hover-pull effect for buttons/icons — nudges toward the cursor. */
export function useMagnetic(options: MagneticOptions = {}) {
  const strength = options.strength ?? 0.35
  const target: Ref<HTMLElement | null> = ref(null)
  const style = ref({ transform: 'translate(0px, 0px)' })

  function onMouseMove(e: MouseEvent) {
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    style.value = { transform: `translate(${dx}px, ${dy}px)` }
  }

  function onMouseLeave() {
    style.value = { transform: 'translate(0px, 0px)' }
  }

  return { target, style, onMouseMove, onMouseLeave }
}
