import type { Preset } from './presets'

/** in milliseconds */
function getAnimationDurationFromClass(className: string): number {
  const el = document.createElement('div')
  el.style.display = 'none'
  el.className = className
  document.body.appendChild(el)

  const duration = getComputedStyle(el).animationDuration
  el.remove()
  if (duration.includes('ms')) return Number(duration.replace('ms', ''))
  return Number(duration.replace('s', '')) * 1000
}

export function getTotalTransitionDuration(preset: Preset): number {
  const exitDuration = getAnimationDurationFromClass(`page-transition-${preset.exit.name}`)
  const enterDuration = getAnimationDurationFromClass(`page-transition-${preset.enter.name}`)

  return Math.max(exitDuration + (preset.exit.delay ?? 0), enterDuration + (preset.enter.delay ?? 0))
}
