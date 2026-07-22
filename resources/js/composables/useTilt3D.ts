import { ref, type Ref } from 'vue'

interface TiltOptions {
  max?: number // max rotation in degrees
  scale?: number // hover scale
}

/**
 * 3D hover-tilt effect for cards — rotates toward the cursor position.
 * Pass an existing ref via `externalTarget` to share the same DOM element
 * with another composable (e.g. useScrollReveal) instead of juggling two
 * separate `:ref` callbacks on one element.
 */
export function useTilt3D(options: TiltOptions = {}, externalTarget?: Ref<HTMLElement | null>) {
  const max = options.max ?? 10
  const scale = options.scale ?? 1.03
  const target = externalTarget ?? ref<HTMLElement | null>(null)
  const style = ref({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)' })

  function onMouseMove(e: MouseEvent) {
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * max * 2
    const rotateX = (0.5 - py) * max * 2
    style.value = {
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
    }
  }

  function onMouseLeave() {
    style.value = { transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)' }
  }

  return { target, style, onMouseMove, onMouseLeave }
}
