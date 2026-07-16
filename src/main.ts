import './styles.css'
import "./styleguide.css"
import "lenis/dist/lenis.css"

import Lenis from "lenis"
import 'katex/dist/katex.min.css'
import renderMathInElement from 'katex/contrib/auto-render/auto-render.js'
import GSAP from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

const svgEl = document.querySelector<SVGAElement>("#frame")!

function initScripts() {
  initCursorInteractiveParticle()
  initLenisScroll()
  initKatex()
  initAnimation()
}

function initCursorInteractiveParticle() {
  console.log("initCursorInteractive")
  let x = 0
  let mouseX: number
  // const mouseDisplayX = document.getElementById('mouse')
  let y = 0
  let mouseY: number
  let isRunning = false

  const setX = GSAP.quickSetter("#cursor-group", "x", "px")
  const setY = GSAP.quickSetter("#cursor-group", "y", "px")

  svgEl.addEventListener("mousemove", (e) => {
    mouseX = e.offsetX
    mouseY = e.offsetY

    if (!isRunning) {
      isRunning = true
      update()
    }
  })

  function update() {
    const dx = mouseX - x
    const dy = mouseY - y

    const newX = GSAP.utils.interpolate(x, mouseX, 0.06)
    const newY = GSAP.utils.interpolate(y, mouseY, 0.06)

    x = newX
    y = newY

    setX(x)
    setY(y)


    const r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    if (r > 0.2) {
      requestAnimationFrame(update)
    } else {
      setX(x)
      setY(y)

      isRunning = false
      console.log("Parou")
    }
  }

}

function initLenisScroll() {
  const lenis = new Lenis({
    autoRaf: true
  })

  lenis.on("scroll", () => ScrollTrigger.update)

  GSAP.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  GSAP.ticker.lagSmoothing(0)

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

function initKatex() {
  console.log("KaTeX inicializado com sucesso.");

  renderMathInElement(document.body, {
    // @ts-ignore
    throwOnError: false,
    errorColor: '#ff3366',
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
    ],
  });
}

function initAnimation() {
  const circle1 = document.querySelector<SVGCircleElement>(".gaussian-kernel-example circle:nth-of-type(2)")
  const circle2 = document.querySelector<SVGCircleElement>(".gaussian-kernel-example circle:nth-of-type(1)")

  const tl = GSAP.timeline()

  tl.from(circle1, { cx: "25%" })
  tl.from(circle1, { cx: "75%" })

  tl.to(circle1, { repeat: -1, cx: "45%", yoyo: true, duration: 1.2, ease: "sine" }, 0)
  tl.to(circle2, { repeat: -1, cx: "55%", yoyo: true, duration: 1.2, ease: "sine" }, 0)

  const circle3 = document.querySelector<SVGCircleElement>(".gaussian-with-color-matrix circle:nth-of-type(3)")
  const circle4 = document.querySelector<SVGCircleElement>(".gaussian-with-color-matrix circle:nth-of-type(2)")

  tl.from(circle3, { cx: "25%" })
  tl.from(circle4, { cx: "75%" })

  tl.to(circle3, { repeat: -1, cx: "45%", yoyo: true, duration: 1.2, ease: "sine" }, 0)
  tl.to(circle4, { repeat: -1, cx: "55%", yoyo: true, duration: 1.2, ease: "sine" }, 0)
}


document.addEventListener("DOMContentLoaded", () => initScripts())
