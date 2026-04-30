'use client'

import { useEffect, useRef, useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/app/components/ui/badge'
import { useSearch } from '@/lib/hooks/use-search'

export default function SearchComponent() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { results, isLoading } = useSearch(query)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length > 0)
  }

  const clearSearch = () => {
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <LuSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search articles, guides, tools..."
          className="w-full rounded-lg border border-gray-300 px-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <LuX className="size-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map(result => (
                <Link
                  key={result.objectID}
                  href={result.url}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 border-b border-gray-100 p-4 last:border-b-0 hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Image
                        src={result.coverImage?.url || '/default-image.png'}
                        alt={result.title || 'Image'}
                        width={100}
                        height={80}
                      />
                      <h3 className="truncate font-medium text-gray-900">{result.title}</h3>
                      {result.postType && (
                        <Badge variant={result.postType} className="text-xs">
                          {result.postType}
                        </Badge>
                      )}
                    </div>
                    {result.excerpt && (
                      <p className="line-clamp-2 text-sm text-gray-600">{result.excerpt}</p>
                    )}
                    {result.category?.name && (
                      <p className="mt-1 text-xs text-gray-500">in {result.category.name}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No results found for {query}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
