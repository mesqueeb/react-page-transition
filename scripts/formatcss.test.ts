import { describe, expect, test } from 'vitest'
import { cssAst, formatCSSString } from './formatcss'

describe('cssAst', () => {
  test('css AST from to', () => {
    const input = `@keyframes scaleDown { from { } to { transform: scale(.8)  } } .pt-page-scaleDown { animation: scaleDown .7s ease both  }`

    const expected = [
      {
        keyframesName: 'scaleDown',
        keyframes: { from: {}, to: { transform: 'scale(.8)' } },
      },
      {
        className: 'pt-page-scaleDown',
        class: { animation: 'scaleDown .7s ease both' },
      },
    ]

    expect(cssAst(input)).toEqual(expected)
  })

  test('css AST %', () => {
    const input = `@keyframes rotateCubeLeftIn  { 0% { opacity: .3; transform: translateX(100%) rotateY(90deg) } 50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg) } } .pt-page-rotateCubeLeftIn     { transform-origin: 0% 50%; animation: rotateCubeLeftIn .6s both ease-in }`

    const expected = [
      {
        keyframesName: 'rotateCubeLeftIn',
        keyframes: {
          '0%': { opacity: '.3', transform: 'translateX(100%) rotateY(90deg)' },
          '50%': {
            'animation-timing-function': 'ease-out',
            'transform': 'translateX(50%) translateZ(-200px) rotateY(45deg)',
          },
        },
      },
      {
        className: 'pt-page-rotateCubeLeftIn',
        class: { 'transform-origin': '0% 50%', 'animation': 'rotateCubeLeftIn .6s both ease-in' },
      },
    ]

    expect(cssAst(input)).toEqual(expected)
  })
  test('css AST %, %, %', () => {
    const input = `@keyframes rotateSlideIn  { 0%, 25% { opacity: .5; transform: translateZ(-500px) translateX(200%) } 75% { opacity: .5; transform: translateZ(-500px) } 100% { opacity: 1; transform: translateZ(0) translateX(0) } } .pt-page-rotateSlideIn  { animation: rotateSlideIn 1s both ease }`

    const expected = [
      {
        keyframesName: 'rotateSlideIn',
        keyframes: {
          '0%, 25%': { opacity: '.5', transform: 'translateZ(-500px) translateX(200%)' },
          '75%': { opacity: '.5', transform: 'translateZ(-500px)' },
          '100%': { opacity: '1', transform: 'translateZ(0) translateX(0)' },
        },
      },
      {
        className: 'pt-page-rotateSlideIn',
        class: { animation: 'rotateSlideIn 1s both ease' },
      },
    ]

    expect(cssAst(input)).toEqual(expected)
  })
})

