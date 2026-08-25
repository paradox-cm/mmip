'use client'

import { type PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import styles from './seal-animation.module.css'

const ANIMATION_DURATION_MS = 4000
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const ORBIT_SPEED_DEGREES_PER_SECOND = 8
const ORBIT_ACCELERATION_SECONDS = 0.7
const SEAL_CENTER_X = 122
const SEAL_CENTER_Y = 125.5

function setOrbitRotation(orbit: SVGGElement, angle: number) {
  const radians = (angle * Math.PI) / 180
  const cosine = Math.cos(radians)
  const sine = Math.sin(radians)
  const translateX = SEAL_CENTER_X - cosine * SEAL_CENTER_X + sine * SEAL_CENTER_Y
  const translateY = SEAL_CENTER_Y - sine * SEAL_CENTER_X - cosine * SEAL_CENTER_Y
  const matrix = [cosine, sine, -sine, cosine, translateX, translateY]
    .map(value => Number(value.toFixed(8)))
    .join(' ')

  // Encode the pivot directly into the SVG matrix. This keeps the source
  // viewBox center fixed regardless of responsive size or group bounds.
  orbit.setAttribute('transform', `matrix(${matrix})`)
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY)
    const syncPreference = () => setReducedMotion(media.matches)

    syncPreference()
    media.addEventListener('change', syncPreference)
    return () => media.removeEventListener('change', syncPreference)
  }, [])

  return reducedMotion
}

