import { useEffect, useRef } from 'react'

const style: React.CSSProperties = {
  opacity: 'var(--overlay-opacity, 0)',

  mask: 'radial-gradient(var(--overlay-radius) var(--overlay-radius) at var(--overlay-x) var(--overlay-y), white 1%, transparent 50%)',
  WebkitMask:
    'radial-gradient(var(--overlay-radius) var(--overlay-radius) at var(--overlay-x) var(--overlay-y), white 1%, transparent 50%)',
}

export default function HoverGlowEffectOverlay() {
  const div = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!div.current) return
    div.current.style.setProperty('--overlay-opacity', `0.17`)
    div.current.style.setProperty('--overlay-radius', `30rem`)
    const handleMouseMove = (e: PointerEvent) => {
      if (div.current) {
        div.current.style.setProperty('--overlay-x', `${e.clientX}px`)
        div.current.style.setProperty('--overlay-y', `${e.clientY}px`)
      }
    }
    window.addEventListener('pointermove', handleMouseMove)
    return () => window.removeEventListener('pointermove', handleMouseMove)
  })
  return (
    <div
      aria-hidden={true}
      zz
      className="overlay dark-bg-white bg-teal-700 fixed inset-0 pointer-events-none select-none"
      style={style}
      ref={div}
    ></div>
  )
}
