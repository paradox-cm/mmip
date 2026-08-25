#!/usr/bin/env node

/**
 * Fails if product TSX/TS uses Tailwind default palettes instead of semantic tokens.
 * SVG vendor fills (e.g. Sanity logo hex) are ignored — they are not chrome.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const scanRoots = ['app', 'lib'].map(dir => join(root, dir))

const forbidden = [
  /(?:text|bg|border|ring|from|to|via|outline|decoration|caret|accent)-gray-\d/,
  /hover:text-red-/,
  /hover:bg-red-/,
  /focus:bg-(?:cyan|red)-/,
  /focus:border-blue-/,
  /focus:ring-blue-/,
  /prose-a:text-red-/,
  /(?:text|bg)-(?:red|cyan)-\d/,
  /\bbg-black\b/,
  /\btext-black\b/,
]

const skip = new Set(['STANDARDS.md'])

/** @param {string} dir */
function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || skip.has(name)) continue
    const path = join(dir, name)
    const st = statSync(path)
    if (st.isDirectory()) walk(path, acc)
    else if (/\.(tsx|ts)$/.test(extname(name))) acc.push(path)
  }
  return acc
}

const hits = []
for (const scanRoot of scanRoots) {
  for (const file of walk(scanRoot)) {
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, index) => {
      if (line.includes('fill="#')) return
      for (const pattern of forbidden) {
        if (pattern.test(line)) {
          hits.push(`${relative(root, file)}:${index + 1}: ${line.trim()}`)
          break
        }
      }
    })
  }
}

if (hits.length > 0) {
  console.error('Token hygiene failed. Use semantic classes (bg-primary, text-foreground, text-error).\n')
  console.error(hits.join('\n'))
  process.exit(1)
}

console.log('Token hygiene ok.')
