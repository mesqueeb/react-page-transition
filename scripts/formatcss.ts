/**
Please reformat this CSS animations file according to the following rules:

Our goal is to have one line per keyframe + animation class and keep as much of the bracketing aligned across groups for easier visual parsing.

1. Grouping:
   - Group related animations together (e.g., all 'scale' animations)
   - Add a single empty line break between groups
   - Add section comments for each group
   Example:
   ```css
   // Scale Animations
   @keyframes scaleDown { from {                      } to { transform: scale(.8) } } .pt-page-scaleDown { animation: scaleDown .7s ease both }
   @keyframes scaleUp   { from { transform: scale(.8) }                             } .pt-page-scaleUp   { animation: scaleUp .7s ease both   }
   ```

2. Group Independence:
   - Each animation group should be self-contained
   - No need to align across different groups
   - Keep consistent spacing within each group
   Example:
   ```css
   // Move Animations
   @keyframes moveToLeft   { from {                              } to { transform: translateX(-100%) } } .pt-page-moveToLeft   { animation: moveToLeft .6s ease both   }
   @keyframes moveFromLeft { from { transform: translateX(-100%) }                                     } .pt-page-moveFromLeft { animation: moveFromLeft .6s ease both }
   ```

3. Alignment within a group:
   - Align 'from' and 'to' groups in columns
	 - Keep ALL opening brackets aligned
   - Keep ALL closing braces aligned (if a from/to is empty, the closing bracket should align with the others that have content)
   Example:
   ```css
   @keyframes moveToLeftFade     { from {                                            } to { transform: translateX(-100%); opacity: 0.3 } } .pt-page-moveToLeftFade     { animation: moveToLeftFade .7s ease both   }
   @keyframes moveFromLeftFade   { from { transform: translateX(-100%); opacity: 0.3 }                                                   } .pt-page-moveFromLeftFade   { animation: moveFromLeftFade .7s ease both }
   ```
	 - Align percentages when they are all similar inside a group
	 - Align individual properties when they are similar (eg. opacity, animation in the next example has extra spacing added in front to align)
   ```css
   @keyframes rotateRightSideFirst  { 0% { } 40% { transform: rotateY(15deg);  opacity: .8; animation-timing-function: ease-out } 100% { transform: scale(0.8) translateZ(-200px); opacity: 0 } } .pt-page-rotateRightSideFirst  { transform-origin: 0% 50%;   animation: rotateRightSideFirst .8s both ease-in }
	 @keyframes rotateLeftSideFirst   { 0% { } 40% { transform: rotateY(-15deg); opacity: .8; animation-timing-function: ease-out } 100% { transform: scale(0.8) translateZ(-200px); opacity: 0 } } .pt-page-rotateLeftSideFirst   { transform-origin: 100% 50%; animation: rotateLeftSideFirst .8s both ease-in  }
   ```

4. Property Formatting:
   - Remove semicolons from last properties
   - Align property values consistently
   Example:
   ```css
   @keyframes rotateOutNewspaper { from {                                                             } to { transform: translateZ(-3000px) rotateZ(360deg); opacity: 0 } } .pt-page-rotateOutNewspaper { transform-origin: 50% 50%; animation: rotateOutNewspaper .5s both ease-in }
   @keyframes rotateInNewspaper  { from { transform: translateZ(-3000px) rotateZ(-360deg); opacity: 0 }                                                                   } .pt-page-rotateInNewspaper  { transform-origin: 50% 50%; animation: rotateInNewspaper .5s both ease-out }
   ```

5. Content Preservation:
   - Maintain all original values and functionality
   - Keep all timing functions, transform values, and durations
   - Preserve all transform-origin values
   - Keep all animation durations and timing functions unchanged
	 - Try to keep all changes purely to whitespaces and line-breaks as much as possible
*/

export type AnimationGroup = {
  name: string
  animations: string[]
}

type CssObject =
  | {
      keyframesName: string
      keyframes: {
        [key in
          | 'from'
          | 'to'
          | `${number}%`
          | `${number}%, ${number}%`
          | `${number}%, ${number}%, ${number}%`]: { [key in string]: string }
      }
    }
  | {
      className: string
      class: { [key in string]: string }
    }

