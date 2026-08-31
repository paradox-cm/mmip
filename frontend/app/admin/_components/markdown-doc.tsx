import type { ReactNode } from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

type Block =
  | { type: 'heading'; depth: 1 | 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; language?: string; code: string }
  | { type: 'blockquote'; text: string }
  | { type: 'hr' }

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: Block[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (line.trim() === '') {
      index += 1
      continue
    }

    if (/^```/.test(line)) {
      const language = line.slice(3).trim() || undefined
      const codeLines: string[] = []
      index += 1
      while (index < lines.length && !/^```/.test(lines[index])) {
        codeLines.push(lines[index])
        index += 1
      }
      index += 1
      blocks.push({ type: 'code', language, code: codeLines.join('\n') })
      continue
    }

    if (/^---\s*$/.test(line)) {
      blocks.push({ type: 'hr' })
      index += 1
      continue
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if (heading) {
      const depth = heading[1].length as 1 | 2 | 3 | 4
      blocks.push({ type: 'heading', depth, text: heading[2].trim() })
      index += 1
      continue
    }

    if (line.startsWith('> ')) {
      const quote: string[] = []
      while (index < lines.length && lines[index].startsWith('> ')) {
        quote.push(lines[index].slice(2))
        index += 1
      }
      blocks.push({ type: 'blockquote', text: quote.join(' ') })
      continue
    }

    if (isTableSeparator(lines[index + 1]) && line.includes('|')) {
      const headers = splitRow(line)
      index += 2
      const rows: string[][] = []
      while (index < lines.length && lines[index].includes('|') && lines[index].trim() !== '') {
        rows.push(splitRow(lines[index]))
        index += 1
      }
      blocks.push({ type: 'table', headers, rows })
      continue
    }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line)
      const items: string[] = []
      while (
        index < lines.length &&
        (ordered ? /^\s*\d+\.\s+/.test(lines[index]) : /^\s*[-*]\s+/.test(lines[index]))
      ) {
        items.push(lines[index].replace(ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/, ''))
        index += 1
      }
      blocks.push({ type: 'list', ordered, items })
      continue
    }

    const paragraph: string[] = []
    while (index < lines.length && lines[index].trim() !== '' && !isBlockStart(lines, index)) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    if (paragraph.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
    }
  }

  return blocks
}

function isTableSeparator(line: string | undefined) {
  if (!line?.includes('-')) return false
  const trimmed = line.trim()
  return trimmed.includes('|') && /^\|?[\s:|-]+\|?$/.test(trimmed)
}

function splitRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim())
}

function isBlockStart(lines: string[], index: number) {
  const line = lines[index]
  return (
    /^```/.test(line) ||
    /^---\s*$/.test(line) ||
    /^#{1,4}\s+/.test(line) ||
    line.startsWith('> ') ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    (line.includes('|') && isTableSeparator(lines[index + 1]))
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_[\]]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))|(\bhttps?:\/\/[^\s)]+)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    const token = match[0]
    if (token.startsWith('`')) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('[')) {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if (link) {
        nodes.push(
          <MarkdownLink key={key} href={link[2]}>
            {link[1]}
          </MarkdownLink>,
        )
      } else {
        nodes.push(token)
      }
    } else {
      nodes.push(
        <MarkdownLink key={key} href={token}>
          {token}
        </MarkdownLink>,
      )
    }
    key += 1
    last = match.index + token.length
  }

  if (last < text.length) {
    nodes.push(text.slice(last))
  }

  return nodes
}

function MarkdownLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href)
  const className = 'focus-ring rounded-sm text-primary underline underline-offset-4'

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

const headingClass: Record<1 | 2 | 3 | 4, string> = {
  1: 'font-heading text-4xl font-medium tracking-tight text-foreground md:text-5xl',
  2: 'font-heading text-2xl font-medium tracking-tight text-foreground md:text-3xl',
  3: 'font-heading text-xl font-medium tracking-tight text-foreground',
  4: 'font-heading text-lg font-medium tracking-tight text-foreground',
}

export default function MarkdownDoc({
  source,
  className,
  skipFirstHeading = false,
}: {
  source: string
  className?: string
  skipFirstHeading?: boolean
}) {
  const parsed = parseBlocks(source)
  const blocks = skipFirstHeading && parsed[0]?.type === 'heading' ? parsed.slice(1) : parsed

  return (
    <article className={cn('flex flex-col gap-6 text-foreground-subtle', className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.depth}` as const
            const id = slugify(block.text)
            return (
              <Tag key={index} id={id} className={cn('scroll-mt-24', headingClass[block.depth])}>
                {renderInline(block.text)}
              </Tag>
            )
          }
          case 'paragraph':
            return (
              <p key={index} className="max-w-reading">
                {renderInline(block.text)}
              </p>
            )
          case 'blockquote':
            return (
              <blockquote
                key={index}
                className="max-w-reading border-l-2 border-strong pl-4 text-foreground"
              >
                {renderInline(block.text)}
              </blockquote>
            )
          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul'
            return (
              <ListTag
                key={index}
                className={cn(
                  'max-w-reading space-y-2 pl-5',
                  block.ordered ? 'list-decimal' : 'list-disc',
                )}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ListTag>
            )
          }
          case 'table':
            return (
              <div key={index} className="overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      {block.headers.map((header, headerIndex) => (
                        <th key={headerIndex} className="px-3 py-2 font-medium text-foreground">
                          {renderInline(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-border">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-2 align-top">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'code':
            return (
              <pre
                key={index}
                className="overflow-x-auto rounded-lg bg-background-emphasis p-4 font-mono text-label text-foreground"
              >
                <code>{block.code}</code>
              </pre>
            )
          case 'hr':
            return <hr key={index} className="border-border" />
          default: {
            const _exhaustive: never = block
            return _exhaustive
          }
        }
      })}
    </article>
  )
}
