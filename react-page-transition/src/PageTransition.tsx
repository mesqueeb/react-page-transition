import React, { memo, type CSSProperties, type FC } from 'react'
import { Transition, TransitionGroup, type TransitionStatus } from 'react-transition-group'
import { presets, type AnimationMeta, type Preset } from './presets.js'

export type PageTransitionProps = {
  children: React.ReactNode
  preset: keyof typeof presets | Preset
  transitionKey: string
  style?: CSSProperties
  className?: string
  contentStyle?: CSSProperties
  contentClassName?: string
}

function PageTransition({ children, preset, transitionKey, style, className, contentStyle, contentClassName, ...rest }: PageTransitionProps) {
  const selectedPreset = typeof preset === 'string' ? presets[preset] : preset

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        ...style,
        position: 'relative',
        perspective: '1200px',
        overflow: 'hidden',
      }}
      className={className}
      {...rest}
    >
      <TransitionGroup component={null}>
        <Transition key={transitionKey} timeout={1000}>
          {(state) => (
            <PageTransitionWrapper preset={selectedPreset} state={state} style={contentStyle} className={contentClassName}>
              {children}
            </PageTransitionWrapper>
          )}
        </Transition>
      </TransitionGroup>
    </div>
  )
}

const PageTransitionWrapper: FC<{
  state: TransitionStatus
  preset: Preset
  style?: CSSProperties
  className?: string
  children?: React.ReactNode
}> = ({ state, preset, style, className, children }) => {
  const animationMeta: AnimationMeta | undefined = state === 'entering' ? preset.enter : state === 'exiting' ? preset.exit : undefined
  const styles: CSSProperties = {
    height: '100%',
    width: '100%',
    ...style,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    ...(animationMeta?.onTop ? { zIndex: 1 } : {}),
    ...(animationMeta?.delay ? { animationDelay: `${animationMeta.delay}ms` } : {}),
  }

  return (
    <div style={styles} className={`${className} ${animationMeta ? `page-transition-${animationMeta.name}` : ''}`}>
      {children}
    </div>
  )
}

export default memo(PageTransition)