export function cssAst(css: string): CssObject[] {
  console.log(`css → `, css)
  const ast: CssObject[] = []

  // Parse keyframes
  const keyframesMatch = css.match(/@keyframes\s+(\w+)\s*{([\s\S]*?)}(?=\s*\.|$)/)
  if (keyframesMatch) {
    const [, keyframesName, keyframesContent] = keyframesMatch
    const keyframes: { [key: string]: { [key: string]: string } } = {}

    // Match all keyframe blocks: from, to, and percentages
    const blockRegex = /(from|to|(?:\d+%,? ?)+)\s*{([^}]*)}/g
    let match
    while ((match = blockRegex.exec(keyframesContent))) {
      const blockName = match[1].trim()
      const blockContent = match[2].trim()
      keyframes[blockName] = blockContent ? parseProperties(blockContent) : {}
    }

    // Remove 'from' and 'to' keys only if they were not explicitly passed
    if (
      !keyframesContent.includes('from {') &&
      keyframes['from'] &&
      Object.keys(keyframes['from']).length === 0
    ) {
      delete keyframes['from']
    }
    if (
      !keyframesContent.includes('to {') &&
      keyframes['to'] &&
      Object.keys(keyframes['to']).length === 0
    ) {
      delete keyframes['to']
    }

    ast.push({
      keyframesName,
      keyframes: keyframes as { [key in 'from' | 'to' | `${number}%`]: { [key: string]: string } },
    })
  }

  // Parse class
  const classMatch = css.match(/\.pt-page-(\w+)\s*{([^}]+)}/)
  if (classMatch) {
    const [, className, classContent] = classMatch
    ast.push({
      className: `pt-page-${className}`,
      class: parseProperties(classContent),
    })
  }

  return ast
}

function parseProperties(content: string): { [key: string]: string } {
  const properties: { [key: string]: string } = {}

  if (!content.trim()) {
    return properties
  }

  const propPairs = content.split(';')
  for (const pair of propPairs) {
    const [prop, value] = pair.split(':').map((s) => s.trim())
    if (prop && value) {
      properties[prop] = value
    }
  }

  if (Object.keys(properties).length > 0) {
    console.log('parseProperties', { content, properties })
  }

  return properties
}