describe('formatCSSString', () => {
  // Rule 1: Grouping - Group related animations together with proper spacing and comments
  test('groups related animations together with proper spacing and comments', () => {
    const input = `
/* Scale Animations */
@keyframes scaleDown { from { } to { transform: scale(.8)  } } .pt-page-scaleDown { animation: scaleDown .7s ease both  }
@keyframes scaleUp { from { transform: scale(.8) } } .pt-page-scaleUp { animation: scaleUp .7s ease both }
`

    const expected = `/* Scale Animations */
@keyframes scaleDown { from {                      } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }
@keyframes scaleUp   { from { transform: scale(.8) }                             } .pt-page-scaleUp   { animation: scaleUp .7s ease both   }`

    expect(formatCSSString(input)).toBe(expected)
  })

  // Rule 1: Grouping - Group related animations together with proper spacing and comments
  test('groups related animations together with proper spacing and comments - 2', () => {
    const input = `
/* Scale Animations */
@keyframes scaleUp { from { transform: scale(.8) } } .pt-page-scaleUp { animation: scaleUp .7s ease both }
@keyframes scaleDown { from {  } to { transform: scale(.8)  } } .pt-page-scaleDown { animation: scaleDown .7s ease both  }
`

    const expected = `/* Scale Animations */
@keyframes scaleUp   { from { transform: scale(.8) }                             } .pt-page-scaleUp   { animation: scaleUp .7s ease both   }
@keyframes scaleDown { from {                      } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }`

    expect(formatCSSString(input)).toBe(expected)
  })

  // Rule 2: Group Independence - Each animation group should be self-contained
  test('keeps groups self-contained with consistent spacing', () => {
    const input = `
/* Move Animations */
@keyframes moveToLeft { from { } to { transform: translateX(-100%) } } .pt-page-moveToLeft { animation: moveToLeft .6s ease both }
@keyframes moveFromLeft { from { transform: translateX(-100%) } } .pt-page-moveFromLeft { animation: moveFromLeft .6s ease both }

/* Scale Animations */
@keyframes scaleDown { from { } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }
`

    const expected = `/* Move Animations */
@keyframes moveToLeft   { from {                              } to { transform: translateX(-100%) } } .pt-page-moveToLeft   { animation: moveToLeft .6s ease both   }
@keyframes moveFromLeft { from { transform: translateX(-100%) }                                     } .pt-page-moveFromLeft { animation: moveFromLeft .6s ease both }

/* Scale Animations */
@keyframes scaleDown { from { } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }`

    expect(formatCSSString(input)).toBe(expected)
  })

  // Rule 3: Alignment within a group - Align brackets
  test('aligns brackets and content within each group', () => {
    const input = `
/* Fade Animations */
@keyframes moveToLeftFade { from { } to { transform: translateX(-100%); opacity: 0.3 } } .pt-page-moveToLeftFade { animation: moveToLeftFade .7s ease both }
@keyframes moveFromLeftFade { from { transform: translateX(-100%); opacity: 0.3 } } .pt-page-moveFromLeftFade { animation: moveFromLeftFade .7s ease both }
`

    const expected = `/* Fade Animations */
@keyframes moveToLeftFade   { from {                                            } to { transform: translateX(-100%); opacity: 0.3 } } .pt-page-moveToLeftFade   { animation: moveToLeftFade .7s ease both   }
@keyframes moveFromLeftFade { from { transform: translateX(-100%); opacity: 0.3 }                                                   } .pt-page-moveFromLeftFade { animation: moveFromLeftFade .7s ease both }`

    expect(formatCSSString(input)).toBe(expected)
  })

  // Rule 3: Alignment within a group - Align attributes
  test('aligns brackets and content within each group', () => {
    const input = `
/* Animations */
   @keyframes rotateRightSideFirst  { 0% { } 40% { transform: rotateY(15deg); opacity: .8; animation-timing-function: ease-out } 100% { transform: scale(0.8) translateZ(-200px); opacity: 0 } } .pt-page-rotateRightSideFirst  { transform-origin: 0% 50%; animation: rotateRightSideFirst .8s both ease-in }
	 @keyframes rotateLeftSideFirst   { 0% { } 40% { transform: rotateY(-15deg); opacity: .8; animation-timing-function: ease-out } 100% { transform: scale(0.8) translateZ(-200px); opacity: 0 } } .pt-page-rotateLeftSideFirst   { transform-origin: 100% 50%; animation: rotateLeftSideFirst .8s both ease-in  }
`

    const expected = `/* Animations */
   @keyframes rotateRightSideFirst { 0% { } 40% { transform: rotateY(15deg);  opacity: .8; animation-timing-function: ease-out } 100% { transform: scale(0.8) translateZ(-200px); opacity: 0 } } .pt-page-rotateRightSideFirst { transform-origin: 0% 50%;   animation: rotateRightSideFirst .8s both ease-in }
	 @keyframes rotateLeftSideFirst  { 0% { } 40% { transform: rotateY(-15deg); opacity: .8; animation-timing-function: ease-out } 100% { transform: scale(0.8) translateZ(-200px); opacity: 0 } } .pt-page-rotateLeftSideFirst  { transform-origin: 100% 50%; animation: rotateLeftSideFirst .8s both ease-in  }`

    expect(formatCSSString(input)).toBe(expected)
  })

  // Rule 3: Alignment within a group - Align percentages
  test('aligns brackets and content within each group', () => {
    const input = `
/* Animations */
@keyframes rotateCubeLeftOut { 0% { } 50% { animation-timing-function: ease-out; transform: translateX(-50%) translateZ(-200px) rotateY(-45deg) } 100% { opacity: .3; transform: translateX(-100%) rotateY(-90deg) } } .pt-page-rotateCubeLeftOut    { transform-origin: 100% 50%; animation: rotateCubeLeftOut .6s both ease-in }
@keyframes rotateCubeLeftIn  { 0% { opacity: .3; transform: translateX(100%) rotateY(90deg) } 50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg) } } .pt-page-rotateCubeLeftIn     { transform-origin: 0% 50%; animation: rotateCubeLeftIn .6s both ease-in }
`

    const expected = `/* Animations */
@keyframes rotateCubeLeftOut { 0% {                                                         } 50% { animation-timing-function: ease-out; transform: translateX(-50%) translateZ(-200px) rotateY(-45deg) } 100% { opacity: .3; transform: translateX(-100%) rotateY(-90deg) } } .pt-page-rotateCubeLeftOut { transform-origin: 100% 50%; animation: rotateCubeLeftOut .6s both ease-in }
@keyframes rotateCubeLeftIn  { 0% { opacity: .3; transform: translateX(100%) rotateY(90deg) } 50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg)   }                                                                    } .pt-page-rotateCubeLeftIn  { transform-origin: 0% 50%;   animation: rotateCubeLeftIn .6s both ease-in  }`
    expect(formatCSSString(input)).toBe(expected)
  })

  // Rule 4: Property Formatting - Remove semicolons from last properties and align values
  test('removes semicolons from last properties and aligns values', () => {
    const input = `
/* Rotate Animations */
@keyframes rotateOutNewspaper { from { } to { transform: translateZ(-3000px) rotateZ(360deg); opacity: 0; } } .pt-page-rotateOutNewspaper { transform-origin: 50% 50%; animation: rotateOutNewspaper .5s both ease-in }
@keyframes rotateInNewspaper { from { transform: translateZ(-3000px) rotateZ(-360deg); opacity: 0; } } .pt-page-rotateInNewspaper { transform-origin: 50% 50%; animation: rotateInNewspaper .5s both ease-out }
`

    const expected = `/* Rotate Animations */
@keyframes rotateOutNewspaper { from {                                                             } to { transform: translateZ(-3000px) rotateZ(360deg); opacity: 0 } } .pt-page-rotateOutNewspaper { transform-origin: 50% 50%; animation: rotateOutNewspaper .5s both ease-in }
@keyframes rotateInNewspaper  { from { transform: translateZ(-3000px) rotateZ(-360deg); opacity: 0 }                                                                   } .pt-page-rotateInNewspaper  { transform-origin: 50% 50%; animation: rotateInNewspaper .5s both ease-out }`

    expect(formatCSSString(input)).toBe(expected)
  })
})
