import { ref, computed, type Ref } from 'vue'

const SCALE_MIN = 1
const SCALE_MAX = 5
const SCALE_STEP = 0.5

/** Ported from the legacy lightbox pinch/wheel-zoom + drag-pan state machine. */
export function useLightboxZoom(imgRef: Ref<HTMLElement | null>) {
  const scale = ref(1)
  const tx = ref(0)
  const ty = ref(0)
  const zoomed = computed(() => scale.value > 1)

  let dragging = false
  let dragStartX = 0
  let dragStartY = 0
  let panStartX = 0
  let panStartY = 0
  let pinchDist0 = 0
  let pinchScale0 = 1
  let touchStartX = 0
  let touchStartY = 0

  function clampPan() {
    const el = imgRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const maxX = Math.max(0, (rect.width - vw) / 2 + vw * 0.1)
    const maxY = Math.max(0, (rect.height - vh) / 2 + vh * 0.1)
    tx.value = Math.min(maxX, Math.max(-maxX, tx.value))
    ty.value = Math.min(maxY, Math.max(-maxY, ty.value))
  }

  function reset() {
    scale.value = 1
    tx.value = 0
    ty.value = 0
  }

  function zoomIn() {
    scale.value = Math.min(SCALE_MAX, parseFloat((scale.value + SCALE_STEP).toFixed(2)))
    clampPan()
  }

  function zoomOut() {
    scale.value = Math.max(SCALE_MIN, parseFloat((scale.value - SCALE_STEP).toFixed(2)))
    if (scale.value === 1) {
      tx.value = 0
      ty.value = 0
    }
    clampPan()
  }

  function toggleDblClick() {
    if (scale.value > 1) {
      reset()
    } else {
      scale.value = 2.5
    }
  }

  function onWheel(e: WheelEvent) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP
    scale.value = Math.min(SCALE_MAX, Math.max(SCALE_MIN, parseFloat((scale.value + delta).toFixed(2))))
    if (scale.value === 1) {
      tx.value = 0
      ty.value = 0
    }
    clampPan()
  }

  function onMouseDown(e: MouseEvent) {
    if (scale.value <= 1) return
    dragging = true
    dragStartX = e.clientX - tx.value
    dragStartY = e.clientY - ty.value
    e.preventDefault()
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging) return
    tx.value = e.clientX - dragStartX
    ty.value = e.clientY - dragStartY
    clampPan()
  }

  function onMouseUp() {
    dragging = false
  }

  function onTouchStart(e: TouchEvent) {
    if (e.touches.length === 2) {
      pinchDist0 = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      )
      pinchScale0 = scale.value
    } else if (e.touches.length === 1 && scale.value > 1) {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      panStartX = tx.value
      panStartY = ty.value
    }
  }

  function onTouchMove(e: TouchEvent) {
    if (e.touches.length === 2) {
      e.preventDefault()
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      )
      scale.value = Math.min(SCALE_MAX, Math.max(SCALE_MIN, parseFloat(((pinchScale0 * dist) / pinchDist0).toFixed(2))))
      if (scale.value === 1) {
        tx.value = 0
        ty.value = 0
      }
      clampPan()
    } else if (e.touches.length === 1 && scale.value > 1) {
      e.preventDefault()
      tx.value = panStartX + (e.touches[0].clientX - touchStartX)
      ty.value = panStartY + (e.touches[0].clientY - touchStartY)
      clampPan()
    }
  }

  const transform = computed(() => `translate(${tx.value}px, ${ty.value}px) scale(${scale.value})`)
  const zoomPercent = computed(() => Math.round(scale.value * 100))

  return {
    scale,
    zoomed,
    transform,
    zoomPercent,
    reset,
    zoomIn,
    zoomOut,
    toggleDblClick,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    SCALE_MIN,
    SCALE_MAX,
  }
}