function formatAnimationGroup(group: AnimationGroup): string {
  // First pass: analyze the group to find maximum lengths
  const groupAnalysis = group.animations
    .map((anim) => {
      const cssObjects = cssAst(anim)
      if (cssObjects.length !== 2) return null

      const keyframeObj = cssObjects[0]
      const classObj = cssObjects[1]

      if (!('keyframesName' in keyframeObj) || !('className' in classObj)) return null

      const keyframeName = keyframeObj.keyframesName
      const className = classObj.className.replace('pt-page-', '')
      const classProps = Object.entries(classObj.class)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ')

      // Extract content for each keyframe block, preserving empty blocks
      const keyframeContents: { [key: string]: string } = {}
      for (const [key, value] of Object.entries(keyframeObj.keyframes)) {
        // If the block exists in the original input (even if empty), include it
        if (key in keyframeObj.keyframes) {
          keyframeContents[key] = Object.entries(value)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ')
        }
      }

      return {
        keyframeName,
        className,
        keyframeContents,
        classProps,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  // Calculate maximum lengths for this group
  const maxLength = {
    keyframeName: Math.max(...groupAnalysis.map((a) => a.keyframeName.length)),
    className: Math.max(...groupAnalysis.map((a) => a.className.length)),
    // Get all unique keyframe percentages/from/to that exist in the original input
    keyframeBlocks: Array.from(
      new Set(groupAnalysis.flatMap((a) => Object.keys(a.keyframeContents))),
    ),
    // Calculate max length for each keyframe block's content
    keyframeContent: Object.fromEntries(
      Array.from(new Set(groupAnalysis.flatMap((a) => Object.keys(a.keyframeContents)))).map(
        (key) => [
          key,
          Math.max(...groupAnalysis.map((a) => (a.keyframeContents[key] || '').length)),
        ],
      ),
    ),
  }

  // Calculate the total length of each keyframe block including its label
  const blockLengths = Object.fromEntries(
    maxLength.keyframeBlocks.map((block) => [
      block,
      `${block} { ${''.padEnd(maxLength.keyframeContent[block])} }`.length,
    ]),
  )

  // Second pass: format each animation with proper alignment
  const lines = groupAnalysis.map(({ keyframeName, className, keyframeContents, classProps }) => {
    const keyframeNamePart = keyframeName.padEnd(maxLength.keyframeName)

    // Format each keyframe block with proper alignment, only including blocks that existed in the original input
    const keyframeBlocks = Object.entries(keyframeContents)
      .map(([block, content]) => {
        const paddedContent = content.padEnd(maxLength.keyframeContent[block])
        return `${block} { ${paddedContent} }`
      })
      .join(' ')

    // Calculate total length of all blocks in this animation
    const totalBlockLength = Object.entries(keyframeContents).reduce(
      (sum, [block]) => sum + blockLengths[block],
      0,
    )

    // Calculate total length of all possible blocks
    const maxTotalBlockLength = Object.values(blockLengths).reduce((sum, len) => sum + len, 0)

    // Add padding to match the total length of the longest line
    const padding = ' '.repeat(Math.max(0, maxTotalBlockLength - totalBlockLength))

    const baseClassPart = `.pt-page-${className.padEnd(maxLength.className)} { ${classProps}`
    return `@keyframes ${keyframeNamePart} { ${keyframeBlocks}${padding} } ${baseClassPart}}`
  })

  // Find the max length of the class block (from .pt-page- to the closing }) in the group
  const classBlocks = lines.map((line) => {
    const classStart = line.indexOf('.pt-page-')
    return line.slice(classStart)
  })
  const maxClassBlockLength = Math.max(...classBlocks.map((cb) => cb.length)) + 1

  // Adjust all lines to match the maximum class block length by adding spaces before the closing brace
  const adjustedLines = lines.map((line) => {
    const classStart = line.indexOf('.pt-page-')
    const classEnd = line.lastIndexOf('}') + 1
    const classBlock = line.slice(classStart, classEnd)
    // Find the position of the last '}' in the class block
    const lastBrace = classBlock.lastIndexOf('}')
    const padLength = Math.max(1, maxClassBlockLength - classBlock.length)
    // Insert padding before the closing '}'
    const paddedClassBlock =
      classBlock.slice(0, lastBrace) + ' '.repeat(padLength) + classBlock.slice(lastBrace)
    return line.slice(0, classStart) + paddedClassBlock
  })

  return `/* ${group.name} */\n${adjustedLines.join('\n')}\n`.trim()
}

export function formatAnimations(groups: AnimationGroup[]): string {
  return groups.map(formatAnimationGroup).join('\n\n')
}

export function parseCSSFile(content: string): AnimationGroup[] {
  const groups: AnimationGroup[] = []
  let currentGroup: AnimationGroup | null = null

  // Join lines that belong to the same keyframe
  const lines = content.split('\n')
  let currentLine = ''

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue

    // Check for group comment
    const groupMatch = trimmedLine.match(/\/\*\s*(.*?)\s*\*\//)
    if (groupMatch) {
      if (currentLine) {
        if (currentGroup) currentGroup.animations.push(currentLine.trim())
        currentLine = ''
      }
      if (currentGroup) {
        groups.push(currentGroup)
      }
      currentGroup = {
        name: groupMatch[1],
        animations: [],
      }
      continue
    }

    // Skip comments that aren't group headers
    if (trimmedLine.startsWith('/*')) continue

    // If the line starts with @keyframes, it's a new animation
    if (trimmedLine.startsWith('@keyframes')) {
      if (currentLine) {
        if (currentGroup) currentGroup.animations.push(currentLine.trim())
      }
      currentLine = trimmedLine
    } else {
      // Otherwise, append to the current line
      currentLine += ' ' + trimmedLine
    }
  }

  // Add the last animation to the current group
  if (currentLine && currentGroup) {
    currentGroup.animations.push(currentLine.trim())
  }

  // Add the last group
  if (currentGroup) {
    groups.push(currentGroup)
  }

  return groups
}

export function formatCSSString(input: string): string {
  const groups = parseCSSFile(input)
  return formatAnimations(groups)
}
