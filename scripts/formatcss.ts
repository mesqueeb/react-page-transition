type CssObject = {
  keyframes: undefined | { name: string; content: string }
  class: undefined | { name: string; content: string }
}

export function cssAst(css: string): CssObject {
  // Remove extra whitespace and normalize the input
  const normalized = css.replace(/\s+/g, ' ').trim()

  // Extract keyframes (greedy match up to the closing brace before the class)
  const keyframesMatch = normalized.match(/@keyframes\s+(\w+)\s*{([\s\S]+?)}\s*\./)
  // Extract class - using a more precise pattern that matches the class name and content
  const classMatch = normalized.match(/\.([\w-]+)\s*{([^}]+)}/)

  return {
    keyframes: keyframesMatch
      ? { name: keyframesMatch[1].trim(), content: keyframesMatch[2].trim() }
      : undefined,
    class: classMatch
      ? { name: classMatch[1].trim(), content: classMatch[2].trim().replace(/;$/, '') }
      : undefined,
  }
}

export type AnimationGroup = {
  name: string
  animations: string[]
}

function formatAnimationGroup(group: AnimationGroup): string {
  // First pass: analyze the group to find maximum lengths
  const groupAnalysis = group.animations.map((anim) => cssAst(anim))

  // Calculate maximum lengths for this group and store in an object
  const maxLength = {
    keyframe: {
      name: Math.max(...groupAnalysis.map((a) => a.keyframes?.name.length ?? 0)),
      content: Math.max(...groupAnalysis.map((a) => a.keyframes?.content.length ?? 0)),
    },
    class: {
      name: Math.max(...groupAnalysis.map((a) => a.class?.name.length ?? 0)),
      content: Math.max(...groupAnalysis.map((a) => a.class?.content.length ?? 0)),
    },
  }

  // format each animation with proper alignment
  const lines = groupAnalysis.map((css) => {
    let keyframePart = ''
    let classPart = ''
    if (css.keyframes) {
      const keyframeName = css.keyframes.name.padEnd(maxLength.keyframe.name)
      const keyframeContent = css.keyframes.content.padEnd(maxLength.keyframe.content)
      keyframePart = `@keyframes ${keyframeName} { ${keyframeContent} }`
    }
    if (css.class) {
      const className = css.class.name.padEnd(maxLength.class.name)
      const classContent = css.class.content.padEnd(maxLength.class.content)
      classPart = `.${className} { ${classContent} }`
    }
    return keyframePart ? `${keyframePart} ${classPart}` : classPart
  })

  return `/* ${group.name} */\n${lines.join('\n')}\n`.trim()
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
    if (trimmedLine.startsWith('@keyframes') || trimmedLine.startsWith('.')) {
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
