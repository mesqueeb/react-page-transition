import { describe, expect, test } from 'vitest'
import { cssAst, formatCSSString } from './formatcss'

describe('cssAst', () => {
  test('css AST from to', () => {
    const input = `@keyframes scaleDown { from {  } to { transform: scale(.8) }  } .pt-page-scaleDown { animation: scaleDown .7s ease both;  }`

    const expected = {
      keyframes: {
        name: 'scaleDown',
        content: 'from { } to { transform: scale(.8) }',
      },
      class: {
        name: 'pt-page-scaleDown',
        content: 'animation: scaleDown .7s ease both',
      },
    }

    expect(cssAst(input)).toEqual(expected)
  })

  test('css AST %', () => {
    const input = `@keyframes rotateCubeLeftIn  { 0% { opacity: .3; transform: translateX(100%) rotateY(90deg) } 50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg) } } .pt-page-rotateCubeLeftIn     { transform-origin: 0% 50%; animation: rotateCubeLeftIn .6s both ease-in }`

    const expected = {
      keyframes: {
        name: 'rotateCubeLeftIn',
        content:
          '0% { opacity: .3; transform: translateX(100%) rotateY(90deg) } 50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg) }',
      },
      class: {
        name: 'pt-page-rotateCubeLeftIn',
        content: 'transform-origin: 0% 50%; animation: rotateCubeLeftIn .6s both ease-in',
      },
    }

    expect(cssAst(input)).toEqual(expected)
  })
})

describe('formatCSSString', () => {
  // Grouping - Group related animations together with proper spacing and comments
  test('groups related animations together with proper spacing and comments', () => {
    const input = `
/* Scale Animations */
@keyframes scaleDown { from { } to { transform: scale(.8)  } } .pt-page-scaleDown { animation: scaleDown .7s ease both;  }
@keyframes scaleUp { from { transform: scale(.8) } } .pt-page-scaleUp { animation: scaleUp .7s ease both; }
`

    const expected = `/* Scale Animations */
@keyframes scaleDown { from { } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }
@keyframes scaleUp   { from { transform: scale(.8) }        } .pt-page-scaleUp   { animation: scaleUp .7s ease both   }`

    expect(formatCSSString(input)).toBe(expected)
  })

  // Grouping - Group related animations together with proper spacing and comments
  test('groups related animations together with proper spacing and comments - 2', () => {
    const input = `
/* Scale Animations */
@keyframes scaleUp { from { transform: scale(.8) } } .pt-page-scaleUp { animation: scaleUp .7s ease both }
@keyframes scaleDown { from {  } to { transform: scale(.8)  } } .pt-page-scaleDown { animation: scaleDown .7s ease both  }
`

    const expected = `/* Scale Animations */
@keyframes scaleUp   { from { transform: scale(.8) }        } .pt-page-scaleUp   { animation: scaleUp .7s ease both   }
@keyframes scaleDown { from { } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }`

    expect(formatCSSString(input)).toBe(expected)
  })

  // Group Independence - Each animation group should be self-contained
  test('keeps groups self-contained with consistent spacing', () => {
    const input = `
/* Move Animations */
@keyframes moveToLeft { from { } to { transform: translateX(-100%) } } .pt-page-moveToLeft { animation: moveToLeft .6s ease both }
@keyframes moveFromLeft { from { transform: translateX(-100%) } } .pt-page-moveFromLeft { animation: moveFromLeft .6s ease both }

/* Scale Animations */
@keyframes scaleDown { from { } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }
`

    const expected = `/* Move Animations */
@keyframes moveToLeft   { from { } to { transform: translateX(-100%) } } .pt-page-moveToLeft   { animation: moveToLeft .6s ease both   }
@keyframes moveFromLeft { from { transform: translateX(-100%) }        } .pt-page-moveFromLeft { animation: moveFromLeft .6s ease both }

/* Scale Animations */
@keyframes scaleDown { from { } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }`

    expect(formatCSSString(input)).toBe(expected)
  })
})
