import { onMounted, onUnmounted, watch, type Ref } from 'vue'

interface ColorSet {
  cols: string[]
  aMin: number
  aMax: number
  line: string
  lineA: number
}

class Dot {
  x = 0
  y = 0
  r = 0
  vx = 0
  vy = 0
  col = ''
  a = 0

  cvs: HTMLCanvasElement
  getColors: () => ColorSet

  constructor(cvs: HTMLCanvasElement, getColors: () => ColorSet) {
    this.cvs = cvs
    this.getColors = getColors
    this.spawn()
  }

  spawn() {
    this.x = Math.random() * this.cvs.width
    this.y = Math.random() * this.cvs.height
    this.r = Math.random() * 1.6 + 0.4
    this.vx = (Math.random() - 0.5) * 0.35
    this.vy = (Math.random() - 0.5) * 0.35
    const c = this.getColors()
    this.col = c.cols[Math.floor(Math.random() * c.cols.length)]
    this.a = c.aMin + Math.random() * (c.aMax - c.aMin)
  }

  tick() {
    this.x += this.vx
    this.y += this.vy
    if (this.x < 0 || this.x > this.cvs.width) this.vx *= -1
    if (this.y < 0 || this.y > this.cvs.height) this.vy *= -1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.col},${this.a})`
    ctx.fill()
  }
}

/** Ported from the legacy canvas particle background. */
export function useParticles(canvasRef: Ref<HTMLCanvasElement | null>, isDark: Ref<boolean>) {
  let ctx: CanvasRenderingContext2D | null = null
  let particles: Dot[] = []
  let rafId = 0

  function getColors(): ColorSet {
    return isDark.value
      ? { cols: ['124,111,255', '0,212,255'], aMin: 0.07, aMax: 0.45, line: '124,111,255', lineA: 0.12 }
      : { cols: ['100,80,220', '0,130,180'], aMin: 0.06, aMax: 0.28, line: '100,80,220', lineA: 0.08 }
  }

  function resize() {
    const cvs = canvasRef.value
    if (!cvs) return
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
  }

  function initParticles() {
    const cvs = canvasRef.value
    if (!cvs) return
    // 50 dots keeps the O(n²) line-connection check to ~1,225/frame.
    particles = Array.from({ length: 50 }, () => new Dot(cvs, getColors))
  }

  function connectDots() {
    if (!ctx) return
    const c = getColors()
    const DIST = 100
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const d = Math.hypot(dx, dy)
        if (d < DIST) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(${c.line},${c.lineA * (1 - d / DIST)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  function loop() {
    const cvs = canvasRef.value
    if (!cvs || !ctx) return
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    connectDots()
    particles.forEach((p) => {
      p.tick()
      p.draw(ctx!)
    })
    rafId = requestAnimationFrame(loop)
  }

  function start() {
    const cvs = canvasRef.value
    if (!cvs) return
    ctx = cvs.getContext('2d')
    resize()
    initParticles()
    loop()
  }

  function handleResize() {
    resize()
    initParticles()
  }

  onMounted(() => {
    // Defer start so the canvas never competes with FCP/LCP rendering.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(start, { timeout: 200 })
    } else {
      setTimeout(start, 200)
    }
    window.addEventListener('resize', handleResize)
  })

  watch(isDark, () => {
    // Re-spawn so existing dots pick up the new theme's colors.
    initParticles()
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('resize', handleResize)
  })
}
