import { readFile } from 'node:fs/promises'
import path from 'node:path'

const EXPECTED_GLYPH_COUNT = 38
const EXPECTED_MARK_PATH_COUNT = 100
const GLYPH_START_DELAY_MS = 180
const GLYPH_STAGGER_MS = 86

function addAttribute(line: string, attribute: string) {
  return line.replace('<path ', `<path ${attribute} `)
}

export function prepareSealMarkup(source: string) {
  const lines = source.trim().split(/\r?\n/)
  const markStart = lines.findIndex(line => line.startsWith('<g '))
  const markEnd = lines.findIndex((line, index) => index > markStart && line === '</g>')

  if (markStart < 0 || markEnd < 0) {
    throw new Error('SEAL-Lg.svg no longer contains the expected California group')
  }

  const glyphLines = lines.slice(1, markStart)
  const markLines = lines.slice(markStart + 1, markEnd)
  const glyphPaths = glyphLines.filter(line => line.startsWith('<path '))
  const markPaths = markLines.filter(line => line.startsWith('<path '))

  if (glyphPaths.length !== EXPECTED_GLYPH_COUNT || markPaths.length !== EXPECTED_MARK_PATH_COUNT) {
    throw new Error(
      `SEAL-Lg.svg changed: expected ${EXPECTED_GLYPH_COUNT} glyph paths and ${EXPECTED_MARK_PATH_COUNT} mark paths`,
    )
  }

  const outlinePath = markPaths.reduce((longest, line) =>
    line.length > longest.length ? line : longest,
  )

  let glyphIndex = 0
  const animatedGlyphs = glyphLines.map(line => {
    if (!line.startsWith('<path ')) return line
    const delay = GLYPH_START_DELAY_MS + glyphIndex * GLYPH_STAGGER_MS
    glyphIndex += 1
    return addAttribute(line, `data-seal-glyph style="--glyph-delay: ${delay}ms"`)
  })

  const animatedMark = markLines.map(line => {
    if (!line.startsWith('<path ')) return line
    const attributes =
      line === outlinePath
        ? 'data-seal-mark-path data-seal-outline pathLength="1"'
        : 'data-seal-mark-path'
    return addAttribute(line, attributes)
  })

  const openingSvg = lines[0].replace(
    '<svg ',
    '<svg data-seal-svg aria-hidden="true" focusable="false" ',
  )
  const openingMark = lines[markStart].replace('<g ', '<g data-seal-mark ')

  return [
    openingSvg,
    '<g data-seal-orbit>',
    '<g data-seal-wordmark>',
    ...animatedGlyphs,
    '</g>',
    '</g>',
    openingMark,
    ...animatedMark,
    lines[markEnd],
    ...lines.slice(markEnd + 1),
  ].join('\n')
}

export async function loadSealMarkup() {
  const sourcePath = path.join(process.cwd(), 'public', 'SEAL-Lg.svg')
  return prepareSealMarkup(await readFile(sourcePath, 'utf8'))
}
