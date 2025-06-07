import fs from 'fs'
import path from 'path'
import { formatCSSString } from './formatcss'

function formatCSSFile(inputPath: string, outputPath: string) {
  try {
    // Read the input file
    const content = fs.readFileSync(inputPath, 'utf-8')

    // Format the content
    const formattedContent = formatCSSString(content)

    // Write the formatted content
    fs.writeFileSync(outputPath, formattedContent, 'utf-8')

    console.log(`Successfully formatted CSS file: ${outputPath}`)
  } catch (error) {
    console.error('Error formatting CSS file:', error)
    process.exit(1)
  }
}

// Get the input file path from command line arguments
const inputFile = process.argv[2]
if (!inputFile) {
  console.error('Please provide an input CSS file path')
  process.exit(1)
}

// Generate output file path
const outputFile = path.join(
  path.dirname(inputFile),
  `${path.basename(inputFile, path.extname(inputFile))}${path.extname(inputFile)}`,
)

// Format the CSS file
formatCSSFile(inputFile, outputFile)
