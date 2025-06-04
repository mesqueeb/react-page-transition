import type { FC, ReactNode } from 'react'

interface PageTransitionGroupProps {
  children: ReactNode
}

export const PageTransitionGroup: FC<PageTransitionGroupProps> = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: '1200px',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
