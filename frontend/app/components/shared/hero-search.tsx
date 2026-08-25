'use client'

import { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'

import { useRouter } from 'next/navigation'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'

interface HeroSearchProps {
  onSearch?: (query: string) => void
  initialValue?: string
}

export default function HeroSearch({ onSearch, initialValue = '' }: HeroSearchProps) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()

  // Update local state when initialValue changes (on mount)
  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  // Debounce the onSearch callback for instant search
  useEffect(() => {
    if (!onSearch) return

    const timer = setTimeout(() => {
      onSearch(query.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [query]) // Removed onSearch from dependency array!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        // If we're on search page, use the callback immediately
        onSearch(query.trim())
      } else {
        // If we're on home page, navigate to search
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full max-w-2xl">
      <div className="relative flex flex-col gap-2 md:block">
        <label htmlFor="hero-search" className="sr-only">
          Search articles, guides, and tools
        </label>
        <div className="relative">
          <LuSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-foreground-heading"
          />
          <Input
            id="hero-search"
            type="search"
            value={query}
            onChange={handleInputChange}
            placeholder="Search articles, guides, and tools..."
            className="h-14 pl-12 pr-4 md:pr-28 md:text-lg"
          />
        </div>
        <Button
          type="submit"
          className="h-14 w-full md:absolute md:right-2 md:top-1/2 md:h-10 md:w-auto md:-translate-y-1/2"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
