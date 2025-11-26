import { useEffect, useRef, type CSSProperties } from 'react'
import { presets, type Preset } from './presets'

type Entries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T][]

function objectFromEntries<T extends { [key in string]: unknown }>(entries: Entries<T>): T {
  return Object.fromEntries(entries) as T
}

export type ANIMATION_GROUP = 'slide' | 'cube'

const animationGroupPresets: { [key in ANIMATION_GROUP]: { forwards: Preset; backwards: Preset } } = {
  slide: {
    forwards: presets.moveToLeftFromRight,
    backwards: presets.moveToRightFromLeft,
  },
  cube: {
    forwards: presets.cubeToLeft,
    backwards: presets.cubeToRight,
  },
} as const

function getTabProps<T extends string>(params: { tabName: T; activeTab: T; previousTab: T; animationGroup: ANIMATION_GROUP; direction: 'forwards' | 'backwards' }): { className: string; style: CSSProperties } {
  const { tabName, activeTab, previousTab, animationGroup, direction } = params

  const { enter, exit } = animationGroupPresets[animationGroup][direction]

  let className
  const style: CSSProperties = {}

  if (tabName === activeTab && activeTab !== previousTab) {
    // Entering tab - animate from right, will stay centered after animation
    className = `page-transition-${enter.name}`
    style.zIndex = 2
  } else if (tabName === previousTab && activeTab !== previousTab) {
    // Exiting tab - animate to left, will stay off-screen left after animation
    className = `page-transition-${exit.name}`
    style.zIndex = 1
  } else if (tabName === activeTab) {
    className = ''
    // Active tab at rest - no animation needed, stays centered
    style.zIndex = 1
  } else {
    // Inactive tabs - positioned off-screen right (ready to animate in)
    className = `page-transition-${exit.name}`
    style.animationDuration = '0s'
    style.zIndex = 0
  }

  return { className, style }
}

export function useTabs<T extends string>(params: { activeTab: T; tabNames: T[]; animation: ANIMATION_GROUP }): { tabs: { [key in T]: { className: string; style: CSSProperties } } } {
  const { activeTab, tabNames, animation } = params

  const previousTabRef = useRef<T>(activeTab)
  /** Track the previous tab for this render cycle */
  const previousTab = previousTabRef.current
  /** Update the ref for the next render */
  useEffect(() => { previousTabRef.current = activeTab }) // prettier-ignore

  const direction = tabNames.indexOf(activeTab) > tabNames.indexOf(previousTab) ? 'forwards' : 'backwards'
  const tabs: { [key in T]: { className: string; style: CSSProperties } } = objectFromEntries(tabNames.map((tabName) => [tabName, getTabProps<T>({ tabName, activeTab, previousTab, animationGroup: animation, direction })]))

  return { tabs }
}
