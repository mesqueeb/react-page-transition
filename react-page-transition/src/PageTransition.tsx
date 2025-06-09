import React, { memo, useEffect, useState, type CSSProperties, type FC, type ReactNode } from 'react'
import { Transition, TransitionGroup, type TransitionStatus } from 'react-transition-group'
import { getTotalTransitionDuration } from './helpers.js'
import { presets, type AnimationMeta, type Preset, type PresetId } from './presets.js'

export type PageTransitionProps = {
  children: React.ReactNode
  preset: PresetId | Preset
  transitionKey: string
  style?: CSSProperties
  className?: string
  contentStyle?: CSSProperties
  contentClassName?: string
}

type TransitionInfo = {
  /** these need to be set BEFORE the enter props are updated, to make sure the component unmounting uses these */
  both: {
    preset: Preset
    /** calculated based on the total duration of the animation */
    duration: number
  }
  /** these need to be set TO INITIATE the transition, it will only apply the props to the newly entering component */
  enter: {
    key: string
    children: ReactNode
    /** increments each time, to make sure zIndex is always correct when emitting many animations fast */
    index: number
  }
}

function PageTransition({ children, preset, transitionKey, style, className, contentStyle, contentClassName, ...rest }: PageTransitionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQueue] = React.useState<TransitionInfo[]>([])

  const [transitionPropsBoth, setTransitionPropsBoth] = React.useState<TransitionInfo['both']>({
    preset: typeof preset === 'string' ? presets[preset] : preset,
    duration: getTotalTransitionDuration(typeof preset === 'string' ? presets[preset] : preset),
  })
  const [transitionPropsEnter, setTransitionPropsEnter] = React.useState<TransitionInfo['enter']>({
    key: transitionKey,
    children,
    index: 0,
  })

  function startTransition(transition: TransitionInfo) {
    setTransitionPropsBoth(transition.both)
    // we MUST use setTimeout to make sure the next preset and duration are correctly passed to the children that are about to be unmounted for some reason
    setTimeout(() => {
      // we want to keep these values the one they received when the page was mounted
      setTransitionPropsEnter(transition.enter)
    }, 1)
  }

  React.useEffect(() => {
    if (!transitionKey) return
    setQueue((currentQueue) => {
      const lastTransition = currentQueue[currentQueue.length - 1]
      if (
        // don't animate towards the same page twice
        lastTransition?.enter.key === transitionKey ||
        // don't animate if we're just mounting
        (!lastTransition && transitionPropsEnter.key === transitionKey)
      ) {
        return currentQueue
      }
      // maybe recalculate the duration
      const newPreset = typeof preset === 'string' ? presets[preset] : preset
      const isNewPreset = lastTransition?.both.preset.enter.name !== newPreset.enter.name || lastTransition?.both.preset.exit.name !== newPreset.exit.name
      const transition: TransitionInfo = {
        both: {
          preset: isNewPreset ? newPreset : lastTransition.both.preset,
          duration: isNewPreset ? getTotalTransitionDuration(newPreset) : lastTransition.both.duration,
        },
        enter: {
          key: transitionKey,
          children,
          index: lastTransition ? lastTransition.enter.index + 1 : 0,
        },
      }
      // maybe start animation immediately
      if (currentQueue.length === 0) startTransition(transition)

      return [...currentQueue, transition]
    })
  }, [transitionKey, children, preset])

  function handleExited() {
    setQueue((currentQueue) => {
      // slice off the first item that is now done animating
      const newQueue = currentQueue.slice(1)
      if (newQueue.length > 0) {
        const next = newQueue[0]
        startTransition(next)
      }
      return newQueue
    })
  }

  return (
    <>
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
          <Transition key={transitionPropsEnter.key} timeout={transitionPropsBoth.duration} onExited={handleExited}>
            {(state) => (
              <PageTransitionWrapper transitionKey={transitionPropsEnter.key} transitionCount={transitionPropsEnter.index} preset={transitionPropsBoth.preset} state={state} style={contentStyle} className={contentClassName}>
                {transitionPropsEnter.children}
              </PageTransitionWrapper>
            )}
          </Transition>
        </TransitionGroup>
      </div>
    </>
  )
}

const PageTransitionWrapper: FC<{
  transitionKey: string
  transitionCount: number
  state: TransitionStatus
  preset: Preset
  style?: CSSProperties
  className?: string
  children?: React.ReactNode
}> = ({ transitionCount, state, preset, style, className, children }) => {
  const [zIndex] = useState(() => transitionCount)
  const [isEntering, isEnteringSetter] = useState(() => state === 'entering')

  useEffect(() => {
    if (state === 'entering') {
      isEnteringSetter(true)
      setTimeout(() => isEnteringSetter(false), 600)
    }
    if (state === 'entered') {
      isEnteringSetter(false)
    }
    if (state === 'exiting' && isEntering) {
      // in fast successions, this is the issue, where the page abrupty goes into exiting animation,
      // even though it's still entering. so we want to delay the exiting animation.
      // it's covered in our ternary for `animationMeta` below.
      // the fix ONLY is required for when the entering animation is on top though!
    }
  }, [state])

  const animationMeta: AnimationMeta | undefined =
    state === 'entering'
      ? preset.enter
      : state === 'exiting' && isEntering && preset.enter.onTop
        ? preset.enter // Keep using enter animation if we're interrupted
        : state === 'exiting'
          ? preset.exit
          : undefined

  const styles: CSSProperties = {
    height: '100%',
    width: '100%',
    ...style,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex:
      // The default of `undefined` will make it so _exiting_ pages are on top.
      // Eg. when tapping "Next Page" fast on fall animation, it will not look weird.
      animationMeta?.onTop && state === 'entering'
        ? 1 + zIndex
        : // Or if this is an exiting page, but the the incoming animation will come on top
          // this one is hard to explain, but try tapping "Next Page" fast on "Slide over to left (from right)"
          // and without this next line the exiting pages won't overlay on top of each other correctly
          preset.enter.onTop && state === 'exiting'
          ? zIndex
          : undefined,
    ...(animationMeta?.delay ? { animationDelay: `${animationMeta.delay}ms` } : {}),
  }

  return (
    <div style={styles} className={`${className} ${animationMeta ? `page-transition-${animationMeta.name}` : ''}`}>
      {children}
    </div>
  )
}

export default memo(PageTransition)
