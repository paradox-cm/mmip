#!/usr/bin/env node

import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const frontendDirectory = join(scriptDirectory, '..')
const logoDirectory = join(frontendDirectory, 'public', 'logo')

const assets = [
  ['apple-touch-icon.png', 180, 180],
  ['logo-192.png', 192, 192],
  ['logo-512.png', 512, 512],
  ['logo-maskable-512.png', 512, 512],
]

for (const fileName of ['logo.svg', 'app-icon.svg']) {
  await access(join(logoDirectory, fileName))
}

for (const [fileName, width, height] of assets) {
  const metadata = await sharp(join(logoDirectory, fileName)).metadata()
  assert.equal(metadata.width, width, `${fileName} should be ${width}px wide`)
  assert.equal(metadata.height, height, `${fileName} should be ${height}px tall`)
}

async function alphaAt(fileName, x, y) {
  const { data, info } = await sharp(join(logoDirectory, fileName))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  return data[(y * info.width + x) * info.channels + 3]
}

assert.equal(await alphaAt('logo-maskable-512.png', 0, 0), 255, 'maskable icon must be opaque')
assert.equal(await alphaAt('apple-touch-icon.png', 0, 0), 255, 'Apple icon must be opaque')
assert.equal(
  await alphaAt('logo-512.png', 0, 0),
  0,
  'standard icon keeps rounded transparent corners',
)

const manifest = await readFile(join(frontendDirectory, 'app', 'manifest.ts'), 'utf8')
for (const path of ['/logo/logo-192.png', '/logo/logo-512.png', '/logo/logo-maskable-512.png']) {
  assert.ok(manifest.includes(path), `manifest should reference ${path}`)
}

console.log('Brand asset checks passed.')
