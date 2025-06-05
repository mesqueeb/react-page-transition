import type { CSSProperties, FC, ReactNode } from 'react'

export type PageTransitionGroupProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export const PageTransitionGroup: FC<PageTransitionGroupProps> = ({
  children,
  style,
  className,
}) => {
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
    >
      {children}
    </div>
  )
}