export default function SealAnimation({
  svgMarkup,
  className,
  showCaption = true,
}: {
  svgMarkup: string
  className?: string
  showCaption?: boolean
}) {
  const reducedMotion = usePrefersReducedMotion()
  const svgInnerHtml = useMemo(() => ({ __html: svgMarkup }), [svgMarkup])
  const [cycle, setCycle] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sealRef = useRef<HTMLSpanElement>(null)
  const hoveringRef = useRef(false)
  const isPlayingRef = useRef(true)
  const orbitAngleRef = useRef(0)
  const orbitVelocityRef = useRef(0)
  const orbitFrameRef = useRef<number | null>(null)
  const orbitTimeRef = useRef<number | null>(null)
  const orbitModeRef = useRef<'idle' | 'spinning' | 'settling'>('idle')

  const getOrbitElement = useCallback(
    () => sealRef.current?.querySelector<SVGGElement>('[data-seal-orbit]') ?? null,
    [],
  )

  const setOrbitState = useCallback((state?: 'spinning' | 'settling') => {
    if (state) buttonRef.current?.setAttribute('data-orbit-state', state)
    else buttonRef.current?.removeAttribute('data-orbit-state')
  }, [])

  const stopOrbitFrame = useCallback(() => {
    if (orbitFrameRef.current !== null) window.cancelAnimationFrame(orbitFrameRef.current)
    orbitFrameRef.current = null
    orbitTimeRef.current = null
  }, [])

  const resetOrbit = useCallback(() => {
    stopOrbitFrame()
    orbitAngleRef.current = 0
    orbitVelocityRef.current = 0
    orbitModeRef.current = 'idle'
    setOrbitState()

    const orbit = getOrbitElement()
    if (orbit) setOrbitRotation(orbit, 0)
  }, [getOrbitElement, setOrbitState, stopOrbitFrame])

  const startOrbit = useCallback(() => {
    if (reducedMotion || isPlayingRef.current || orbitModeRef.current === 'spinning') return

    const orbit = getOrbitElement()
    if (!orbit) return

    stopOrbitFrame()
    orbitModeRef.current = 'spinning'
    setOrbitState('spinning')
    orbitTimeRef.current = performance.now()

    const spin = (time: number) => {
      if (orbitModeRef.current !== 'spinning' || !hoveringRef.current || isPlayingRef.current) {
        orbitFrameRef.current = null
        orbitTimeRef.current = null
        return
      }

      const previousTime = orbitTimeRef.current ?? time
      const elapsedSeconds = Math.min((time - previousTime) / 1000, 0.05)
      const acceleration = 1 - Math.exp(-elapsedSeconds / ORBIT_ACCELERATION_SECONDS)

      orbitVelocityRef.current +=
        (ORBIT_SPEED_DEGREES_PER_SECOND - orbitVelocityRef.current) * acceleration
      orbitAngleRef.current += orbitVelocityRef.current * elapsedSeconds
      setOrbitRotation(orbit, orbitAngleRef.current)
      orbitTimeRef.current = time
      orbitFrameRef.current = window.requestAnimationFrame(spin)
    }

    orbitFrameRef.current = window.requestAnimationFrame(spin)
  }, [getOrbitElement, reducedMotion, setOrbitState, stopOrbitFrame])

  const settleOrbit = useCallback(() => {
    const orbit = getOrbitElement()
    if (!orbit || reducedMotion) {
      resetOrbit()
      return
    }

    stopOrbitFrame()
    orbitVelocityRef.current = 0
    const currentAngle = orbitAngleRef.current
    const targetAngle = Math.round(currentAngle / 360) * 360
    const distance = Math.abs(targetAngle - currentAngle)

    if (distance < 0.1) {
      resetOrbit()
      return
    }

    const duration = Math.round(450 + Math.min(distance / 180, 1) * 650)
    const startedAt = performance.now()
    orbitModeRef.current = 'settling'
    setOrbitState('settling')

    const settle = (time: number) => {
      if (orbitModeRef.current !== 'settling') return

      const progress = Math.min((time - startedAt) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 4)
      orbitAngleRef.current = currentAngle + (targetAngle - currentAngle) * easedProgress
      setOrbitRotation(orbit, orbitAngleRef.current)

      if (progress < 1) {
        orbitFrameRef.current = window.requestAnimationFrame(settle)
      } else {
        setOrbitRotation(orbit, 0)
        orbitAngleRef.current = 0
        orbitFrameRef.current = null
        orbitModeRef.current = 'idle'
        setOrbitState()
      }
    }

    orbitFrameRef.current = window.requestAnimationFrame(settle)
  }, [getOrbitElement, reducedMotion, resetOrbit, setOrbitState, stopOrbitFrame])

  const updatePlaying = useCallback((playing: boolean) => {
    isPlayingRef.current = playing
    if (playing) buttonRef.current?.setAttribute('data-playing', 'true')
    else buttonRef.current?.removeAttribute('data-playing')
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      updatePlaying(false)
      resetOrbit()
      return
    }

    updatePlaying(true)
    resetOrbit()
    const timer = window.setTimeout(() => {
      updatePlaying(false)
      if (hoveringRef.current) window.requestAnimationFrame(startOrbit)
    }, ANIMATION_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [cycle, reducedMotion, resetOrbit, startOrbit, updatePlaying])

  useEffect(
    () => () => {
      stopOrbitFrame()
    },
    [stopOrbitFrame],
  )

  function replay() {
    if (reducedMotion) return
    updatePlaying(true)
    resetOrbit()
    setCycle(current => current + 1)
  }

  function handlePointerEnter(event: PointerEvent<HTMLButtonElement>) {
    const supportsHover = event.pointerType === 'mouse' || event.pointerType === 'pen'
    if (!supportsHover) return

    hoveringRef.current = true
    startOrbit()
  }

  function handlePointerLeave(event: PointerEvent<HTMLButtonElement>) {
    const supportsHover = event.pointerType === 'mouse' || event.pointerType === 'pen'
    if (!supportsHover) return

    hoveringRef.current = false
    settleOrbit()
  }

  return (
    <figure className={cn('flex w-full max-w-sm flex-col items-center gap-4', className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Replay the Resilient Relatives seal entry animation"
        disabled={reducedMotion}
        onClick={replay}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={cn(
          'block w-full cursor-pointer rounded-pill outline-none transition-shadow duration-fast ease-standard focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default',
          showCaption ? 'p-2' : 'p-0',
        )}
      >
        <span
          key={cycle}
          ref={sealRef}
          className={styles.sealCanvas}
          // The source is a trusted, repository-owned SVG. Injecting it keeps every
          // original path coordinate intact while allowing catalog-only animation hooks.
          dangerouslySetInnerHTML={svgInnerHtml}
        />
      </button>
      {showCaption ? (
        <figcaption className="text-center text-sm text-foreground-subtle">
          {reducedMotion
            ? 'The completed seal is shown because reduced motion is enabled.'
            : 'Hover to orbit the lettering; move away to let it settle.'}
        </figcaption>
      ) : null}
    </figure>
  )
}
