import { type CSSProperties, type FC } from 'react'
import type { TransitionStatus } from 'react-transition-group'
import { type Animation } from './animations'

export interface PageTransitionWrapperProps {
  state: TransitionStatus
  enterAnimation: Animation
  exitAnimation: Animation
  style?: CSSProperties
  className?: string
  children?: React.ReactNode
}

const createAnimationStyles = ({
  delay,
  duration,
  timing,
  fill,
  origin,
  onTop,
}: Animation): CSSProperties => ({
  animationDuration: `${duration}ms`,
  animationTimingFunction: timing,
  animationFillMode: fill,
  animationDelay: delay || '0ms',
  transformOrigin: origin || '50% 50%',
  ...(onTop && { zIndex: 1 }),
})

const stateMap = {
  entering: (animation: Animation): CSSProperties => ({
    ...createAnimationStyles(animation),
    animationName: 'page-transition-enter',
  }),
  exiting: (animation: Animation): CSSProperties => ({
    ...createAnimationStyles(animation),
    animationName: 'page-transition-exit',
  }),
} as const

export const PageTransitionWrapper: FC<PageTransitionWrapperProps> = ({
  state,
  enterAnimation,
  exitAnimation,
  style,
  className,
  children,
}) => {
  const styles: CSSProperties = {
    height: '100%',
    width: '100%',
    ...style,
    backfaceVisibility: 'hidden',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    transformStyle: 'preserve-3d',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
    ...(state && (state === 'entering' || state === 'exiting')
      ? stateMap[state](state === 'entering' ? enterAnimation : exitAnimation)
      : {}),
  }

  return (
    <>
      {(state === 'entering' || state === 'exiting') && (
        <style>
          {`
            @keyframes page-transition-enter {
              ${enterAnimation.keyframes}
            }
            @keyframes page-transition-exit {
              ${exitAnimation.keyframes}
            }
          `}
        </style>
      )}
      <div style={styles} className={className}>
        {children}
      </div>
    </>
  )
}
