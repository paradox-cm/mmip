#!/usr/bin/env node

/**
 * Builds browser, iOS, Android, and Open Graph font assets from the same
 * mark used by LogoMark in the product header. Keep generated files checked
 * in: public assets must be available before an application build runs.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import woff2Rs from '@woff2/woff2-rs'
import sharp from 'sharp'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const frontendDirectory = join(scriptDirectory, '..')
const publicDirectory = join(frontendDirectory, 'public')
const logoDirectory = join(publicDirectory, 'logo')
const fontsDirectory = join(frontendDirectory, 'app', 'fonts')

const BRAND_INK = '#1C335B'
const SAND_50 = '#FCF8F3'
const APP_ICON_RATIO = 0.67

const fontAssets = [
  ['RealHeadProBold.woff2', 'RealHeadProBold.ttf'],
  ['HelveticaNowText.woff2', 'HelveticaNowText.ttf'],
  ['HelveticaNowTextMedium.woff2', 'HelveticaNowTextMedium.ttf'],
]

function standAloneMarkSvg(source) {
  return source
    .replaceAll('currentColor', BRAND_INK)
    .replaceAll('fill="white"', `fill="${BRAND_INK}"`)
}

function appIconSvg(mark, { maskable = false } = {}) {
  const inset = ((1 - APP_ICON_RATIO) * 64) / 2
  const markDataUri = `data:image/svg+xml;base64,${Buffer.from(mark).toString('base64')}`
  const field = maskable
    ? `<rect width="64" height="64" fill="${SAND_50}"/>`
    : `<rect width="64" height="64" rx="14.08" fill="${SAND_50}"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Resilient Relatives app icon">${field}<image href="${markDataUri}" x="${inset}" y="${inset}" width="${64 * APP_ICON_RATIO}" height="${64 * APP_ICON_RATIO}" preserveAspectRatio="xMidYMid meet"/></svg>\n`
}

async function writePng(fileName, svg, size) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(logoDirectory, fileName))
}

async function convertOpenGraphFonts() {
  await Promise.all(
    fontAssets.map(async ([sourceName, outputName]) => {
      const source = await readFile(join(fontsDirectory, sourceName))
      await writeFile(join(fontsDirectory, outputName), woff2Rs.decode(source))
    }),
  )
}

await mkdir(logoDirectory, { recursive: true })

const sourceMark = await readFile(join(publicDirectory, 'logo-mark.svg'), 'utf8')
const mark = standAloneMarkSvg(sourceMark)
const appIcon = appIconSvg(mark)
const maskableAppIcon = appIconSvg(mark, { maskable: true })

await Promise.all([
  writeFile(join(logoDirectory, 'logo.svg'), mark),
  writeFile(join(logoDirectory, 'app-icon.svg'), appIcon),
  writePng('apple-touch-icon.png', maskableAppIcon, 180),
  writePng('logo-192.png', appIcon, 192),
  writePng('logo-512.png', appIcon, 512),
  writePng('logo-maskable-512.png', maskableAppIcon, 512),
  convertOpenGraphFonts(),
])

console.log('Generated Resilient Relatives brand assets.')
