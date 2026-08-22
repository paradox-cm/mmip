'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { PostQueryResult } from '@/sanity.types'

type TableOfContentsProps = {
  headings: NonNullable<PostQueryResult>['headings']
  className?: string
}

export default function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' },
    )

    // Observe all heading elements
    headings.forEach(({ _key }) => {
      const element = document.getElementById(_key)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const getIndentClass = (
    level: 'blockquote' | 'h2' | 'h3' | 'h4' | 'lead' | 'normal' | 'small' | null,
  ) => {
    const levelNum = level && parseInt(level.replace('h', ''))
    const indentLevel = levelNum && levelNum - 2 // h2 = 0, h3 = 1, h4 = 2, etc.

    const indentClasses = {
      0: '',
      1: 'pl-3',
      2: 'pl-6',
      3: 'pl-9',
      4: 'pl-12',
    }

    return indentClasses[indentLevel as keyof typeof indentClasses] || ''
  }

  return (
    <nav className={cn('flex flex-col gap-4 rounded-lg border p-6', className)}>
      <h3 className="text-sm font-semibold text-foreground">Table of Contents</h3>
      {headings.length !== 0 && (
        <ul className="flex flex-col gap-1.5">
          {headings.map(({ _key, level, text }) => (
            <li key={_key} className={getIndentClass(level)}>
              <a
                href={`#${_key}`}
                className={cn(
                  'block text-sm transition-colors hover:text-foreground',
                  activeId === _key ? 'font-medium text-foreground' : 'text-foreground-muted',
                )}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(_key)?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
