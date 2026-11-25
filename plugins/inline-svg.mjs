import fs from 'node:fs'
import path from 'node:path'

const directive = /^@\[svg\]\(([^)]+\.svg)\)\s*$/i

export default function inlineSvg(md, options = {}) {
  const root = path.resolve(options.root ?? process.cwd())

  md.block.ruler.before('paragraph', 'inline_svg', (state, startLine, _endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const end = state.eMarks[startLine]
    const match = state.src.slice(start, end).match(directive)

    if (!match) return false
    if (silent) return true

    const svgPath = path.resolve(root, match[1])
    const relativePath = path.relative(root, svgPath)

    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      throw new Error(`Inline SVG must stay inside the project: ${match[1]}`)
    }

    let svg
    try {
      svg = fs.readFileSync(svgPath, 'utf8')
    } catch (error) {
      throw new Error(`Cannot inline SVG ${match[1]}: ${error.message}`)
    }

    // XML declarations and doctypes are valid in standalone SVG files but not
    // when their markup is inserted into an HTML document.
    svg = svg
      .replace(/^\uFEFF/, '')
      .replace(/^\s*<\?xml[^?]*\?>\s*/i, '')
      .replace(/^\s*<!doctype[^>]*>\s*/i, '')

    const token = state.push('html_block', '', 0)
    token.map = [startLine, startLine + 1]
    token.content = `${svg.trim()}\n`
    state.line = startLine + 1
    return true
  })
}
