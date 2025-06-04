import React, { memo, type CSSProperties } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { animations, type Animation } from './animations'
import { PageTransitionGroup } from './PageTransitionGroup'
import { PageTransitionWrapper } from './PageTransitionWrapper'
import { presets } from './presets'
import { type AnimationName } from './types'

interface AnimationOverride {
  name: AnimationName
  delay?: number
  onTop?: boolean
}

export interface PageTransitionProps {
  children: React.ReactNode
  enterAnimation?: AnimationName | AnimationOverride
  exitAnimation?: AnimationName | AnimationOverride
  preset: keyof typeof presets
  transitionKey: string
  style?: CSSProperties
  className?: string
  contentStyle?: CSSProperties
  contentClassName?: string
}

function PageTransition({
  children,
  enterAnimation: enterAnimationOverride,
  exitAnimation: exitAnimationOverride,
  preset,
  transitionKey,
  style,
  className,
  contentStyle,
  contentClassName,
  ...rest
}: PageTransitionProps) {
  const selectEnterAnimation = (): Animation => {
    if (enterAnimationOverride) {
      if (typeof enterAnimationOverride === 'string') {
        return animations[enterAnimationOverride]
      }
      const baseAnimation = animations[enterAnimationOverride.name]
      return {
        ...baseAnimation,
        delay: enterAnimationOverride.delay ? `${enterAnimationOverride.delay}ms` : undefined,
        onTop: enterAnimationOverride.onTop,
      }
    }
    if (preset) {
      const presetAnimation = presets[preset].enter
      const baseAnimation = animations[presetAnimation.name]
      return {
        ...baseAnimation,
        delay: presetAnimation.delay ? `${presetAnimation.delay}ms` : undefined,
        onTop: presetAnimation.onTop,
      }
    }
    return animations.rotateSlideIn
  }

  const selectExitAnimation = (): Animation => {
    if (exitAnimationOverride) {
      if (typeof exitAnimationOverride === 'string') {
        return animations[exitAnimationOverride]
      }
      const baseAnimation = animations[exitAnimationOverride.name]
      return {
        ...baseAnimation,
        delay: exitAnimationOverride.delay ? `${exitAnimationOverride.delay}ms` : undefined,
        onTop: exitAnimationOverride.onTop,
      }
    }
    if (preset) {
      const presetAnimation = presets[preset].exit
      const baseAnimation = animations[presetAnimation.name]
      return {
        ...baseAnimation,
        delay: presetAnimation.delay ? `${presetAnimation.delay}ms` : undefined,
        onTop: presetAnimation.onTop,
      }
    }
    return animations.rotateSlideIn
  }

  const enterAnimation = selectEnterAnimation()
  const exitAnimation = selectExitAnimation()
  const timeout = Math.max(enterAnimation.duration, exitAnimation.duration)

  return (
    <PageTransitionGroup style={style} className={className} {...rest}>
      <TransitionGroup component={null}>
        <Transition key={transitionKey} timeout={timeout}>
          {(state) => (
            <PageTransitionWrapper
              enterAnimation={enterAnimation}
              exitAnimation={exitAnimation}
              state={state}
              style={contentStyle}
              className={contentClassName}
            >
              {children}
            </PageTransitionWrapper>
          )}
        </Transition>
      </TransitionGroup>
    </PageTransitionGroup>
  )
}

export default memo(PageTransition)
